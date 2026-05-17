import React, { useState, useEffect } from "react";
import { Card, Col, Container, Row, Form, Button } from "react-bootstrap";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { createRecord } from "../../../../services/categoryServices";

function AddCategory() {
  const [category_name, setCatName] = useState<string>("");
  const [category_slug, setCatSlug] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");

  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!category_name) return;

    const generated = category_name
      .toLowerCase()
      .trim()
      .replace(/[\s\W-]+/g, "-")
      .replace(/^-+|-+$/g, "");

    setCatSlug(generated);
  }, [category_name]);

  useEffect(() => {
    if (!image) {
      setPreview("");
      return;
    }

    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

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
      await createRecord({
        category_name,
        category_slug,
        description,
        image,
      });

      navigate(
        "/admin/manage/products/categories?success=Category created successfully",
      );
    } catch (error: any) {
      alert(error?.response?.data?.message || "Error creating Categoty");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-content py-3">
      <Container fluid>
        {/* HEADER */}
        <Row>
          <Col>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 style={{ fontWeight: 600, color: "#14468C" }}>
                Add Category
              </h4>

              <Button
                style={{ backgroundColor: "#14468C", border: "none" }}
                onClick={() => navigate("/admin/manage/products/categories")}
              >
                <FaLongArrowAltLeft /> Back
              </Button>
            </div>
          </Col>
        </Row>

        {/* FORM */}
        <Card>
          <Card.Body>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              {/* ROW 1 */}
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>
                      Category Name <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={category_name}
                      required
                      onChange={(e) => setCatName(e.target.value)}
                    />
                    {/* <Form.Control.Feedback type="invalid">
                      Name is required
                    </Form.Control.Feedback> */}
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Category Slug</Form.Label>
                    <Form.Control
                      type="text"
                      value={category_slug}
                      required
                      onChange={(e) => setCatSlug(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* ROW 2 */}
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      type="text"
                      as="textarea"
                      rows={3}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Upload Image</Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/*"
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
                {loading ? "Adding..." : "Add Category"}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default AddCategory;
