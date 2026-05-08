import React, { useEffect, useState } from "react";
import {
  Card,
  Col,
  Container,
  Row,
  Form,
  Button,
  Spinner,
} from "react-bootstrap";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

import {
  getHomeBannerById,
  updateHomeBanner,
} from "../../../../services/homeBannerServices";

import { BASE_URL, UPLOAD_PATHS } from "../../../../config/uploadPathConfig";

function EditHomeBanner() {
  const { id } = useParams();

  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [slug, setSlug] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [image, setImage] = useState<File | null>(null);

  const [preview, setPreview] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [pageLoading, setPageLoading] = useState<boolean>(true);

  const [validated, setValidated] = useState<boolean>(false);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        setPageLoading(true);

        const response = await getHomeBannerById(Number(id));

        const banner = response.data.data;

        setName(banner.name || "");
        setSlug(banner.slug || "");
        setUrl(banner.url || "");
        setDescription(banner.description || "");

        if (banner.image) {
          setPreview(`${BASE_URL}/${UPLOAD_PATHS.banners}/${banner.image}`);
        }
      } catch (error: any) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error?.response?.data?.message || "Failed to fetch banner",
        });

        navigate("/admin/manage/home-banners");
      } finally {
        setPageLoading(false);
      }
    };

    if (id) {
      fetchBanner();
    }
  }, [id, navigate]);

  useEffect(() => {
    if (!name) return;

    const generatedSlug = name
      .toLowerCase()
      .trim()
      .replace(/[\s\W-]+/g, "-")
      .replace(/^-+|-+$/g, "");

    setSlug(generatedSlug);
  }, [name]);

  useEffect(() => {
    if (!image) return;

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

    try {
      setLoading(true);

      await updateHomeBanner(Number(id), {
        name,
        slug,
        url,
        description,
        image,
      });

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Banner updated successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate(
        "/admin/manage/home-banners?success=Banner updated successfully",
      );
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error?.response?.data?.message || "Failed to update banner",
      });
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="page-content py-5 text-center">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <div className="page-content py-3">
      <Container fluid>
        <Row>
          <Col xl={12}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4
                style={{
                  fontWeight: 600,
                  color: "#14468C",
                  marginBottom: 0,
                }}
              >
                Update Home Banner
              </h4>

              <Button
                style={{
                  backgroundColor: "#14468C",
                  border: "none",
                }}
                onClick={() => navigate("/admin/manage/home-banners")}
              >
                <FaLongArrowAltLeft className="me-1" />
                Back
              </Button>
            </div>
          </Col>
        </Row>

        <Card className="shadow-sm border-0">
          <Card.Body>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>
                      Banner Name <span className="text-danger">*</span>
                    </Form.Label>

                    <Form.Control
                      type="text"
                      required
                      value={name}
                      placeholder="Enter banner name"
                      onChange={(e) => setName(e.target.value)}
                    />

                    <Form.Control.Feedback type="invalid">
                      Banner name is required
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group>
                    <Form.Label>
                      Slug <span className="text-danger">*</span>
                    </Form.Label>

                    <Form.Control
                      type="text"
                      required
                      value={slug}
                      placeholder="banner-slug"
                      onChange={(e) => setSlug(e.target.value)}
                    />

                    <Form.Control.Feedback type="invalid">
                      Slug is required
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Banner URL</Form.Label>

                    <Form.Control
                      type="url"
                      value={url}
                      placeholder="https://example.com"
                      onChange={(e) => setUrl(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-4">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>
                      Description <span className="text-danger">*</span>
                    </Form.Label>

                    <Form.Control
                      as="textarea"
                      rows={5}
                      required
                      value={description}
                      placeholder="Enter description"
                      onChange={(e) => setDescription(e.target.value)}
                    />

                    <Form.Control.Feedback type="invalid">
                      Description is required
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Upload Image</Form.Label>

                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        if (e.target.files && e.target.files.length > 0) {
                          setImage(e.target.files[0]);
                        }
                      }}
                    />
                  </Form.Group>

                  <div className="mt-3">
                    <Form.Label>Preview</Form.Label>

                    <div
                      style={{
                        width: "100%",
                        height: "120px",
                        border: "1px dashed #ced4da",
                        borderRadius: "8px",
                        overflow: "hidden",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "#f8f9fa",
                      }}
                    >
                      {preview ? (
                        <img
                          src={preview}
                          alt="Preview"
                          style={{
                            width: "100%",
                            height: "120px",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <span className="text-muted">No Image Available</span>
                      )}
                    </div>
                  </div>
                </Col>
              </Row>

              <Button
                type="submit"
                disabled={loading}
                style={{
                  backgroundColor: "#14468C",
                  border: "none",
                  minWidth: "160px",
                }}
              >
                {loading ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    Updating...
                  </>
                ) : (
                  "Update Banner"
                )}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default EditHomeBanner;
