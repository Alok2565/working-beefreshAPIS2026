import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import logoIcon from "../assets/images/logo/Be_cart.png";

type LoginType = "email" | "otp";

interface LoginForm {
  email: string;
  password: string;
  mobile: string;
  otp: string;
}

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loginType, setLoginType] = useState<LoginType>("email");

  const [formData, setFormData] = useState<LoginForm>({
    email: "",
    password: "",
    mobile: "",
    otp: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🔥 EMAIL LOGIN
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post("http://localhost:5000/api/login", {
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem("token", res.data.token);
      window.location.href = "/";
    } catch (error: any) {
      alert(error.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 SEND OTP
  const handleSendOtp = async () => {
    if (!formData.mobile) {
      alert("Enter mobile number");
      return;
    }

    try {
      setLoading(true);

      await axios.post("http://localhost:5000/api/send-otp", {
        mobile: formData.mobile,
      });

      setOtpSent(true);
      alert("OTP Sent Successfully");
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 VERIFY OTP
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.mobile || !formData.otp) {
      alert("All fields required");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post("http://localhost:5000/api/verify-otp", {
        mobile: formData.mobile,
        otp: formData.otp,
      });

      localStorage.setItem("token", res.data.token);
      window.location.href = "/";
    } catch (error: any) {
      alert(error.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const verified = params.get("verified");

    if (verified === "true") {
      // Replace alert with modern UX handling
      alert("Account verified successfully!");

      // Optional: clean URL after showing message
      navigate("/user/login", { replace: true });
    }
  }, [location.search, navigate]);

  return (
    <Container fluid className="login-container py-3">
      <Col className="custom_auth m-3">
        <Row className="login-row">
          <Col
            md={6}
            className="d-flex align-items-center justify-content-center p-3"
          >
            <div className="login-left-content">
              <div className="text-center mb-4">
                <img src={logoIcon} alt="logo" className="login-logo" />
                <h4 className="mt-3">Welcome Back</h4>
              </div>

              <div className="d-flex justify-content-center mb-3">
                <Button
                  variant={
                    loginType === "email" ? "warning" : "outline-warning"
                  }
                  onClick={() => setLoginType("email")}
                  className="me-2"
                >
                  Email Login
                </Button>
                <Button
                  variant={loginType === "otp" ? "warning" : "outline-warning"}
                  onClick={() => setLoginType("otp")}
                >
                  OTP Login
                </Button>
              </div>

              {loginType === "email" && (
                <Form onSubmit={handleEmailLogin}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter email"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3 position-relative">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter password"
                    />
                    <span
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </Form.Group>

                  <Button className="w-100 login-btn" type="submit">
                    {loading ? "Signing in..." : "Sign in"}
                  </Button>
                </Form>
              )}

              {loginType === "otp" && (
                <Form onSubmit={handleVerifyOtp}>
                  <Form.Group className="mb-3">
                    <Form.Label>Mobile Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="Enter mobile number"
                    />
                  </Form.Group>

                  {!otpSent ? (
                    <Button
                      className="w-100 login-btn"
                      onClick={handleSendOtp}
                      disabled={loading}
                    >
                      {loading ? "Sending..." : "Send OTP"}
                    </Button>
                  ) : (
                    <>
                      <Form.Group className="mb-3 mt-3">
                        <Form.Label>Enter OTP</Form.Label>
                        <Form.Control
                          type="text"
                          name="otp"
                          value={formData.otp}
                          onChange={handleChange}
                          placeholder="Enter OTP"
                        />
                      </Form.Group>

                      <Button className="w-100 login-btn" type="submit">
                        {loading ? "Verifying..." : "Verify OTP"}
                      </Button>
                    </>
                  )}
                </Form>
              )}
            </div>
          </Col>

          <Col
            md={6}
            className="d-none d-md-flex align-items-center gradient-side"
          >
            <div className="text-white px-4">
              <h4 className="mb-4">Fast & Secure Login</h4>
              <p>Login using email or OTP for quick access.</p>
            </div>
          </Col>
        </Row>
      </Col>
    </Container>
  );
};

export default Login;
