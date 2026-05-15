// import React from "react";

// function ProductAttributes() {
//   return (
//     <div>
//       <h2>Product Attributes Lists</h2>
//     </div>
//   );
// }

// export default ProductAttributes;

import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Table,
  Badge,
  Spinner,
} from "react-bootstrap";

import { FaPenNib, FaPlus } from "react-icons/fa";
import { RiDeleteBin6Fill, RiRefreshLine } from "react-icons/ri";
import { MdOutlineToggleOn, MdOutlineToggleOff } from "react-icons/md";
import { FaTrashArrowUp } from "react-icons/fa6";

import { Link, useLocation, useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

import {
  getProductAttributes,
  updateProductAttributeStatus,
  softDeleteProductAttribute,
  restoreProductAttribute,
  deleteProductAttribute,
} from "../../../../services/attributeService";
import usePageTitle from "../../../../hooks/usePageTitle";

interface ProductAttribute {
  id: number;
  attribute_name: string;
  attribute_slug: string;
  status: boolean;
  is_deleted: boolean;
  created_at?: string;
}

function ProductAttributes() {
  usePageTitle("Product Attributes");
  const location = useLocation();
  const navigate = useNavigate();

  const [successMessage, setSuccessMessage] = useState("");

  const [attributes, setAttributes] = useState<ProductAttribute[]>([]);

  const [searchTerm, setSearchTerm] = useState("");

  const [entriesPerPage, setEntriesPerPage] = useState<number>(10);

  const [currentPage, setCurrentPage] = useState<number>(1);

  const [loading, setLoading] = useState<boolean>(false);

  // ======================================================
  // SUCCESS MESSAGE
  // ======================================================

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);

    const success = queryParams.get("success");

    if (success) {
      setSuccessMessage(success);

      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  // ======================================================
  // FETCH DATA
  // ======================================================

  const fetchData = async () => {
    try {
      setLoading(true);

      const response = await getProductAttributes();

      setAttributes(response?.data?.data || []);
    } catch (error) {
      console.error("Error fetching product attributes:", error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to fetch product attributes",
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
          ? "Deactivate Product Attribute?"
          : "Activate Product Attribute?",
        text: currentStatus
          ? "Product attribute will become inactive."
          : "Product attribute will become active.",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: currentStatus ? "#dc3545" : "#198754",
        cancelButtonColor: "#6c757d",
        confirmButtonText: currentStatus ? "Yes, Deactivate" : "Yes, Activate",
      });

      if (!result.isConfirmed) return;

      await updateProductAttributeStatus(id);

      Swal.fire({
        icon: "success",
        title: "Updated",
        text: "Product attribute status updated successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      fetchData();
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err?.response?.data?.message || "Status update failed",
      });
    }
  };

  // ======================================================
  // EDIT
  // ======================================================

  const handleEdit = (id: number) => {
    navigate(`/admin/manage/products/attributes/edit/${id}`);
  };

  // ======================================================
  // SOFT DELETE
  // ======================================================

  const handleSoftDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "Soft Delete Product Attribute?",
      text: "Product attribute will be moved to trash.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, Delete",
    });

    if (!result.isConfirmed) return;

    try {
      await softDeleteProductAttribute(id);

      Swal.fire({
        icon: "success",
        title: "Deleted",
        text: "Product attribute soft deleted successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      fetchData();
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err?.response?.data?.message || "Delete failed",
      });
    }
  };

  // ======================================================
  // RESTORE
  // ======================================================

  const handleRestore = async (id: number) => {
    const result = await Swal.fire({
      title: "Restore Product Attribute?",
      text: "Product attribute will be restored.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#198754",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, Restore",
    });

    if (!result.isConfirmed) return;

    try {
      await restoreProductAttribute(id);

      Swal.fire({
        icon: "success",
        title: "Restored",
        text: "Product attribute restored successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      fetchData();
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err?.response?.data?.message || "Restore failed",
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
      confirmButtonText: "Yes, Delete Permanently",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteProductAttribute(id);

      Swal.fire({
        icon: "success",
        title: "Deleted",
        text: "Product attribute permanently deleted",
        timer: 1500,
        showConfirmButton: false,
      });

      fetchData();
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err?.response?.data?.message || "Delete failed",
      });
    }
  };

  // ======================================================
  // FILTER
  // ======================================================

  const filteredData = attributes.filter((filtItem: ProductAttribute) =>
    filtItem.attribute_name?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // ======================================================
  // PAGINATION
  // ======================================================

  const indexOfLastItem = currentPage * entriesPerPage;

  const indexOfFirstItem = indexOfLastItem - entriesPerPage;

  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / entriesPerPage);

  return (
    <div className="page-content py-3">
      <Container fluid>
        {/* PAGE HEADER */}
        <Row className="mb-3">
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
                  Weight Units
                </h4>
              </div>

              <Link to="/admin/manage/products/attributes/add-new">
                <Button
                  style={{
                    backgroundColor: "#14468C",
                    border: "none",
                    fontWeight: 600,
                  }}
                >
                  <FaPlus className="me-2" />
                  Add Product Attribute
                </Button>
              </Link>
            </div>
          </Col>
        </Row>

        {/* SUCCESS MESSAGE */}
        {successMessage && (
          <div
            className="alert alert-success alert-dismissible fade show"
            role="alert"
          >
            <strong>Success!</strong> {successMessage}
            <button
              type="button"
              className="btn-close"
              onClick={() => setSuccessMessage("")}
            ></button>
          </div>
        )}

        {/* CARD */}
        <Card
          className="border-0 shadow-sm"
          style={{
            borderRadius: "12px",
          }}
        >
          <p className="text-muted mb-0 p-2 text-dark fw-semibold">
            Manage all product attributes
          </p>
          <Card.Body>
            {/* FILTER SECTION */}

            <Row className="mb-3 align-items-center">
              <Col md={6}>
                <div className="d-flex align-items-center gap-2">
                  <span className="fw-semibold">Show</span>

                  <Form.Select
                    style={{ width: "100px" }}
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

                  <span className="fw-semibold">entries</span>
                </div>
              </Col>

              <Col md={6}>
                <div className="d-flex justify-content-md-end mt-3 mt-md-0">
                  <Form.Control
                    type="text"
                    placeholder="Search weight unit..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);

                      setCurrentPage(1);
                    }}
                    style={{
                      maxWidth: "300px",
                    }}
                  />
                </div>
              </Col>
            </Row>

            {/* TABLE */}
            <Table bordered hover responsive className="align-middle">
              <thead
                style={{
                  backgroundColor: "#14468C",
                  color: "#fff",
                }}
              >
                <tr>
                  <th>#</th>
                  <th>Unit Name</th>
                  <th>Short Name</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="text-center py-5">
                      <Spinner animation="border" />
                    </td>
                  </tr>
                ) : currentData.length > 0 ? (
                  currentData.map(
                    (attrItem: ProductAttribute, index: number) => (
                      <tr key={attrItem.id}>
                        <td>{indexOfFirstItem + index + 1}</td>

                        <td className="fw-semibold">
                          {attrItem.attribute_name}
                        </td>

                        <td>
                          <Badge bg="dark">{attrItem.attribute_slug}</Badge>
                        </td>

                        <td>
                          <Button
                            size="sm"
                            variant={attrItem.status ? "success" : "warning"}
                            onClick={() =>
                              handleStatusToggle(attrItem.id, attrItem.status)
                            }
                            style={{
                              border: "none",
                              display: "flex",
                              alignItems: "center",
                              gap: "4px",
                            }}
                          >
                            {attrItem.status ? (
                              <>
                                <MdOutlineToggleOn size={22} />
                              </>
                            ) : (
                              <>
                                <MdOutlineToggleOff size={22} />
                              </>
                            )}
                          </Button>
                        </td>

                        <td>
                          <div className="d-flex gap-2 flex-wrap">
                            {!attrItem.is_deleted && (
                              <Button
                                size="sm"
                                variant="info"
                                onClick={() => handleEdit(attrItem.id)}
                              >
                                <FaPenNib />
                              </Button>
                            )}

                            {!attrItem.is_deleted ? (
                              <Button
                                size="sm"
                                variant="warning"
                                onClick={() => handleSoftDelete(attrItem.id)}
                              >
                                <FaTrashArrowUp size={16} />
                              </Button>
                            ) : (
                              <Button
                                size="sm"
                                variant="success"
                                onClick={() => handleRestore(attrItem.id)}
                              >
                                <RiRefreshLine />
                              </Button>
                            )}

                            <Button
                              size="sm"
                              variant="danger"
                              onClick={() => handlePermanentDelete(attrItem.id)}
                            >
                              <RiDeleteBin6Fill />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ),
                  )
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center py-4">
                      No Weight Units Found
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>

            {/* ====================================================== */}
            {/* PAGINATION */}
            {/* ====================================================== */}

            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mt-3">
              <div className="text-muted">
                Showing{" "}
                <strong>
                  {filteredData.length === 0 ? 0 : indexOfFirstItem + 1}
                </strong>{" "}
                to{" "}
                <strong>
                  {Math.min(indexOfLastItem, filteredData.length)}
                </strong>{" "}
                of <strong>{filteredData.length}</strong> entries
              </div>

              <div className="d-flex gap-1 flex-wrap">
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

export default ProductAttributes;
