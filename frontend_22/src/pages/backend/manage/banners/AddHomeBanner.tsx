import React, { useState, useEffect } from "react";
import { Card, Col, Container, Row, Form, Button } from "react-bootstrap";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { createHomeBanner } from "../../../../services/homeBannerServices";

function AddHomeBanner() {
  const [name, setName] = useState<string>("");
  const [slug, setSlug] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");

  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!name) return;

    const generated = name
      .toLowerCase()
      .trim()
      .replace(/[\s\W-]+/g, "-")
      .replace(/^-+|-+$/g, "");

    setSlug(generated);
  }, [name]);

  useEffect(() => {
    if (!image) {
      setPreview("");
      return;
    }

    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  // ✅ Submit handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (!form.checkValidity()) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    if (!image) {
      alert("Image is required");
      return;
    }

    setLoading(true);

    try {
      await createHomeBanner({
        name,
        slug,
        image,
        url,
        description,
      });

      navigate(
        "/admin/manage/home-banners?success=Banner created successfully",
      );
    } catch (error: any) {
      alert(error?.response?.data?.message || "Error creating banner");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-content py-2">
      <Container fluid>
        {/* HEADER */}
        <Row>
          <Col>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 style={{ fontWeight: 600, color: "#14468C" }}>
                Add Home Banner
              </h4>

              <Button
                style={{ backgroundColor: "#14468C", border: "none" }}
                onClick={() => navigate("/admin/home-banners")}
              >
                <FaLongArrowAltLeft /> Back
              </Button>
            </div>
          </Col>
        </Row>

        {/* FORM */}
        <Card>
          <Card.Body>
            <Form
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
              encType={"multipart/form-data"}
            >
              {/* ROW 1 */}
              <Row className="mb-3">
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>
                      Name <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={name}
                      required
                      onChange={(e) => setName(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                      Name is required
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Slug</Form.Label>
                    <Form.Control
                      type="text"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                    />
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group>
                    <Form.Label>URL</Form.Label>
                    <Form.Control
                      type="url"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="https://example.com"
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* ROW 2 */}
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>
                      Description <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      as="textarea"
                      rows={3}
                      value={description}
                      required
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                      Description is required
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label>
                      Upload Image <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      required
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        if (e.target.files && e.target.files[0]) {
                          setImage(e.target.files[0]);
                        }
                      }}
                    />
                  </Form.Group>

                  {/* PREVIEW */}
                  <div className="mt-2">
                    <Form.Label>Preview</Form.Label>
                    <div>
                      {preview ? (
                        <img
                          src={preview}
                          alt="preview"
                          style={{
                            width: "100%",
                            maxHeight: "120px",
                            objectFit: "cover",
                            borderRadius: "6px",
                            border: "1px solid #ddd",
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            width: "100%",
                            height: "120px",
                            border: "1px dashed #ccc",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          No Image Selected
                        </div>
                      )}
                    </div>
                  </div>
                </Col>
              </Row>

              {/* BUTTON */}
              <Button
                type="submit"
                disabled={loading}
                style={{ backgroundColor: "#14468C", border: "none" }}
              >
                {loading ? "Adding..." : "Add Banner"}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default AddHomeBanner;
