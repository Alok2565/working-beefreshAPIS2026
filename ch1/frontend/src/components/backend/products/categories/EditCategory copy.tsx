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
  getRecordById,
  updateRecord,
} from "../../../../services/categoryServices";

import { getImageUrl, UPLOAD_PATHS } from "../../../../config/uploadPathConfig";

function EditCategory() {
  const { id } = useParams();

  const navigate = useNavigate();

  // ================= STATES =================
  const [category_name, setCatName] = useState<string>("");

  const [category_slug, setCatSlug] = useState<string>("");

  const [description, setDescription] = useState<string>("");

  const [image, setImage] = useState<File | null>(null);

  const [preview, setPreview] = useState<string>("");

  const [imageId, setImageId] = useState<number | null>(null);

  const [loading, setLoading] = useState<boolean>(false);

  const [pageLoading, setPageLoading] = useState<boolean>(true);

  const [validated, setValidated] = useState<boolean>(false);

  // ================= FETCH CATEGORY =================
  useEffect(() => {
    const fetchData = async () => {
      try {
        setPageLoading(true);

        const response = await getRecordById(Number(id));

        // console.log("CATEGORY RESPONSE :", response.data);

        const category = response.data.data;

        // ================= SET FORM DATA =================
        setCatName(category.category_name || "");

        setCatSlug(category.category_slug || "");

        setDescription(category.description || "");
        // ================= IMAGE =================
        if (category.images && category.images.length > 0) {
          setImageId(category.images[0].id);

          setPreview(
            getImageUrl(
              UPLOAD_PATHS.productCategories,
              category.images[0].image,
            ),
          );
        }
      } catch (error: any) {
        console.log("FETCH CATEGORY ERROR :", error);

        Swal.fire({
          icon: "error",
          title: "Error",
          text: error?.response?.data?.message || "Failed to fetch Category",
        });

        navigate("/admin/manage/products/categories");
      } finally {
        setPageLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id, navigate]);

  // ================= AUTO SLUG =================
  useEffect(() => {
    if (!category_name) return;

    const generatedSlug = category_name
      .toLowerCase()
      .trim()
      .replace(/[\s\W-]+/g, "-")
      .replace(/^-+|-+$/g, "");

    setCatSlug(generatedSlug);
  }, [category_name]);

  // ================= IMAGE PREVIEW =================
  useEffect(() => {
    if (!image) return;

    const objectUrl = URL.createObjectURL(image);

    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  // ================= SUBMIT =================
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

      await updateRecord(Number(id), {
        category_name,
        category_slug,
        description,
        image,
        image_id: imageId,
      });

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Category updated successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate(
        "/admin/manage/products/categories?success=Category updated successfully",
      );
    } catch (error: any) {
      console.log("UPDATE CATEGORY ERROR :", error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: error?.response?.data?.message || "Failed to update Category",
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
                Update Category
              </h4>

              <Button
                style={{
                  backgroundColor: "#14468C",
                  border: "none",
                }}
                onClick={() => navigate("/admin/manage/products/categories")}
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
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>
                      Category Name <span className="text-danger">*</span>
                    </Form.Label>

                    <Form.Control
                      type="text"
                      required
                      value={category_name}
                      placeholder="Enter category name"
                      onChange={(e) => setCatName(e.target.value)}
                    />

                    <Form.Control.Feedback type="invalid">
                      Category name is required
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label>
                      Category Slug <span className="text-danger">*</span>
                    </Form.Label>

                    <Form.Control
                      type="text"
                      required
                      value={category_slug}
                      placeholder="Enter category slug"
                      onChange={(e) => setCatSlug(e.target.value)}
                    />

                    <Form.Control.Feedback type="invalid">
                      Slug is required
                    </Form.Control.Feedback>
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
                        height: "150px",
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
                            height: "150px",
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
                  minWidth: "170px",
                }}
              >
                {loading ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    Updating...
                  </>
                ) : (
                  "Update Category"
                )}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default EditCategory;
