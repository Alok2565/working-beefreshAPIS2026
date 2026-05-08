import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Badge,
} from "react-bootstrap";
import { getUser } from "../../utils/auth";
import { ROLE } from "../../utils/roleConfig";
import usePageTitle from "../../hooks/usePageTitle";

const Profile = () => {
  usePageTitle("Profile");

  // ✅ Get user once
  const user = getUser();

  // ✅ Initialize state directly (NO useEffect → avoids infinite loop)
  const [formData, setFormData] = useState({
    name: user?.name || "User",
    email: user?.email || "no-email@example.com",
    role_id: user?.role_id || ROLE.USER,
  });

  const isAdmin = formData.role_id === ROLE.ADMIN;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    console.log("Updated Profile:", formData);

    // 👉 TODO: Call API here
    // axios.put("/api/profile/update", formData)

    alert("Profile updated successfully (demo)");
  };

  return (
    <Container fluid className="mt-4">
      <Row className="g-4">
        {/* LEFT PROFILE CARD */}
        <Col md={4}>
          <Card className="shadow-sm border-0 text-center p-4">
            {/* Avatar */}
            <div
              className="rounded-circle bg-dark text-white d-flex align-items-center justify-content-center mx-auto mb-3"
              style={{ width: "90px", height: "90px", fontSize: "32px" }}
            >
              {formData.name?.charAt(0).toUpperCase()}
            </div>

            {/* Name */}
            <h5 className="mb-1">{formData.name}</h5>

            {/* Email */}
            <p className="text-muted mb-2">{formData.email}</p>

            {/* Role Badge */}
            <Badge bg={isAdmin ? "danger" : "primary"} className="px-3 py-2">
              {isAdmin ? "Admin" : "User"}
            </Badge>

            {/* Info */}
            <div className="mt-3 text-muted small">
              {isAdmin
                ? "You have full system access."
                : "You can manage your personal account."}
            </div>
          </Card>
        </Col>

        {/* RIGHT FORM */}
        <Col md={8}>
          <Card className="shadow-sm border-0 p-4">
            <h5 className="mb-4">Edit Profile</h5>

            <Form>
              <Row>
                {/* Name */}
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter full name"
                    />
                  </Form.Group>
                </Col>

                {/* Email */}
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      value={formData.email}
                      disabled
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                {/* Role */}
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Role</Form.Label>
                    <Form.Control
                      type="text"
                      value={isAdmin ? "Admin" : "User"}
                      disabled
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* Admin section */}
              {isAdmin && (
                <div className="mb-3 p-3 bg-light rounded">
                  <h6 className="mb-2">Admin Settings</h6>
                  <p className="small text-muted mb-0">
                    You can manage users, roles, and system settings from
                    dashboard.
                  </p>
                </div>
              )}

              {/* Save Button */}
              <div className="text-end">
                <Button variant="dark" onClick={handleSave}>
                  Save Changes
                </Button>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
