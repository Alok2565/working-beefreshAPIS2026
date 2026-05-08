// import { Container } from "react-bootstrap";
// import Breadcrumbs from "../components/Breadcrumbs";
// import usePageTitle from "../hooks/usePageTitle";

// function Contact() {

//   usePageTitle("Contact Us");

//   return (
//     <Container className="mt-3">
//       <Breadcrumbs />
//       <h2>Contact</h2>
//     </Container>
//   );
// }

// export default Contact;
 import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Breadcrumbs from "../components/Breadcrumbs";
import usePageTitle from "../hooks/usePageTitle";
import { FaHome, FaPhoneAlt, FaEnvelope, FaInfo } from "react-icons/fa";

const Contact = () => {
  usePageTitle("Contact Us");

  return (
    <>
      <Container className="mt-3">
        <Breadcrumbs />
        <h2>Contact</h2>
      </Container>

      <div className="contact-wrapper py-3 home-wrapper-2">
        <Container>
          <Row>
            {/* Google Map */}
            
            <Col xs={12} className="mb-3">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3597.38589203142!2d85.45785887517832!3d25.625315077437865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed7d0031c240a9%3A0x44f6a3d3370bce2f!2sMy%20Villa%2CSwatantrata%20Senani%20Bhawan(Alok%20Singh)!5e0!3m2!1sen!2sin!4v1776526463333!5m2!1sen!2sin"
                style={{
                  border: "0",
                  borderRadius: "5px",
                  width: "100%",
                  height: "320px",
                }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Map"
              ></iframe>
            </Col>

            {/* Contact Form + Info */}
            <Col xs={12}>
              <Row className="contact-inner-wrapper">
                
                {/* Form Section */}
                <Col md={6} className="mb-4">
                  <h3 className="contact-title mt-3">Contact Us</h3>
                  <Form className="d-flex flex-column gap-3">
                    <Form.Control
                      type="text"
                      placeholder="Name"
                      required
                    />
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      required
                    />
                    <Form.Control
                      type="tel"
                      placeholder="Mobile Number"
                    />
                    <Form.Control
                      as="textarea"
                      rows={5}
                      placeholder="Comments"
                    />
                    <div>
                      <Button
                        variant="secondary"
                        className="rounded-pill px-4"
                      >
                        Submit
                      </Button>
                    </div>
                  </Form>
                </Col>

                {/* Contact Info */}
                <Col md={6}>
                  <h3 className="contact-title mt-3">
                    Get in touch with us
                  </h3>

                  <p className="p-2 mb-0 d-flex align-items-center">
                    <FaHome className="me-2" />
                    New Ashok Nagar, New Delhi - 110096
                  </p>

                  <p className="p-2 mb-0 d-flex align-items-center">
                    <FaPhoneAlt className="me-2" />
                    <a href="tel:+918882165414">
                      +91-8882165414
                    </a>
                  </p>

                  <p className="p-2 mb-0 d-flex align-items-center">
                    <FaEnvelope className="me-2" />
                    <a
                      className="text-dark"
                      href="mailto:web.aloksingh8190@gmail.com"
                    >
                      web.aloksingh8190@gmail.com
                    </a>
                  </p>

                  <p className="p-2 mb-0 d-flex align-items-center">
                    <FaInfo className="me-2" />
                    Monday - Friday 10:00 AM TO 08:00 PM
                  </p>
                </Col>

              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Contact;
