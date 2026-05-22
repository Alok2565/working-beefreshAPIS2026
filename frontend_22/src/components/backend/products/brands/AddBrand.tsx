// import React from "react";

// function AddBrand() {
//   return (
//     <div>
//       <h2>Add Brands</h2>
//     </div>
//   );
// }

// export default AddBrand;

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
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { createBrand } from "../../../../services/brandService";
import usePageTitle from "../../../../hooks/usePageTitle";

function AddBrand() {
  usePageTitle("Add Brand");
  const navigate = useNavigate();
  // STATES
  const [brand_name, setBrandName] = useState<string>("");
  const [brand_slug, setBrandSlug] = useState<string>("");
  const [status, setStatus] = useState<boolean>(true);

  const [loading, setLoading] = useState<boolean>(false);

  const [validated, setValidated] = useState<boolean>(false);

  // ======================================================
  // AUTO GENERATE SHORT UNIT
  // ======================================================

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
      await createBrand({
        brand_name,
        brand_slug,
        status,
      });

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Brand added successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/admin/manage/brands?success=Brand added successfully");
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error?.response?.data?.message || "Error creating Brand",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-content">
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
                  Add Brand
                </h4>
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

        <Card>
          <p className="text-dark mb-0 fw-semibold p-3 border-bottom">
            Create new Brand
          </p>
          <Card.Body className="p-4">
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Row>
                <Col md={6} className="mb-4">
                  <Form.Label className="fw-semibold">
                    Flavor Name <span className="text-danger">*</span>
                  </Form.Label>

                  <Form.Control
                    type="text"
                    name="brand_name"
                    placeholder="Enter name"
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
                    name="flavor_slug"
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
                  <Form.Group>
                    <Form.Check
                      type="switch"
                      id="status-switch"
                      label="Active Status"
                      checked={status}
                      onChange={handleStatusChange}
                    />
                  </Form.Group>
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
                          Add Brand
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

export default AddBrand;
