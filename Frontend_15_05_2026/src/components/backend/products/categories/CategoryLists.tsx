import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Table,
} from "react-bootstrap";

import { FaPenNib, FaPlus } from "react-icons/fa";
import { RiDeleteBin6Fill, RiRefreshLine } from "react-icons/ri";
import { MdOutlineToggleOn, MdOutlineToggleOff } from "react-icons/md";

import { FaTrashArrowUp } from "react-icons/fa6";

import { Link, useLocation, useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

import {
  getListRecords,
  updateRecordStatus,
  softDeleteRecord,
  restoreSoftDeleteRecord,
  deleteRecord,
} from "../../../../services/categoryServices";

import { getImageUrl, UPLOAD_PATHS } from "../../../../config/uploadPathConfig";

import NoImage from "../../../../assets/images/No_Image_Available.jpg";

function CategoryLists() {
  const location = useLocation();
  const navigate = useNavigate();

  const [successMessage, setSuccessMessage] = useState("");

  const [categories, setCategories] = useState<any[]>([]);

  const [searchTerm, setSearchTerm] = useState("");

  const [entriesPerPage, setEntriesPerPage] = useState(10);

  const [currentPage, setCurrentPage] = useState(1);

  const [loading, setLoading] = useState(false);

  // ================= SUCCESS MESSAGE =================
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);

    const success = queryParams.get("success");

    if (success) {
      setSuccessMessage(success);

      navigate(location.pathname, {
        replace: true,
      });
    }
  }, [location, navigate]);

  // ================= FETCH DATA =================
  const fetchData = async () => {
    try {
      setLoading(true);

      const response = await getListRecords();

      // console.log("CATEGORY RESPONSE :", response.data);

      setCategories(response?.data?.data || []);
    } catch (error) {
      console.error("Category Fetch Error :", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ================= STATUS TOGGLE =================
  const handleStatusToggle = async (id: number, currentStatus: boolean) => {
    try {
      const result = await Swal.fire({
        title: currentStatus ? "Deactivate Category?" : "Activate Category?",

        text: currentStatus
          ? "Category will become inactive."
          : "Category will become active.",

        icon: "question",

        showCancelButton: true,

        confirmButtonColor: currentStatus ? "#dc3545" : "#198754",

        cancelButtonColor: "#6c757d",

        confirmButtonText: currentStatus ? "Yes, Deactivate" : "Yes, Activate",
      });

      if (!result.isConfirmed) return;

      await updateRecordStatus(id);

      Swal.fire({
        icon: "success",
        title: "Updated",
        text: "Category status updated successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      fetchData();
    } catch (err: any) {
      Swal.fire(
        "Error",
        err?.response?.data?.message || "Status update failed",
        "error",
      );
    }
  };

  // ================= EDIT =================
  const handleEdit = (id: number) => {
    navigate(`/admin/manage/products/category/edit/${id}`);
  };

  // ================= SOFT DELETE =================
  const handleSoftDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "Soft Delete Category?",
      text: "Category will move to trash.",
      icon: "warning",

      showCancelButton: true,

      confirmButtonColor: "#dc3545",

      cancelButtonColor: "#6c757d",

      confirmButtonText: "Yes, Delete",
    });

    if (!result.isConfirmed) return;

    try {
      await softDeleteRecord(id);

      Swal.fire({
        icon: "success",
        title: "Deleted",
        text: "Category soft deleted successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      fetchData();
    } catch (err: any) {
      Swal.fire(
        "Error",
        err?.response?.data?.message || "Delete failed",
        "error",
      );
    }
  };

  // ================= RESTORE =================
  const handleRestore = async (id: number) => {
    const result = await Swal.fire({
      title: "Restore Category?",
      text: "Category will be restored.",
      icon: "question",

      showCancelButton: true,

      confirmButtonColor: "#198754",

      cancelButtonColor: "#6c757d",

      confirmButtonText: "Yes, Restore",
    });

    if (!result.isConfirmed) return;

    try {
      await restoreSoftDeleteRecord(id);

      Swal.fire({
        icon: "success",
        title: "Restored",
        text: "Category restored successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      fetchData();
    } catch (err: any) {
      Swal.fire(
        "Error",
        err?.response?.data?.message || "Restore failed",
        "error",
      );
    }
  };

  // ================= HARD DELETE =================
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
      await deleteRecord(id);

      Swal.fire({
        icon: "success",
        title: "Deleted",
        text: "Category permanently deleted",
        timer: 1500,
        showConfirmButton: false,
      });

      fetchData();
    } catch (err: any) {
      Swal.fire(
        "Error",
        err?.response?.data?.message || "Delete failed",
        "error",
      );
    }
  };

  // ================= SEARCH FILTER =================
  const filteredData = categories.filter((item: any) =>
    item.category_name?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // ================= PAGINATION =================
  const indexOfLastItem = currentPage * entriesPerPage;

  const indexOfFirstItem = indexOfLastItem - entriesPerPage;

  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / entriesPerPage);

  return (
    <div className="page-content py-3">
      <Container fluid>
        {/* HEADER */}
        <Row>
          <Col xl={12}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4
                style={{
                  fontSize: "20px",
                  fontWeight: 600,
                  color: "#14468C",
                }}
              >
                Category List
              </h4>

              <Link to="/admin/manage/products/category/add-new">
                <Button
                  style={{
                    backgroundColor: "#14468C",
                    border: "none",
                  }}
                >
                  <FaPlus className="me-1" />
                  Add Category
                </Button>
              </Link>
            </div>
          </Col>
        </Row>

        {/* SUCCESS MESSAGE */}
        {successMessage && (
          <div className="alert alert-success alert-dismissible fade show">
            <strong>Success!</strong> {successMessage}
            <button
              type="button"
              className="btn-close"
              onClick={() => setSuccessMessage("")}
            ></button>
          </div>
        )}

        {/* TABLE */}
        <Card>
          <Card.Body>
            {/* TOP BAR */}
            <Row className="mb-3 align-items-center">
              <Col md={6}>
                <div className="d-flex align-items-center gap-2">
                  <span>Show</span>

                  <Form.Select
                    style={{ width: "90px" }}
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
                    placeholder="Search category..."
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

            <Table bordered hover responsive>
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Category Name</th>
                  <th>Slug</th>
                  <th>Description</th>
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
                        <img
                          src={getImageUrl(
                            UPLOAD_PATHS.productCategories,
                            item.images?.[0]?.image,
                          )}
                          alt={item.category_name}
                          width="30"
                          height="30"
                          style={{
                            objectFit: "cover",
                            borderRadius: "5px",
                            border: "1px solid #ddd",
                          }}
                          onError={(e: any) => {
                            e.target.src = { NoImage };
                          }}
                        />{" "}
                        &nbsp;
                        {item.category_name}
                      </td>
                      <td>{item.category_slug}</td>
                      {/* <td>{item.description}</td> */}
                      <td>
                        {item.description?.length > 80 ? (
                          <>
                            {item.description.substring(0, 80)}...
                            <button
                              className="btn btn-link btn-sm p-0 ms-1"
                              data-bs-toggle="modal"
                              data-bs-target={`#descModal${item.id}`}
                            >
                              See More
                            </button>
                            {/* Modal */}
                            <div
                              className="modal fade"
                              id={`descModal${item.id}`}
                              tabIndex={-1}
                              aria-hidden="true"
                            >
                              <div className="modal-dialog modal-dialog-centered modal-lg">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5 className="modal-title">Description</h5>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      data-bs-dismiss="modal"
                                    ></button>
                                  </div>

                                  <div className="modal-body">
                                    {item.description}
                                  </div>

                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      data-bs-dismiss="modal"
                                    >
                                      Close
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        ) : (
                          item.description
                        )}
                      </td>
                      <td>
                        <Button
                          size="sm"
                          variant={item.status ? "success" : "warning"}
                          onClick={() =>
                            handleStatusToggle(item.id, item.status)
                          }
                          style={{
                            border: "none",
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
                              <FaTrashArrowUp size={18} />
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
                    <td colSpan={7} className="text-center">
                      {loading ? "Loading..." : "No Category Found"}
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>

            {/* PAGINATION */}
            <div className="d-flex justify-content-between align-items-center mt-3">
              <div>
                Showing {filteredData.length === 0 ? 0 : indexOfFirstItem + 1}{" "}
                to {Math.min(indexOfLastItem, filteredData.length)} of{" "}
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

export default CategoryLists;
