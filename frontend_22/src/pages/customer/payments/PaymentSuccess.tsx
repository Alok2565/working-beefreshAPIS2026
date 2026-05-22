import { Container, Card, Row, Col, Button, Badge } from "react-bootstrap";

import { Link, useLocation } from "react-router-dom";

import { useEffect } from "react";

import usePageTitle from "../../../hooks/usePageTitle";

import { useCart } from "../../../context/CartContext";

function PaymentSuccess() {
  usePageTitle("Order Success");

  const { clearCart } = useCart();

  const location = useLocation();

  useEffect(() => {
    clearCart();
  }, []);

  const orderId = location.state?.orderId;

  const total = location.state?.total || 0;

  const paymentMethod = location.state?.paymentMethod || "upi";

  const paymentMethodLabel =
    paymentMethod === "card"
      ? "Credit / Debit Card"
      : paymentMethod === "upi"
        ? "UPI Payment"
        : "Cash on Delivery";
  const currentDate = new Date();

  return (
    <div className="page-content py-5 bg-light min-vh-100">
      <Container>
        <Card className="border-0 shadow-lg rounded-4">
          <div className="bg-success text-white text-center p-5">
            <div className="display-1">✅</div>

            <h1 className="fw-bold">Payment Successful</h1>

            <p className="fs-5 mb-0">
              Your order has been placed successfully.
            </p>
          </div>

          <Card.Body className="p-5">
            <Row className="g-4">
              <Col md={6}>
                <Card className="border-0 bg-light rounded-4 h-100">
                  <Card.Body>
                    <h5 className="fw-bold mb-4">Order Details</h5>

                    <div className="mb-3">
                      <small className="text-muted d-block">Order ID</small>

                      <strong>{orderId}</strong>
                    </div>

                    <div className="mb-3">
                      <small className="text-muted d-block">Order Date</small>

                      <strong>{currentDate.toLocaleDateString()}</strong>
                    </div>

                    <div className="mb-3">
                      <small className="text-muted d-block">
                        Payment Method
                      </small>

                      <strong>{paymentMethodLabel}</strong>
                    </div>

                    <div>
                      <small className="text-muted d-block">
                        Payment Status
                      </small>

                      <Badge bg="success">PAID</Badge>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={6}>
                <Card className="border-0 bg-warning bg-opacity-10 rounded-4 h-100">
                  <Card.Body>
                    <h5 className="fw-bold mb-4">Amount Paid</h5>

                    <div className="display-5 fw-bold text-warning">
                      ₹{Number(total).toFixed(2)}
                    </div>

                    <div className="mt-3 text-muted">
                      Inclusive of all taxes & shipping charges.
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            {/* <div className="d-flex flex-wrap gap-3 mt-5">
              <Link
                to="/shops/orders"
                state={{
                  orderId,
                  total,
                  paymentMethod:
                    paymentMethodLabel,
                }}
              >
                <Button variant="dark">
                  View Orders
                </Button>
              </Link>

              <Link
                to="/shops/orders/invoice"
                state={{
                  orderId,
                  total,
                  paymentMethod:
                    paymentMethodLabel,
                }}
              >
                <Button variant="warning">
                  Download Invoice
                </Button>
              </Link>
              <Link to="/shops">
                <Button
                  variant="outline-secondary"
                  className="rounded-pill px-4"
                >
                  Continue Shopping
                </Button>
              </Link>
            </div> */}
            <div className="d-flex flex-wrap gap-3 mt-5">
              <Link
                to="/shops/orders/myorder"
                state={{
                  orderId,
                  total,
                  paymentMethod: paymentMethodLabel,
                }}
              >
                <Button variant="dark" className="rounded-pill px-4">
                  View Orders
                </Button>
              </Link>

              <Link
                to="/shops/orders/invoice"
                state={{
                  orderId,
                  total,
                  paymentMethod: paymentMethodLabel,
                }}
              >
                <Button
                  variant="warning"
                  className="rounded-pill px-4 fw-semibold"
                >
                  Download Invoice
                </Button>
              </Link>

              <Link to="/shops">
                <Button
                  variant="outline-secondary"
                  className="rounded-pill px-4"
                >
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default PaymentSuccess;
