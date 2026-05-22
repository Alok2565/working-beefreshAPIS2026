

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
  getProductAttributeById,
  updateProductAttribute,
} from "../../../../services/attributeService";
import usePageTitle from "../../../../hooks/usePageTitle";

function EditProductAttribute() {
  usePageTitle("Edit Product Attribute");
  const navigate = useNavigate();
  const { id } = useParams();
  // STATES
  const [attribute_name, setAttributeName] = useState<string>("");
  const [attribute_slug, setAttributeSlug] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [sort_order, setSortOrder] = useState<number>(0);
  const [status, setStatus] = useState<boolean>(true);

  const [loading, setLoading] = useState<boolean>(false);
  const [pageLoading, setPageLoading] = useState<boolean>(true);
  const [validated, setValidated] = useState<boolean>(false);

  // FETCH DATA
  const fetchAttribute = async () => {
    try {
      setPageLoading(true);
      const response = await getProductAttributeById(Number(id));
      const data = response.data.data;
      setAttributeName(data.attribute_name || "");
      setAttributeSlug(data.attribute_slug || "");
      setDescription(data.description || "");
      setSortOrder(data.sort_order || 0);
      setStatus(data.status);
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error?.response?.data?.message || "Failed to fetch product attribute",
      });
      navigate("/admin/manage/products/attributes");
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchAttribute();
    }
  }, [id]);

  // ======================================================
  // AUTO GENERATE SLUG
  // ======================================================

  useEffect(() => {
    if (!attribute_name) {
      setAttributeSlug("");
      return;
    }

    const generatedSlug = attribute_name
      .toLowerCase()
      .trim()
      .replace(/[\s\W-]+/g, "-")
      .replace(/^-+|-+$/g, "");

    setAttributeSlug(generatedSlug);
  }, [attribute_name]);

  // STATUS CHANGE

  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(e.target.checked);
  };

  // SUBMIT

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

      await updateProductAttribute(Number(id), {
        attribute_name,
        attribute_slug,
        description,
        sort_order,
        status,
      });

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Product attribute updated successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate(
        "/admin/manage/products/attributes?success=Product attribute updated successfully",
      );
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error?.response?.data?.message ||
          "Failed to update product attribute",
      });
    } finally {
      setLoading(false);
    }
  };

  // ======================================================
  // RESET
  // ======================================================

  // const handleReset = () => {
  //   fetchAttribute();

  //   setValidated(false);
  // };

  // ======================================================
  // LOADING
  // ======================================================

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
        {/* HEADER */}
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
                  Edit Product Attribute
                </h4>
              </div>

              <Link to="/admin/manage/products/attributes">
                <Button variant="light" className="shadow-sm border">
                  <FaArrowLeft className="me-2" />
                  Back
                </Button>
              </Link>
            </div>
          </Col>
        </Row>

        {/* FORM CARD */}

        <Card>
           <p className="text-dark mb-0 fw-semibold p-3 border-bottom">
            Update product attribute details
          </p>
          <Card.Body>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Row>
                 <Col md={6} className="mb-4">
                 <Form.Label className="fw-semibold">
                    Attribute Name <span className="text-danger">*</span>
                  </Form.Label>
                   <Form.Control
                    type="text"
                    placeholder="Enter attribute name"
                    value={attribute_name}
                    required
                    onChange={(e) => setAttributeName(e.target.value)}
                    style={{
                      height: "48px",
                      borderRadius: "10px",
                    }}
                  />
                 <Form.Control.Feedback type="invalid">
                    Attribute name is required.
                  </Form.Control.Feedback>
                </Col>

                {/* ATTRIBUTE SLUG */}

                <Col md={6} className="mb-4">
                  <Form.Label className="fw-semibold">
                    Attribute Slug <span className="text-danger">*</span>
                  </Form.Label>

                  <Form.Control
                    type="text"
                    placeholder="Enter attribute slug"
                    value={attribute_slug}
                    required
                    onChange={(e) => setAttributeSlug(e.target.value)}
                    style={{
                      height: "48px",
                      borderRadius: "10px",
                    }}
                  />

                  <Form.Control.Feedback type="invalid">
                    Attribute slug is required.
                  </Form.Control.Feedback>
                </Col>
                {/* DESCRIPTION */}

                <Col md={12} className="mb-4">
                  <Form.Label className="fw-semibold">Description</Form.Label>

                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Enter attribute description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    style={{
                      borderRadius: "10px",
                    }}
                  />
                </Col>

                {/* SORT ORDER */}

                <Col md={6} className="mb-4">
                  <Form.Label className="fw-semibold">Sort Order</Form.Label>

                  <Form.Control
                    type="number"
                    min={0}
                    placeholder="Enter sort order"
                    value={sort_order}
                    onChange={(e) => setSortOrder(Number(e.target.value))}
                    style={{
                      height: "48px",
                      borderRadius: "10px",
                    }}
                  />
                </Col>

                {/* STATUS */}

                <Col md={6} className="mb-4">
                  <Form.Label className="fw-semibold d-block">
                    Status
                  </Form.Label>

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
              </Row>
              <Row>
                <Col xl={12}>
                <div>
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
                          Updating...
                        </>
                      ) : (
                        <>
                          <FaSave className="me-2" />
                          Update Attribute
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

export default EditProductAttribute;
