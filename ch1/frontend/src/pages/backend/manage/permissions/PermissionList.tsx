// import { useEffect, useState } from "react";
// import { getPermissions } from "../../../../services/permissionService";

// export default function PermissionList() {
//   const [data, setData] = useState<any[]>([]);

//   useEffect(() => {
//     load();
//   }, []);

//   const load = async () => {
//     try {
//       const res = await getPermissions();
//       setData(res.data.data);
//     } catch {
//       alert("Error loading permissions");
//     }
//   };

//   return (
//     <div>
//       <h2>Permissions</h2>

//       <ul>
//         {data.map((p) => (
//           <li key={p.id}>{p.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import { Card, Table, Button, Badge, Spinner } from "react-bootstrap";
import {
  getPermissions,
  deletePermission,
  togglePermissionStatus,
} from "../../../../services/permissionService";

interface Permission {
  id: number;
  name: string;
  status: boolean;
  deleted_at?: string | null;
}

export default function PermissionList() {
  const [data, setData] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    setLoading(true);
    try {
      const res = await getPermissions();
      setData(res.data.data || []);
    } catch {
      alert("Error loading permissions");
    }
    setLoading(false);
  };

  // Toggle status
  const handleToggleStatus = async (id: number) => {
    try {
      await togglePermissionStatus(id);
      load();
    } catch {
      alert("Error updating status");
    }
  };

  // Soft Delete
  const handleSoftDelete = async (id: number) => {
    if (!window.confirm("Soft delete this permission?")) return;

    try {
      await deletePermission(id); // backend should mark deleted_at
      load();
    } catch {
      alert("Error deleting permission");
    }
  };

  // Hard Delete (optional)
  const handleDelete = async (id: number) => {
    if (!window.confirm("Permanently delete this permission?")) return;

    try {
      await deletePermission(id, true); // pass flag if needed
      load();
    } catch {
      alert("Error deleting permission");
    }
  };

  return (
    <Card className="shadow-sm border-0">
      <Card.Header className="bg-dark text-white d-flex justify-content-between">
        <h5 className="mb-0">Permission Management</h5>
      </Card.Header>

      <Card.Body>
        <div className="table-responsive">
          <Table bordered hover className="align-middle text-center">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Permission Name</th>
                <th>Status</th>
                <th>Deleted</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5}>
                    <Spinner />
                  </td>
                </tr>
              ) : data.length > 0 ? (
                data.map((p, index) => (
                  <tr key={p.id}>
                    <td>{index + 1}</td>

                    <td>{p.name}</td>

                    {/* Status */}
                    <td>
                      <Badge bg={p.status ? "success" : "secondary"}>
                        {p.status ? "Active" : "Inactive"}
                      </Badge>
                    </td>

                    {/* Soft Delete */}
                    <td>
                      {p.deleted_at ? (
                        <Badge bg="danger">Deleted</Badge>
                      ) : (
                        <Badge bg="success">Active</Badge>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="d-flex justify-content-center gap-2">
                      <Button
                        size="sm"
                        variant="warning"
                        onClick={() => handleToggleStatus(p.id)}
                      >
                        Toggle
                      </Button>

                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleSoftDelete(p.id)}
                      >
                        Soft Delete
                      </Button>

                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => handleDelete(p.id)}
                      >
                        Delete
                      </Button>

                      <Button size="sm" variant="info">
                        Edit
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5}>
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
