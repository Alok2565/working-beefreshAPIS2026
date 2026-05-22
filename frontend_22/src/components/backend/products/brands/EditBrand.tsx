// import React from "react";

// function EditBrand() {
//   return (
//     <>
//       <h2>Edit Brands</h2>
//     </>
//   );
// }

// export default EditBrand;

import { useEffect, useState } from "react";

import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";

import { FaArrowLeft, FaSave } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

import { getBrandById, updateBrand } from "../../../../services/brandService";
import usePageTitle from "../../../../hooks/usePageTitle";

function EditBrand() {
  usePageTitle("Edit Brand");
  const { id } = useParams();
  const navigate = useNavigate();

  const [brand_name, setBrandName] = useState<string>("");
  const [brand_slug, setBrandSlug] = useState<string>("");

  const [status, setStatus] = useState<boolean>(true);

  const [loading, setLoading] = useState<boolean>(false);
  const [validated, setValidated] = useState<boolean>(false);

  useEffect(() => {
    if (!brand_name) {
      setBrandSlug("");
      return;
    }
    const generated = brand_name
      .toLowerCase()
      .trim()
      .replace(/[\s\W-]+/g, "-")
      .replace(/^-+|-+$/g, "");
    setBrandSlug(generated);
  }, [brand_name]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getBrandById(Number(id));

        const respData = response.data.data;

        setBrandName(respData.brand_name || "");
        setBrandSlug(respData.brand_slug || "");
        setStatus(respData.status !== undefined ? respData.status : true);
      } catch (error: any) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error?.response?.data?.message || "Failed to fetch brand",
        });

        navigate("/admin/manage/brands");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id, navigate]);

  useEffect(() => {
    if (!brand_name) return;

    const generatedSlug = brand_name
      .toLowerCase()
      .trim()
      .replace(/^-+|-+$/g, "");

    setBrandSlug(generatedSlug);
  }, [brand_name]);

  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(e.target.checked);
  };

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

      await updateBrand(Number(id), {
        brand_name,
        brand_slug,
        status,
      });
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Brand updated successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/admin/manage/brands?success=Brand updated successfully");
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error?.response?.data?.message || "Error updating brands",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-content py-3">
      <Container fluid>
        <Row className="mb-4">
          <Col xl={12}>
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
              <div>
                <h4
                  className="mb-1"
                  style={{
                    fontWeight: 700,
                    color: "#14468C",
                  }}
                >
                  Edit Brand
                </h4>

                <p className="text-muted mb-0">Update product Brand details</p>
              </div>

              <Link to="/admin/manage/brands">
                <Button variant="light" className="shadow-sm border">
                  <FaArrowLeft className="me-2" />
                  Back
                </Button>
              </Link>
            </div>
          </Col>
        </Row>

        <Card
          className="border-0 shadow-sm"
          style={{
            borderRadius: "14px",
          }}
        >
          <Card.Body className="p-4">
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Row>
                <Col md={6} className="mb-4">
                  <Form.Label className="fw-semibold">
                    Weight Unit Name <span className="text-danger">*</span>
                  </Form.Label>

                  <Form.Control
                    type="text"
                    name="brand_name"
                    placeholder="Enter weight unit name"
                    value={brand_name}
                    required
                    onChange={(e) => setBrandName(e.target.value)}
                  />

                  <Form.Control.Feedback type="invalid">
                    Brand name is required.
                  </Form.Control.Feedback>
                </Col>

                <Col md={6} className="mb-4">
                  <Form.Label className="fw-semibold">
                    Slug <span className="text-danger">*</span>
                  </Form.Label>

                  <Form.Control
                    type="text"
                    name="brand_slug"
                    placeholder="Enter slug"
                    value={brand_slug}
                    required
                    onChange={(e) => setBrandSlug(e.target.value)}
                  />

                  <Form.Control.Feedback type="invalid">
                    Slug is required.
                  </Form.Control.Feedback>
                </Col>

                <Col md={12} className="mb-4">
                  <div
                    className="p-3 border rounded-3"
                    style={{
                      backgroundColor: "#f8f9fa",
                    }}
                  >
                    <Form.Check
                      type="switch"
                      id="status-switch"
                      label={status ? "Active" : "Inactive"}
                      checked={status}
                      onChange={handleStatusChange}
                      style={{
                        fontWeight: 600,
                      }}
                    />
                  </div>
                </Col>

                <Col md={12}>
                  <div className="d-flex gap-2 flex-wrap">
                    <Button
                      type="submit"
                      disabled={loading}
                      style={{
                        backgroundColor: "#14468C",
                        border: "none",
                        minWidth: "180px",
                        height: "45px",
                        borderRadius: "10px",
                        fontWeight: 600,
                      }}
                    >
                      {loading ? (
                        <>
                          <Spinner
                            animation="border"
                            size="sm"
                            className="me-2"
                          />
                          Saving...
                        </>
                      ) : (
                        <>
                          <FaSave className="me-2" />
                          Update Brand
                        </>
                      )}
                    </Button>
                  </div>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default EditBrand;
