// import {
//   Container,
//   Row,
//   Col,
//   Form,
//   Button,
//   Card,
//   Spinner,
// } from "react-bootstrap";

// import { useNavigate } from "react-router-dom";

// import { useState } from "react";

// import usePageTitle from "../hooks/usePageTitle";
// import Breadcrumbs from "../components/Breadcrumbs";
// import { useCart } from "../context/CartContext";

// function Payment() {
//   usePageTitle("Payment");

//   const navigate = useNavigate();

//   const { cartItems } = useCart();

//   // ====================================
//   // States
//   // ====================================
//   const [loading, setLoading] =
//     useState(false);

//   const [paymentMethod, setPaymentMethod] =
//     useState("card");

//   // ====================================
//   // Generate Order ID
//   // ====================================
//   const orderId = `ORD-${Date.now()}`;

//   // ====================================
//   // GST Config
//   // ====================================
//   const isInterState = false;

//   // ====================================
//   // Subtotal
//   // ====================================
//   const subtotal = cartItems.reduce(
//     (sum, item) =>
//       sum + item.price * (item.qty || 1),
//     0
//   );

//   // ====================================
//   // GST Calculation
//   // ====================================
//   let cgst = 0;
//   let sgst = 0;
//   let igst = 0;

//   cartItems.forEach((item) => {
//     const qty = item.qty || 1;

//     const gstRate = item.gst || 18;

//     const itemGST =
//       (item.price * qty * gstRate) / 100;

//     if (isInterState) {
//       igst += itemGST;
//     } else {
//       cgst += itemGST / 2;
//       sgst += itemGST / 2;
//     }
//   });

//   const gstTotal =
//     cgst + sgst + igst;

//   // ====================================
//   // Shipping
//   // ====================================
//   const shipping =
//     subtotal > 1000 || subtotal === 0
//       ? 0
//       : 50;

//   // ====================================
//   // Grand Total
//   // ====================================
//   const total =
//     subtotal + gstTotal + shipping;

//   // ====================================
//   // Handle Payment
//   // ====================================
//   const handlePayment = async () => {
//     try {
//       setLoading(true);

//       const orderData = {
//         orderId,
//         paymentMethod,
//         items: cartItems,
//         subtotal,
//         cgst,
//         sgst,
//         igst,
//         shipping,
//         total,
//       };

//       console.log(
//         "Saving Order...",
//         orderData
//       );

//       // Fake API Delay
//       await new Promise((resolve) =>
//         setTimeout(resolve, 2000)
//       );

//       navigate(
//         "/shops/orders/payment/payment-success",
//         {
//           state: {
//             orderId,
//             total,
//             paymentMethod,
//           },
//         }
//       );
//     } catch (error) {
//       console.error(error);

//       alert("Payment failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="page-content py-3">
//       <Container>
//         <Breadcrumbs />

//         <h2 className="mb-4">
//           Payment
//         </h2>

//         <Row>
//           {/* Payment Methods */}
//           <Col md={8}>
//             <Card className="p-4 shadow-sm border-0 rounded-4">
//               <h4>
//                 Select Payment Method
//               </h4>

//               <Form>
//                 {/* CARD */}
//                 <Form.Check
//                   type="radio"
//                   label="Credit / Debit Card"
//                   name="payment"
//                   className="mb-3"
//                   checked={
//                     paymentMethod ===
//                     "card"
//                   }
//                   onChange={() =>
//                     setPaymentMethod(
//                       "card"
//                     )
//                   }
//                 />

//                 {/* UPI */}
//                 <Form.Check
//                   type="radio"
//                   label="UPI Payment"
//                   name="payment"
//                   className="mb-3"
//                   checked={
//                     paymentMethod ===
//                     "upi"
//                   }
//                   onChange={() =>
//                     setPaymentMethod(
//                       "upi"
//                     )
//                   }
//                 />

//                 {/* COD */}
//                 <Form.Check
//                   type="radio"
//                   label="Cash on Delivery"
//                   name="payment"
//                   className="mb-3"
//                   checked={
//                     paymentMethod ===
//                     "cod"
//                   }
//                   onChange={() =>
//                     setPaymentMethod(
//                       "cod"
//                     )
//                   }
//                 />

//                 {/* CARD DETAILS */}
//                 {paymentMethod ===
//                   "card" && (
//                   <>
//                     <h5 className="mt-4">
//                       Card Details
//                     </h5>

//                     <Form.Group className="mb-3">
//                       <Form.Label>
//                         Card Number
//                       </Form.Label>

//                       <Form.Control
//                         type="text"
//                         placeholder="Enter card number"
//                       />
//                     </Form.Group>

//                     <Row>
//                       <Col md={6}>
//                         <Form.Group className="mb-3">
//                           <Form.Label>
//                             Expiry Date
//                           </Form.Label>

//                           <Form.Control
//                             type="text"
//                             placeholder="MM/YY"
//                           />
//                         </Form.Group>
//                       </Col>

//                       <Col md={6}>
//                         <Form.Group className="mb-3">
//                           <Form.Label>
//                             CVV
//                           </Form.Label>

//                           <Form.Control
//                             type="password"
//                             placeholder="CVV"
//                           />
//                         </Form.Group>
//                       </Col>
//                     </Row>
//                   </>
//                 )}

//                 {/* UPI DETAILS */}
//                 {paymentMethod ===
//                   "upi" && (
//                   <>
//                     <h5 className="mt-4">
//                       UPI Details
//                     </h5>

//                     <Form.Group className="mb-3">
//                       <Form.Label>
//                         UPI ID
//                       </Form.Label>

//                       <Form.Control
//                         type="text"
//                         placeholder="example@upi"
//                       />
//                     </Form.Group>
//                   </>
//                 )}

//                 {/* COD DETAILS */}
//                 {paymentMethod ===
//                   "cod" && (
//                   <div className="mt-4 p-3 bg-light rounded">
//                     <h6>
//                       Cash on Delivery
//                     </h6>

//                     <small className="text-muted">
//                       Pay with cash upon
//                       delivery.
//                     </small>
//                   </div>
//                 )}

//                 {/* GSTIN */}
//                 <Form.Group className="mt-4 mb-3">
//                   <Form.Label>
//                     GSTIN (Optional)
//                   </Form.Label>

//                   <Form.Control
//                     type="text"
//                     placeholder="Enter GST Number"
//                   />
//                 </Form.Group>

//                 {/* PAY BUTTON */}
//                 <Button
//                   variant="warning"
//                   className="w-100 fw-semibold d-flex justify-content-center align-items-center gap-2"
//                   disabled={loading}
//                   onClick={handlePayment}
//                 >
//                   {loading ? (
//                     <>
//                       <Spinner
//                         animation="border"
//                         size="sm"
//                       />

//                       Processing...
//                     </>
//                   ) : (
//                     `Pay ₹${total.toFixed(
//                       2
//                     )}`
//                   )}
//                 </Button>
//               </Form>
//             </Card>
//           </Col>

//           {/* SUMMARY */}
//           <Col md={4}>
//             <Card className="p-4 shadow-sm border-0 rounded-4">
//               <h4>
//                 Payment Summary
//               </h4>

//               <hr />

//               {cartItems.map((item) => {
//                 const qty =
//                   item.qty || 1;

//                 return (
//                   <div
//                     key={item.id}
//                     className="mb-3"
//                   >
//                     <Row>
//                       <Col>
//                         <div className="fw-semibold">
//                           {item.name}
//                         </div>

//                         <small className="text-muted">
//                           Qty: {qty}
//                         </small>
//                       </Col>

//                       <Col className="text-end">
//                         ₹
//                         {(
//                           item.price * qty
//                         ).toFixed(2)}
//                       </Col>
//                     </Row>
//                   </div>
//                 );
//               })}

//               <hr />

//               <Row className="mb-2">
//                 <Col>Subtotal</Col>

//                 <Col className="text-end">
//                   ₹
//                   {subtotal.toFixed(2)}
//                 </Col>
//               </Row>

//               <Row className="mb-2">
//                 <Col>CGST</Col>

//                 <Col className="text-end">
//                   ₹{cgst.toFixed(2)}
//                 </Col>
//               </Row>

//               <Row className="mb-2">
//                 <Col>SGST</Col>

//                 <Col className="text-end">
//                   ₹{sgst.toFixed(2)}
//                 </Col>
//               </Row>

//               <Row className="mb-2">
//                 <Col>Shipping</Col>

//                 <Col className="text-end">
//                   {shipping === 0
//                     ? "FREE"
//                     : `₹${shipping.toFixed(
//                         2
//                       )}`}
//                 </Col>
//               </Row>

//               <hr />

//               <Row className="fw-bold fs-5">
//                 <Col>Total</Col>

//                 <Col className="text-end">
//                   ₹{total.toFixed(2)}
//                 </Col>
//               </Row>
//             </Card>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// }

// export default Payment;
// import {
//   Container,
//   Row,
//   Col,
//   Form,
//   Button,
//   Card,
//   Spinner,
// } from "react-bootstrap";

// import { useNavigate } from "react-router-dom";

// import { useState } from "react";

// import usePageTitle from "../hooks/usePageTitle";

// import Breadcrumbs from "../components/Breadcrumbs";

// import { useCart } from "../context/CartContext";

// function Payment() {
//   usePageTitle("Payment");

//   const navigate = useNavigate();

//   const { cartItems } = useCart();

//   const [loading, setLoading] =
//     useState(false);

//   const [paymentMethod, setPaymentMethod] =
//     useState("card");

//   const orderId = `ORD-${Date.now()}`;

//   const subtotal = cartItems.reduce(
//     (sum, item) =>
//       sum + item.price * (item.qty || 1),
//     0
//   );

//   const gst = subtotal * 0.18;

//   const total = subtotal + gst;

//   const handlePayment = async () => {
//     try {
//       setLoading(true);

//       await new Promise((resolve) =>
//         setTimeout(resolve, 2000)
//       );

//       navigate(
//         "/shops/orders/payment/payment-success",
//         {
//           state: {
//             orderId,
//             total,
//             paymentMethod,
//           },
//         }
//       );
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="page-content py-4">
//       <Container>
//         <Breadcrumbs />

//         <h2 className="mb-4">
//           Payment
//         </h2>

//         <Row className="g-4">
//           <Col lg={8}>
//             <Card className="border-0 shadow rounded-4">
//               <Card.Body className="p-4">
//                 <h4 className="mb-4">
//                   Select Payment Method
//                 </h4>

//                 <Form>
//                   <Form.Check
//                     type="radio"
//                     label="Credit / Debit Card"
//                     checked={
//                       paymentMethod ===
//                       "card"
//                     }
//                     onChange={() =>
//                       setPaymentMethod(
//                         "card"
//                       )
//                     }
//                     className="mb-3"
//                   />

//                   <Form.Check
//                     type="radio"
//                     label="UPI Payment"
//                     checked={
//                       paymentMethod ===
//                       "upi"
//                     }
//                     onChange={() =>
//                       setPaymentMethod(
//                         "upi"
//                       )
//                     }
//                     className="mb-3"
//                   />

//                   <Form.Check
//                     type="radio"
//                     label="Cash on Delivery"
//                     checked={
//                       paymentMethod ===
//                       "cod"
//                     }
//                     onChange={() =>
//                       setPaymentMethod(
//                         "cod"
//                       )
//                     }
//                     className="mb-3"
//                   />

//                   <Button
//                     variant="warning"
//                     className="w-100 mt-4 fw-bold"
//                     disabled={loading}
//                     onClick={
//                       handlePayment
//                     }
//                   >
//                     {loading ? (
//                       <>
//                         <Spinner
//                           animation="border"
//                           size="sm"
//                           className="me-2"
//                         />
//                         Processing...
//                       </>
//                     ) : (
//                       `Pay ₹${total.toFixed(
//                         2
//                       )}`
//                     )}
//                   </Button>
//                 </Form>
//               </Card.Body>
//             </Card>
//           </Col>

//           <Col lg={4}>
//             <Card className="border-0 shadow rounded-4">
//               <Card.Body className="p-4">
//                 <h4 className="mb-4">
//                   Order Summary
//                 </h4>

//                 {cartItems.map((item) => (
//                   <div
//                     key={item.id}
//                     className="d-flex justify-content-between mb-3"
//                   >
//                     <div>
//                       {item.name}
//                       <div className="small text-muted">
//                         Qty:
//                         {" "}
//                         {item.qty}
//                       </div>
//                     </div>

//                     <strong>
//                       ₹
//                       {(
//                         item.price *
//                         item.qty
//                       ).toFixed(2)}
//                     </strong>
//                   </div>
//                 ))}

//                 <hr />

//                 <div className="d-flex justify-content-between">
//                   <span>
//                     Subtotal
//                   </span>

//                   <strong>
//                     ₹
//                     {subtotal.toFixed(
//                       2
//                     )}
//                   </strong>
//                 </div>

//                 <div className="d-flex justify-content-between mt-2">
//                   <span>GST</span>

//                   <strong>
//                     ₹
//                     {gst.toFixed(2)}
//                   </strong>
//                 </div>

//                 <hr />

//                 <div className="d-flex justify-content-between fs-5 fw-bold">
//                   <span>Total</span>

//                   <span>
//                     ₹
//                     {total.toFixed(
//                       2
//                     )}
//                   </span>
//                 </div>
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// }

// export default Payment;

import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Spinner,
  Alert,
} from "react-bootstrap";

import {
  useNavigate,
} from "react-router-dom";

import {
  useState,
} from "react";

import usePageTitle from "../hooks/usePageTitle";

import Breadcrumbs from "../components/Breadcrumbs";

import { useCart } from "../context/CartContext";

function Payment() {
  usePageTitle("Payment");

  const navigate = useNavigate();

  const { cartItems } = useCart();

  // ====================================
  // STATES
  // ====================================
  const [loading, setLoading] =
    useState(false);

  // REMOVE AUTO SELECTED PAYMENT
  const [paymentMethod, setPaymentMethod] =
    useState("");

  // CARD DETAILS
  const [cardNumber, setCardNumber] =
    useState("");

  const [expiryDate, setExpiryDate] =
    useState("");

  const [cvv, setCvv] =
    useState("");

  // UPI
  const [upiId, setUpiId] =
    useState("");

  // ERROR
  const [error, setError] =
    useState("");

  // ====================================
  // ORDER ID
  // ====================================
  const orderId = `ORD-${Date.now()}`;

  // ====================================
  // TOTALS
  // ====================================
  const subtotal = cartItems.reduce(
    (sum, item) =>
      sum +
      item.price *
        (item.qty || 1),
    0
  );

  const gst = subtotal * 0.18;

  const shipping =
    subtotal > 1000
      ? 0
      : 50;

  const total =
    subtotal +
    gst +
    shipping;

  // ====================================
  // HANDLE PAYMENT
  // ====================================
  const handlePayment =
    async () => {
      setError("");

      // PAYMENT METHOD REQUIRED
      if (!paymentMethod) {
        setError(
          "Please select a payment method."
        );

        return;
      }

      // CARD VALIDATION
      if (
        paymentMethod ===
        "card"
      ) {
        if (
          !cardNumber ||
          !expiryDate ||
          !cvv
        ) {
          setError(
            "Please fill all card details."
          );

          return;
        }
      }

      // UPI VALIDATION
      if (
        paymentMethod ===
          "upi" &&
        !upiId
      ) {
        setError(
          "Please enter UPI ID."
        );

        return;
      }

      try {
        setLoading(true);

        await new Promise(
          (resolve) =>
            setTimeout(
              resolve,
              2000
            )
        );

        navigate(
          "/shops/orders/payment/payment-success",
          {
            state: {
              orderId,
              total,
              paymentMethod,
            },
          }
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="page-content py-4 bg-light min-vh-100">
      <Container>
        <Breadcrumbs />

        <h2 className="mb-4 fw-bold">
          Payment
        </h2>

        <Row className="g-4">
          {/* ==================================== */}
          {/* PAYMENT SECTION */}
          {/* ==================================== */}
          <Col lg={8}>
            <Card className="border-0 shadow rounded-4">
              <Card.Body className="p-4">
                <h4 className="mb-4 fw-bold">
                  Select Payment Method
                </h4>

                {/* ERROR */}
                {error && (
                  <Alert variant="danger">
                    {error}
                  </Alert>
                )}

                <Form>
                  {/* CARD */}
                  <Form.Check
                    type="radio"
                    name="paymentMethod"
                    label="Credit / Debit Card"
                    checked={
                      paymentMethod ===
                      "card"
                    }
                    onChange={() =>
                      setPaymentMethod(
                        "card"
                      )
                    }
                    className="mb-3"
                  />

                  {/* CARD DETAILS */}
                  {paymentMethod ===
                    "card" && (
                    <Card className="border-0 bg-light p-3 mb-4 rounded-4">
                      <h5 className="mb-3">
                        Card Details
                      </h5>

                      <Form.Group className="mb-3">
                        <Form.Label>
                          Card Number
                        </Form.Label>

                        <Form.Control
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          value={
                            cardNumber
                          }
                          onChange={(
                            e
                          ) =>
                            setCardNumber(
                              e.target
                                .value
                            )
                          }
                        />
                      </Form.Group>

                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>
                              Expiry
                              Date
                            </Form.Label>

                            <Form.Control
                              type="text"
                              placeholder="MM/YY"
                              value={
                                expiryDate
                              }
                              onChange={(
                                e
                              ) =>
                                setExpiryDate(
                                  e
                                    .target
                                    .value
                                )
                              }
                            />
                          </Form.Group>
                        </Col>

                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>
                              CVV
                            </Form.Label>

                            <Form.Control
                              type="password"
                              placeholder="123"
                              value={
                                cvv
                              }
                              onChange={(
                                e
                              ) =>
                                setCvv(
                                  e.target
                                    .value
                                )
                              }
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                    </Card>
                  )}

                  {/* UPI */}
                  <Form.Check
                    type="radio"
                    name="paymentMethod"
                    label="UPI Payment"
                    checked={
                      paymentMethod ===
                      "upi"
                    }
                    onChange={() =>
                      setPaymentMethod(
                        "upi"
                      )
                    }
                    className="mb-3"
                  />

                  {/* UPI DETAILS */}
                  {paymentMethod ===
                    "upi" && (
                    <Card className="border-0 bg-light p-3 mb-4 rounded-4">
                      <h5 className="mb-3">
                        UPI Details
                      </h5>

                      <Form.Group>
                        <Form.Label>
                          UPI ID
                        </Form.Label>

                        <Form.Control
                          type="text"
                          placeholder="example@upi"
                          value={
                            upiId
                          }
                          onChange={(
                            e
                          ) =>
                            setUpiId(
                              e.target
                                .value
                            )
                          }
                        />
                      </Form.Group>
                    </Card>
                  )}

                  {/* COD */}
                  <Form.Check
                    type="radio"
                    name="paymentMethod"
                    label="Cash on Delivery"
                    checked={
                      paymentMethod ===
                      "cod"
                    }
                    onChange={() =>
                      setPaymentMethod(
                        "cod"
                      )
                    }
                    className="mb-3"
                  />

                  {/* COD INFO */}
                  {paymentMethod ===
                    "cod" && (
                    <Card className="border-0 bg-light p-3 mb-4 rounded-4">
                      <h5 className="mb-2">
                        Cash on Delivery
                      </h5>

                      <p className="text-muted mb-0">
                        Pay with cash
                        when your order
                        is delivered.
                      </p>
                    </Card>
                  )}

                  {/* BUTTON */}
                  <Button
                    variant="warning"
                    className="w-100 mt-3 fw-bold py-2 rounded-pill"
                    disabled={loading}
                    onClick={
                      handlePayment
                    }
                  >
                    {loading ? (
                      <>
                        <Spinner
                          animation="border"
                          size="sm"
                          className="me-2"
                        />
                        Processing...
                      </>
                    ) : (
                      `Pay ₹${total.toFixed(
                        2
                      )}`
                    )}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          {/* ==================================== */}
          {/* ORDER SUMMARY */}
          {/* ==================================== */}
          <Col lg={4}>
            <Card className="border-0 shadow rounded-4">
              <Card.Body className="p-4">
                <h4 className="mb-4 fw-bold">
                  Order Summary
                </h4>

                {cartItems.map(
                  (item) => (
                    <div
                      key={
                        item.id
                      }
                      className="d-flex justify-content-between mb-3"
                    >
                      <div>
                        <div className="fw-semibold">
                          {
                            item.name
                          }
                        </div>

                        <div className="small text-muted">
                          Qty:
                          {" "}
                          {
                            item.qty
                          }
                        </div>
                      </div>

                      <strong>
                        ₹
                        {(
                          item.price *
                          item.qty
                        ).toFixed(
                          2
                        )}
                      </strong>
                    </div>
                  )
                )}

                <hr />

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
                  <span>
                    GST (18%)
                  </span>

                  <strong>
                    ₹
                    {gst.toFixed(
                      2
                    )}
                  </strong>
                </div>

                <div className="d-flex justify-content-between mb-2">
                  <span>
                    Shipping
                  </span>

                  <strong>
                    {shipping ===
                    0
                      ? "FREE"
                      : `₹${shipping.toFixed(
                          2
                        )}`}
                  </strong>
                </div>

                <hr />

                <div className="d-flex justify-content-between fs-5 fw-bold">
                  <span>
                    Total
                  </span>

                  <span className="text-success">
                    ₹
                    {total.toFixed(
                      2
                    )}
                  </span>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Payment;