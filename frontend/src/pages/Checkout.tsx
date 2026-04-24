import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Checkout() {
  const { cartItems } = useCart();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * (item.qty || 1),
    0,
  );

  const shipping = cartItems.length > 0 ? 50 : 0;
  const total = subtotal + shipping;

  return (
    <Container className="mt-4 mb-4">
      <h2 className="mb-4">Checkout</h2>

      <Row>
        {/* Billing Details */}
        <Col md={8}>
          <Card className="p-4 shadow-sm">
            <h4 className="mb-3">Billing Details</h4>

            <Form>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter first name" />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter last name" />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control type="text" placeholder="Enter phone number" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" placeholder="Enter address" />
              </Form.Group>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>City</Form.Label>
                    <Form.Control type="text" placeholder="City" />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control type="text" placeholder="Postal code" />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Country</Form.Label>
                <Form.Select>
                  <option>Select Country</option>
                  <option>India</option>
                  <option>USA</option>
                  <option>UK</option>
                </Form.Select>
              </Form.Group>
            </Form>
          </Card>
        </Col>

        {/* Order Summary */}
        <Col md={4}>
          <Card className="p-4 shadow-sm">
            <h4>Order Summary</h4>

            <hr />

            {cartItems.map((item) => (
              <Row key={item.id}>
                <Col>{item.name}</Col>
                <Col className="text-end">₹{item.price * (item.qty || 1)}</Col>
              </Row>
            ))}

            <hr />

            <Row>
              <Col>Subtotal</Col>
              <Col className="text-end">₹{subtotal}</Col>
            </Row>

            <Row>
              <Col>Shipping</Col>
              <Col className="text-end">₹{shipping}</Col>
            </Row>

            <Row className="fw-bold mt-2">
              <Col>Total</Col>
              <Col className="text-end">₹{total}</Col>
            </Row>

            <Link to="/payment">
              <Button variant="warning" className="mt-4 w-100">
                Place Order
              </Button>
            </Link>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Checkout;
