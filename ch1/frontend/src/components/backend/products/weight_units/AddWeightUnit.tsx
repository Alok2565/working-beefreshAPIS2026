// // import React from "react";

// // function AddWeightUnit() {
// //   return (
// //     <div>
// //       <h2>Add weight Unit</h2>
// //     </div>
// //   );
// // }

// // export default AddWeightUnit;

// import React from "react";
// import { useEffect, useState } from "react";
// import {
//   Button,
//   Card,
//   Col,
//   Container,
//   Form,
//   Row,
//   Table,
//   Badge,
// } from "react-bootstrap";
// import API from "../../../../api/axios";
// import { FaPlus, FaTrash, FaEdit, FaLongArrowAltLeft } from "react-icons/fa";
// import { Link, useNavigate } from "react-router-dom";
// import usePageTitle from "../../../../hooks/usePageTitle";

// function AddWeightUnit() {
//   usePageTitle("Add Weight Unit");
//   const navigate = useNavigate();
//   return (
//     <>
//       <div className="page-content py-2">
//         <Container fluid>
//           {/* HEADER */}
//           <Row>
//             <Col>
//               <div className="d-flex justify-content-between align-items-center mb-3">
//                 <h4 style={{ fontWeight: 600, color: "#14468C" }}>
//                   Add Weight Unit
//                 </h4>

//                 <Button
//                   style={{ backgroundColor: "#14468C", border: "none" }}
//                   onClick={() =>
//                     navigate("/admin/manage/products/weight-units")
//                   }
//                 >
//                   <FaLongArrowAltLeft /> Back
//                 </Button>
//               </div>
//             </Col>
//           </Row>
//         </Container>
//       </div>
//     </>
//   );
// }

// export default AddWeightUnit;

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

import { createWeightUnit } from "../../../../services/weightUnitService";

function AddWeightUnit() {
  const navigate = useNavigate();

  // ======================================================
  // STATES
  // ======================================================

  const [unit_name, setUnitName] = useState<string>("");

  const [short_name, setShortName] = useState<string>("");

  const [status, setStatus] = useState<boolean>(true);

  const [loading, setLoading] = useState<boolean>(false);

  const [validated, setValidated] = useState<boolean>(false);

  // ======================================================
  // AUTO GENERATE SHORT UNIT
  // ======================================================

  useEffect(() => {
    if (!unit_name) {
      setShortName("");
      return;
    }

    const generated = unit_name
      .toLowerCase()
      .trim()
      .replace(/^-+|-+$/g, "");
    setShortName(generated);
  }, [unit_name]);

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
      await createWeightUnit({
        unit_name,
        short_name,
        status,
      });

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Weight unit added successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate(
        "/admin/manage/products/weight-units?success=Weight unit added successfully",
      );
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error?.response?.data?.message || "Error creating weight unit",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setUnitName("");
    setShortName("");
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
                  Add Weight Unit
                </h4>

                <p className="text-muted mb-0">
                  Create new product weight unit
                </p>
              </div>

              <Link to="/admin/manage/products/weight-units">
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
                    value={unit_name}
                    required
                    onChange={(e) => setUnitName(e.target.value)}
                    style={{
                      height: "48px",
                      borderRadius: "10px",
                    }}
                  />

                  <Form.Control.Feedback type="invalid">
                    Weight unit name is required.
                  </Form.Control.Feedback>

                  <small className="text-muted">
                    Example: Kilogram, Gram, Liter
                  </small>
                </Col>

                <Col md={6} className="mb-4">
                  <Form.Label className="fw-semibold">
                    Short Name <span className="text-danger">*</span>
                  </Form.Label>

                  <Form.Control
                    type="text"
                    name="short_name"
                    placeholder="Enter short name"
                    value={short_name}
                    required
                    onChange={(e) => setShortName(e.target.value)}
                    style={{
                      height: "48px",
                      borderRadius: "10px",
                    }}
                  />

                  <Form.Control.Feedback type="invalid">
                    Short name is required.
                  </Form.Control.Feedback>

                  <small className="text-muted">Example: KG, GM, LTR</small>
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
                          Save Weight Unit
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

export default AddWeightUnit;
