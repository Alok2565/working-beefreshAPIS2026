// import React, { useEffect, useState } from "react";
// import {
//   Button,
//   Container,
//   Row,
//   Col,
//   Card,
//   Table,
//   Form,
// } from "react-bootstrap";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { FaPenNib, FaPlus } from "react-icons/fa";
// import { RiDeleteBin6Fill } from "react-icons/ri";
// import { MdOutlineToggleOn, MdOutlineToggleOff } from "react-icons/md";
// import Swal from "sweetalert2";
// import API from "../../../../api/axios";
// import { getUsers } from "../../../../services/userServices";

// // ✅ Type for User (IMPORTANT)
// type User = {
//   id: number;
//   name: string;
//   email: string;
//   mobile: string;
//   status: boolean;
//   created_at?: string;
// };

// const Users: React.FC = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const queryParams = new URLSearchParams(location.search);
//   const successMessage = queryParams.get("success");

//   const [users, setUsers] = useState<User[]>([]);
//   const [searchTerm, setSearchTerm] = useState<string>("");
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [usersPerPage, setUsersPerPage] = useState<number>(5);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [deleteMessage, setDeleteMessage] = useState<string>("");

//   // ✅ Fetch Users
//   const fetchUsers = async () => {
//     try {
//       setLoading(true);
//       const response = await API.get("/users");

//       // ✅ IMPORTANT (your backend format)
//       setUsers(response.data.data || []);
//     } catch (err) {
//       console.error("Error fetching users:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   // ✅ Edit
//   const handleEdit = (id: number) => {
//     navigate(`/admin/user/edit/${id}`);
//   };

//   // ✅ Status Toggle
//   const handleStatus = async (id: number) => {
//     try {
//       await API.put(`/users/status/${id}`);
//       Swal.fire("Success", "Status updated", "success");
//       fetchUsers();
//     } catch (err) {
//       Swal.fire("Error", "Failed to update status", "error");
//     }
//   };

//   // ✅ Delete
//   const handleDelete = async (id: number) => {
//     const result = await Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!",
//     });

//     if (result.isConfirmed) {
//       try {
//         await API.delete(`/users/delete/${id}`);
//         Swal.fire("Deleted!", "User deleted successfully", "success");
//         setDeleteMessage("User deleted successfully");
//         fetchUsers();
//       } catch (err) {
//         Swal.fire("Error!", "Delete failed", "error");
//       }
//     }
//   };

//   // ✅ Safe Filter
//   const filteredUsers = users.filter((user) => {
//     const name = user.name?.toLowerCase() || "";
//     const email = user.email?.toLowerCase() || "";
//     const mobile = user.mobile?.toLowerCase() || "";

//     return (
//       name.includes(searchTerm.toLowerCase()) ||
//       email.includes(searchTerm.toLowerCase()) ||
//       mobile.includes(searchTerm.toLowerCase())
//     );
//   });

//   // ✅ Pagination
//   const indexOfLastUser = currentPage * usersPerPage;
//   const indexOfFirstUser = indexOfLastUser - usersPerPage;
//   const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

//   const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchTerm, usersPerPage]);

//   if (loading) {
//     return <div className="p-4">Loading users...</div>;
//   }

//   return (
//     <div className="page-content py-3">
//       <Container fluid>
//         {/* Header */}
//         <Row>
//           <Col>
//             <div className="d-flex justify-content-between align-items-center">
//               <h4 style={{ color: "#14468C" }}>All User List</h4>

//               <Link to="/admin/user/add">
//                 <Button style={{ background: "#14468C" }}>
//                   <FaPlus /> Add User
//                 </Button>
//               </Link>
//             </div>
//           </Col>
//         </Row>

//         {/* Alerts */}
//         {deleteMessage && (
//           <div className="alert alert-danger mt-3">{deleteMessage}</div>
//         )}
//         {successMessage && (
//           <div className="alert alert-success mt-3">{successMessage}</div>
//         )}

//         <Card className="mt-3">
//           <Card.Body>
//             {/* Controls */}
//             <Row className="mb-3">
//               <Col md={6}>
//                 <Form.Select
//                   value={usersPerPage}
//                   onChange={(e) => setUsersPerPage(Number(e.target.value))}
//                   style={{ width: "100px" }}
//                 >
//                   {[5, 10, 25, 50].map((n) => (
//                     <option key={n}>{n}</option>
//                   ))}
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

//             {/* Table */}
//             <Table striped bordered hover responsive>
//               <thead>
//                 <tr>
//                   <th>#</th>
//                   <th>Name</th>
//                   <th>Email</th>
//                   <th>Mobile</th>
//                   <th>Status</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {currentUsers.length > 0 ? (
//                   currentUsers.map((user, index) => (
//                     <tr key={user.id}>
//                       <td>{indexOfFirstUser + index + 1}</td>
//                       <td>{user.name}</td>
//                       <td>{user.email}</td>
//                       <td>{user.mobile}</td>

//                       <td>
//                         <Button
//                           variant={user.status ? "success" : "danger"}
//                           onClick={() => handleStatus(user.id)}
//                         >
//                           {user.status ? (
//                             <MdOutlineToggleOn />
//                           ) : (
//                             <MdOutlineToggleOff />
//                           )}
//                         </Button>
//                       </td>

//                       <td>
//                         <Button size="sm" onClick={() => handleEdit(user.id)}>
//                           <FaPenNib />
//                         </Button>{" "}
//                         <Button
//                           size="sm"
//                           variant="danger"
//                           onClick={() => handleDelete(user.id)}
//                         >
//                           <RiDeleteBin6Fill />
//                         </Button>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan={6} className="text-center">
//                       No users found
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </Table>

//             {/* Pagination */}
//             <div className="d-flex justify-content-between">
//               <span>
//                 Showing {indexOfFirstUser + 1} to{" "}
//                 {Math.min(indexOfLastUser, filteredUsers.length)} of{" "}
//                 {filteredUsers.length}
//               </span>

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
// };

// export default Users;

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
  getUsers,
  updateUserStatus,
  softDeleteUser,
  restoreUser,
  deleteUser,
} from "../../../../services/userServices";

function Users() {
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

  const [names, setNames] = useState<any[]>([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // ================= FETCH =================
  const fetchUserData = async () => {
    try {
      setLoading(true);

      const response = await getUsers();

      setNames(response.data.data || []);
    } catch (err) {
      console.error("Error fetching banners:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  // ================= STATUS TOGGLE =================
  const handleStatusToggle = async (id: number, currentStatus: boolean) => {
    try {
      const result = await Swal.fire({
        title: currentStatus ? "Deactivate User?" : "Activate User?",
        text: currentStatus
          ? "User will become inactive."
          : "User will become active.",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: currentStatus ? "#dc3545" : "#198754",
        cancelButtonColor: "#6c757d",
        confirmButtonText: currentStatus ? "Yes, Deactivate" : "Yes, Activate",
      });

      if (!result.isConfirmed) return;

      await updateUserStatus(id);

      Swal.fire({
        icon: "success",
        title: "Updated",
        text: "User status updated successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      fetchUserData();
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
    navigate(`/admin/manage/user/edit/${id}`);
  };

  // ================= SOFT DELETE =================
  const handleSoftDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "Soft Delete Banner?",
      text: "User will be moved to trash.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, Delete",
    });

    if (!result.isConfirmed) return;

    try {
      await softDeleteUser(id);

      Swal.fire({
        icon: "success",
        title: "Deleted",
        text: "User soft deleted successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      fetchUserData();
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
      title: "Restore User?",
      text: "User will be restored.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#198754",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, Restore",
    });

    if (!result.isConfirmed) return;

    try {
      await restoreUser(id);

      Swal.fire({
        icon: "success",
        title: "Restored",
        text: "User restored successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      fetchUserData();
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
      await deleteUser(id);

      Swal.fire({
        icon: "success",
        title: "Deleted",
        text: "User permanently deleted",
        timer: 1500,
        showConfirmButton: false,
      });

      fetchUserData();
    } catch (err: any) {
      Swal.fire(
        "Error",
        err?.response?.data?.message || "Delete failed",
        "error",
      );
    }
  };

  // ================= FILTER =================
  const filteredData = names.filter((name: any) =>
    name.name?.toLowerCase().includes(searchTerm.toLowerCase()),
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
                Users List
              </h4>

              <Link to="/admin/manage/user/add-new">
                <Button
                  style={{
                    backgroundColor: "#14468C",
                    border: "none",
                  }}
                >
                  <FaPlus className="me-1" />
                  Add User
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
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {!loading && currentData.length > 0 ? (
                  currentData.map((nameItems: any, index: number) => (
                    <tr key={nameItems.id}>
                      <td>{indexOfFirstItem + index + 1}</td>
                      <td>{nameItems.name}</td>
                      <td>{nameItems.email}</td>
                      <td>{nameItems.mobile}</td>
                      <td>
                        <Button
                          size="sm"
                          variant={nameItems.status ? "success" : "warning"}
                          onClick={() =>
                            handleStatusToggle(nameItems.id, nameItems.status)
                          }
                          style={{
                            border: "none",
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                          }}
                        >
                          {nameItems.status ? (
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
                          {!nameItems.is_deleted && (
                            <Button
                              size="sm"
                              variant="info"
                              onClick={() => handleEdit(nameItems.id)}
                            >
                              <FaPenNib />
                            </Button>
                          )}

                          {/* SOFT DELETE */}
                          {!nameItems.is_deleted ? (
                            <Button
                              size="sm"
                              variant="warning"
                              onClick={() => handleSoftDelete(nameItems.id)}
                            >
                              <FaTrashArrowUp size={18} />
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              variant="success"
                              onClick={() => handleRestore(nameItems.id)}
                            >
                              <RiRefreshLine />
                            </Button>
                          )}

                          {/* HARD DELETE */}
                          <Button
                            size="sm"
                            variant="danger"
                            onClick={() => handlePermanentDelete(nameItems.id)}
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

export default Users;
