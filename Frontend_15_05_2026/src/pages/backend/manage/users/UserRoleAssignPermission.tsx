// import { useEffect, useState } from "react";
// import { Card, Table, Form, Button, Spinner } from "react-bootstrap";
// import { getRoles } from "../../../../services/roleService";
// import { getPermissions } from "../../../../services/permissionService";
// import { assignPermissions } from "../../../../services/rolePermissionService";

// interface Role {
//   id: number;
//   name: string;
// }

// interface Permission {
//   id: number;
//   name: string;
// }

// const RolePermissionAssign = () => {
//   const [roles, setRoles] = useState<Role[]>([]);
//   const [permissions, setPermissions] = useState<Permission[]>([]);
//   const [selectedRole, setSelectedRole] = useState<number | null>(null);
//   const [selectedPermissions, setSelectedPermissions] = useState<number[]>([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     const roleRes = await getRoles();
//     const permRes = await getPermissions();

//     setRoles(roleRes.data.data || []);
//     setPermissions(permRes.data.data || []);
//   };

//   // Toggle permission
//   const handleSelectPermission = (id: number) => {
//     setSelectedPermissions((prev) =>
//       prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
//     );
//   };

//   // Select all
//   const handleSelectAll = () => {
//     if (selectedPermissions.length === permissions.length) {
//       setSelectedPermissions([]);
//     } else {
//       setSelectedPermissions(permissions.map((p) => p.id));
//     }
//   };

//   // Submit
//   const handleAssign = async () => {
//     if (!selectedRole || selectedPermissions.length === 0) {
//       alert("Please select role and permissions");
//       return;
//     }

//     setLoading(true);

//     try {
//       await assignPermissions({
//         role_id: selectedRole,
//         permission_id: selectedPermissions,
//       });

//       alert("Permissions assigned successfully");
//       setSelectedPermissions([]);
//     } catch (err) {
//       console.error(err);
//       alert("Error assigning permissions");
//     }

//     setLoading(false);
//   };

//   return (
//     <Card className="shadow-sm border-0">
//       <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
//         <h5 className="mb-0">Assign Permissions to Role</h5>
//       </Card.Header>

//       <Card.Body>
//         {/* Role Dropdown + Button */}
//         <div className="mb-3 d-flex gap-3 align-items-center">
//           <Form.Select
//             value={selectedRole || ""}
//             onChange={(e) => setSelectedRole(Number(e.target.value))}
//             style={{ maxWidth: "300px" }}
//           >
//             <option value="">Select Role</option>
//             {roles.map((role) => (
//               <option key={role.id} value={role.id}>
//                 {role.name}
//               </option>
//             ))}
//           </Form.Select>

//           <Button variant="success" onClick={handleAssign} disabled={loading}>
//             {loading ? <Spinner size="sm" /> : "Assign Permissions"}
//           </Button>
//         </div>

//         {/* Table */}
//         <div className="table-responsive">
//           <Table bordered hover className="align-middle text-center">
//             <thead className="table-light">
//               <tr>
//                 <th>
//                   <Form.Check
//                     type="checkbox"
//                     checked={
//                       permissions.length > 0 &&
//                       selectedPermissions.length === permissions.length
//                     }
//                     onChange={handleSelectAll}
//                   />
//                 </th>
//                 <th>#</th>
//                 <th>Permission Name</th>
//               </tr>
//             </thead>

//             <tbody>
//               {permissions.length > 0 ? (
//                 permissions.map((perm, index) => (
//                   <tr key={perm.id}>
//                     <td>
//                       <Form.Check
//                         type="checkbox"
//                         checked={selectedPermissions.includes(perm.id)}
//                         onChange={() => handleSelectPermission(perm.id)}
//                       />
//                     </td>
//                     <td>{index + 1}</td>
//                     <td>{perm.name}</td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan={3}>
//                     <span className="text-muted">No permissions found</span>
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </Table>
//         </div>
//       </Card.Body>
//     </Card>
//   );
// };

// export default RolePermissionAssign;
import { useEffect, useState } from "react";
import { Card, Table, Form, Button, Spinner } from "react-bootstrap";
import { getRoles } from "../../../../services/roleService";
import { getUsers } from "../../../../services/userServices";

interface User {
  id: number;
  name: string;
  email: string;
  role_id?: number;
}

interface Role {
  id: number;
  name: string;
}

const UserRoleAssignPermission = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [selectedRole, setSelectedRole] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  // const fetchData = async () => {
  //   try {
  //     const userRes = await getUsers();
  //     const roleRes = await getRoles();

  //     setUsers(userRes.data.data || []);
  //     setRoles(roleRes.data.data || []);
  //   } catch (err) {
  //     console.error("Error loading data", err);
  //   }
  // };
  const fetchData = async () => {
    try {
      const [userRes, roleRes] = await Promise.all([getUsers(), getRoles()]);

      console.log("ROLE API RESPONSE 👉", roleRes);

      setUsers(userRes.data.data || []);
      setRoles(roleRes.data.data || []);
    } catch (err) {
      console.error("Error loading data", err);
    }
  };

  // Toggle single user
  const handleSelectUser = (id: number) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((u) => u !== id) : [...prev, id],
    );
  };

  // Select all users
  const handleSelectAll = () => {
    if (selectedUsers.length === users.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map((u) => u.id));
    }
  };

  // Assign role
  const handleAssignRole = async () => {
    if (!selectedRole || selectedUsers.length === 0) {
      alert("Please select role and users");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/users/assign-role", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_ids: selectedUsers,
          role_id: selectedRole,
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Role assigned successfully");
        setSelectedUsers([]);
        setSelectedRole(null);
        fetchData(); // refresh
      } else {
        alert(data.message || "Failed to assign role");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <Card className="shadow-sm border-0">
      <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Assign Role to Users</h5>
      </Card.Header>

      <Card.Body>
        {/* Role Select + Button */}
        <div className="mb-3 d-flex gap-3 align-items-center">
          <Form.Select
            value={selectedRole || ""}
            onChange={(e) => setSelectedRole(Number(e.target.value))}
            style={{ maxWidth: "300px" }}
          >
            <option value="">Select Role</option>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </Form.Select>

          <Button
            variant="success"
            onClick={handleAssignRole}
            disabled={loading}
          >
            {loading ? <Spinner size="sm" /> : "Assign Role"}
          </Button>
        </div>

        {/* Users Table */}
        <div className="table-responsive">
          <Table bordered hover className="align-middle text-center">
            <thead className="table-light">
              <tr>
                <th>
                  <Form.Check
                    type="checkbox"
                    checked={
                      users.length > 0 && selectedUsers.length === users.length
                    }
                    onChange={handleSelectAll}
                  />
                </th>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Current Role</th>
              </tr>
            </thead>

            <tbody>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr key={user.id}>
                    <td>
                      <Form.Check
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => handleSelectUser(user.id)}
                      />
                    </td>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      {roles.find((r) => r.id === user.role_id)?.name || (
                        <span className="text-muted">No Role</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5}>
                    <span className="text-muted">No users found</span>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </Card.Body>
    </Card>
  );
};

export default UserRoleAssignPermission;
