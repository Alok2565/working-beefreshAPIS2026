import { Container, Row, Col, Form, InputGroup } from "react-bootstrap";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPaperPlane } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      {/* ===== NEWSLETTER SECTION ===== */}
      <div className="bg-dark text-light pt-3 pb-3 border-bottom">
        <Container>
          <Row className="align-items-center">

            <Col md={5}>
              <div className="d-flex align-items-center gap-3">
                <FaPaperPlane className="justify-content-between" size={30}/>
                <h5 className="mb-0 text-white">
                  Sign Up for Newsletter
                </h5>
              </div>
            </Col>
            <Col md={7}>
              <InputGroup>
                <Form.Control
                  type="email"
                  placeholder="Your Email Address"
                  className="border-0"
                />
                <InputGroup.Text className="bg-warning text-dark fw-bold">
                  Subscribe
                </InputGroup.Text>
              </InputGroup>
            </Col>

          </Row>
        </Container>
      </div>

      {/* ===== MAIN FOOTER ===== */}
      <footer className="bg-dark text-light pt-4 pb-3">
        <Container>
          <Row>

            {/* About */}
            <Col md={4}>
              <h5>BeeFreshHoney</h5>
              <p>
                We provide 100% natural and organic honey directly
                from forests to your home.
              </p>
            </Col>

            {/* Quick Links */}
            <Col md={4}>
              <h5>Quick Links</h5>
              <ul className="list-unstyled">
                <li>
                  <Link to="/" className="text-light text-decoration-none">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/shops" className="text-light text-decoration-none">
                    Products
                  </Link>
                </li>
                <li>
                  <Link to="/blogs" className="text-light text-decoration-none">
                    Blogs
                  </Link>
                </li>
                <li>
                  <Link to="/cart" className="text-light text-decoration-none">
                    Cart
                  </Link>
                </li>
              </ul>
            </Col>

            {/* Support */}
            <Col md={4}>
              <h5>Customer Support</h5>
              <ul className="list-unstyled">
                <li>Contact Us</li>
                <li>Shipping Policy</li>
                <li>Return Policy</li>
                <li>Privacy Policy</li>
              </ul>

              {/* Social Icons */}
              <div className="mt-3">
                <FaFacebook className="me-3 cursor-pointer" size={20} />
                <FaTwitter className="me-3 cursor-pointer" size={20} />
                <FaInstagram className="me-3 cursor-pointer" size={20} />
                <FaLinkedin className="cursor-pointer" size={20} />
              </div>
            </Col>

          </Row>
        </Container>
        <Container className="py-1">
          <Row>
            </Row>
            </Container>
            <hr className="footer-divider m-0"/>
            <Container>
            <Row>
            <Col className="text-center">
            <p className="mb-0 pt-1">
            © {new Date().getFullYear()} BeeFreshHoney. All Rights Reserved.
            </p>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
}

export default Footer;