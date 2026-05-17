// import React from "react";
// import {
//   Badge,
//   Button,
//   Card,
//   Col,
//   Container,
//   Row,
//   Table,
// } from "react-bootstrap";

// function Invoice() {
// //   const order = {
// //     orderId: `ORD-${Date.now()}`,
// //     customer: "Alok Singh",
// //     paymentMethod: "UPI Payment",
// //     date: new Date().toLocaleDateString("en-IN"),
// //     items: [
// //       {
// //         id: 1,
// //         name: "Premium Honey Jar",
// //         quantity: 2,
// //         price: 450,
// //         gst: 18,
// //       },
// //       {
// //         id: 2,
// //         name: "Organic Wild Honey",
// //         quantity: 1,
// //         price: 650,
// //         gst: 18,
// //       },
// //     ],
// //   };

// //   const subtotal = order.items.reduce(
// //     (sum, item) => sum + item.price * item.quantity,
// //     0
// //   );

// //   const gstAmount = order.items.reduce(
// //     (sum, item) =>
// //       sum + (item.price * item.quantity * item.gst) / 100,
// //     0
// //   );

// //   const cgst = gstAmount / 2;
// //   const sgst = gstAmount / 2;
// //   const grandTotal = subtotal + gstAmount;

// //   const handlePrint = () => {
// //     window.print();
// //   };

// const order = {
//     orderId: `ORD-${Date.now()}`,
//     customer: "Alok Singh",
//     paymentMethod: "UPI Payment",
//     date: new Date().toLocaleDateString("en-IN"),
//     items: [
//       {
//         id: 1,
//         name: "Premium Honey Jar",
//         quantity: 2,
//         price: 450,
//         gst: 18,
//       },
//       {
//         id: 2,
//         name: "Organic Wild Honey",
//         quantity: 1,
//         price: 650,
//         gst: 18,
//       },
//     ],
//   };

//   const subtotal = order.items.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );

//   const gstAmount = order.items.reduce(
//     (sum, item) =>
//       sum + (item.price * item.quantity * item.gst) / 100,
//     0
//   );

//   const cgst = gstAmount / 2;
//   const sgst = gstAmount / 2;
//   const grandTotal = subtotal + gstAmount;

//   const handlePrint = () => {
//     window.print();
//   };
//   return (
//     <div className="bg-light py-5 min-vh-100">
//       <Container>
//         <Row className="justify-content-center">
//           <Col lg={10}>
//             <Card
//               className="shadow-lg border-0"
//               style={{ borderRadius: "20px" }}
//             >
//               <Card.Body className="p-4 p-md-5">
//                 {/* HEADER */}
//                 <Row className="align-items-center border-bottom pb-4 mb-4">
//                   <Col md={6}>
//                     <h1 className="fw-bold text-dark mb-1">
//                       GST Invoice
//                     </h1>

//                     <p className="text-muted mb-0">
//                       Invoice No: {order.orderId}
//                     </p>

//                     <p className="text-muted mb-0">
//                       Date: {order.date}
//                     </p>
//                   </Col>

//                   <Col
//                     md={6}
//                     className="text-md-end mt-3 mt-md-0"
//                   >
//                     <Button
//                       variant="primary"
//                       onClick={handlePrint}
//                       className="px-4 py-2 fw-semibold"
//                     >
//                       Print Invoice
//                     </Button>
//                   </Col>
//                 </Row>

//                 {/* CUSTOMER & PAYMENT */}
//                 <Row className="g-4 mb-4">
//                   <Col md={6}>
//                     <Card
//                       className="h-100 border-0"
//                       style={{
//                         background: "#f8f9fa",
//                         borderRadius: "15px",
//                       }}
//                     >
//                       <Card.Body>
//                         <h5 className="fw-bold mb-3">
//                           Customer Details
//                         </h5>

//                         <p className="mb-2 text-muted">
//                           Customer Name:
//                         </p>

//                         <h6 className="fw-semibold">
//                           {order.customer}
//                         </h6>

//                         <p className="mb-1 text-muted mt-3">
//                           Order ID:
//                         </p>

//                         <h6 className="fw-semibold">
//                           {order.orderId}
//                         </h6>
//                       </Card.Body>
//                     </Card>
//                   </Col>

//                   <Col md={6}>
//                     <Card
//                       className="h-100 border-0"
//                       style={{
//                         background: "#f8f9fa",
//                         borderRadius: "15px",
//                       }}
//                     >
//                       <Card.Body>
//                         <h5 className="fw-bold mb-3">
//                           Payment Information
//                         </h5>

//                         <p className="mb-2 text-muted">
//                           Payment Method
//                         </p>

//                         <Badge
//                           bg="success"
//                           className="px-3 py-2 fs-6"
//                         >
//                           {order.paymentMethod}
//                         </Badge>

//                         <div className="mt-3">
//                           <p className="mb-1 text-muted">
//                             Payment Status
//                           </p>

//                           <Badge
//                             bg="primary"
//                             className="px-3 py-2 fs-6"
//                           >
//                             Paid
//                           </Badge>
//                         </div>
//                       </Card.Body>
//                     </Card>
//                   </Col>
//                 </Row>

//                 {/* PRODUCT TABLE */}
//                 <div className="table-responsive">
//                   <Table
//                     bordered
//                     hover
//                     className="align-middle"
//                   >
//                     <thead className="table-dark">
//                       <tr>
//                         <th>#</th>
//                         <th>Product Name</th>
//                         <th>Quantity</th>
//                         <th>Price</th>
//                         <th>GST</th>
//                         <th className="text-end">
//                           Total
//                         </th>
//                       </tr>
//                     </thead>

//                     <tbody>
//                       {order.items.map((item, index) => {
//                         const total =
//                           item.price * item.quantity;

//                         return (
//                           <tr key={item.id}>
//                             <td>{index + 1}</td>

//                             <td className="fw-semibold">
//                               {item.name}
//                             </td>

//                             <td>{item.quantity}</td>

//                             <td>₹{item.price}</td>

//                             <td>{item.gst}%</td>

//                             <td className="text-end fw-bold">
//                               ₹{total}
//                             </td>
//                           </tr>
//                         );
//                       })}
//                     </tbody>
//                   </Table>
//                 </div>

//                 {/* BILL SUMMARY */}
//                 <Row className="justify-content-end mt-4">
//                   <Col md={6} lg={5}>
//                     <Card
//                       className="border-0 shadow-sm"
//                       style={{
//                         borderRadius: "15px",
//                         background: "#f8f9fa",
//                       }}
//                     >
//                       <Card.Body>
//                         <div className="d-flex justify-content-between mb-3">
//                           <span className="text-muted">
//                             Subtotal
//                           </span>

//                           <span className="fw-semibold">
//                             ₹{subtotal.toFixed(2)}
//                           </span>
//                         </div>

//                         <div className="d-flex justify-content-between mb-3">
//                           <span className="text-muted">
//                             CGST (9%)
//                           </span>

//                           <span className="fw-semibold">
//                             ₹{cgst.toFixed(2)}
//                           </span>
//                         </div>

//                         <div className="d-flex justify-content-between mb-3">
//                           <span className="text-muted">
//                             SGST (9%)
//                           </span>

//                           <span className="fw-semibold">
//                             ₹{sgst.toFixed(2)}
//                           </span>
//                         </div>

//                         <hr />

//                         <div className="d-flex justify-content-between align-items-center">
//                           <span className="fs-5 fw-bold">
//                             Grand Total
//                           </span>

//                           <span className="fs-4 fw-bold text-success">
//                             ₹{grandTotal.toFixed(2)}
//                           </span>
//                         </div>
//                       </Card.Body>
//                     </Card>
//                   </Col>
//                 </Row>

//                 {/* FOOTER */}
//                 <div className="text-center mt-5 border-top pt-4">
//                   <h5 className="fw-bold text-success">
//                     Thank You for Shopping With Us
//                   </h5>

//                   <p className="text-muted mb-0">
//                     Pure Natural Honey • Healthy & Organic
//                   </p>
//                 </div>
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// }

// export default Invoice;

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
import usePageTitle from "../../../hooks/usePageTitle";
import Breadcrumbs from "../../../components/Breadcrumbs";

function Invoice() {
    usePageTitle("Invoice");
  const location = useLocation();

  // ====================================
  // GET DATA FROM ROUTER
  // ====================================
  const orderId =
    location.state?.orderId ||
    `ORD-${Date.now()}`;

  const total =
    location.state?.total || 0;

  const paymentMethod =
    location.state?.paymentMethod ||
    "UPI Payment";

  // ====================================
  // ORDER DATA
  // ====================================
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

      {
        id: 2,
        name: "Organic Wild Honey",
        quantity: 1,
        price: 650,
        gst: 18,
      },
    ],
  };

  // ====================================
  // CALCULATIONS
  // ====================================
  const subtotal = order.items.reduce(
    (sum, item) =>
      sum +
      item.price * item.quantity,
    0
  );

  const gstAmount = order.items.reduce(
    (sum, item) =>
      sum +
      (item.price *
        item.quantity *
        item.gst) /
        100,
    0
  );

  const cgst = gstAmount / 2;

  const sgst = gstAmount / 2;

  const grandTotal =
    total || subtotal + gstAmount;

  // ====================================
  // PRINT
  // ====================================
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="page-content py-3 bg-light min-vh-100">
      <Container>
        <Breadcrumbs/>
        <Row className="justify-content-center">
          <Col lg={10}>
            <Card className="border-0 shadow-lg rounded-4 overflow-hidden">
              {/* HEADER */}
              <div className="bg-dark text-white p-4 p-md-5">
                <Row className="align-items-center">
                  <Col md={8}>
                    <h1 className="fw-bold mb-2">
                      GST Invoice
                    </h1>

                    <p className="mb-1">
                      Invoice No:
                      {" "}
                      {order.orderId}
                    </p>

                    <p className="mb-0">
                      Date:
                      {" "}
                      {order.date}
                    </p>
                  </Col>

                  <Col
                    md={4}
                    className="text-md-end mt-3 mt-md-0"
                  >
                    <Button
                      variant="warning"
                      onClick={
                        handlePrint
                      }
                      className="fw-semibold px-4"
                    >
                      Print Invoice
                    </Button>
                  </Col>
                </Row>
              </div>

              {/* BODY */}
              <Card.Body className="p-4 p-md-5">
                {/* CUSTOMER INFO */}
                <Row className="mb-5">
                  <Col md={6}>
                    <h5 className="fw-bold mb-3">
                      Billing Details
                    </h5>

                    <p className="mb-2">
                      <strong>
                        Customer:
                      </strong>
                      {" "}
                      {order.customer}
                    </p>

                    <p className="mb-2">
                      <strong>
                        Payment Method:
                      </strong>
                      {" "}
                      {
                        order.paymentMethod
                      }
                    </p>

                    <div className="mt-3">
                      <Badge bg="success">
                        PAID
                      </Badge>
                    </div>
                  </Col>

                  <Col md={6} className="text-md-end mt-4 mt-md-0">
                    <h5 className="fw-bold mb-3">
                      Store Details
                    </h5>

                    <p className="mb-1">
                      Bee Honey Store
                    </p>

                    <p className="mb-1">
                      Dadri, Uttar Pradesh
                    </p>

                    <p className="mb-0">
                      GSTIN:
                      {" "}
                      09ABCDE1234F1Z5
                    </p>
                  </Col>
                </Row>

                {/* TABLE */}
                <div className="table-responsive">
                  <Table
                    bordered
                    hover
                    className="align-middle"
                  >
                    <thead className="table-dark">
                      <tr>
                        <th>
                          Product
                        </th>

                        <th>
                          Quantity
                        </th>

                        <th>
                          Price
                        </th>

                        <th>GST</th>

                        <th className="text-end">
                          Total
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {order.items.map(
                        (item) => {
                          const itemTotal =
                            item.price *
                            item.quantity;

                          return (
                            <tr
                              key={
                                item.id
                              }
                            >
                              <td className="fw-semibold">
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
                                {
                                  item.gst
                                }
                                %
                              </td>

                              <td className="text-end fw-bold">
                                ₹
                                {itemTotal.toFixed(
                                  2
                                )}
                              </td>
                            </tr>
                          );
                        }
                      )}
                    </tbody>
                  </Table>
                </div>

                {/* TOTALS */}
                <Row className="justify-content-end mt-4">
                  <Col md={5}>
                    <div className="border rounded-4 p-4 bg-light">
                      <div className="d-flex justify-content-between mb-3">
                        <span className="text-muted">
                          Subtotal
                        </span>

                        <strong>
                          ₹
                          {subtotal.toFixed(
                            2
                          )}
                        </strong>
                      </div>

                      <div className="d-flex justify-content-between mb-3">
                        <span className="text-muted">
                          CGST
                          (9%)
                        </span>

                        <strong>
                          ₹
                          {cgst.toFixed(
                            2
                          )}
                        </strong>
                      </div>

                      <div className="d-flex justify-content-between mb-3">
                        <span className="text-muted">
                          SGST
                          (9%)
                        </span>

                        <strong>
                          ₹
                          {sgst.toFixed(
                            2
                          )}
                        </strong>
                      </div>

                      <hr />

                      <div className="d-flex justify-content-between fs-4 fw-bold">
                        <span>
                          Grand Total
                        </span>

                        <span className="text-success">
                          ₹
                          {grandTotal.toFixed(
                            2
                          )}
                        </span>
                      </div>
                    </div>
                  </Col>
                </Row>

                {/* FOOTER */}
                <div className="text-center mt-5 text-muted">
                  <p className="mb-1">
                    Thank you for shopping with us.
                  </p>

                  <small>
                    This is a computer generated invoice.
                  </small>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Invoice;