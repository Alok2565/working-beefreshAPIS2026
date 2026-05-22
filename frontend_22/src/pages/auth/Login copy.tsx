// import { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import axios from "axios";
// import logoIcon from "../assets/images/logo/Be_cart.png";

// type LoginType = "email" | "otp";

// interface LoginForm {
//   email: string;
//   password: string;
//   mobile: string;
//   otp: string;
// }

// const Login = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [loginType, setLoginType] = useState<LoginType>("email");

//   const [formData, setFormData] = useState<LoginForm>({
//     email: "",
//     password: "",
//     mobile: "",
//     otp: "",
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [otpSent, setOtpSent] = useState(false);

//   const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // 🔥 EMAIL LOGIN
//   const handleEmailLogin = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!formData.email || !formData.password) {
//       alert("All fields are required");
//       return;
//     }

//     try {
//       setLoading(true);

//       const res = await axios.post("http://localhost:5000/api/login", {
//         email: formData.email,
//         password: formData.password,
//       });

//       localStorage.setItem("token", res.data.token);
//       window.location.href = "/";
//     } catch (error: any) {
//       alert(error.response?.data?.message || "Login Failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🔥 SEND OTP
//   const handleSendOtp = async () => {
//     if (!formData.mobile) {
//       alert("Enter mobile number");
//       return;
//     }

//     try {
//       setLoading(true);

//       await axios.post("http://localhost:5000/api/send-otp", {
//         mobile: formData.mobile,
//       });

//       setOtpSent(true);
//       alert("OTP Sent Successfully");
//     } catch (error: any) {
//       alert(error.response?.data?.message || "Failed to send OTP");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🔥 VERIFY OTP
//   const handleVerifyOtp = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!formData.mobile || !formData.otp) {
//       alert("All fields required");
//       return;
//     }

//     try {
//       setLoading(true);

//       const res = await axios.post("http://localhost:5000/api/verify-otp", {
//         mobile: formData.mobile,
//         otp: formData.otp,
//       });

//       localStorage.setItem("token", res.data.token);
//       window.location.href = "/";
//     } catch (error: any) {
//       alert(error.response?.data?.message || "Invalid OTP");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const verified = params.get("verified");

//     if (verified === "true") {
//       // Replace alert with modern UX handling
//       alert("Account verified successfully!");

//       // Optional: clean URL after showing message
//       navigate("/user/login", { replace: true });
//     }
//   }, [location.search, navigate]);

//   const [verifiedMsg, setVerifiedMsg] = useState("");

//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const verified = params.get("verified");

//     if (verified === "true") {
//       setVerifiedMsg("✅ Account verified successfully!");

//       // Clean URL
//       navigate("/user/login", { replace: true });
//     }
//   }, [location.search, navigate]);
//   return (
//     <Container fluid className="login-container py-3">
//       <Col className="custom_auth m-3">
//         <Row className="login-row">
//           <Col
//             md={6}
//             className="d-flex align-items-center justify-content-center p-3"
//           >
//             <div className="login-left-content">
//               <div className="text-center mb-4">
//                 <img src={logoIcon} alt="logo" className="login-logo" />
//                 <h4 className="mt-3">Welcome Back</h4>
//               </div>

//               <div className="d-flex justify-content-center mb-3">
//                 <Button
//                   variant={
//                     loginType === "email" ? "warning" : "outline-warning"
//                   }
//                   onClick={() => setLoginType("email")}
//                   className="me-2"
//                 >
//                   Email Login
//                 </Button>
//                 <Button
//                   variant={loginType === "otp" ? "warning" : "outline-warning"}
//                   onClick={() => setLoginType("otp")}
//                 >
//                   OTP Login
//                 </Button>
//               </div>

//               {loginType === "email" && (
//                 <Form onSubmit={handleEmailLogin}>
//                   <Form.Group className="mb-3">
//                     <Form.Label>Email</Form.Label>
//                     <Form.Control
//                       type="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleChange}
//                       placeholder="Enter email"
//                     />
//                   </Form.Group>

//                   <Form.Group className="mb-3 position-relative">
//                     <Form.Label>Password</Form.Label>
//                     <Form.Control
//                       type={showPassword ? "text" : "password"}
//                       name="password"
//                       value={formData.password}
//                       onChange={handleChange}
//                       placeholder="Enter password"
//                     />
//                     <span
//                       className="password-toggle"
//                       onClick={() => setShowPassword(!showPassword)}
//                     >
//                       {showPassword ? <FaEyeSlash /> : <FaEye />}
//                     </span>
//                   </Form.Group>

//                   <Button className="w-100 login-btn" type="submit">
//                     {loading ? "Signing in..." : "Sign in"}
//                   </Button>
//                 </Form>
//               )}

//               {loginType === "otp" && (
//                 <Form onSubmit={handleVerifyOtp}>
//                   <Form.Group className="mb-3">
//                     <Form.Label>Mobile Number</Form.Label>
//                     <Form.Control
//                       type="text"
//                       name="mobile"
//                       value={formData.mobile}
//                       onChange={handleChange}
//                       placeholder="Enter mobile number"
//                     />
//                   </Form.Group>

//                   {!otpSent ? (
//                     <Button
//                       className="w-100 login-btn"
//                       onClick={handleSendOtp}
//                       disabled={loading}
//                     >
//                       {loading ? "Sending..." : "Send OTP"}
//                     </Button>
//                   ) : (
//                     <>
//                       <Form.Group className="mb-3 mt-3">
//                         <Form.Label>Enter OTP</Form.Label>
//                         <Form.Control
//                           type="text"
//                           name="otp"
//                           value={formData.otp}
//                           onChange={handleChange}
//                           placeholder="Enter OTP"
//                         />
//                       </Form.Group>

//                       <Button className="w-100 login-btn" type="submit">
//                         {loading ? "Verifying..." : "Verify OTP"}
//                       </Button>
//                     </>
//                   )}
//                 </Form>
//               )}
//             </div>
//           </Col>

//           <Col
//             md={6}
//             className="d-none d-md-flex align-items-center gradient-side"
//           >
//             <div className="text-white px-4">
//               <h4 className="mb-4">Fast & Secure Login</h4>
//               <p>Login using email or OTP for quick access.</p>
//             </div>
//           </Col>
//         </Row>
//       </Col>
//     </Container>
//   );
// };

// export default Login;

import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import logoIcon from "../assets/images/logo/Be_cart.png";
import CryptoJS from "crypto-js";

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

  const [verifiedMsg, setVerifiedMsg] = useState("");

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEmailLogin = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("All fields are required");
      return;
    }
    const hashPassword = CryptoJS.SHA256(formData.password).toString();
    try {
      setLoading(true);

      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email: formData.email,
        password: hashPassword,
      });

      localStorage.setItem("token", res.data.token);
      navigate("/");
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

      navigate("/"); // ✅ no reload
    } catch (error: any) {
      alert(error.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  // ✅ HANDLE VERIFIED PARAM
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const verified = params.get("verified");

    if (verified === "true") {
      setVerifiedMsg("✅ Account verified successfully!");

      // clean URL
      navigate("/user/login", { replace: true });
    }
  }, [location.search, navigate]);

  // ✅ AUTO HIDE MESSAGE

  useEffect(() => {
    if (verifiedMsg) {
      const timer = setTimeout(() => {
        setVerifiedMsg("");
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [verifiedMsg]);

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

              {/* ✅ SUCCESS MESSAGE */}
              {verifiedMsg && (
                <div className="alert alert-success text-center">
                  {verifiedMsg}
                </div>
              )}

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

              {/* EMAIL LOGIN */}
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

              {/* OTP LOGIN */}
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

import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import logoIcon from "../../assets/images/logo/bee_logo_new.png";

type LoginType = "email" | "otp";

interface LoginForm {
  email: string;
  password: string;
  mobile: string;
  very_otp: string;
}

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [loginType, setLoginType] = useState<LoginType>("email");

  const [formData, setFormData] = useState<LoginForm>({
    email: "",
    password: "",
    mobile: "",
    very_otp: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ Separate OTP states
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [mobileOtpSent, setMobileOtpSent] = useState(false);

  // ✅ Email OTP timer
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  const [verifiedMsg, setVerifiedMsg] = useState("");

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ================= EMAIL LOGIN =================

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("All fields are required");
      return;
    }

    try {
      setLoading(true);

      await axios.post("http://localhost:5000/api/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      setEmailOtpSent(true);
      setTimer(30);
      setCanResend(false);

      alert("OTP sent to your email");
    } catch (error: any) {
      alert(error.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyEmailOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.very_otp) {
      alert("Enter OTP");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/auth/verify-otp",
        {
          email: formData.email,
          very_otp: formData.very_otp,
        },
      );

      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);

      const role = res.data.user.role_id;

      if (role === 1) navigate("/admin");
      else if (role === 2) navigate("/customer");
      else navigate("/");
    } catch (error: any) {
      alert(error.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      setLoading(true);

      await axios.post("http://localhost:5000/api/auth/resend-otp", {
        email: formData.email,
      });

      alert("OTP resent successfully");

      setTimer(30);
      setCanResend(false);
      setFormData((prev) => ({ ...prev, otp: "" }));
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  // ⏱ Timer logic
  useEffect(() => {
    let interval: any;

    if (emailOtpSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
    }

    return () => clearInterval(interval);
  }, [emailOtpSent, timer]);

  // ================= MOBILE OTP (FUTURE SAFE) =================

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

      setMobileOtpSent(true);
      alert("OTP Sent Successfully");
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyMobileOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/verify-mobile-otp",
        {
          mobile: formData.mobile,
          otp: formData.otp,
        },
      );

      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);

      navigate("/");
    } catch (error: any) {
      alert(error.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  // ================= VERIFIED MESSAGE =================

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const verified = params.get("verified");

    if (verified === "true") {
      setVerifiedMsg("✅ Account verified successfully!");
      navigate("/user/login", { replace: true });
    }
  }, [location.search, navigate]);

  useEffect(() => {
    if (verifiedMsg) {
      const timer = setTimeout(() => setVerifiedMsg(""), 4000);
      return () => clearTimeout(timer);
    }
  }, [verifiedMsg]);

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

              {verifiedMsg && (
                <div className="alert alert-success text-center">
                  {verifiedMsg}
                </div>
              )}

              {/* LOGIN SWITCH */}
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

              {/* ================= EMAIL LOGIN ================= */}
              {loginType === "email" && (
                <Form
                  onSubmit={
                    emailOtpSent ? handleVerifyEmailOtp : handleEmailLogin
                  }
                >
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  {!emailOtpSent ? (
                    <>
                      <Form.Group className="mb-3 position-relative">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                        />
                        <span
                          className="password-toggle"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                      </Form.Group>

                      <Button className="w-100 login-btn" type="submit">
                        {loading ? "Sending OTP..." : "Sign in"}
                      </Button>
                    </>
                  ) : (
                    <>
                      <Form.Group className="mb-3">
                        <Form.Label>Enter OTP</Form.Label>
                        <Form.Control
                          type="text"
                          name="ver_otp"
                          value={formData.ver_otp}
                          onChange={handleChange}
                          placeholder="Enter OTP"
                        />
                      </Form.Group>

                      <div className="text-center mb-2">
                        {!canResend ? (
                          <small>Resend OTP in {timer}s</small>
                        ) : (
                          <Button
                            variant="link"
                            onClick={handleResendOtp}
                            disabled={loading}
                          >
                            Resend OTP
                          </Button>
                        )}
                      </div>

                      <Button className="w-100 login-btn" type="submit">
                        {loading ? "Verifying..." : "Verify OTP"}
                      </Button>
                    </>
                  )}
                </Form>
              )}

              {/* ================= MOBILE OTP ================= */}
              {loginType === "otp" && (
                <Form onSubmit={handleVerifyMobileOtp}>
                  <Form.Group className="mb-3">
                    <Form.Label>Mobile Number</Form.Label>
                    <Form.Control
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  {!mobileOtpSent ? (
                    <Button onClick={handleSendOtp} className="w-100">
                      {loading ? "Sending..." : "Send OTP"}
                    </Button>
                  ) : (
                    <>
                      <Form.Group className="mt-3">
                        <Form.Label>Enter OTP</Form.Label>
                        <Form.Control
                          name="otp"
                          value={formData.otp}
                          onChange={handleChange}
                        />
                      </Form.Group>

                      <Button type="submit" className="w-100 mt-2">
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
