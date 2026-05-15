// import React from "react";

// function AttributeValues() {
//   return (
//     <div>
//       <h2>Attribute Values Lists</h2>
//     </div>
//   );
// }

// export default AttributeValues;
import { useEffect, useState } from "react";

import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Table,
  Spinner,
} from "react-bootstrap";

import { Link, useNavigate } from "react-router-dom";

import { FaPlus, FaPenNib, FaTrashArrowUp, FaFilter } from "react-icons/fa6";

import { RiDeleteBin6Fill, RiRefreshLine } from "react-icons/ri";

import { MdOutlineToggleOn, MdOutlineToggleOff } from "react-icons/md";

import Swal from "sweetalert2";

import {
  getAttributeValues,
  updateAttributeValueStatus,
  softDeleteAttributeValue,
  restoreAttributeValue,
  deleteAttributeValue,
} from "../../../../services/attributeValueService";

function AttributeValues() {
  const navigate = useNavigate();

  // ======================================================
  // STATES
  // ======================================================

  const [data, setData] = useState<any[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  const [searchTerm, setSearchTerm] = useState<string>("");

  const [entriesPerPage, setEntriesPerPage] = useState<number>(10);

  const [currentPage, setCurrentPage] = useState<number>(1);

  // ======================================================
  // FETCH DATA
  // ======================================================

  const fetchData = async () => {
    try {
      setLoading(true);

      const response = await getAttributeValues();

      setData(response?.data?.data || []);
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to fetch attribute values",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ======================================================
  // STATUS TOGGLE
  // ======================================================

  const handleStatusToggle = async (id: number, currentStatus: boolean) => {
    try {
      const result = await Swal.fire({
        title: currentStatus
          ? "Deactivate Attribute Value?"
          : "Activate Attribute Value?",
        text: currentStatus
          ? "Attribute value will become inactive."
          : "Attribute value will become active.",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: currentStatus ? "#dc3545" : "#198754",
        cancelButtonColor: "#6c757d",
        confirmButtonText: currentStatus ? "Yes, Deactivate" : "Yes, Activate",
      });

      if (!result.isConfirmed) return;

      await updateAttributeValueStatus(id);

      Swal.fire({
        icon: "success",
        title: "Updated",
        text: "Status updated successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      fetchData();
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error?.response?.data?.message || "Failed to update status",
      });
    }
  };

  // ======================================================
  // EDIT
  // ======================================================

  const handleEdit = (id: number) => {
    navigate(`/admin/manage/products/attribute/value/edit/${id}`);
  };

  // ======================================================
  // SOFT DELETE
  // ======================================================

  const handleSoftDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "Delete Attribute Value?",
      text: "Attribute value will be moved to trash.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, Delete",
    });

    if (!result.isConfirmed) return;

    try {
      await softDeleteAttributeValue(id);

      Swal.fire({
        icon: "success",
        title: "Deleted",
        text: "Attribute value deleted successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      fetchData();
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error?.response?.data?.message || "Failed to delete",
      });
    }
  };

  // ======================================================
  // RESTORE
  // ======================================================

  const handleRestore = async (id: number) => {
    try {
      await restoreAttributeValue(id);

      Swal.fire({
        icon: "success",
        title: "Restored",
        text: "Attribute value restored successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      fetchData();
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error?.response?.data?.message || "Failed to restore",
      });
    }
  };

  // ======================================================
  // HARD DELETE
  // ======================================================

  const handlePermanentDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "Permanent Delete?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, Delete",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteAttributeValue(id);

      Swal.fire({
        icon: "success",
        title: "Deleted",
        text: "Attribute value permanently deleted",
        timer: 1500,
        showConfirmButton: false,
      });

      fetchData();
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error?.response?.data?.message || "Failed to delete",
      });
    }
  };

  // ======================================================
  // FILTER
  // ======================================================

  const filteredData = data.filter((item: any) => {
    return (
      item.value_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.attribute_name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // ======================================================
  // PAGINATION
  // ======================================================

  const indexOfLastItem = currentPage * entriesPerPage;

  const indexOfFirstItem = indexOfLastItem - entriesPerPage;

  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / entriesPerPage);

  return (
    <div className="page-content py-2">
      <Container fluid>
        {/* HEADER */}

        <Row className="mb-4">
          <Col xl={12}>
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
              <div>
                <h4
                  className="mb-1"
                  style={{
                    fontWeight: 700,
                    color: "#14468C",
                  }}
                >
                  Attribute Values
                </h4>
              </div>

              <Link to="/admin/manage/products/attribute/value/add-new">
                <Button
                  style={{
                    backgroundColor: "#14468C",
                    border: "none",
                    borderRadius: "10px",
                    padding: "10px 18px",
                    fontWeight: 600,
                  }}
                >
                  <FaPlus className="me-2" />
                  Add Attribute Value
                </Button>
              </Link>
            </div>
          </Col>
        </Row>

        {/* TABLE */}

        <Card>
          <p className="text-dark fw-semibold mb-0 p-3 border-bottom">
            Manage all product attribute values
          </p>
          <Card.Body>
            {/* FILTER */}

            <Row className="mb-3 align-items-center">
              <Col md={6}>
                <div className="d-flex align-items-center gap-2">
                  <span>Show</span>

                  <Form.Select
                    style={{
                      width: "90px",
                    }}
                    value={entriesPerPage}
                    onChange={(e) => {
                      setEntriesPerPage(Number(e.target.value));

                      setCurrentPage(1);
                    }}
                  >
                    <option value={5}>5</option>

                    <option value={10}>10</option>

                    <option value={25}>25</option>

                    <option value={50}>50</option>
                  </Form.Select>

                  <span>entries</span>
                </div>
              </Col>

              <Col md={6}>
                <div className="d-flex justify-content-md-end mt-3 mt-md-0">
                  <Form.Control
                    type="text"
                    placeholder="Search attribute values..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);

                      setCurrentPage(1);
                    }}
                    style={{
                      maxWidth: "300px",
                      borderRadius: "10px",
                    }}
                  />
                </div>
              </Col>
            </Row>

            {/* TABLE */}

            <Table bordered hover responsive>
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Attribute</th>
                  <th>Value Name</th>
                  <th>Value Code</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {!loading && currentData.length > 0 ? (
                  currentData.map((item: any, index: number) => (
                    <tr key={item.id}>
                      <td>{indexOfFirstItem + index + 1}</td>

                      <td>
                        <Badge bg="primary">{item.attribute_name}</Badge>
                      </td>

                      <td>{item.value_name}</td>

                      <td>{item.value_code}</td>

                      <td>
                        <Button
                          size="sm"
                          variant={item.status ? "success" : "warning"}
                          onClick={() =>
                            handleStatusToggle(item.id, item.status)
                          }
                          style={{
                            border: "none",
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                          }}
                        >
                          {item.status ? (
                            <MdOutlineToggleOn size={22} />
                          ) : (
                            <MdOutlineToggleOff size={22} />
                          )}
                        </Button>
                      </td>

                      <td>
                        <div className="d-flex gap-2 flex-wrap">
                          {!item.is_deleted && (
                            <Button
                              size="sm"
                              variant="info"
                              onClick={() => handleEdit(item.id)}
                            >
                              <FaPenNib />
                            </Button>
                          )}

                          {!item.is_deleted ? (
                            <Button
                              size="sm"
                              variant="warning"
                              onClick={() => handleSoftDelete(item.id)}
                            >
                              <FaTrashArrowUp />
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              variant="success"
                              onClick={() => handleRestore(item.id)}
                            >
                              <RiRefreshLine />
                            </Button>
                          )}

                          <Button
                            size="sm"
                            variant="danger"
                            onClick={() => handlePermanentDelete(item.id)}
                          >
                            <RiDeleteBin6Fill />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-4">
                      {loading ? (
                        <Spinner animation="border" />
                      ) : (
                        "No attribute values found"
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>

            {/* PAGINATION */}

            <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap gap-2">
              <div>
                Showing {indexOfFirstItem + 1} to{" "}
                {Math.min(indexOfLastItem, filteredData.length)} of{" "}
                {filteredData.length} entries
              </div>

              <div className="d-flex gap-1">
                {[...Array(totalPages)].map((_, index) => (
                  <Button
                    key={index}
                    size="sm"
                    variant={
                      currentPage === index + 1 ? "primary" : "outline-primary"
                    }
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </Button>
                ))}
              </div>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default AttributeValues;
