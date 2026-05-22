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

// import { Link, useNavigate, useParams } from "react-router-dom";

// import Swal from "sweetalert2";

// import {
//   getAttributeValueById,
//   updateAttributeValue,
// } from "../../../../services/attributeValueService";

// import { getProductAttributes } from "../../../../services/attributeService";

// import { getWeightUnits } from "../../../../services/weightUnitService";

// import { getFlavors } from "../../../../services/flavorService";

// import { getPackagings } from "../../../../services/PackagingService";

// import { getPurities } from "../../../../services/PurityService";

// function EditAttributeValue() {
//   const navigate = useNavigate();

//   const { id } = useParams();

//   const [attributes, setAttributes] = useState<any[]>([]);

//   const [weightUnits, setWeightUnits] = useState<any[]>([]);

//   const [flavors, setFlavors] = useState<any[]>([]);

//   const [packagings, setPackagings] = useState<any[]>([]);

//   const [purities, setPurities] = useState<any[]>([]);

//   const [dynamicValues, setDynamicValues] = useState<any[]>([]);

//   const [selectedDynamicId, setSelectedDynamicId] = useState<string>("");

//   const [attribute_id, setAttributeId] = useState<string>("");

//   const [value_name, setValueName] = useState<string>("");

//   const [value_slug, setValueSlug] = useState<string>("");

//   const [value_code, setValueCode] = useState<string>("");

//   const [description, setDescription] = useState<string>("");

//   const [sort_order, setSortOrder] = useState<number>(0);

//   const [status, setStatus] = useState<boolean>(true);

//   const [loading, setLoading] = useState<boolean>(false);

//   const [validated, setValidated] = useState<boolean>(false);

//   // FETCH ATTRIBUTES

//   const fetchAttributes = async () => {
//     try {
//       const response = await getProductAttributes();

//       setAttributes(response?.data?.data || []);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // FETCH WEIGHT UNITS

//   const fetchWeightUnits = async () => {
//     try {
//       const response = await getWeightUnits();

//       setWeightUnits(response?.data?.data || []);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // FETCH FLAVORS

//   const fetchFlavors = async () => {
//     try {
//       const response = await getFlavors();

//       setFlavors(response?.data?.data || []);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // FETCH PACKAGINGS

//   const fetchPackagings = async () => {
//     try {
//       const response = await getPackagings();

//       setPackagings(response?.data?.data || []);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // FETCH PURITIES

//   const fetchPurities = async () => {
//     try {
//       const response = await getPurities();

//       setPurities(response?.data?.data || []);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // FETCH EDIT DATA

//   const fetchEditData = async () => {
//     try {
//       const response = await getAttributeValueById(Number(id));

//       const data = response?.data?.data;

//       setAttributeId(data?.attribute_id?.toString() || "");

//       setValueName(data?.value_name || "");

//       setValueSlug(data?.value_slug || "");

//       setValueCode(data?.value_code || "");

//       setDescription(data?.description || "");

//       setSortOrder(data?.sort_order || 0);

//       setStatus(data?.status ?? true);

//       const selectedAttribute = attributes.find(
//         (item: any) => item.id.toString() === data?.attribute_id?.toString(),
//       );

//       if (selectedAttribute) {
//         const attributeName = selectedAttribute.attribute_name.toLowerCase();

//         let values: any[] = [];

//         if (attributeName.includes("weight")) {
//           values = weightUnits;
//         } else if (attributeName.includes("flavor")) {
//           values = flavors;
//         } else if (attributeName.includes("packaging")) {
//           values = packagings;
//         } else if (attributeName.includes("purity")) {
//           values = purities;
//         }

//         setDynamicValues(values);

//         const matchedItem = values.find(
//           (val: any) =>
//             val.value_code === data?.value_code ||
//             val.unit_code === data?.value_code ||
//             val.flavor_code === data?.value_code ||
//             val.packaging_code === data?.value_code ||
//             val.purity_code === data?.value_code,
//         );

//         if (matchedItem) {
//           setSelectedDynamicId(matchedItem.id.toString());
//         }
//       }
//     } catch (error) {
//       console.log("EDIT FETCH ERROR:", error);
//     }
//   };

//   // INITIAL LOAD

//   useEffect(() => {
//     fetchAttributes();

//     fetchWeightUnits();

//     fetchFlavors();

//     fetchPackagings();

//     fetchPurities();
//   }, []);

//   // LOAD EDIT DATA AFTER DROPDOWNS READY

//   useEffect(() => {
//     if (
//       attributes.length > 0 &&
//       (weightUnits.length > 0 ||
//         flavors.length > 0 ||
//         packagings.length > 0 ||
//         purities.length > 0)
//     ) {
//       fetchEditData();
//     }
//   }, [attributes, weightUnits, flavors, packagings, purities]);

//   // ATTRIBUTE CHANGE

//   const handleAttributeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const selectedId = e.target.value;

//     setAttributeId(selectedId);

//     setSelectedDynamicId("");

//     setValueName("");

//     setValueCode("");

//     setValueSlug("");

//     const selectedAttribute = attributes.find(
//       (item: any) => item.id.toString() === selectedId,
//     );

//     if (!selectedAttribute) {
//       setDynamicValues([]);

//       return;
//     }

//     const attributeName = selectedAttribute.attribute_name.toLowerCase();

//     if (attributeName.includes("weight")) {
//       setDynamicValues(weightUnits);
//     } else if (attributeName.includes("flavor")) {
//       setDynamicValues(flavors);
//     } else if (attributeName.includes("packaging")) {
//       setDynamicValues(packagings);
//     } else if (attributeName.includes("purity")) {
//       setDynamicValues(purities);
//     } else {
//       setDynamicValues([]);
//     }
//   };

//   // CODE VALUE CHANGE

//   const handleCodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const selectedId = e.target.value;

//     setSelectedDynamicId(selectedId);

//     const selectedItem = dynamicValues.find(
//       (item: any) => item.id.toString() === selectedId,
//     );

//     if (!selectedItem) return;

//     const selectedName =
//       selectedItem.value_name ||
//       selectedItem.unit_name ||
//       selectedItem.flavor_name ||
//       selectedItem.packaging_name ||
//       selectedItem.purity_name;

//     const selectedCode =
//       selectedItem.value_code ||
//       selectedItem.unit_code ||
//       selectedItem.flavor_code ||
//       selectedItem.packaging_code ||
//       selectedItem.purity_code;

//     setValueName(selectedName);

//     setValueCode(selectedCode);

//     const generatedSlug = selectedName
//       .toLowerCase()
//       .trim()
//       .replace(/[^a-z0-9\s-]/g, "")
//       .replace(/\s+/g, "-")
//       .replace(/-+/g, "-");

//     setValueSlug(generatedSlug);
//   };

//   // SUBMIT

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

//       await updateAttributeValue(Number(id), {
//         attribute_id,
//         value_name,
//         value_slug,
//         value_code,
//         description,
//         sort_order,
//         status,
//       });

//       Swal.fire({
//         icon: "success",
//         title: "Success",
//         text: "Attribute value updated successfully",
//         timer: 1500,
//         showConfirmButton: false,
//       });

//       navigate("/admin/manage/products/attribute/values");
//     } catch (error: any) {
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text:
//           error?.response?.data?.message || "Failed to update attribute value",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <div className="page-content">
//         <Container fluid>
//           <Row>
//             <Col xl={12} className="p-2">
//               <div className="d-flex justify-content-between align-items-center">
//                 <h4
//                   className="mb-0"
//                   style={{
//                     fontWeight: 700,
//                     color: "#14468C",
//                   }}
//                 >
//                   Edit Attribute Value
//                 </h4>

//                 <Link to="/admin/manage/products/attribute/values">
//                   <Button variant="light" className="shadow-sm border">
//                     <FaArrowLeft className="me-2" />
//                     Back
//                   </Button>
//                 </Link>
//               </div>
//             </Col>
//           </Row>

//           <Card>
//             <Card.Body>
//               <Form noValidate validated={validated} onSubmit={handleSubmit}>
//                 <Row>
//                   {/* ATTRIBUTE */}

//                   <Col md={4} className="mb-4">
//                     <Form.Label className="fw-semibold">
//                       Attribute Name
//                     </Form.Label>

//                     <Form.Select
//                       required
//                       value={attribute_id}
//                       onChange={handleAttributeChange}
//                     >
//                       <option value="">-- Select Attribute --</option>

//                       {attributes.map((item: any) => (
//                         <option key={item.id} value={item.id}>
//                           {item.attribute_name}
//                         </option>
//                       ))}
//                     </Form.Select>
//                   </Col>

//                   {/* CODE VALUE */}

//                   <Col md={4} className="mb-4">
//                     <Form.Group>
//                       <Form.Label className="fw-semibold">
//                         Code Value <span className="text-danger">*</span>
//                       </Form.Label>

//                       <Form.Select
//                         required
//                         value={selectedDynamicId}
//                         onChange={handleCodeChange}
//                       >
//                         <option value="">-- Select Code --</option>

//                         {dynamicValues.map((item: any) => (
//                           <option key={item.id} value={item.id}>
//                             {item.value_name ||
//                               item.unit_name ||
//                               item.flavor_name ||
//                               item.packaging_name ||
//                               item.purity_name}
//                           </option>
//                         ))}
//                       </Form.Select>

//                       <Form.Control.Feedback type="invalid">
//                         Please select code value.
//                       </Form.Control.Feedback>

//                       <small className="text-muted">
//                         Example: 1KG, RAW, NATURAL
//                       </small>
//                     </Form.Group>
//                   </Col>
//                 </Row>

//                 <Row>
//                   <Col md={12} className="d-flex gap-2">
//                     <Button
//                       type="submit"
//                       disabled={loading}
//                       style={{
//                         backgroundColor: "#14468C",
//                         border: "none",
//                       }}
//                     >
//                       {loading ? (
//                         <>
//                           <Spinner
//                             animation="border"
//                             size="sm"
//                             className="me-2"
//                           />
//                           Updating...
//                         </>
//                       ) : (
//                         <>
//                           <FaSave className="me-2" />
//                           Update Attribute Value
//                         </>
//                       )}
//                     </Button>
//                   </Col>
//                 </Row>
//               </Form>
//             </Card.Body>
//           </Card>
//         </Container>
//       </div>
//     </>
//   );
// }

// export default EditAttributeValue;

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
  getAttributeValueById,
  updateAttributeValue,
} from "../../../../services/attributeValueService";

import { getProductAttributes } from "../../../../services/attributeService";

import { getWeightUnits } from "../../../../services/weightUnitService";

import { getFlavors } from "../../../../services/flavorService";

import { getPackagings } from "../../../../services/PackagingService";

import { getPurities } from "../../../../services/PurityService";

function EditAttributeValue() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [attributes, setAttributes] = useState<any[]>([]);

  const [weightUnits, setWeightUnits] = useState<any[]>([]);

  const [flavors, setFlavors] = useState<any[]>([]);

  const [packagings, setPackagings] = useState<any[]>([]);

  const [purities, setPurities] = useState<any[]>([]);

  const [dynamicValues, setDynamicValues] = useState<any[]>([]);

  const [selectedDynamicId, setSelectedDynamicId] = useState<string>("");

  const [attribute_id, setAttributeId] = useState<string>("");

  const [value_name, setValueName] = useState<string>("");

  const [value_slug, setValueSlug] = useState<string>("");

  const [value_code, setValueCode] = useState<string>("");

  const [description, setDescription] = useState<string>("");

  const [sort_order, setSortOrder] = useState<number>(0);

  const [status, setStatus] = useState<boolean>(true);

  const [loading, setLoading] = useState<boolean>(false);

  const [validated, setValidated] = useState<boolean>(false);

  // FETCH ATTRIBUTES
  const fetchAttributes = async () => {
    try {
      const response = await getProductAttributes();

      setAttributes(response?.data?.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  // FETCH WEIGHT UNITS
  const fetchWeightUnits = async () => {
    try {
      const response = await getWeightUnits();

      setWeightUnits(response?.data?.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  // FETCH FLAVORS
  const fetchFlavors = async () => {
    try {
      const response = await getFlavors();

      setFlavors(response?.data?.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  // FETCH PACKAGINGS
  const fetchPackagings = async () => {
    try {
      const response = await getPackagings();

      setPackagings(response?.data?.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  // FETCH PURITIES
  const fetchPurities = async () => {
    try {
      const response = await getPurities();

      setPurities(response?.data?.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  // FETCH EDIT DATA
  const fetchEditData = async () => {
    try {
      const response = await getAttributeValueById(Number(id));

      const data = response?.data?.data;

      console.log("EDIT DATA:", data);

      setAttributeId(data?.attribute_id?.toString() || "");

      setValueName(data?.value_name || "");

      setValueSlug(data?.value_slug || "");

      setValueCode(data?.value_code || "");

      setDescription(data?.description || "");

      setSortOrder(data?.sort_order || 0);

      setStatus(data?.status ?? true);

      const selectedAttribute = attributes.find(
        (item: any) => item.id.toString() === data?.attribute_id?.toString(),
      );

      if (!selectedAttribute) return;

      const attributeName = selectedAttribute.attribute_name.toLowerCase();

      let values: any[] = [];

      if (attributeName.includes("weight")) {
        values = weightUnits;
      } else if (attributeName.includes("flavor")) {
        values = flavors;
      } else if (attributeName.includes("packaging")) {
        values = packagings;
      } else if (attributeName.includes("purity")) {
        values = purities;
      }

      console.log("DYNAMIC VALUES:", values);

      setDynamicValues(values);
    } catch (error) {
      console.log("EDIT FETCH ERROR:", error);
    }
  };

  // INITIAL LOAD
  useEffect(() => {
    fetchAttributes();

    fetchWeightUnits();

    fetchFlavors();

    fetchPackagings();

    fetchPurities();
  }, []);

  // LOAD EDIT DATA AFTER DROPDOWNS
  useEffect(() => {
    if (
      attributes.length > 0 &&
      (weightUnits.length > 0 ||
        flavors.length > 0 ||
        packagings.length > 0 ||
        purities.length > 0)
    ) {
      fetchEditData();
    }
  }, [attributes, weightUnits, flavors, packagings, purities]);

  // ATTRIBUTE CHANGE
  const handleAttributeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;

    setAttributeId(selectedId);

    setSelectedDynamicId("");

    setValueName("");

    setValueCode("");

    setValueSlug("");

    const selectedAttribute = attributes.find(
      (item: any) => item.id.toString() === selectedId,
    );

    if (!selectedAttribute) {
      setDynamicValues([]);

      return;
    }

    const attributeName = selectedAttribute.attribute_name.toLowerCase();

    if (attributeName.includes("weight")) {
      setDynamicValues(weightUnits);
    } else if (attributeName.includes("flavor")) {
      setDynamicValues(flavors);
    } else if (attributeName.includes("packaging")) {
      setDynamicValues(packagings);
    } else if (attributeName.includes("purity")) {
      setDynamicValues(purities);
    } else {
      setDynamicValues([]);
    }
  };

  // CODE VALUE CHANGE
  const handleCodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCode = e.target.value;

    setValueCode(selectedCode);

    const selectedItem = dynamicValues.find(
      (item: any) =>
        item.value_code === selectedCode ||
        item.unit_code === selectedCode ||
        item.flavor_code === selectedCode ||
        item.packaging_code === selectedCode ||
        item.purity_code === selectedCode,
    );

    if (!selectedItem) return;

    const selectedName =
      selectedItem.value_name ||
      selectedItem.unit_name ||
      selectedItem.flavor_name ||
      selectedItem.packaging_name ||
      selectedItem.purity_name;

    setValueName(selectedName);

    const generatedSlug = selectedName
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

    setValueSlug(generatedSlug);
  };

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

      await updateAttributeValue(Number(id), {
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
        text: "Attribute value updated successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/admin/manage/products/attribute/values");
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error?.response?.data?.message || "Failed to update attribute value",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col xl={12}>
              <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 m-2">
                <h4
                  className="mb-0"
                  style={{
                    fontWeight: 700,
                    color: "#14468C",
                  }}
                >
                  Edit Attribute Value
                </h4>

                <Link to="/admin/manage/products/attribute/values">
                  <Button variant="light" className="shadow-sm border">
                    <FaArrowLeft className="me-2" />
                    Back
                  </Button>
                </Link>
              </div>
            </Col>
          </Row>

          <Card>
            <p className="text-dark mb-0 p-2 text-dark fw-semibold  border-bottom">
              Manage attributes
            </p>

            <Card.Body>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row>
                  {/* ATTRIBUTE */}
                  <Col md={4} className="mb-4">
                    <Form.Label className="fw-semibold">
                      Attribute Name
                    </Form.Label>

                    <Form.Select
                      required
                      value={attribute_id}
                      onChange={handleAttributeChange}
                    >
                      <option value="">-- Select Attribute --</option>

                      {attributes.map((item: any) => (
                        <option key={item.id} value={item.id}>
                          {item.attribute_name}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>

                  {/* CODE VALUE */}
                  <Col md={4} className="mb-4">
                    <Form.Group>
                      <Form.Label className="fw-semibold">
                        Code Value <span className="text-danger">*</span>
                      </Form.Label>

                      <Form.Select
                        required
                        value={value_code}
                        onChange={handleCodeChange}
                      >
                        <option value="">-- Select Code --</option>

                        {dynamicValues.map((item: any) => (
                          <option
                            key={item.id}
                            value={
                              item.value_code ||
                              item.unit_code ||
                              item.flavor_code ||
                              item.packaging_code ||
                              item.purity_code
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
                    </Form.Group>
                  </Col>
                  <Col md={4} className="mb-4">
                    <Form.Group>
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
                    </Form.Group>
                  </Col>
                  <Col md={6} className="mb-4">
                    <Form.Group>
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
                    </Form.Group>
                  </Col>
                  <Col md={6} className="mb-4">
                    <Form.Group>
                      <Form.Label className="fw-semibold">
                        Sort Order
                      </Form.Label>

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
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={12} className="mb-4">
                    <Form.Group>
                      <Form.Label className="fw-semibold">
                        Description
                      </Form.Label>

                      <Form.Control
                        as="textarea"
                        rows={4}
                        placeholder="Enter description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        style={{
                          borderRadius: "10px",
                        }}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
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
                </Row>
                <Row>
                  <Col md={12} className="d-flex gap-2">
                    <Button
                      type="submit"
                      disabled={loading}
                      style={{
                        backgroundColor: "#14468C",
                        border: "none",
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
                          Update Attribute Value
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
    </>
  );
}

export default EditAttributeValue;
