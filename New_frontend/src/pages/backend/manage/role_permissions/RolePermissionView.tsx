// import { useState } from "react";
// import { getRolePermissions } from "../../../../services/rolePermissionService";

// function RolePermissionView() {
//   const [roleId, setRoleId] = useState("");
//   const [data, setData] = useState<any[]>([]);

//   const fetchData = async () => {
//     const res = await getRolePermissions(Number(roleId));
//     setData(res.data.data);
//   };

//   return (
//     <div>
//       <h2>View Role Permissions</h2>

//       <input
//         className="form-control"
//         placeholder="Enter Role ID"
//         onChange={(e) => setRoleId(e.target.value)}
//       />

//       <button className="btn btn-info mt-2" onClick={fetchData}>
//         Load
//       </button>

//       <ul className="mt-3">
//         {data.map((p) => (
//           <li key={p.id}>{p.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default RolePermissionView;
import { useEffect, useState } from "react";
import { Card, Table, Form, Button, Spinner } from "react-bootstrap";
import { getRoles } from "../../../../services/roleService";
import { getRolePermissions } from "../../../../services/rolePermissionService";

interface Role {
  id: number;
  name: string; // change to role_name if needed
}

interface Permission {
  id: number;
  name: string;
}

function RolePermissionView() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedRole, setSelectedRole] = useState<number | null>(null);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadRoles();
  }, []);

  const loadRoles = async () => {
    try {
      const res = await getRoles();
      setRoles(res.data.data || []);
    } catch (err) {
      console.error("Error loading roles", err);
    }
  };

  const fetchPermissions = async () => {
    if (!selectedRole) {
      alert("Please select role");
      return;
    }

    setLoading(true);

    try {
      const res = await getRolePermissions(selectedRole);
      setPermissions(res.data.data || []);
    } catch (err) {
      console.error(err);
      alert("Error fetching permissions");
    }

    setLoading(false);
  };

  return (
    <Card className="shadow-sm border-0">
      <Card.Header className="bg-info text-white">
        <h5 className="mb-0">View Role Permissions</h5>
      </Card.Header>

      <Card.Body>
        {/* Role Select + Button */}
        <div className="d-flex gap-3 mb-3">
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

          <Button variant="info" onClick={fetchPermissions} disabled={loading}>
            {loading ? <Spinner size="sm" /> : "Load"}
          </Button>
        </div>

        {/* Table */}
        <div className="table-responsive">
          <Table bordered hover className="align-middle text-center">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Permission Name</th>
              </tr>
            </thead>

            <tbody>
              {permissions.length > 0 ? (
                permissions.map((perm, index) => (
                  <tr key={perm.id}>
                    <td>{index + 1}</td>
                    <td>{perm.name}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={2}>
                    <span className="text-muted">No permissions found</span>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </Card.Body>
    </Card>
  );
}

export default RolePermissionView;
