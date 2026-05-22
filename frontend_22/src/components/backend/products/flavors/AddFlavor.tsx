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

import { createFlavor } from "../../../../services/flavorService";
import usePageTitle from "../../../../hooks/usePageTitle";

function AddFlavor() {
  usePageTitle("Add Flavor");
  const navigate = useNavigate();
  // STATES
  const [flavor_name, setFlavorName] = useState<string>("");
  const [flavor_slug, setFlavorSlug] = useState<string>("");
  const [status, setStatus] = useState<boolean>(true);

  const [loading, setLoading] = useState<boolean>(false);

  const [validated, setValidated] = useState<boolean>(false);

  // ======================================================
  // AUTO GENERATE SHORT UNIT
  // ======================================================

  useEffect(() => {
    if (!flavor_name) {
      setFlavorSlug("");
      return;
    }
    const generated = flavor_name
      .toLowerCase()
      .trim()
      .replace(/[\s\W-]+/g, "-")
      .replace(/^-+|-+$/g, "");
    setFlavorSlug(generated);
  }, [flavor_name]);

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
      await createFlavor({
        flavor_name,
        flavor_slug,
        status,
      });

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Flavor added successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate(
        "/admin/manage/products/attribute/flavors?success=Flavor added successfully",
      );
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error?.response?.data?.message || "Error creating flavor",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFlavorName("");
    setFlavorSlug("");
    setStatus(true);
    setValidated(false);
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
                  Add Flavor
                </h4>
              </div>

              <Link to="/admin/manage/products/attribute/flavors">
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
            Create new product flavor
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
                    name="flavor_name"
                    placeholder="Enter flavor name"
                    value={flavor_name}
                    required
                    onChange={(e) => setFlavorName(e.target.value)}
                  />

                  <Form.Control.Feedback type="invalid">
                    Flavor name is required.
                  </Form.Control.Feedback>
                </Col>

                <Col md={6} className="mb-4">
                  <Form.Label className="fw-semibold">
                    Slug <span className="text-danger">*</span>
                  </Form.Label>

                  <Form.Control
                    type="text"
                    name="flavor_slug"
                    placeholder="Enter flavor slug"
                    value={flavor_slug}
                    required
                    onChange={(e) => setFlavorSlug(e.target.value)}
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
                          Add Flavor
                        </>
                      )}
                    </Button>

                    <Button
                      type="button"
                      variant="light"
                      className="border"
                      onClick={handleReset}
                      style={{
                        minWidth: "120px",
                        height: "45px",
                        borderRadius: "10px",
                        fontWeight: 600,
                      }}
                    >
                      Reset
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

export default AddFlavor;
