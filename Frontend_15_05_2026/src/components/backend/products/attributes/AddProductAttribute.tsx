// import { useEffect, useState } from "react";

// import {
//   Button,
//   Card,
//   Col,
//   Container,
//   Form,
//   Row,
//   Spinner,
// } from "react-bootstrap";

// import { FaArrowLeft, FaSave } from "react-icons/fa";

// import { Link, useNavigate } from "react-router-dom";

// import Swal from "sweetalert2";

// import { createProductAttribute } from "../../../../services/attributeService";

// function AddProductAttribute() {
//   const navigate = useNavigate();

//   // STATES
//   const [attribute_name, setAttributeName] = useState<string>("");
//   const [attribute_slug, setAttributeSlug] = useState<string>("");

//   const [status, setStatus] = useState<boolean>(true);

//   const [loading, setLoading] = useState<boolean>(false);

//   const [validated, setValidated] = useState<boolean>(false);

//   // AUTO GENERATE SHORT UNIT

//   useEffect(() => {
//     if (!attribute_name) {
//       setAttributeName("");
//       return;
//     }

//     const generated = attribute_name
//       .toLowerCase()
//       .trim()
//       .replace(/[\s\W-]+/g, "-")
//       .replace(/^-+|-+$/g, "");
//     setAttributeSlug(generated);
//   }, [attribute_name]);

//   const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setStatus(e.target.checked);
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const form = e.currentTarget;
//     if (!form.checkValidity()) {
//       e.stopPropagation();
//       setValidated(true);
//       return;
//     }
//     try {
//       setLoading(true);
//       await createProductAttribute({
//         attribute_name,
//         attribute_slug,
//         status,
//       });

//       Swal.fire({
//         icon: "success",
//         title: "Success",
//         text: "Product attribute added successfully",
//         timer: 1500,
//         showConfirmButton: false,
//       });

//       navigate(
//         "/admin/manage/products/attributes?success=Product attribute added successfully",
//       );
//     } catch (error: any) {
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: error?.response?.data?.message || "Error creating weight unit",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleReset = () => {
//     setAttributeName("");
//     setAttributeSlug("");
//     setStatus(true);
//     setValidated(false);
//   };

//   return (
//     <div className="page-content py-3">
//       <Container fluid>
//         <Row className="mb-4">
//           <Col xl={12}>
//             <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
//               <div>
//                 <h4
//                   className="mb-1"
//                   style={{
//                     fontWeight: 700,
//                     color: "#14468C",
//                   }}
//                 >
//                   Add Product Attribute
//                 </h4>
//               </div>

//               <Link to="/admin/manage/products/attributes">
//                 <Button variant="light" className="shadow-sm border">
//                   <FaArrowLeft className="me-2" />
//                   Back
//                 </Button>
//               </Link>
//             </div>
//           </Col>
//         </Row>

//         <Card
//           className="border-0 shadow-sm"
//           style={{
//             borderRadius: "14px",
//           }}
//         >
//           <p className="text-muted mb-0 p-2 text-dark fw-semibold">
//             Create New product attributes
//           </p>
//           <Card.Body className="p-4">
//             <Form noValidate validated={validated} onSubmit={handleSubmit}>
//               <Row>
//                 <Col md={6} className="mb-4">
//                   <Form.Label className="fw-semibold">
//                     Attribute Name <span className="text-danger">*</span>
//                   </Form.Label>

//                   <Form.Control
//                     type="text"
//                     name="attribute_name"
//                     placeholder="Enter product attribute name"
//                     value={attribute_name}
//                     required
//                     onChange={(e) => setAttributeName(e.target.value)}
//                   />
//                 </Col>

//                 <Col md={6} className="mb-4">
//                   <Form.Label className="fw-semibold">
//                     Slug <span className="text-danger">*</span>
//                   </Form.Label>

//                   <Form.Control
//                     type="text"
//                     name="attribute_slug"
//                     placeholder="Enter attribute slug"
//                     value={attribute_slug}
//                     required
//                     onChange={(e) => setAttributeSlug(e.target.value)}
//                   />
//                 </Col>

//                 <Col md={12} className="mb-4">
//                   <div
//                     className="p-3 border rounded-3"
//                     style={{
//                       backgroundColor: "#f8f9fa",
//                     }}
//                   >
//                     <Form.Check
//                       type="switch"
//                       id="status-switch"
//                       label={status ? "Active" : "Inactive"}
//                       checked={status}
//                       onChange={handleStatusChange}
//                       style={{
//                         fontWeight: 600,
//                       }}
//                     />
//                   </div>
//                 </Col>

//                 <Col md={12}>
//                   <div className="d-flex gap-2 flex-wrap">
//                     <Button
//                       type="submit"
//                       disabled={loading}
//                       style={{
//                         backgroundColor: "#14468C",
//                         border: "none",
//                         minWidth: "180px",
//                         height: "45px",
//                         borderRadius: "10px",
//                         fontWeight: 600,
//                       }}
//                     >
//                       {loading ? (
//                         <>
//                           <Spinner
//                             animation="border"
//                             size="sm"
//                             className="me-2"
//                           />
//                           Saving...
//                         </>
//                       ) : (
//                         <>
//                           <FaSave className="me-2" />
//                           Save Attribut
//                         </>
//                       )}
//                     </Button>

//                     <Button
//                       type="button"
//                       variant="light"
//                       className="border"
//                       onClick={handleReset}
//                       style={{
//                         minWidth: "120px",
//                         height: "45px",
//                         borderRadius: "10px",
//                         fontWeight: 600,
//                       }}
//                     >
//                       Reset
//                     </Button>
//                   </div>
//                 </Col>
//               </Row>
//             </Form>
//           </Card.Body>
//         </Card>
//       </Container>
//     </div>
//   );
// }

// export default AddProductAttribute;

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

import { createProductAttribute } from "../../../../services/attributeService";
import usePageTitle from "../../../../hooks/usePageTitle";

function AddProductAttribute() {
  usePageTitle("Add Product Attribute");
  const navigate = useNavigate();

  const [attribute_name, setAttributeName] = useState("");
  const [attribute_slug, setAttributeSlug] = useState("");
  const [description, setDescription] = useState("");
  const [sort_order, setSortOrder] = useState(0);
  const [status, setStatus] = useState(true);

  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (!attribute_name) {
      setAttributeSlug("");
      return;
    }

    const slug = attribute_name
      .toLowerCase()
      .trim()
      .replace(/[\s\W-]+/g, "-")
      .replace(/^-+|-+$/g, "");

    setAttributeSlug(slug);
  }, [attribute_name]);

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

      await createProductAttribute({
        attribute_name,
        attribute_slug,
        description,
        sort_order,
        status,
      });

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Attribute created successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate(
        "/admin/manage/products/attributes?success=Attribute created successfully",
      );
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error?.response?.data?.message || "Failed to create attribute",
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
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h4 className="fw-bold mb-1" style={{ color: "#14468C" }}>
                  Add Product Attribute
                </h4>
              </div>

              <Link to="/admin/manage/products/attributes">
                <Button variant="light" className="border shadow-sm">
                  <FaArrowLeft className="me-2" />
                  Back
                </Button>
              </Link>
            </div>
          </Col>
        </Row>

        <Card>
          <p className="text-dark fw-semibold mb-0 p-3 border-bottom">
            Create product attribute
          </p>
          <Card.Body className="p-4">
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Row>
                <Col md={6} className="mb-4">
                  <Form.Label className="fw-semibold">
                    Attribute Name *
                  </Form.Label>

                  <Form.Control
                    type="text"
                    value={attribute_name}
                    required
                    placeholder="Enter attribute name"
                    onChange={(e) => setAttributeName(e.target.value)}
                    style={{
                      height: "48px",
                      borderRadius: "10px",
                    }}
                  />
                </Col>

                <Col md={6} className="mb-4">
                  <Form.Label className="fw-semibold">
                    Attribute Slug *
                  </Form.Label>

                  <Form.Control
                    type="text"
                    value={attribute_slug}
                    required
                    placeholder="attribute-slug"
                    onChange={(e) => setAttributeSlug(e.target.value)}
                    style={{
                      height: "48px",
                      borderRadius: "10px",
                    }}
                  />
                </Col>

                <Col md={12} className="mb-4">
                  <Form.Label className="fw-semibold">Description</Form.Label>

                  <Form.Control
                    as="textarea"
                    rows={4}
                    value={description}
                    placeholder="Enter description"
                    onChange={(e) => setDescription(e.target.value)}
                    style={{
                      borderRadius: "10px",
                    }}
                  />
                </Col>

                <Col md={6} className="mb-4">
                  <Form.Label className="fw-semibold">Sort Order</Form.Label>

                  <Form.Control
                    type="number"
                    value={sort_order}
                    onChange={(e) => setSortOrder(Number(e.target.value))}
                    style={{
                      height: "48px",
                      borderRadius: "10px",
                    }}
                  />
                </Col>

                <Col md={6} className="mb-4">
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
                      onChange={(e) => setStatus(e.target.checked)}
                      style={{
                        fontWeight: 600,
                      }}
                    />
                  </div>
                </Col>

                <Col md={12}>
                  <Button
                    type="submit"
                    disabled={loading}
                    style={{
                      backgroundColor: "#14468C",
                      border: "none",
                      minWidth: "180px",
                      height: "45px",
                      borderRadius: "10px",
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
                        Add Attribute
                      </>
                    )}
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default AddProductAttribute;
