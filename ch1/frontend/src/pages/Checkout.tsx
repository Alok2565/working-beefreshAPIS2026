import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Checkout() {
  const { cartItems } = useCart();

  // =========================
  // GST Configuration
  // =========================
  const isInterState = false; // true = IGST, false = CGST + SGST

  // =========================
  // Subtotal
  // =========================
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * (item.qty || 1),
    0
  );

  // =========================
  // GST Calculation Per Product
  // =========================
  let cgst = 0;
  let sgst = 0;
  let igst = 0;

  cartItems.forEach((item) => {
    const qty = item.qty || 1;

    // Default GST 18%
    const gstRate = item.gst || 18;

    const itemGST =
      (item.price * qty * gstRate) / 100;

    if (isInterState) {
      igst += itemGST;
    } else {
      cgst += itemGST / 2;
      sgst += itemGST / 2;
    }
  });

  const gstTotal = cgst + sgst + igst;

  // =========================
  // Shipping
  // =========================
  const shipping =
    subtotal > 1000 || subtotal === 0 ? 0 : 50;

  // =========================
  // Grand Total
  // =========================
  const total =
    subtotal + gstTotal + shipping;

  return (
    <Container className="mt-4 mb-4">
      <h2 className="mb-4">Checkout</h2>

      <Row>
        {/* ========================= */}
        {/* Billing Details */}
        {/* ========================= */}
        <Col md={8}>
          <Card className="p-4 shadow-sm border-0 rounded-4">
            <h4 className="mb-3">Billing Details</h4>

            <Form>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter first name"
                      size="sm"
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter last name"
                      size="sm"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  size="sm"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter phone number"
                  size="sm"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter address"
                  size="sm"
                />
              </Form.Group>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="City"
                      size="sm"
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Postal code"
                      size="sm"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Country</Form.Label>

                <Form.Select size="sm">
                  <option>Select Country</option>
                  <option>India</option>
                  <option>USA</option>
                  <option>UK</option>
                </Form.Select>
              </Form.Group>

              {/* Optional GSTIN */}
              <Form.Group className="mb-3">
                <Form.Label>GSTIN (Optional)</Form.Label>

                <Form.Control
                  type="text"
                  placeholder="Enter GST Number"
                  size="sm"
                />
              </Form.Group>
            </Form>
          </Card>
        </Col>

        {/* ========================= */}
        {/* Order Summary */}
        {/* ========================= */}
        <Col md={4}>
          <Card className="p-4 shadow-sm border-0 rounded-4">
            <h4>Order Summary</h4>

            <hr />

            {/* Product List */}
            {cartItems.map((item) => {
              const qty = item.qty || 1;

              return (
                <div key={item.id} className="mb-3">
                  <Row>
                    <Col>
                      <div className="fw-semibold">
                        {item.name}
                      </div>

                      <small className="text-muted">
                        Qty: {qty}
                      </small>
                    </Col>

                    <Col className="text-end">
                      ₹
                      {(
                        item.price * qty
                      ).toFixed(2)}
                    </Col>
                  </Row>
                </div>
              );
            })}

            <hr />

            {/* Subtotal */}
            <Row className="mb-2">
              <Col>Subtotal</Col>

              <Col className="text-end">
                ₹{subtotal.toFixed(2)}
              </Col>
            </Row>

            {/* GST */}
            {!isInterState ? (
              <>
                <Row className="text-muted small mb-2">
                  <Col>CGST</Col>

                  <Col className="text-end">
                    ₹{cgst.toFixed(2)}
                  </Col>
                </Row>

                <Row className="text-muted small mb-2">
                  <Col>SGST</Col>

                  <Col className="text-end">
                    ₹{sgst.toFixed(2)}
                  </Col>
                </Row>
              </>
            ) : (
              <Row className="text-muted small mb-2">
                <Col>IGST</Col>

                <Col className="text-end">
                  ₹{igst.toFixed(2)}
                </Col>
              </Row>
            )}

            {/* Shipping */}
            <Row className="mb-2">
              <Col>Shipping</Col>

              <Col className="text-end">
                {shipping === 0
                  ? "FREE"
                  : `₹${shipping.toFixed(2)}`}
              </Col>
            </Row>

            {/* Free Shipping Message */}
            {subtotal > 1000 && (
              <div className="text-success small mb-2">
                You got free shipping 🎉
              </div>
            )}

            <hr />

            {/* Grand Total */}
            <Row className="fw-bold fs-5 pt-2">
              <Col>Total</Col>

              <Col className="text-end">
                ₹{total.toFixed(2)}
              </Col>
            </Row>

            {/* GST Included Note */}
            <div className="small text-muted mt-2">
              Inclusive of all taxes
            </div>

            {/* Button */}
            <Link to="/shops/product/payment">
              <Button
                variant="warning"
                className="mt-4 w-100 fw-semibold"
              >
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