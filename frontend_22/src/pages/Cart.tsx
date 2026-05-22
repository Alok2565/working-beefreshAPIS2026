// import { Container, Row, Col, Table, Button, Card } from "react-bootstrap";
// import { FaTrash, FaShoppingCart } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import { useCart } from "../context/CartContext";

// function Cart() {
//   const { cartItems, removeItem } = useCart();

//   /* Calculate totals */
//   const subtotal = cartItems.reduce(
//     (sum, item) => sum + item.price * (item.qty || 1),
//     0,
//   );

//   const shipping = cartItems.length > 0 ? 50 : 0;
//   const total = subtotal + shipping;

//   return (
//     <>
//     <div className="page-content py-3">
//     <Container className="mt-4">
//       <h2 className="mb-4">Shopping Cart</h2>

//       {cartItems.length === 0 ? (
//         <div className="text-center mt-5">
//           <FaShoppingCart size={60} className="text-secondary mb-3" />
//           <h3>Your Cart is Empty</h3>
//           <p>Add some products to your cart.</p>

//           <Link to="/shops">
//             <Button variant="warning">Shop Now</Button>
//           </Link>
//         </div>
//       ) : (
//         <Row>
//           {/* Cart Items */}
//           <Col md={8}>
//             <Table bordered hover responsive>
//               <thead>
//                 <tr>
//                   <th>Product</th>
//                   <th>Price</th>
//                   <th>Qty</th>
//                   <th>Total</th>
//                   <th>Remove</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {cartItems.map((item) => (
//                   <tr key={item.id}>
//                     <td className="d-flex align-items-center gap-3">
//                       <img src={item.image} width="80" alt={item.name} />
//                       <span>{item.name}</span>
//                     </td>

//                     <td>₹{item.price}</td>

//                     <td>{item.qty || 1}</td>

//                     <td>₹{item.price * (item.qty || 1)}</td>

//                     <td>
//                       <Button
//                         variant="danger"
//                         onClick={() => removeItem(item.id)}
//                       >
//                         <FaTrash />
//                       </Button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </Table>
//           </Col>

//           {/* Order Summary */}
//           <Col md={4}>
//             <Card className="p-3 shadow-sm">
//               <h4>Order Summary</h4>

//               <hr />

//               <Row>
//                 <Col>Subtotal</Col>
//                 <Col className="text-end">₹{subtotal}</Col>
//               </Row>

//               <Row>
//                 <Col>Shipping</Col>
//                 <Col className="text-end">₹{shipping}</Col>
//               </Row>

//               <Row className="fw-bold mt-2">
//                 <Col>Total</Col>
//                 <Col className="text-end">₹{total}</Col>
//               </Row>

//               <Link to="/shops/product/checkout">
//                 <Button variant="warning" className="mt-3 w-100">
//                   Proceed to Checkout
//                 </Button>
//               </Link>
//             </Card>
//           </Col>
//         </Row>
//       )}
//     </Container>
//     </div>
//     </>
//   );
// }

// export default Cart;

import { Container, Row, Col, Table, Button, Card } from "react-bootstrap";

import { FaTrash, FaShoppingCart } from "react-icons/fa";

import { Link } from "react-router-dom";

import { useCart } from "../context/CartContext";
import usePageTitle from "../hooks/usePageTitle";
import Breadcrumbs from "../components/Breadcrumbs";

function Cart() {
  usePageTitle("Cart");
  const { cartItems, removeItem } = useCart();

  // ====================================
  // GST SETTINGS
  // ====================================
  const isInterState = false;

  // ====================================
  // SUBTOTAL
  // ====================================
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * (item.qty || 1),
    0,
  );

  // ====================================
  // GST CALCULATION
  // ====================================
  let cgst = 0;
  let sgst = 0;
  let igst = 0;

  cartItems.forEach((item) => {
    const qty = item.qty || 1;

    const gstRate = item.gst || 18;

    const itemGST = (item.price * qty * gstRate) / 100;

    if (isInterState) {
      igst += itemGST;
    } else {
      cgst += itemGST / 2;
      sgst += itemGST / 2;
    }
  });

  const gstTotal = cgst + sgst + igst;

  // ====================================
  // SHIPPING
  // ====================================
  const shipping = cartItems.length > 0 ? 50 : 0;

  // ====================================
  // GRAND TOTAL
  // ====================================
  const total = subtotal + gstTotal + shipping;

  return (
    <>
      <div className="page-content py-2">
        <Container fluid style={{ width: "90%" }}>
          <Breadcrumbs />

          {cartItems.length === 0 ? (
            <div className="text-center mt-5 py-5">
              <FaShoppingCart size={60} className="text-secondary mb-3" />

              <h3>Your Cart is Empty</h3>

              <p className="text-muted">Add some products to your cart.</p>

              <Link to="/shops">
                <Button variant="warning">Shop Now</Button>
              </Link>
            </div>
          ) : (
            <Row className="g-4">
              {/* ==================================== */}
              {/* CART ITEMS */}
              {/* ==================================== */}
              <Col lg={9}>
                <Card className="border-0 shadow-sm rounded-4">
                  <Card.Body>
                    <div className="table-responsive">
                      <Table bordered hover className="align-middle mb-0">
                        <thead className="table-light">
                          <tr>
                            <th>Product</th>

                            <th>Price</th>

                            <th>Qty</th>

                            <th>GST</th>

                            <th>Total</th>

                            <th>Remove</th>
                          </tr>
                        </thead>

                        <tbody>
                          {cartItems.map((item) => {
                            const qty = item.qty || 1;

                            const gstRate = item.gst || 18;

                            const itemSubtotal = item.price * qty;

                            const itemGST = (itemSubtotal * gstRate) / 100;

                            const itemTotal = itemSubtotal + itemGST;

                            return (
                              <tr key={item.id}>
                                <td>
                                  <div className="d-flex align-items-center gap-3">
                                    <img
                                      src={item.image}
                                      width="80"
                                      height="80"
                                      style={{
                                        objectFit: "cover",
                                        borderRadius: "10px",
                                      }}
                                      alt={item.name}
                                    />

                                    <div>
                                      <div className="fw-semibold">
                                        {item.name}
                                      </div>

                                      <small className="text-muted">
                                        Premium Honey
                                      </small>
                                    </div>
                                  </div>
                                </td>

                                <td>₹{item.price}</td>

                                <td>{qty}</td>

                                <td>{gstRate}%</td>

                                <td className="fw-bold text-success">
                                  ₹{itemTotal.toFixed(2)}
                                </td>

                                <td>
                                  <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => removeItem(item.id)}
                                  >
                                    <FaTrash />
                                  </Button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </Table>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              {/* ==================================== */}
              {/* ORDER SUMMARY */}
              {/* ==================================== */}
              <Col lg={3}>
                <Card className="border-0 shadow-sm rounded-4 p-4">
                  <h4 className="fw-bold mb-4">Order Summary</h4>

                  {/* SUBTOTAL */}
                  <Row className="mb-3">
                    <Col>Subtotal</Col>

                    <Col className="text-end fw-semibold">
                      ₹{subtotal.toFixed(2)}
                    </Col>
                  </Row>

                  {/* GST */}
                  {!isInterState ? (
                    <>
                      <Row className="mb-2 text-muted">
                        <Col>CGST</Col>

                        <Col className="text-end">₹{cgst.toFixed(2)}</Col>
                      </Row>

                      <Row className="mb-3 text-muted">
                        <Col>SGST</Col>

                        <Col className="text-end">₹{sgst.toFixed(2)}</Col>
                      </Row>
                    </>
                  ) : (
                    <Row className="mb-3 text-muted">
                      <Col>IGST</Col>

                      <Col className="text-end">₹{igst.toFixed(2)}</Col>
                    </Row>
                  )}

                  {/* SHIPPING */}
                  <Row className="mb-3">
                    <Col>Shipping</Col>

                    <Col className="text-end fw-semibold">
                      ₹{shipping.toFixed(2)}
                    </Col>
                  </Row>

                  <hr />

                  {/* TOTAL */}
                  <Row className="mb-4">
                    <Col className="fw-bold fs-5">Grand Total</Col>

                    <Col className="text-end fw-bold fs-5 text-success">
                      ₹{total.toFixed(2)}
                    </Col>
                  </Row>

                  {/* BUTTON */}
                  <Link to="/shops/orders/checkout">
                    <Button
                      variant="warning"
                      className="w-100 fw-semibold py-2 rounded-pill"
                    >
                      Proceed to Checkout
                    </Button>
                  </Link>
                </Card>
              </Col>
            </Row>
          )}
        </Container>
      </div>
    </>
  );
}

export default Cart;
