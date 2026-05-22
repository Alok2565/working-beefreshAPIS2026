// import React from "react";

// function AddPurity() {
//   return (
//     <div>
//       <h2>Add Purity</h2>
//     </div>
//   );
// }

// export default AddPurity;
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

import { createTaxMaster } from "../../../../services/TaxMasterService";
import usePageTitle from "../../../../hooks/usePageTitle";

function AddTaxMaster() {
  usePageTitle("Add Tax");
  const navigate = useNavigate();
  // STATES
  const [tax_name, setTaxName] = useState<string>("");
  const [tax_slug, setTaxSlug] = useState<string>("");
  const [tax_code, setTaxCode] = useState<string>("");
  const [tax_percent, setTaxPercent] = useState<string>("");
  const [tax_type, setTaxTpe] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const [validated, setValidated] = useState<boolean>(false);

  useEffect(() => {
    if (!tax_name) {
      setTaxSlug("");
      return;
    }

    const generated = tax_name
       .toLowerCase()
      .trim()
      .replace(/[\s\W-]+/g, "-")
      .replace(/^-+|-+$/g, "");
    setTaxSlug(generated);
  }, [tax_name]);

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
      await createTaxMaster({
        tax_name,
        tax_slug,
        tax_code,
        tax_percent,
        tax_type,
      });

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Tax added successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/admin/manage/products/taxes?success=Tax added successfully");
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error?.response?.data?.message || "Error creating Tax",
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
                  Add Tax
                </h4>
              </div>

              <Link to="/admin/manage/products/taxes">
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
            Create new Tax
          </p>
          <Card.Body className="p-4">
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Label>Tax Name</Form.Label>

                  <Form.Control
                    type="text"
                    name="tax_name"
                    value={tax_name}
                    onChange={(e) => setTaxName(e.target.value)}
                    required
                  />
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Label>Tax Slug</Form.Label>
                  <Form.Control
                    type="text"
                    name="tax_slug"
                    value={tax_slug}
                    onChange={(e) => setTaxSlug(e.target.value)}
                    required
                  />
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Label>Tax Code</Form.Label>

                  <Form.Control
                    type="text"
                    name="tax_code"
                    value={tax_code}
                    onChange={(e) => setTaxCode(e.target.value)}
                    required
                  />
                </Col>

                <Col md={6} className="mb-3">
                  <Form.Label>Tax Percent</Form.Label>

                  <Form.Control
                    type="number"
                    step="0.01"
                    name="tax_percent"
                    value={tax_percent}
                    onChange={(e) => setTaxPercent(e.target.value)}
                    required
                  />
                </Col>

                <Col md={6} className="mb-3">
                  <Form.Label>Tax Type</Form.Label>

                  <Form.Select
                    name="tax_type"
                    value={tax_type}
                    onChange={(e) => setTaxTpe(e.target.value)}
                  >
                    <option value="GST">GST</option>
                    <option value="CGST">CGST</option>
                    <option value="SGST">SGST</option>
                    <option value="IGST">IGST</option>
                  </Form.Select>
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
                          Add Tax
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

export default AddTaxMaster;
