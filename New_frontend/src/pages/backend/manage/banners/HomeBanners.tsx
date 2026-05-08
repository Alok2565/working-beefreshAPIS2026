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
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaTrashArrowUp } from "react-icons/fa6";

import {
  getHomeBanner,
  updateBannerStatus,
  softDeleteHomeBanner,
  restoreHomeBanner,
  deleteHomeBanner,
} from "../../../../services/homeBannerServices";

function HomeBanners() {
  const location = useLocation();
  const navigate = useNavigate();

  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);

    const success = queryParams.get("success");

    if (success) {
      setSuccessMessage(success);

      // ✅ REMOVE QUERY PARAM AFTER SHOWING MESSAGE
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  const [banners, setBanners] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // ================= FETCH =================
  const fetchBannerData = async () => {
    try {
      setLoading(true);

      const response = await getHomeBanner();

      setBanners(response.data.data || []);
    } catch (err) {
      console.error("Error fetching banners:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBannerData();
  }, []);

  // ================= STATUS TOGGLE =================
  const handleStatusToggle = async (id: number, currentStatus: boolean) => {
    try {
      const result = await Swal.fire({
        title: currentStatus ? "Deactivate Banner?" : "Activate Banner?",
        text: currentStatus
          ? "Banner will become inactive."
          : "Banner will become active.",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: currentStatus ? "#dc3545" : "#198754",
        cancelButtonColor: "#6c757d",
        confirmButtonText: currentStatus ? "Yes, Deactivate" : "Yes, Activate",
      });

      if (!result.isConfirmed) return;

      await updateBannerStatus(id);

      Swal.fire({
        icon: "success",
        title: "Updated",
        text: "Banner status updated successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      fetchBannerData();
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
    navigate(`/admin/manage/home-banner/edit/${id}`);
  };

  // ================= SOFT DELETE =================
  const handleSoftDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "Soft Delete Banner?",
      text: "Banner will be moved to trash.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, Delete",
    });

    if (!result.isConfirmed) return;

    try {
      await softDeleteHomeBanner(id);

      Swal.fire({
        icon: "success",
        title: "Deleted",
        text: "Banner soft deleted successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      fetchBannerData();
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
      title: "Restore Banner?",
      text: "Banner will be restored.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#198754",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, Restore",
    });

    if (!result.isConfirmed) return;

    try {
      await restoreHomeBanner(id);

      Swal.fire({
        icon: "success",
        title: "Restored",
        text: "Banner restored successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      fetchBannerData();
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
      await deleteHomeBanner(id);

      Swal.fire({
        icon: "success",
        title: "Deleted",
        text: "Banner permanently deleted",
        timer: 1500,
        showConfirmButton: false,
      });

      fetchBannerData();
    } catch (err: any) {
      Swal.fire(
        "Error",
        err?.response?.data?.message || "Delete failed",
        "error",
      );
    }
  };

  // ================= FILTER =================
  const filteredData = banners.filter((banner: any) =>
    banner.name?.toLowerCase().includes(searchTerm.toLowerCase()),
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
                Home Banner List
              </h4>

              <Link to="/admin/manage/home-banner/add-new">
                <Button
                  style={{
                    backgroundColor: "#14468C",
                    border: "none",
                  }}
                >
                  <FaPlus className="me-1" />
                  Add Banner
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

        {/* TABLE */}
        <Card>
          <Card.Body>
            {/* TOP BAR */}
            <Row className="mb-3 align-items-center">
              {/* LEFT SIDE */}
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

              {/* RIGHT SIDE */}
              <Col md={6}>
                <div className="d-flex justify-content-md-end mt-3 mt-md-0">
                  <Form.Control
                    type="text"
                    placeholder="Search item..."
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
            <Table bordered hover responsive>
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Slug</th>
                  <th>URL</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {!loading && currentData.length > 0 ? (
                  currentData.map((banner: any, index: number) => (
                    <tr key={banner.id}>
                      <td>{indexOfFirstItem + index + 1}</td>

                      {/* IMAGE */}
                      <td>
                        {banner.image ? (
                          <img
                            src={`http://localhost:5000/uploads/home-banners/${banner.image}`}
                            alt={banner.name}
                            style={{
                              width: "120px",
                              height: "60px",
                              objectFit: "cover",
                              borderRadius: "6px",
                            }}
                          />
                        ) : (
                          "No Image"
                        )}
                      </td>

                      {/* NAME */}
                      <td>{banner.name}</td>

                      {/* SLUG */}
                      <td>{banner.slug}</td>

                      {/* URL */}
                      <td>
                        {banner.url ? (
                          <a href={banner.url} target="_blank" rel="noreferrer">
                            Visit
                          </a>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td>{banner.description}</td>
                      <td>
                        <Button
                          size="sm"
                          variant={banner.status ? "success" : "warning"}
                          onClick={() =>
                            handleStatusToggle(banner.id, banner.status)
                          }
                          style={{
                            border: "none",
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                          }}
                        >
                          {banner.status ? (
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
                      {/* ACTIONS */}
                      <td>
                        <div className="d-flex gap-2 flex-wrap">
                          {/* EDIT */}
                          {!banner.is_deleted && (
                            <Button
                              size="sm"
                              variant="info"
                              onClick={() => handleEdit(banner.id)}
                            >
                              <FaPenNib />
                            </Button>
                          )}

                          {/* SOFT DELETE */}
                          {!banner.is_deleted ? (
                            <Button
                              size="sm"
                              variant="warning"
                              onClick={() => handleSoftDelete(banner.id)}
                            >
                              <FaTrashArrowUp size={18} />
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              variant="success"
                              onClick={() => handleRestore(banner.id)}
                            >
                              <RiRefreshLine />
                            </Button>
                          )}

                          {/* HARD DELETE */}
                          <Button
                            size="sm"
                            variant="danger"
                            onClick={() => handlePermanentDelete(banner.id)}
                          >
                            <RiDeleteBin6Fill />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="text-center">
                      {loading ? "Loading..." : "Data Not found..."}
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>

            {/* PAGINATION */}
            <div className="d-flex justify-content-between align-items-center mt-3">
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

export default HomeBanners;
