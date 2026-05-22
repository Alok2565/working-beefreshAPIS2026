import React from "react";

import {
  Button,
  Card,
  Col,
  Container,
  Row,
  Table,
  Badge,
} from "react-bootstrap";

import {
  useLocation,
} from "react-router-dom";

function Order() {
  const location = useLocation();

  const orderId =
    location.state?.orderId ||
    `ORD-${Date.now()}`;

  const total =
    location.state?.total || 0;

  const paymentMethod =
    location.state?.paymentMethod ||
    "UPI Payment";

  const order = {
    orderId,

    customer: "Alok Singh",

    paymentMethod,

    date:
      new Date().toLocaleDateString(
        "en-IN"
      ),

    items: [
      {
        id: 1,
        name: "Premium Honey Jar",
        quantity: 2,
        price: 450,
        gst: 18,
      },
    ],
  };

  const subtotal = order.items.reduce(
    (sum, item) =>
      sum +
      item.price * item.quantity,
    0
  );

  const gst = subtotal * 0.18;

  const grandTotal =
    total || subtotal + gst;

  return (
    <div className="page-content py-5 bg-light min-vh-100">
      <Container>
        <Row className="g-4">
          <Col lg={5}>
            <Card className="border-0 shadow rounded-4 h-100">
              <Card.Body className="p-5">
                <div className="text-center">
                  <div className="display-1 mb-3">
                    ✅
                  </div>

                  <h2 className="fw-bold text-success">
                    Order Placed
                  </h2>
                </div>

                <hr />

                <div className="d-flex justify-content-between mb-3">
                  <span>
                    Order ID
                  </span>

                  <strong>
                    {order.orderId}
                  </strong>
                </div>

                <div className="d-flex justify-content-between mb-3">
                  <span>
                    Payment
                  </span>

                  <Badge bg="primary">
                    {
                      order.paymentMethod
                    }
                  </Badge>
                </div>

                <div className="d-flex justify-content-between">
                  <span>
                    Total
                  </span>

                  <strong className="text-success">
                    ₹
                    {grandTotal.toFixed(
                      2
                    )}
                  </strong>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={7}>
            <Card className="border-0 shadow rounded-4">
              <Card.Body className="p-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h3 className="fw-bold">
                    GST Invoice
                  </h3>

                  <Button
                    onClick={() =>
                      window.print()
                    }
                  >
                    Print
                  </Button>
                </div>

                <Table bordered>
                  <thead>
                    <tr>
                      <th>
                        Product
                      </th>
                      <th>Qty</th>
                      <th>
                        Price
                      </th>
                      <th>Total</th>
                    </tr>
                  </thead>

                  <tbody>
                    {order.items.map(
                      (item) => (
                        <tr
                          key={
                            item.id
                          }
                        >
                          <td>
                            {
                              item.name
                            }
                          </td>

                          <td>
                            {
                              item.quantity
                            }
                          </td>

                          <td>
                            ₹
                            {
                              item.price
                            }
                          </td>

                          <td>
                            ₹
                            {(
                              item.price *
                              item.quantity
                            ).toFixed(
                              2
                            )}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </Table>

                <div className="mt-4">
                  <div className="d-flex justify-content-between mb-2">
                    <span>
                      Subtotal
                    </span>

                    <strong>
                      ₹
                      {subtotal.toFixed(
                        2
                      )}
                    </strong>
                  </div>

                  <div className="d-flex justify-content-between mb-2">
                    <span>GST</span>

                    <strong>
                      ₹
                      {gst.toFixed(2)}
                    </strong>
                  </div>

                  <hr />

                  <div className="d-flex justify-content-between fs-4 fw-bold">
                    <span>Total</span>

                    <span className="text-success">
                      ₹
                      {grandTotal.toFixed(
                        2
                      )}
                    </span>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Order;