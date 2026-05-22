// import React from "react";

// function EditPurity() {
//   return (
//     <div>
//       <h2>Edit Purity</h2>
//     </div>
//   );
// }

// export default EditPurity;

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
  getPurityById,
  updatePurity,
} from "../../../../services/PurityService";
import usePageTitle from "../../../../hooks/usePageTitle";

function EditPurity() {
  usePageTitle("Edit Purity");
  const { id } = useParams();
  const navigate = useNavigate();

  const [purity_name, setPurityName] = useState<string>("");
  const [purity_slug, setPuritySlug] = useState<string>("");

  const [status, setStatus] = useState<boolean>(true);

  const [loading, setLoading] = useState<boolean>(false);
  const [validated, setValidated] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getPurityById(Number(id));

        const banner = response.data.data;

        setPurityName(banner.purity_name || "");
        setPuritySlug(banner.purity_slug || "");
        setStatus(banner.status !== undefined ? banner.status : true);
      } catch (error: any) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text:
            error?.response?.data?.message || "Failed to fetch Purity details",
        });

        navigate("/admin/manage/products/attribute/purities");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id, navigate]);

  useEffect(() => {
    if (!purity_name) {
      setPuritySlug("");
      return;
    }
    const generated = purity_name
      .toLowerCase()
      .trim()
      .replace(/[\s\W-]+/g, "-")
      .replace(/^-+|-+$/g, "");
    setPuritySlug(generated);
  }, [purity_name]);

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

      await updatePurity(Number(id), {
        purity_name,
        purity_slug,
        status,
      });
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Purity updated successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate(
        "/admin/manage/products/attribute/purities?success=Purity updated successfully",
      );
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error?.response?.data?.message || "Error updating purity",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setPurityName("");
    setPuritySlug("");
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
                  Edit Purity
                </h4>
              </div>

              <Link to="/admin/manage/products/attribute/purities">
                <Button variant="light" className="shadow-sm border">
                  <FaArrowLeft className="me-2" />
                  Back
                </Button>
              </Link>
            </div>
          </Col>
        </Row>

        <Card>
          <p className="mb-0 text-dark fw-semibold p-3 border-bottom">
            Update product purity details
          </p>
          <Card.Body className="p-4">
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Row>
                <Col md={6} className="mb-4">
                  <Form.Label className="fw-semibold">
                    Purity Name <span className="text-danger">*</span>
                  </Form.Label>

                  <Form.Control
                    type="text"
                    name="purity_name"
                    placeholder="Enter purity name"
                    value={purity_name}
                    required
                    onChange={(e) => setPurityName(e.target.value)}
                  />

                  <Form.Control.Feedback type="invalid">
                    Purity name is required.
                  </Form.Control.Feedback>
                </Col>

                <Col md={6} className="mb-4">
                  <Form.Label className="fw-semibold">
                    Slug <span className="text-danger">*</span>
                  </Form.Label>

                  <Form.Control
                    type="text"
                    name="purity_slug"
                    placeholder="Enter purity slug"
                    value={purity_slug}
                    required
                    onChange={(e) => setPuritySlug(e.target.value)}
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
                          Update purity
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

export default EditPurity;
