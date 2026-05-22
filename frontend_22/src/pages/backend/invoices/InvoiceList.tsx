// import { useEffect, useState } from "react";

// import {
//   Badge,
//   Button,
//   Card,
//   Col,
//   Container,
//   Row,
//   Spinner,
//   Table,
// } from "react-bootstrap";

// import {
//   deleteInvoice,
//   getInvoices,
//   updateInvoiceStatus,
// } from "../../../services/invoiceService";
// import { Link } from "react-router-dom";

// function InvoiceList() {
//   const [invoices, setInvoices] = useState<any[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);

//   // ================= FETCH INVOICES =================
//   const fetchInvoices = async () => {
//     try {
//       const res = await getInvoices();

//       setInvoices(res?.data?.data || []);
//     } catch (err) {
//       console.log("FETCH ERROR:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchInvoices();
//   }, []);

//   // ================= DELETE =================
//   const handleDelete = async (id: number) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this invoice?"
//     );

//     if (!confirmDelete) return;

//     try {
//       await deleteInvoice(id);

//       fetchInvoices();
//     } catch (err) {
//       console.log("DELETE ERROR:", err);
//     }
//   };

//   // ================= STATUS =================
//   const handleStatus = async (id: number) => {
//     try {
//       await updateInvoiceStatus(id);

//       fetchInvoices();
//     } catch (err) {
//       console.log("STATUS ERROR:", err);
//     }
//   };

//   // ================= LOADING =================
//   if (loading) {
//     return (
//       <Container fluid className="py-5">
//         <Row>
//           <Col className="text-center">
//             <Spinner animation="border" />

//             <p className="mt-3 mb-0">
//               Loading invoices...
//             </p>
//           </Col>
//         </Row>
//       </Container>
//     );
//   }

//   return (
//     <>
//     <div className="page-content py-2">
//         <Container fluid>
//       <Row>
//         <Col md={12}>
//           <Card className="shadow-sm border-0 rounded-4">
//             {/* HEADER */}
//             <Card.Header className="bg-white border-0 py-3">
//               <Row className="align-items-center">
//                 <Col md={6}>
//                   <h3 className="fw-bold mb-0">
//                     Invoice Management
//                   </h3>
//                 </Col>

//                 <Col
//                   md={6}
//                   className="text-md-end mt-3 mt-md-0"
//                 >
//                     <Link to="/admin/manage/orders/invoice/add-new">
//                   <Button variant="light" className="shadow-sm border">
//                     + Create Invoice
//                   </Button>
//                   </Link>
//                 </Col>
//               </Row>
//             </Card.Header>

//             {/* BODY */}
//             <Card.Body>
//               <div className="table-responsive">
//                 <Table
//                   bordered
//                   hover
//                   responsive
//                   className="align-middle"
//                 >
//                   <thead className="table-dark">
//                     <tr>
//                       <th>#</th>
//                       <th>Invoice No</th>
//                       <th>Customer</th>
//                       <th>Tax Type</th>
//                       <th>Tax Amount</th>
//                       <th>Total Amount</th>
//                       <th>Payment</th>
//                       <th>Status</th>
//                       <th>Actions</th>
//                     </tr>
//                   </thead>

//                   <tbody>
//                     {invoices.length > 0 ? (
//                       invoices.map((item: any) => (
//                         <tr key={item.id}>
//                           <td>{item.id}</td>

//                           <td>
//                             <strong>
//                               {item.invoice_no}
//                             </strong>
//                           </td>

//                           <td>
//                             {item.customer_name ||
//                               "N/A"}
//                           </td>

//                           <td>{item.tax_type}</td>

//                           <td>
//                             ₹ {item.tax_amount}
//                           </td>

//                           <td>
//                             <strong>
//                               ₹ {item.total_amount}
//                             </strong>
//                           </td>

//                           <td>
//                             <Badge bg="info">
//                               {item.payment_status}
//                             </Badge>
//                           </td>

//                           <td>
//                             <Badge
//                               bg={
//                                 item.status
//                                   ? "success"
//                                   : "danger"
//                               }
//                             >
//                               {item.status
//                                 ? "Active"
//                                 : "Inactive"}
//                             </Badge>
//                           </td>

//                           <td>
//                             <div className="d-flex gap-2">
//                               {/* STATUS */}
//                               <Button
//                                 size="sm"
//                                 variant="warning"
//                                 onClick={() =>
//                                   handleStatus(item.id)
//                                 }
//                               >
//                                 Toggle
//                               </Button>

//                               {/* DELETE */}
//                               <Button
//                                 size="sm"
//                                 variant="danger"
//                                 onClick={() =>
//                                   handleDelete(item.id)
//                                 }
//                               >
//                                 Delete
//                               </Button>
//                             </div>
//                           </td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td
//                           colSpan={9}
//                           className="text-center py-4"
//                         >
//                           No invoices found
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </Table>
//               </div>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//     </div>
//     </>
//   );
// }
// export default InvoiceList;

import { useEffect, useState } from "react";

import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";

import {
  deleteInvoice,
  getInvoices,
  updateInvoiceStatus,
} from "../../../services/invoiceService";

import { Link } from "react-router-dom";

function InvoiceList() {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // ================= FORMAT DATE =================
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // ================= FETCH INVOICES =================
  const fetchInvoices = async () => {
    try {
      const res = await getInvoices();

      setInvoices(res?.data?.data || []);
    } catch (err) {
      console.log("FETCH ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  // ================= DELETE =================
  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this invoice?",
    );

    if (!confirmDelete) return;

    try {
      await deleteInvoice(id);

      fetchInvoices();
    } catch (err) {
      console.log("DELETE ERROR:", err);
    }
  };

  // ================= STATUS =================
  const handleStatus = async (id: number) => {
    try {
      await updateInvoiceStatus(id);

      fetchInvoices();
    } catch (err) {
      console.log("STATUS ERROR:", err);
    }
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <Container fluid className="py-5">
        <Row>
          <Col className="text-center">
            <Spinner animation="border" />

            <p className="mt-3 mb-0">Loading invoices...</p>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <>
      <div className="page-content py-2">
        <Container fluid>
          <Row>
            <Col md={12}>
              <Card className="shadow-sm border-0 rounded-4">
                {/* HEADER */}
                <Card.Header className="bg-white border-0 py-3">
                  <Row className="align-items-center">
                    <Col md={6}>
                      <h3 className="fw-bold mb-0">Invoice Management</h3>
                    </Col>

                    <Col md={6} className="text-md-end mt-3 mt-md-0">
                      <Link to="/admin/manage/orders/invoice/add-new">
                        <Button variant="light" className="shadow-sm border">
                          + Create Invoice
                        </Button>
                      </Link>
                    </Col>
                  </Row>
                </Card.Header>

                {/* BODY */}
                <Card.Body>
                  <div className="table-responsive">
                    <Table bordered hover responsive className="align-middle">
                      <thead className="table-dark">
                        <tr>
                          <th>#</th>
                          <th>Date</th>
                          <th>Invoice No</th>
                          <th>Customer</th>
                          <th>Tax Type</th>
                          <th>Tax Amount</th>
                          <th>Total Amount</th>
                          <th>Payment</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>

                      <tbody>
                        {invoices.length > 0 ? (
                          invoices.map((item: any) => (
                            <tr key={item.id}>
                              <td>{item.id}</td>

                              <td>
                                {item.created_at
                                  ? formatDate(item.created_at)
                                  : "19 May 2026"}
                              </td>

                              <td>
                                <strong>{item.invoice_no}</strong>
                              </td>

                              <td>{item.customer_name || "N/A"}</td>

                              <td>{item.tax_type}</td>

                              <td>₹ {item.tax_amount}</td>

                              <td>
                                <strong>₹ {item.total_amount}</strong>
                              </td>

                              <td>
                                <Badge bg="info">{item.payment_status}</Badge>
                              </td>

                              <td>
                                <Badge bg={item.status ? "success" : "danger"}>
                                  {item.status ? "Active" : "Inactive"}
                                </Badge>
                              </td>

                              <td>
                                <div className="d-flex gap-2">
                                  <Button
                                    size="sm"
                                    variant="warning"
                                    onClick={() => handleStatus(item.id)}
                                  >
                                    Toggle
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="danger"
                                    onClick={() => handleDelete(item.id)}
                                  >
                                    Delete
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={10} className="text-center py-4">
                              No invoices found
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </Table>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default InvoiceList;
