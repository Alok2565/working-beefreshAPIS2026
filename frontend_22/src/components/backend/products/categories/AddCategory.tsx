import React, { useEffect, useState } from "react";

import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";

import { FaLongArrowAltLeft } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

import {
  createRecord,
  getListRecords,
} from "../../../../services/categoryServices";

function AddCategory() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState<any[]>([]);

  const [parentId, setParentId] = useState("");

  const [category_name, setCategoryName] = useState("");

  const [category_slug, setCategorySlug] = useState("");

  const [description, setDescription] = useState("");

  const [image, setImage] = useState<File | null>(null);

  const [preview, setPreview] = useState("");

  const [loading, setLoading] = useState(false);

  const [validated, setValidated] = useState(false);

  // ================= FETCH CATEGORIES =================

  const fetchCategories = async () => {
    try {
      const response = await getListRecords();

      setCategories(response.data.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // ================= AUTO SLUG =================

  useEffect(() => {
    if (!category_name) return;

    const generatedSlug = category_name
      .toLowerCase()
      .trim()
      .replace(/[\s\W-]+/g, "-")
      .replace(/^-+|-+$/g, "");

    setCategorySlug(generatedSlug);
  }, [category_name]);

  // ================= IMAGE PREVIEW =================

  useEffect(() => {
    if (!image) {
      setPreview("");

      return;
    }

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

    if (!image) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Image required",
      });

      return;
    }

    try {
      setLoading(true);
      console.log("PARENT ID =>", parentId);
      await createRecord({
        parent_id: parentId,
        category_name,
        category_slug,
        description,
        image,
      });

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Category created successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate(
        "/admin/manage/products/categories?success=Category created successfully",
      );
    } catch (error: any) {
      console.log(error);

      Swal.fire({
        icon: "error",

        title: "Error",

        text: error?.response?.data?.message || "Failed to create category",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-content py-3">
      <Container fluid>
        {/* HEADER */}

        <Row>
          <Col xl={12}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4
                style={{
                  fontWeight: 600,
                  color: "#14468C",
                }}
              >
                Add Category
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

        {/* FORM */}

        <Card>
          <Card.Body>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Row className="mb-3">
                {/* PARENT CATEGORY */}

                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Parent Category</Form.Label>

                    <Form.Select
                      value={parentId}
                      onChange={(e) => setParentId(e.target.value)}
                    >
                      <option value="">Parent Category</option>

                      {categories
                        .filter((item) => !item.parent_id)
                        .map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.category_name}
                          </option>
                        ))}
                    </Form.Select>
                  </Form.Group>
                </Col>

                {/* CATEGORY NAME */}

                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Category Name</Form.Label>

                    <Form.Control
                      type="text"
                      required
                      value={category_name}
                      onChange={(e) => setCategoryName(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* ROW 2 */}

              <Row className="mb-3">
                {/* SLUG */}

                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Category Slug</Form.Label>

                    <Form.Control type="text" value={category_slug} readOnly />
                  </Form.Group>
                </Col>

                {/* DESCRIPTION */}

                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Description</Form.Label>

                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* IMAGE */}

              <Row className="mb-4">
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
                </Col>

                {/* PREVIEW */}

                <Col md={6}>
                  <Form.Label>Preview</Form.Label>

                  <div>
                    {preview ? (
                      <img
                        src={preview}
                        alt="preview"
                        style={{
                          width: "100%",

                          maxHeight: "150px",

                          objectFit: "cover",

                          borderRadius: "8px",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          height: "150px",

                          border: "1px dashed #ccc",

                          display: "flex",

                          alignItems: "center",

                          justifyContent: "center",
                        }}
                      >
                        No Image
                      </div>
                    )}
                  </div>
                </Col>
              </Row>

              {/* BUTTON */}

              <Button
                type="submit"
                disabled={loading}
                style={{
                  backgroundColor: "#14468C",

                  border: "none",
                }}
              >
                {loading ? "Creating..." : "Create Category"}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default AddCategory;
