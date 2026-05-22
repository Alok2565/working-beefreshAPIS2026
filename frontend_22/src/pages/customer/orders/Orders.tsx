// import usePageTitle from "../../../hooks/usePageTitle";

// function Orders() {
//   usePageTitle("Orders");
//   return (
//     <div>
//       <h2>Welcome to Orders page</h2>
//     </div>
//   );
// }

// export default Orders;

import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Badge,
  Button,
  Form,
  InputGroup,
  Pagination,
} from "react-bootstrap";

import { FaSearch, FaEye, FaDownload, FaTruck } from "react-icons/fa";

import { useState } from "react";

import usePageTitle from "../../../hooks/usePageTitle";

import Breadcrumbs from "../../../components/Breadcrumbs";

function Orders() {
  usePageTitle("Orders Lists");

  // =========================================
  // DEMO ORDER DATA
  // =========================================
  const [orders] = useState([
    {
      id: "ORD-1001",
      customer: "Alok Singh",
      date: "17 May 2026",
      payment: "UPI Payment",
      status: "Delivered",
      total: 2450,
    },

    {
      id: "ORD-1002",
      customer: "Rahul Sharma",
      date: "16 May 2026",
      payment: "Cash on Delivery",
      status: "Pending",
      total: 1850,
    },

    {
      id: "ORD-1003",
      customer: "Priya Verma",
      date: "15 May 2026",
      payment: "Credit / Debit Card",
      status: "Shipped",
      total: 3250,
    },

    {
      id: "ORD-1004",
      customer: "Amit Kumar",
      date: "14 May 2026",
      payment: "UPI Payment",
      status: "Cancelled",
      total: 950,
    },
  ]);

  // =========================================
  // CHECKBOX STATE
  // =========================================
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);

  // =========================================
  // HANDLE SINGLE CHECKBOX
  // =========================================
  const handleSelectOrder = (orderId: string) => {
    if (selectedOrders.includes(orderId)) {
      setSelectedOrders(selectedOrders.filter((id) => id !== orderId));
    } else {
      setSelectedOrders([...selectedOrders, orderId]);
    }
  };

  // =========================================
  // HANDLE SELECT ALL
  // =========================================
  const handleSelectAll = () => {
    if (selectedOrders.length === orders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(orders.map((order) => order.id));
    }
  };

  // =========================================
  // EXPORT SELECTED
  // =========================================
  const handleExportSelected = () => {
    console.log("Export Orders:", selectedOrders);

    alert(`${selectedOrders.length} Order(s) Selected for Export`);
  };

  // =========================================
  // STATUS BADGE
  // =========================================
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Delivered":
        return "success";

      case "Pending":
        return "warning";

      case "Shipped":
        return "primary";

      case "Cancelled":
        return "danger";

      default:
        return "secondary";
    }
  };

  return (
    <div className="page-content py-4 bg-light min-vh-100">
      <Container fluid>
        <Breadcrumbs />

        {/* ========================================= */}
        {/* PAGE HEADER */}
        {/* ========================================= */}
        <Row className="mb-4">
          <Col>
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
              <div>
                <h2 className="fw-bold mb-1">Order Lists</h2>

                <p className="text-muted mb-0">
                  Manage and track all customer orders
                </p>
              </div>

              <Button
                variant="warning"
                className="fw-semibold px-4 rounded-pill"
                disabled={selectedOrders.length === 0}
                onClick={handleExportSelected}
              >
                <FaDownload className="me-2" />
                Export Selected ({selectedOrders.length})
              </Button>
            </div>
          </Col>
        </Row>

        {/* ========================================= */}
        {/* ORDER SUMMARY */}
        {/* ========================================= */}
        <Row className="g-4 mb-4">
          <Col md={3}>
            <Card className="border-0 shadow-sm rounded-4 h-100">
              <Card.Body>
                <small className="text-muted">Total Orders</small>

                <h3 className="fw-bold mt-2 mb-0">150</h3>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3}>
            <Card className="border-0 shadow-sm rounded-4 h-100">
              <Card.Body>
                <small className="text-muted">Pending Orders</small>

                <h3 className="fw-bold text-warning mt-2 mb-0">25</h3>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3}>
            <Card className="border-0 shadow-sm rounded-4 h-100">
              <Card.Body>
                <small className="text-muted">Delivered Orders</small>

                <h3 className="fw-bold text-success mt-2 mb-0">110</h3>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3}>
            <Card className="border-0 shadow-sm rounded-4 h-100">
              <Card.Body>
                <small className="text-muted">Revenue</small>

                <h3 className="fw-bold text-primary mt-2 mb-0">₹1,25,000</h3>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* ========================================= */}
        {/* ORDER TABLE */}
        {/* ========================================= */}
        <Card className="border-0 shadow-sm rounded-4">
          <Card.Body className="p-4">
            {/* SEARCH & FILTER */}
            <Row className="mb-4 g-3">
              <Col md={6}>
                <InputGroup>
                  <InputGroup.Text className="bg-white border-end-0">
                    <FaSearch />
                  </InputGroup.Text>

                  <Form.Control
                    type="text"
                    placeholder="Search by Order ID or Customer"
                    className="border-start-0"
                  />
                </InputGroup>
              </Col>

              <Col md={3}>
                <Form.Select>
                  <option>Filter By Status</option>

                  <option>Pending</option>

                  <option>Delivered</option>

                  <option>Shipped</option>

                  <option>Cancelled</option>
                </Form.Select>
              </Col>

              <Col md={3}>
                <Form.Select>
                  <option>Sort By</option>

                  <option>Latest Orders</option>

                  <option>Oldest Orders</option>

                  <option>Highest Amount</option>

                  <option>Lowest Amount</option>
                </Form.Select>
              </Col>
            </Row>

            {/* TABLE */}
            <div className="table-responsive">
              <Table hover bordered className="align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    {/* CHECKBOX */}
                    <th width="50">
                      <Form.Check
                        type="checkbox"
                        checked={
                          selectedOrders.length === orders.length &&
                          orders.length > 0
                        }
                        onChange={handleSelectAll}
                      />
                    </th>

                    <th>Order ID</th>

                    <th>Customer</th>

                    <th>Date</th>

                    <th>Payment</th>

                    <th>Status</th>

                    <th>Total</th>

                    <th className="text-center">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      {/* CHECKBOX */}
                      <td>
                        <Form.Check
                          type="checkbox"
                          checked={selectedOrders.includes(order.id)}
                          onChange={() => handleSelectOrder(order.id)}
                        />
                      </td>

                      <td className="fw-semibold">{order.id}</td>

                      <td>{order.customer}</td>

                      <td>{order.date}</td>

                      <td>{order.payment}</td>

                      <td>
                        <Badge
                          bg={getStatusBadge(order.status)}
                          className="px-3 py-2"
                        >
                          {order.status}
                        </Badge>
                      </td>

                      <td className="fw-bold text-success">
                        ₹{order.total.toLocaleString()}
                      </td>

                      <td>
                        <div className="d-flex justify-content-center gap-2">
                          <Button variant="outline-primary" size="sm">
                            <FaEye />
                          </Button>

                          <Button variant="outline-success" size="sm">
                            <FaTruck />
                          </Button>

                          <Button variant="outline-dark" size="sm">
                            <FaDownload />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>

            {/* PAGINATION */}
            <div className="d-flex justify-content-between align-items-center flex-wrap mt-4">
              <div className="text-muted">Showing 1 to 4 of 150 orders</div>

              <Pagination className="mb-0">
                <Pagination.Prev />

                <Pagination.Item active>1</Pagination.Item>

                <Pagination.Item>2</Pagination.Item>

                <Pagination.Item>3</Pagination.Item>

                <Pagination.Next />
              </Pagination>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default Orders;
