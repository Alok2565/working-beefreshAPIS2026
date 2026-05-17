
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

import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

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

// ======================================================
// COMPONENT
// ======================================================

function EditAttributeValue() {
  const navigate = useNavigate();

  const { id } = useParams();

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
      console.log(error);
    }
  };

  // ======================================================
  // FETCH WEIGHT UNITS
  // ======================================================

  const fetchWeightUnits = async () => {
    try {
      const response = await getWeightUnits();

      setWeightUnits(response?.data?.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  // ======================================================
  // FETCH FLAVORS
  // ======================================================

  const fetchFlavors = async () => {
    try {
      const response = await getFlavors();

      setFlavors(response?.data?.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  // ======================================================
  // FETCH PACKAGINGS
  // ======================================================

  const fetchPackagings = async () => {
    try {
      const response = await getPackagings();

      setPackagings(response?.data?.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  // ======================================================
  // FETCH PURITIES
  // ======================================================

  const fetchPurities = async () => {
    try {
      const response = await getPurities();

      setPurities(response?.data?.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  // ======================================================
  // FETCH EDIT DATA
  // ======================================================

  const fetchEditData = async () => {
    try {
      const response = await getAttributeValueById(Number(id));

      const data = response?.data?.data;

      setAttributeId(data?.attribute_id?.toString() || "");

      setValueName(data?.value_name || "");

      setValueSlug(data?.value_slug || "");

      setValueCode(data?.value_code || "");

      setDescription(data?.description || "");

      setSortOrder(data?.sort_order || 0);

      setStatus(data?.status ?? true);

      // ============================================
      // LOAD DYNAMIC VALUES
      // ============================================

      const selectedAttribute = attributes.find(
        (item: any) =>
          item.id.toString() === data?.attribute_id?.toString(),
      );

      if (selectedAttribute) {
        const attributeName =
          selectedAttribute.attribute_name.toLowerCase();

        if (attributeName.includes("weight")) {
          setDynamicValues(weightUnits);
        } else if (attributeName.includes("flavor")) {
          setDynamicValues(flavors);
        } else if (attributeName.includes("packaging")) {
          setDynamicValues(packagings);
        } else if (attributeName.includes("purity")) {
          setDynamicValues(purities);
        }
      }
    } catch (error) {
      console.log("EDIT FETCH ERROR:", error);
    }
  };

  // ======================================================
  // INITIAL LOAD
  // ======================================================

  useEffect(() => {
    fetchAttributes();

    fetchWeightUnits();

    fetchFlavors();

    fetchPackagings();

    fetchPurities();
  }, []);

  // ======================================================
  // LOAD EDIT DATA AFTER DROPDOWNS LOAD
  // ======================================================

  useEffect(() => {
    if (attributes.length > 0) {
      fetchEditData();
    }
  }, [attributes]);

  // ======================================================
  // ATTRIBUTE CHANGE
  // ======================================================

  const handleAttributeChange = (
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

    const attributeName =
      selectedAttribute.attribute_name.toLowerCase();

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

  // ======================================================
  // AUTO GENERATE SLUG + CODE
  // ======================================================

  useEffect(() => {
    if (!value_name) {
      return;
    }

    const generatedSlug = value_name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

    setValueSlug(generatedSlug);

    const generatedCode = value_name
      .toUpperCase()
      .replace(/\s+/g, "_");

    setValueCode(generatedCode);
  }, [value_name]);

  // ======================================================
  // STATUS CHANGE
  // ======================================================

  const handleStatusChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setStatus(e.target.checked);
  };

  // ======================================================
  // UPDATE SUBMIT
  // ======================================================

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    const form = e.currentTarget;

    if (!form.checkValidity()) {
      e.stopPropagation();

      setValidated(true);

      return;
    }

    try {
      setLoading(true);

      await updateAttributeValue(Number(id),{
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

      navigate(
        "/admin/manage/products/attribute/values",
      );
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error?.response?.data?.message ||
          "Failed to update attribute value",
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
          <Col xl={12} className="p-2">
            <div className="d-flex justify-content-between align-items-center">
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
                <Button
                  variant="light"
                  className="shadow-sm border"
                >
                  <FaArrowLeft className="me-2" />
                  Back
                </Button>
              </Link>
            </div>
          </Col>
        </Row>
          <Card>
          <Card.Body>
            
            <Form
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
            >
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
                    <option value="">
                      -- Select Attribute --
                    </option>

                    {attributes.map((item: any) => (
                      <option
                        key={item.id}
                        value={item.id}
                      >
                        {item.attribute_name}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
                <Col md={4} className="mb-4">
                  <Form.Label className="fw-semibold">
                    Attribute Name
                  </Form.Label>

                  <Form.Select
                    required
                    value={attribute_id}
                    onChange={handleAttributeChange}
                  >
                    <option value="">
                      -- Select Attribute --
                    </option>

                    {attributes.map((item: any) => (
                      <option
                        key={item.id}
                        value={item.id}
                      >
                        {item.attribute_name}
                      </option>
                    ))}
                  </Form.Select>
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
  )
}

export default EditAttributeValue
