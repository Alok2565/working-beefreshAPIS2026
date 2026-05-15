// import React from "react";

// function AddAttributeValue() {
//   return (
//     <div>
//       <h2>Add Attribute Value</h2>
//     </div>
//   );
// }

// export default AddAttributeValue;
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

import { createAttributeValue } from "../../../../services/attributeValueService";

import { getProductAttributes } from "../../../../services/attributeService";

import { getWeightUnits } from "../../../../services/weightUnitService";

import { getFlavors } from "../../../../services/flavorService";

import { getPackagings } from "../../../../services/PackagingService";

import { getPurities } from "../../../../services/PurityService";
function AddAttributeValue() {
  const navigate = useNavigate();

  // ======================================================
  // STATES
  // ======================================================

  const [attributes, setAttributes] = useState<any[]>([]);

  const [weightUnits, setWeightUnits] = useState<any[]>([]);
  const [flavors, setFlavors] = useState<any[]>([]);

  const [packagings, setPackagings] = useState<any[]>([]);

  const [purities, setPurities] = useState<any[]>([]);
  const [dynamicValues, setDynamicValues] = useState<any[]>([]);

  const [attribute_id, setAttributeId] = useState<string>("");

  const [selectedAttribute, setSelectedAttribute] = useState<any>(null);

  const [value_name, setValueName] = useState<string>("");

  const [value_slug, setValueSlug] = useState<string>("");

  const [value_code, setValueCode] = useState<string>("");

  const [description, setDescription] = useState<string>("");

  const [sort_order, setSortOrder] = useState<number>(0);

  const [status, setStatus] = useState<boolean>(true);

  const [loading, setLoading] = useState<boolean>(false);

  const [validated, setValidated] = useState<boolean>(false);

  // ======================================================
  // FETCH ATTRIBUTES
  // ======================================================

  const fetchAttributes = async () => {
    try {
      const response = await getProductAttributes();

      setAttributes(response?.data?.data || []);
    } catch (error) {
      console.log("ATTRIBUTE FETCH ERROR:", error);
    }
  };

  useEffect(() => {
    fetchAttributes();
  }, []);

  // ======================================================
  // FETCH WEIGHT UNITS
  // ======================================================

  const fetchWeightUnits = async () => {
    try {
      const response = await getWeightUnits();

      setWeightUnits(response?.data?.data || []);
    } catch (error) {
      console.log("WEIGHT UNIT FETCH ERROR:", error);
    }
  };

  useEffect(() => {
    fetchWeightUnits();
  }, []);

  // ======================================================
  // FETCH FLAVORS
  // ======================================================

  const fetchFlavors = async () => {
    try {
      const response = await getFlavors();

      setFlavors(response?.data?.data || []);
    } catch (error) {
      console.log("FLAVOR FETCH ERROR:", error);
    }
  };

  useEffect(() => {
    fetchFlavors();
  }, []);

  // ======================================================
  // FETCH PACKAGINGS
  // ======================================================

  const fetchPackagings = async () => {
    try {
      const response = await getPackagings();

      setPackagings(response?.data?.data || []);
    } catch (error) {
      console.log("PACKAGING FETCH ERROR:", error);
    }
  };

  useEffect(() => {
    fetchPackagings();
  }, []);

  // ======================================================
  // FETCH PURITIES
  // ======================================================

  const fetchPurities = async () => {
    try {
      const response = await getPurities();

      setPurities(response?.data?.data || []);
    } catch (error) {
      console.log("PURITY FETCH ERROR:", error);
    }
  };

  useEffect(() => {
    fetchPurities();
  }, []);
  // ======================================================
  // ATTRIBUTE CHANGE
  // ======================================================

  // const handleAttributeChange = async (
  //   e: React.ChangeEvent<HTMLSelectElement>,
  // ) => {
  //   const selectedId = e.target.value;

  //   setAttributeId(selectedId);

  //   const selectedAttribute = attributes.find(
  //     (item: any) => item.id.toString() === selectedId,
  //   );

  //   if (!selectedAttribute) {
  //     setDynamicValues([]);
  //     return;
  //   }

  //   // =========================
  //   // WEIGHT UNIT
  //   // =========================

  //   if (selectedAttribute.attribute_name.toLowerCase().includes("weight")) {
  //     setDynamicValues(weightUnits);
  //   }

  //   // =========================
  //   // FLAVOR
  //   // =========================
  //   else if (
  //     selectedAttribute.attribute_name.toLowerCase().includes("flavor")
  //   ) {
  //     setDynamicValues([
  //       { id: 1, value_name: "Natural" },
  //       { id: 2, value_name: "Raw" },
  //       { id: 3, value_name: "Wild" },
  //     ]);
  //   }

  //   // =========================
  //   // PACKAGING
  //   // =========================
  //   else if (
  //     selectedAttribute.attribute_name.toLowerCase().includes("packaging")
  //   ) {
  //     setDynamicValues([
  //       { id: 1, value_name: "Glass Jar" },
  //       { id: 2, value_name: "Bottle" },
  //       { id: 3, value_name: "Bucket" },
  //     ]);
  //   } else if (
  //     selectedAttribute.attribute_name.toLowerCase().includes("purity")
  //   ) {
  //     setDynamicValues([
  //       { id: 1, value_name: "Natural" },
  //       { id: 2, value_name: "Row" },
  //       { id: 3, value_name: "Bucket" },
  //     ]);
  //   } else {
  //     setDynamicValues([]);
  //   }
  // };
  const handleAttributeChange = async (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const selectedId = e.target.value;

    setAttributeId(selectedId);

    const selectedAttribute = attributes.find(
      (item: any) => item.id.toString() === selectedId,
    );

    if (!selectedAttribute) {
      setDynamicValues([]);
      return;
    }

    const attributeName = selectedAttribute.attribute_name.toLowerCase();

    // ======================================================
    // WEIGHT UNIT
    // ======================================================

    if (attributeName.includes("weight")) {
      setDynamicValues(weightUnits);
    }

    // ======================================================
    // FLAVOR
    // ======================================================
    else if (attributeName.includes("flavor")) {
      setDynamicValues(flavors);
    }

    // ======================================================
    // PACKAGING
    // ======================================================
    else if (attributeName.includes("packaging")) {
      setDynamicValues(packagings);
    }

    // ======================================================
    // PURITY
    // ======================================================
    else if (attributeName.includes("purity")) {
      setDynamicValues(purities);
    }

    // ======================================================
    // DEFAULT
    // ======================================================
    else {
      setDynamicValues([]);
    }
  };
  // ======================================================
  // AUTO GENERATE SLUG + CODE
  // ======================================================

  useEffect(() => {
    if (!value_name) {
      setValueSlug("");
      setValueCode("");
      return;
    }

    const generatedSlug = value_name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

    setValueSlug(generatedSlug);

    const generatedCode = value_name.toUpperCase().replace(/\s+/g, "_");

    setValueCode(generatedCode);
  }, [value_name]);

  // ======================================================
  // STATUS CHANGE
  // ======================================================

  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(e.target.checked);
  };

  // ======================================================
  // SUBMIT
  // ======================================================

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

      await createAttributeValue({
        attribute_id,
        value_name,
        value_slug,
        value_code,
        description,
        sort_order,
        status,
      });

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Attribute value created successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate(
        "/admin/manage/products/attribute/values?success=Attribute value created successfully",
      );
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error?.response?.data?.message || "Failed to create attribute value",
      });
    } finally {
      setLoading(false);
    }
  };

  // ======================================================
  // RESET
  // ======================================================

  const handleReset = () => {
    // setAttributeId("");

    // setSelectedAttribute(null);

    setDynamicValues([]);

    setValueName("");

    setValueSlug("");

    setValueCode("");

    setDescription("");

    setSortOrder(0);

    setStatus(true);

    setValidated(false);
  };
  return (
    <>
      <div className="page-content py-2">
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
                    Add Attribute Value
                  </h4>
                </div>

                <Link to="/admin/manage/products/attribute-values">
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
            <p className="text-dark mb-0 fw-semibold p-3">
              Create new product attribute value
            </p>
            <Card.Body>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row>
                  {/* ATTRIBUTE */}

                  <Col md={4} className="mb-4">
                    <Form.Label className="fw-semibold">
                      Attribute Name <span className="text-danger">*</span>
                    </Form.Label>

                    <Form.Select
                      required
                      value={attribute_id}
                      onChange={handleAttributeChange}
                      style={{
                        height: "48px",
                        borderRadius: "10px",
                      }}
                    >
                      <option value="">-- Select Attribute --</option>

                      {attributes.map((item: any) => (
                        <option key={item.id} value={item.id}>
                          {item.attribute_name}
                        </option>
                      ))}
                    </Form.Select>

                    <Form.Control.Feedback type="invalid">
                      Please select attribute.
                    </Form.Control.Feedback>
                  </Col>

                  {/* DYNAMIC VALUE DROPDOWN */}

                  <Col md={4} className="mb-4">
                    <Form.Label className="fw-semibold">
                      Code Code <span className="text-danger">*</span>
                    </Form.Label>

                    <Form.Select
                      required
                      value={value_code}
                      onChange={(e) => setValueCode(e.target.value)}
                      style={{
                        height: "48px",
                        borderRadius: "10px",
                      }}
                    >
                      <option value="">-- Select Code --</option>

                      {/* {dynamicValues.map((item: any) => (
                        <option
                          key={item.id}
                          value={item.value_name || item.unit_name}
                        >
                          {item.value_name || item.unit_name}
                        </option>
                      ))} */}
                      {dynamicValues.map((item: any) => (
                        <option
                          key={item.id}
                          value={
                            item.value_name ||
                            item.unit_name ||
                            item.flavor_name ||
                            item.packaging_name ||
                            item.purity_name
                          }
                        >
                          {item.value_name ||
                            item.unit_name ||
                            item.flavor_name ||
                            item.packaging_name ||
                            item.purity_name}
                        </option>
                      ))}
                    </Form.Select>

                    <Form.Control.Feedback type="invalid">
                      Please select code value.
                    </Form.Control.Feedback>
                    <small className="text-muted">
                      Example: 1KG, RAW, NATURAL
                    </small>
                  </Col>

                  {/* VALUE NAME */}

                  <Col md={4} className="mb-4">
                    <Form.Label className="fw-semibold">
                      Value Name <span className="text-danger">*</span>
                    </Form.Label>

                    <Form.Control
                      type="text"
                      placeholder="Enter value name"
                      value={value_name}
                      required
                      onChange={(e) => setValueName(e.target.value)}
                      style={{
                        height: "48px",
                        borderRadius: "10px",
                      }}
                    />

                    <Form.Control.Feedback type="invalid">
                      Value name is required.
                    </Form.Control.Feedback>
                  </Col>

                  {/* VALUE SLUG */}

                  <Col md={4} className="mb-4">
                    <Form.Label className="fw-semibold">
                      Value Slug <span className="text-danger">*</span>
                    </Form.Label>

                    <Form.Control
                      type="text"
                      placeholder="Enter value slug"
                      value={value_slug}
                      required
                      onChange={(e) => setValueSlug(e.target.value)}
                      style={{
                        height: "48px",
                        borderRadius: "10px",
                      }}
                    />

                    <small className="text-muted">
                      Auto generated from value name
                    </small>
                  </Col>
                  {/* SORT ORDER */}

                  <Col md={4} className="mb-4">
                    <Form.Label className="fw-semibold">Sort Order</Form.Label>

                    <Form.Control
                      type="number"
                      placeholder="Enter sort order"
                      value={sort_order}
                      onChange={(e) => setSortOrder(Number(e.target.value))}
                      style={{
                        height: "48px",
                        borderRadius: "10px",
                      }}
                    />
                  </Col>

                  {/* DESCRIPTION */}

                  <Col md={8} className="mb-4">
                    <Form.Label className="fw-semibold">Description</Form.Label>

                    <Form.Control
                      as="textarea"
                      rows={4}
                      placeholder="Enter description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </Col>

                  {/* STATUS */}

                  <Col md={4} className="mb-4">
                    <div className="p-3 border rounded-3">
                      <Form.Check
                        type="switch"
                        id="status-switch"
                        label={status ? "Active" : "Inactive"}
                        checked={status}
                        onChange={handleStatusChange}
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  {/* BUTTONS */}
                  <Col md={12} className="d-flex gap-2">
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
                          Save Attribute Value
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
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </>
  );
}

export default AddAttributeValue;
