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
  getPackagingById,
  updatePackaging,
} from "../../../../services/PackagingService";
import usePageTitle from "../../../../hooks/usePageTitle";

function EditPackging() {
  usePageTitle("Edit Packaging");
  const { id } = useParams();
  const navigate = useNavigate();

  const [packaging_name, setPackagingName] = useState<string>("");
  const [packaging_slug, setPackagingSlug] = useState<string>("");

  const [status, setStatus] = useState<boolean>(true);

  const [loading, setLoading] = useState<boolean>(false);
  const [validated, setValidated] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getPackagingById(Number(id));

        const banner = response.data.data;

        setPackagingName(banner.packaging_name || "");
        setPackagingSlug(banner.packaging_slug || "");
        setStatus(banner.status !== undefined ? banner.status : true);
      } catch (error: any) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text:
            error?.response?.data?.message ||
            "Failed to fetch packaging details",
        });

        navigate("/admin/manage/products/attribute/packaging-types");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id, navigate]);

  useEffect(() => {
    if (!packaging_name) return;

    const generatedSlug = packaging_name
      .toLowerCase()
      .trim()
      .replace(/^-+|-+$/g, "");

    setPackagingSlug(generatedSlug);
  }, [packaging_name]);

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

      await updatePackaging(Number(id), {
        packaging_name,
        packaging_slug,
        status,
      });
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Packaging updated successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate(
        "/admin/manage/products/attribute/packaging-types?success=Packaging updated successfully",
      );
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error?.response?.data?.message || "Error updating packaging",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setPackagingName("");
    setPackagingSlug("");
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
                  Edit Packaging
                </h4>
              </div>

              <Link to="/admin/manage/products/attribute/packaging-types">
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
            Update product packaging details
          </p>
          <Card.Body className="p-4">
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Row>
                <Col md={6} className="mb-4">
                  <Form.Label className="fw-semibold">
                    Packaging Name <span className="text-danger">*</span>
                  </Form.Label>

                  <Form.Control
                    type="text"
                    name="packaging_name"
                    placeholder="Enter packaging name"
                    value={packaging_name}
                    required
                    onChange={(e) => setPackagingName(e.target.value)}
                  />

                  <Form.Control.Feedback type="invalid">
                    Packaging name is required.
                  </Form.Control.Feedback>
                </Col>

                <Col md={6} className="mb-4">
                  <Form.Label className="fw-semibold">
                    Slug <span className="text-danger">*</span>
                  </Form.Label>

                  <Form.Control
                    type="text"
                    name="packaging_slug"
                    placeholder="Enter packaging slug"
                    value={packaging_slug}
                    required
                    onChange={(e) => setPackagingSlug(e.target.value)}
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
                          Update Packaging
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

export default EditPackging;
