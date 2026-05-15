// import React from "react";

// function EditFlavor() {
//   return (
//     <div>
//       <h2>Edit Flavor</h2>
//     </div>
//   );
// }

// export default EditFlavor;

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

import {
  getFlavorById,
  updateFlavor,
} from "../../../../services/flavorService";
import usePageTitle from "../../../../hooks/usePageTitle";

function EditFlavor() {
  usePageTitle("Edit Flavor");
  const { id } = useParams();
  const navigate = useNavigate();

  const [flavor_name, setFlavorName] = useState<string>("");
  const [flavor_slug, setFlavorSlug] = useState<string>("");

  const [status, setStatus] = useState<boolean>(true);

  const [loading, setLoading] = useState<boolean>(false);
  const [validated, setValidated] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getFlavorById(Number(id));

        const banner = response.data.data;

        setFlavorName(banner.flavor_name || "");
        setFlavorSlug(banner.flavor_slug || "");
        setStatus(banner.status !== undefined ? banner.status : true);
      } catch (error: any) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error?.response?.data?.message || "Failed to fetch banner",
        });

        navigate("/admin/manage/products/attribute/flavors");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id, navigate]);

  useEffect(() => {
    if (!flavor_name) return;

    const generatedSlug = flavor_name
      .toLowerCase()
      .trim()
      .replace(/^-+|-+$/g, "");

    setFlavorSlug(generatedSlug);
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

      await updateFlavor(Number(id), {
        flavor_name,
        flavor_slug,
        status,
      });
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Flavor updated successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate(
        "/admin/manage/products/attribute/flavors?success=Flavor updated successfully",
      );
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error?.response?.data?.message || "Error updating flavor",
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
                  Edit Flavor
                </h4>

                <p className="text-muted mb-0">Update product flavor details</p>
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
                    name="unit_name"
                    placeholder="Enter weight unit name"
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
                          Update Flavor
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

export default EditFlavor;
