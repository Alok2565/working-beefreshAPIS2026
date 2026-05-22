// import React from "react";

// function BrandLists() {
//   return (
//     <div>
//       <h2>BrandLists</h2>
//     </div>
//   );
// }

// export default BrandLists;

// import React from "react";

// function FlavorLists() {
//   return (
//     <div>
//       <h2>Flavor Lists</h2>
//     </div>
//   );
// }

// export default FlavorLists;

import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Table,
  Spinner,
} from "react-bootstrap";

import { FaPenNib, FaPlus } from "react-icons/fa";
import { RiDeleteBin6Fill, RiRefreshLine } from "react-icons/ri";
import { MdOutlineToggleOn, MdOutlineToggleOff } from "react-icons/md";
import { FaTrashArrowUp } from "react-icons/fa6";

import { Link, useLocation, useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

import {
  getBrands,
  updateBrandStatus,
  softDeleteBrand,
  restoreBrand,
  deleteBrand,
} from "../../../../services/brandService";
import usePageTitle from "../../../../hooks/usePageTitle";

interface Brand {
  id: number;
  brand_name: string;
  brand_slug: string;
  status: boolean;
  is_deleted: boolean;
  created_at?: string;
}

function BrandLists() {
  usePageTitle("Brand Lists");
  const location = useLocation();
  const navigate = useNavigate();

  const [successMessage, setSuccessMessage] = useState("");

  const [brands, setBrands] = useState<Brand[]>([]);

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

      const response = await getBrands();

      setBrands(response?.data?.data || []);
    } catch (error) {
      console.error("Error fetching Brand:", error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to fetch Brand",
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
        title: currentStatus ? "Deactivate Brand?" : "Activate Brand?",
        text: currentStatus
          ? "Flavor will become inactive."
          : "Flavor will become active.",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: currentStatus ? "#dc3545" : "#198754",
        cancelButtonColor: "#6c757d",
        confirmButtonText: currentStatus ? "Yes, Deactivate" : "Yes, Activate",
      });

      if (!result.isConfirmed) return;

      await updateBrandStatus(id);

      Swal.fire({
        icon: "success",
        title: "Updated",
        text: "Brand status updated successfully",
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
    navigate(`/admin/manage/brand/edit/${id}`);
  };

  // ======================================================
  // SOFT DELETE
  // ======================================================

  const handleSoftDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "Soft Delete Flavor?",
      text: "Flavor will be moved to trash.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, Delete",
    });

    if (!result.isConfirmed) return;

    try {
      await softDeleteBrand(id);

      Swal.fire({
        icon: "success",
        title: "Deleted",
        text: "Brand soft deleted successfully",
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
      title: "Restore Brand?",
      text: "Brand will be restored.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#198754",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, Restore",
    });

    if (!result.isConfirmed) return;

    try {
      await restoreBrand(id);

      Swal.fire({
        icon: "success",
        title: "Restored",
        text: "Brand restored successfully",
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
      await deleteBrand(id);

      Swal.fire({
        icon: "success",
        title: "Deleted",
        text: "Brand permanently deleted",
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

  const filteredData = brands.filter((filtItem: Brand) =>
    filtItem.brand_name?.toLowerCase().includes(searchTerm.toLowerCase()),
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
        {/* ====================================================== */}
        {/* PAGE HEADER */}
        {/* ====================================================== */}

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
                  Brands
                </h4>
              </div>

              <Link to="/admin/manage/brand/add-new">
                <Button
                  style={{
                    backgroundColor: "#14468C",
                    border: "none",
                    fontWeight: 600,
                  }}
                >
                  <FaPlus className="me-2" />
                  Add Brands
                </Button>
              </Link>
            </div>
          </Col>
        </Row>

        {/* ====================================================== */}
        {/* SUCCESS MESSAGE */}
        {/* ====================================================== */}

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

        {/* ====================================================== */}
        {/* CARD */}
        {/* ====================================================== */}

        <Card
          className="border-0 shadow-sm"
          style={{
            borderRadius: "12px",
          }}
        >
          <p className="text-muted mb-0 p-2 text-dark">Manage all Brand</p>
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
                    placeholder="Search brand..."
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

            {/* ====================================================== */}
            {/* TABLE */}
            {/* ====================================================== */}

            <Table bordered hover responsive className="align-middle">
              <thead
                style={{
                  backgroundColor: "#14468C",
                  color: "#fff",
                }}
              >
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Slug</th>
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
                  currentData.map((itemsData: Brand, index: number) => (
                    <tr key={itemsData.id}>
                      <td>{indexOfFirstItem + index + 1}</td>

                      <td className="fw-semibold">{itemsData.brand_name}</td>

                      <td>{itemsData.brand_slug} </td>

                      <td>
                        <Button
                          size="sm"
                          variant={itemsData.status ? "success" : "warning"}
                          onClick={() =>
                            handleStatusToggle(itemsData.id, itemsData.status)
                          }
                          style={{
                            border: "none",
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                          }}
                        >
                          {itemsData.status ? (
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
                          {!itemsData.is_deleted && (
                            <Button
                              size="sm"
                              variant="info"
                              onClick={() => handleEdit(itemsData.id)}
                            >
                              <FaPenNib />
                            </Button>
                          )}

                          {!itemsData.is_deleted ? (
                            <Button
                              size="sm"
                              variant="warning"
                              onClick={() => handleSoftDelete(itemsData.id)}
                            >
                              <FaTrashArrowUp size={16} />
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              variant="success"
                              onClick={() => handleRestore(itemsData.id)}
                            >
                              <RiRefreshLine />
                            </Button>
                          )}

                          <Button
                            size="sm"
                            variant="danger"
                            onClick={() => handlePermanentDelete(itemsData.id)}
                          >
                            <RiDeleteBin6Fill />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center py-4">
                      No Flavors Found
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>

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

export default BrandLists;
