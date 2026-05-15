import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";


function Payment() {
  return (
    <>
      <Container className="mt-4">
        <h2 className="mb-4">Payment</h2>

        <Row>
          {/* Payment Methods */}
          <Col md={8}>
            <Card className="p-4 shadow-sm">

              <h4>Select Payment Method</h4>

              <Form>

                <Form.Check
                  type="radio"
                  label="Credit / Debit Card"
                  name="payment"
                  className="mb-3"
                />

                <Form.Check
                  type="radio"
                  label="UPI Payment"
                  name="payment"
                  className="mb-3"
                />

                <Form.Check
                  type="radio"
                  label="Cash on Delivery"
                  name="payment"
                  className="mb-3"
                />

                {/* Card Details */}
                <h5 className="mt-4">Card Details</h5>

                <Form.Group className="mb-3">
                  <Form.Label>Card Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter card number"
                  />
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Expiry Date</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="MM/YY"
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>CVV</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="CVV"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Button variant="warning" className="w-100">
                  Pay Now
                </Button>

              </Form>

            </Card>
          </Col>

          {/* Payment Summary */}
          <Col md={4}>
            <Card className="p-4 shadow-sm">

              <h4>Payment Summary</h4>

              <hr />

              <Row>
                <Col>Subtotal</Col>
                <Col className="text-end">₹1098</Col>
              </Row>

              <Row>
                <Col>Shipping</Col>
                <Col className="text-end">₹50</Col>
              </Row>

              <Row className="fw-bold mt-2">
                <Col>Total</Col>
                <Col className="text-end">₹1148</Col>
              </Row>

            </Card>
          </Col>

        </Row>
      </Container>
    </>
  );
}

export default Payment;