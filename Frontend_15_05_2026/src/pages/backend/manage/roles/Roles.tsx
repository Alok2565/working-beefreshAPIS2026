// import React, { useState, useEffect } from "react";
// import {
//   Button,
//   Card,
//   Col,
//   Container,
//   Form,
//   Row,
//   Table,
// } from "react-bootstrap";
// import { FaPenNib, FaPlus } from "react-icons/fa";
// import { RiDeleteBin6Fill } from "react-icons/ri";
// import { MdOutlineToggleOn, MdOutlineToggleOff } from "react-icons/md";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { getRoles } from "../../../../services/roleService";

// function Roles() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const queryParams = new URLSearchParams(location.search);
//   const successMessage = queryParams.get("success");

//   const [roles, setRoles] = useState<any[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [entriesPerPage, setEntriesPerPage] = useState(10);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState(false);

//   /**
//    * FETCH ROLES
//    */
//   const fetchRoles = async () => {
//     setLoading(true);
//     try {
//       const res = await getRoles();
//       setRoles(res.data.data || []);
//     } catch (err) {
//       console.error(err);
//       Swal.fire("Error", "Failed to fetch roles", "error");
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchRoles();
//   }, []);

//   /**
//    * EDIT
//    */
//   // const handleEdit = (id: number) => {
//   //   navigate(`/admin/role/edit/${id}`);
//   // };

//   /**
//    * DELETE
//    */
//   // const handleDelete = async (id: number) => {
//   //   const result = await Swal.fire({
//   //     title: "Are you sure?",
//   //     text: "This role will be deleted!",
//   //     icon: "warning",
//   //     showCancelButton: true,
//   //     confirmButtonColor: "#d33",
//   //     confirmButtonText: "Yes, delete it!",
//   //   });

//   //   if (result.isConfirmed) {
//   //     try {
//   //       await API.delete(`/roles/delete/${id}`);

//   //       Swal.fire("Deleted!", "Role deleted successfully", "success");
//   //       fetchRoles();
//   //     } catch (err) {
//   //       Swal.fire("Error", "Delete failed", "error");
//   //     }
//   //   }
//   // };

//   /**
//    * STATUS TOGGLE (if API exists)
//    */
//   // const handleStatus = async (id: number) => {
//   //   try {
//   //     await API.put(`/roles/status/${id}`);
//   //     fetchRoles();
//   //   } catch {
//   //     Swal.fire("Error", "Failed to update status", "error");
//   //   }
//   // };

//   /**
//    * FILTER
//    */
//   const filteredRoles = roles.filter((role) =>
//     role.name?.toLowerCase().includes(searchTerm.toLowerCase()),
//   );

//   const indexOfLastItem = currentPage * entriesPerPage;
//   const indexOfFirstItem = indexOfLastItem - entriesPerPage;
//   const currentRoles = filteredRoles.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(filteredRoles.length / entriesPerPage);

//   return (
//     <div className="page-content py-3">
//       <Container fluid>
//         {/* HEADER */}
//         <Row>
//           <Col xl={12}>
//             <div className="d-flex justify-content-between align-items-center mb-3">
//               <h4 style={{ color: "#14468C", fontWeight: 600 }}>
//                 All Role List
//               </h4>

//               <Link to="/admin/manage/role/add-new">
//                 <Button style={{ background: "#14468C", border: "none" }}>
//                   <FaPlus /> Add Role
//                 </Button>
//               </Link>
//             </div>
//           </Col>
//         </Row>

//         {successMessage && (
//           <div className="alert alert-success">{successMessage}</div>
//         )}

//         <Card>
//           <Card.Body>
//             <Row className="mb-3">
//               <Col md={6}>
//                 <Form.Select
//                   style={{ width: "90px" }}
//                   value={entriesPerPage}
//                   onChange={(e) => {
//                     setEntriesPerPage(Number(e.target.value));
//                     setCurrentPage(1);
//                   }}
//                 >
//                   <option value="5">5</option>
//                   <option value="10">10</option>
//                   <option value="25">25</option>
//                 </Form.Select>
//               </Col>

//               <Col md={6} className="text-end">
//                 <Form.Control
//                   placeholder="Search..."
//                   style={{ maxWidth: "250px", marginLeft: "auto" }}
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//               </Col>
//             </Row>

//             <Table bordered hover responsive>
//               <thead>
//                 <tr>
//                   <th>#</th>
//                   <th>Role Name</th>
//                   <th>Created</th>
//                   <th>Status</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {loading ? (
//                   <tr>
//                     <td colSpan={5} className="text-center">
//                       Loading...
//                     </td>
//                   </tr>
//                 ) : currentRoles.length > 0 ? (
//                   currentRoles.map((role, index) => (
//                     <tr key={role.id}>
//                       <td>{indexOfFirstItem + index + 1}</td>
//                       <td>{role.name}</td>
//                       <td>
//                         {role.created_at
//                           ? new Date(role.created_at).toLocaleString()
//                           : "-"}
//                       </td>

//                       <td>
//                         <Button
//                           size="sm"
//                           variant={role.status ? "success" : "danger"}
//                         >
//                           {role.status ? (
//                             <MdOutlineToggleOn size={20} />
//                           ) : (
//                             <MdOutlineToggleOff size={20} />
//                           )}
//                         </Button>
//                       </td>

//                       <td>
//                         <Button size="sm" variant="primary">
//                           <FaPenNib />
//                         </Button>{" "}
//                         <Button size="sm" variant="danger">
//                           <RiDeleteBin6Fill />
//                         </Button>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan={5} className="text-center">
//                       No roles found
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </Table>

//             <div className="d-flex justify-content-between">
//               <div>
//                 Showing {indexOfFirstItem + 1} to{" "}
//                 {Math.min(indexOfLastItem, filteredRoles.length)} of{" "}
//                 {filteredRoles.length}
//               </div>

//               <ul className="pagination">
//                 {[...Array(totalPages)].map((_, i) => (
//                   <li
//                     key={i}
//                     className={`page-item ${
//                       currentPage === i + 1 ? "active" : ""
//                     }`}
//                   >
//                     <button
//                       className="page-link"
//                       onClick={() => setCurrentPage(i + 1)}
//                     >
//                       {i + 1}
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </Card.Body>
//         </Card>
//       </Container>
//     </div>
//   );
// }

// export default Roles;

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
  getRoles,
  updateRoleStatus,
  softDeleteRole,
  restoreRole,
  deleteRole,
} from "../../../../services/roleService";
import { format } from "date-fns";
function Roles() {
  const location = useLocation();
  const navigate = useNavigate();

  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);

    const success = queryParams.get("success");

    if (success) {
      setSuccessMessage(success);

      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  const [role, setRole] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // ================= FETCH =================
  const fetchRoleData = async () => {
    try {
      setLoading(true);

      const response = await getRoles();

      setRole(response.data.data || []);
    } catch (err) {
      console.error("Error fetching banners:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoleData();
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

      await updateRoleStatus(id);

      Swal.fire({
        icon: "success",
        title: "Updated",
        text: "Role status updated successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      fetchRoleData();
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
    navigate(`/admin/manage/role/eidt/${id}`);
  };

  // ================= SOFT DELETE =================
  const handleSoftDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "Soft Delete Role?",
      text: "Role will be moved to trash.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, Delete",
    });

    if (!result.isConfirmed) return;

    try {
      await softDeleteRole(id);

      Swal.fire({
        icon: "success",
        title: "Deleted",
        text: "Role soft deleted successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      fetchRoleData();
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err?.response?.data?.message || "Delete failed",
      });
    }
  };
  // ================= RESTORE =================
  const handleRestore = async (id: number) => {
    const result = await Swal.fire({
      title: "Restore Role?",
      text: "Role will be restored.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#198754",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, Restore",
    });

    if (!result.isConfirmed) return;

    try {
      await restoreRole(id);

      Swal.fire({
        icon: "success",
        title: "Restored",
        text: "Role restored successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      fetchRoleData();
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
      await deleteRole(id);

      Swal.fire({
        icon: "success",
        title: "Deleted",
        text: "Banner permanently deleted",
        timer: 1500,
        showConfirmButton: false,
      });

      fetchRoleData();
    } catch (err: any) {
      Swal.fire(
        "Error",
        err?.response?.data?.message || "Delete failed",
        "error",
      );
    }
  };

  // ================= FILTER =================
  const filteredData = role.filter((roleFilter: any) =>
    roleFilter.name?.toLowerCase().includes(searchTerm.toLowerCase()),
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
                All Roles List
              </h4>

              <Link to="/admin/manage/role/add-new">
                <Button
                  style={{
                    backgroundColor: "#14468C",
                    border: "none",
                  }}
                >
                  <FaPlus className="me-1" />
                  Add Role
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
                  <th>Name</th>
                  <th>Created</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {!loading && currentData.length > 0 ? (
                  currentData.map((roleItems: any, index: number) => (
                    <tr key={roleItems.id}>
                      <td>{indexOfFirstItem + index + 1}</td>
                      <td>{roleItems.name}</td>

                      <td>
                        {format(new Date(roleItems.created_at), "dd-MM-yyyy")}
                      </td>
                      <td>
                        <Button
                          size="sm"
                          variant={roleItems.status ? "success" : "warning"}
                          onClick={() =>
                            handleStatusToggle(roleItems.id, roleItems.status)
                          }
                          style={{
                            border: "none",
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                          }}
                        >
                          {roleItems.status ? (
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
                          {!roleItems.is_deleted && (
                            <Button
                              size="sm"
                              variant="info"
                              onClick={() => handleEdit(roleItems.id)}
                            >
                              <FaPenNib />
                            </Button>
                          )}

                          {/* SOFT DELETE */}
                          {!roleItems.is_deleted ? (
                            <Button
                              size="sm"
                              variant="warning"
                              onClick={() => handleSoftDelete(roleItems.id)}
                            >
                              <FaTrashArrowUp size={18} />
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              variant="success"
                              onClick={() => handleRestore(roleItems.id)}
                            >
                              <RiRefreshLine />
                            </Button>
                          )}

                          {/* HARD DELETE */}
                          <Button
                            size="sm"
                            variant="danger"
                            onClick={() => handlePermanentDelete(roleItems.id)}
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

export default Roles;
