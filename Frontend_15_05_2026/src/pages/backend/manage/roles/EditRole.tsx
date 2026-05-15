// import React from "react";

// function EditRole() {
//   return <div></div>;
// }

// export default EditRole;

import React, { useEffect, useState } from "react";
import {
  Card,
  Col,
  Container,
  Row,
  Form,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

import { getRoleById, updateRole } from "../../../../services/roleService";

function EditRole() {
  const { id } = useParams();

  const navigate = useNavigate();

  const location = useLocation();

  const [name, setName] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const [pageLoading, setPageLoading] = useState<boolean>(true);

  const [validated, setValidated] = useState<boolean>(false);

  const [successMessage, setSuccessMessage] = useState<string>("");

  // ================================
  // FETCH ROLE DATA
  // ================================
  useEffect(() => {
    const fetchRole = async () => {
      try {
        setPageLoading(true);

        const response = await getRoleById(Number(id));

        const role = response?.data?.data;

        setName(role?.name || "");
      } catch (error: any) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text:
            error?.response?.data?.message || "Failed to fetch role details",
        });

        navigate("/admin/manage/roles");
      } finally {
        setPageLoading(false);
      }
    };

    if (id) {
      fetchRole();
    }
  }, [id, navigate]);

  // ================================
  // SUCCESS MESSAGE FROM QUERY PARAM
  // ================================
  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const success = params.get("success");

    if (success) {
      setSuccessMessage(success);

      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [location.search]);

  // ================================
  // UPDATE ROLE
  // ================================
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

      const payload = {
        name: name.trim(),
      };

      await updateRole(Number(id), payload);

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Role updated successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/admin/manage/roles?success=Role updated successfully");
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error?.response?.data?.message || "Failed to update role",
      });
    } finally {
      setLoading(false);
    }
  };

  // ================================
  // PAGE LOADER
  // ================================
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
        {/* SUCCESS ALERT */}
        {successMessage && (
          <Alert
            variant="success"
            dismissible
            onClose={() => setSuccessMessage("")}
          >
            <strong>Success!</strong> {successMessage}
          </Alert>
        )}

        {/* HEADER */}
        <Row>
          <Col xl={12}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4
                style={{
                  fontWeight: 600,
                  color: "#14468C",
                  marginBottom: 0,
                }}
              >
                Update Role
              </h4>

              <Button
                style={{
                  backgroundColor: "#14468C",
                  border: "none",
                }}
                onClick={() => navigate("/admin/manage/roles")}
              >
                <FaLongArrowAltLeft className="me-1" />
                Back
              </Button>
            </div>
          </Col>
        </Row>

        {/* FORM CARD */}
        <Card className="shadow-sm border-0">
          <Card.Body>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>
                      Role Name <span className="text-danger">*</span>
                    </Form.Label>

                    <Form.Control
                      type="text"
                      required
                      value={name}
                      placeholder="Enter role name"
                      onChange={(e) => setName(e.target.value)}
                    />

                    <Form.Control.Feedback type="invalid">
                      Role name is required
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              {/* SUBMIT BUTTON */}
              <Button
                type="submit"
                disabled={loading}
                style={{
                  backgroundColor: "#14468C",
                  border: "none",
                  minWidth: "160px",
                }}
              >
                {loading ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    Updating...
                  </>
                ) : (
                  "Update Role"
                )}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default EditRole;
