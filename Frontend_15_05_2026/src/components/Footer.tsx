import { Container, Row, Col, Form, InputGroup } from "react-bootstrap";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaPaperPlane,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <div className="bg-dark text-light pt-3 pb-3 border-bottom">
        <Container>
          <Row className="align-items-center">
            <Col md={5}>
              <div className="d-flex align-items-center gap-3">
                <FaPaperPlane className="justify-content-between" size={30} />
                <h5 className="mb-0 text-white">Sign Up for Newsletter</h5>
              </div>
            </Col>
            <Col md={7}>
              <InputGroup>
                <Form.Control
                  type="email"
                  id="newsletterEmail"
                  name="email"
                  placeholder="Your Email Address"
                  autoComplete="off"
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

      <footer className="bg-dark text-light pt-4 pb-3">
        <Container>
          <Row>
            {/* About */}
            <Col md={3}>
              <h5>BeeFreshHoney</h5>
              <p>
                We provide 100% natural and organic honey directly from forests
                to your home.
              </p>
            </Col>
            <Col md={3}>
              <h6>Customer Services</h6>
              <ul className="list-unstyled">
                <li>
                  <Link to="/cancellation-refund" className="footer-link">
                    Cancellation & Refund
                  </Link>
                </li>
                <li>
                  <Link to="/return-exchange" className="footer-link">
                    Return & Exchange
                  </Link>
                </li>
                <li>
                  <Link to="/disclaimer" className="footer-link">
                    Disclaimer
                  </Link>
                </li>
                <li>
                  <Link to="/track-order" className="footer-link">
                    Track your Order
                  </Link>
                </li>
              </ul>
            </Col>
            <Col md={3}>
              <h5>Our Policies</h5>
              <ul className="list-unstyled">
                <li>
                  <Link to="/privacy-policy" className="footer-link">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/delivery-policy" className="footer-link">
                    Delivery Policy
                  </Link>
                </li>
                <li>
                  <Link to="/shipping-policy" className="footer-link">
                    Shipping Policy
                  </Link>
                </li>
                <li>
                  <Link to="trems-conditions" className="footer-link">
                    Terms and Conditions
                  </Link>
                </li>
              </ul>
            </Col>

            <Col md={3}>
              <h6>Infomation</h6>
              <ul className="list-unstyled">
                <li>
                  <Link to="trems-conditions" className="footer-link">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="trems-conditions" className="footer-link">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="trems-conditions" className="footer-link">
                    Faqs
                  </Link>
                </li>
                <li>
                  <Link to="trems-conditions" className="footer-link">
                    Blogs
                  </Link>
                </li>
              </ul>
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
          <Row></Row>
        </Container>
        <hr className="footer-divider m-0" />
        <Container>
          <Row>
            <Col className="text-center">
              <p className="mb-0 pt-1">
                © {new Date().getFullYear()} BeeFreshHoney. All Rights
                Reserved.
              </p>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
}

export default Footer;
