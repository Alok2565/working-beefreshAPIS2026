import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import { getUser } from "../../utils/auth";
import usePageTitle from "../../hooks/usePageTitle";

const ChangePassword = () => {
  usePageTitle("Change Password");
  const user = getUser();

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    setSuccess("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { currentPassword, newPassword, confirmPassword } = formData;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return setError("All fields are required");
    }

    if (newPassword.length < 6) {
      return setError("New password must be at least 6 characters");
    }

    if (newPassword !== confirmPassword) {
      return setError("Passwords do not match");
    }

    // 👉 Call API here
    console.log("Change Password Data:", {
      user_id: user?.user_id,
      currentPassword,
      newPassword,
    });

    // Simulate success
    setSuccess("Password changed successfully");
    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <Container fluid className="mt-4">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow-sm border-0 p-4">
            <h5 className="mb-4 text-center">Change Password</h5>

            {/* Alerts */}
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}

            <Form onSubmit={handleSubmit}>
              {/* Current Password */}
              <Form.Group className="mb-3">
                <Form.Label>Current Password</Form.Label>
                <Form.Control
                  type="password"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  placeholder="Enter current password"
                  size="sm"
                />
              </Form.Group>

              {/* New Password */}
              <Form.Group className="mb-3">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  placeholder="Enter new password"
                  size="sm"
                />
              </Form.Group>

              {/* Confirm Password */}
              <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm new password"
                  size="sm"
                />
              </Form.Group>

              {/* Submit */}
              <div className="d-grid">
                <Button variant="dark" type="submit">
                  Update Password
                </Button>
              </div>
            </Form>

            {/* User Info */}
            <div className="text-center mt-3 text-muted small">
              Logged in as: <strong>{user?.name || "User"}</strong>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ChangePassword;
