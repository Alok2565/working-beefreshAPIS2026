// import { useEffect, useState } from "react";
// import { getRoles } from "../../../../services/roleService";
// import { getPermissions } from "../../../../services/permissionService";
// import { assignPermissions } from "../../../../services/rolePermissionService";

// function RolePermissionAssign() {
//   const [roles, setRoles] = useState<any[]>([]);
//   const [permissions, setPermissions] = useState<any[]>([]);
//   const [roleId, setRoleId] = useState<number | null>(null);
//   const [selected, setSelected] = useState<number[]>([]);

//   useEffect(() => {
//     load();
//   }, []);

//   const load = async () => {
//     const r = await getRoles();
//     const p = await getPermissions();
//     setRoles(r.data.data);
//     setPermissions(p.data.data);
//   };

//   const toggle = (id: number) => {
//     setSelected((prev) =>
//       prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
//     );
//   };

//   const submit = async () => {
//     if (!roleId) return alert("Select role");

//     await assignPermissions({
//       role_id: roleId,
//       permission_id: selected,
//     });

//     alert("Assigned successfully");
//   };

//   return (
//     <div>
//       <h2>Assign Permissions</h2>

//       <select
//         className="form-select"
//         onChange={(e) => setRoleId(Number(e.target.value))}
//       >
//         <option>Select Role</option>
//         {roles.map((r) => (
//           <option key={r.id} value={r.id}>
//             {r.name}
//           </option>
//         ))}
//       </select>

//       <div className="mt-3">
//         {permissions.map((p) => (
//           <div key={p.id}>
//             <input type="checkbox" onChange={() => toggle(p.id)} />
//             {p.name}
//           </div>
//         ))}
//       </div>

//       <button className="btn btn-primary mt-3" onClick={submit}>
//         Assign
//       </button>
//     </div>
//   );
// }
// export default RolePermissionAssign;

import { useEffect, useState } from "react";
import { Card, Table, Form, Button, Spinner } from "react-bootstrap";
import { getRoles } from "../../../../services/roleService";
import { getPermissions } from "../../../../services/permissionService";
import { assignPermissions } from "../../../../services/rolePermissionService";

function RolePermissionAssign() {
  const [roles, setRoles] = useState<any[]>([]);
  const [permissions, setPermissions] = useState<any[]>([]);
  const [roleId, setRoleId] = useState<number | null>(null);
  const [selected, setSelected] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const r = await getRoles();
    const p = await getPermissions();
    setRoles(r.data.data);
    setPermissions(p.data.data);
  };

  const toggle = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const handleSelectAll = () => {
    if (selected.length === permissions.length) {
      setSelected([]);
    } else {
      setSelected(permissions.map((p) => p.id));
    }
  };

  const submit = async () => {
    if (!roleId) return alert("Select role");
    if (selected.length === 0) return alert("Select permissions");

    setLoading(true);

    await assignPermissions({
      role_id: roleId,
      permission_ids: selected, // ✅ fixed
    });

    setLoading(false);
    alert("Permissions Assigned Successfully");
  };

  return (
    <Card className="shadow-sm border-0">
      <Card.Header className="bg-dark text-white">
        <h5 className="mb-0">Assign Permissions to Role</h5>
      </Card.Header>

      <Card.Body>
        {/* Role Select */}
        <div className="d-flex gap-3 mb-3">
          <Form.Select
            onChange={(e) => setRoleId(Number(e.target.value))}
            style={{ maxWidth: "300px" }}
          >
            <option>Select Role</option>
            {roles.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </Form.Select>

          <Button onClick={submit} disabled={loading}>
            {loading ? <Spinner size="sm" /> : "Assign Permissions"}
          </Button>
        </div>

        {/* Table */}
        <div className="table-responsive">
          <Table bordered hover className="text-center align-middle">
            <thead className="table-light">
              <tr>
                <th>
                  <Form.Check
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={selected.length === permissions.length}
                  />
                </th>
                <th>#</th>
                <th>Permission Name</th>
              </tr>
            </thead>

            <tbody>
              {permissions.length > 0 ? (
                permissions.map((p, index) => (
                  <tr key={p.id}>
                    <td>
                      <Form.Check
                        type="checkbox"
                        checked={selected.includes(p.id)}
                        onChange={() => toggle(p.id)}
                      />
                    </td>
                    <td>{index + 1}</td>
                    <td>{p.name}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3}>No permissions found</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </Card.Body>
    </Card>
  );
}

export default RolePermissionAssign;

// import { useEffect, useState } from "react";

// import { Badge, Button, Card, Form, Table } from "react-bootstrap";

// import { MdOutlineToggleOn, MdOutlineToggleOff } from "react-icons/md";

// import { getRoles } from "../../../../services/roleService";
// import { getPermissions } from "../../../../services/permissionService";
// import { assignPermissions } from "../../../../services/rolePermissionService";

// function RolePermissionAssign() {
//   const [roles, setRoles] = useState<any[]>([]);
//   const [permissions, setPermissions] = useState<any[]>([]);

//   // ================= STORE SELECTED PERMISSIONS ROLE WISE =================
//   const [selectedPermissions, setSelectedPermissions] = useState<any>({});

//   useEffect(() => {
//     load();
//   }, []);

//   // ================= LOAD =================
//   const load = async () => {
//     const r = await getRoles();
//     const p = await getPermissions();

//     setRoles(r.data.data || []);
//     setPermissions(p.data.data || []);
//   };

//   // ================= TOGGLE =================
//   const togglePermission = (roleId: number, permissionId: number) => {
//     setSelectedPermissions((prev: any) => {
//       const current = prev[roleId] || [];

//       const updated = current.includes(permissionId)
//         ? current.filter((id: number) => id !== permissionId)
//         : [...current, permissionId];

//       return {
//         ...prev,
//         [roleId]: updated,
//       };
//     });
//   };

//   // ================= SAVE =================
//   const handleSave = async (roleId: number) => {
//     try {
//       await assignPermissions({
//         role_id: roleId,
//         permission_id: selectedPermissions[roleId] || [],
//       });

//       alert("Permissions Assigned Successfully");
//     } catch (err) {
//       console.error(err);
//       alert("Assignment failed");
//     }
//   };

//   return (
//     <Card className="shadow-sm border-0">
//       {/* HEADER */}
//       <Card.Header className="bg-primary text-white">
//         <h5 className="mb-0">Role Permission Management</h5>
//       </Card.Header>

//       {/* BODY */}
//       <Card.Body>
//         <div className="table-responsive">
//           <Table bordered hover className="align-middle">
//             {/* TABLE HEAD */}
//             <thead className="table-light">
//               <tr>
//                 <th
//                   style={{
//                     width: "80px",
//                   }}
//                 >
//                   #
//                 </th>

//                 <th>Role Name</th>

//                 <th>Permissions</th>

//                 <th
//                   style={{
//                     width: "120px",
//                   }}
//                 >
//                   Status
//                 </th>

//                 <th
//                   style={{
//                     width: "140px",
//                   }}
//                 >
//                   Action
//                 </th>
//               </tr>
//             </thead>

//             {/* TABLE BODY */}
//             <tbody>
//               {roles.length > 0 ? (
//                 roles.map((role, index) => (
//                   <tr key={role.id}>
//                     {/* SERIAL */}
//                     <td>{index + 1}</td>

//                     {/* ROLE NAME */}
//                     <td>
//                       <div className="d-flex align-items-center gap-2">
//                         <Badge bg="dark" className="px-3 py-2">
//                           {role.name}
//                         </Badge>

//                         {/* TOGGLE */}
//                         <Button
//                           size="sm"
//                           variant={role.status ? "success" : "danger"}
//                           style={{
//                             border: "none",
//                             display: "flex",
//                             alignItems: "center",
//                           }}
//                         >
//                           {role.status ? (
//                             <MdOutlineToggleOn size={24} />
//                           ) : (
//                             <MdOutlineToggleOff size={24} />
//                           )}
//                         </Button>
//                       </div>
//                     </td>

//                     {/* PERMISSIONS */}
//                     <td>
//                       <div className="d-flex flex-wrap gap-4">
//                         {permissions.map((p) => (
//                           <Form.Check
//                             key={p.id}
//                             type="checkbox"
//                             label={p.name}
//                             checked={(
//                               selectedPermissions[role.id] || []
//                             ).includes(p.id)}
//                             onChange={() => togglePermission(role.id, p.id)}
//                           />
//                         ))}
//                       </div>
//                     </td>

//                     {/* STATUS */}
//                     <td>
//                       <Badge
//                         bg={role.status ? "success" : "danger"}
//                         className="px-3 py-2"
//                       >
//                         {role.status ? "Active" : "DeActive"}
//                       </Badge>
//                     </td>

//                     {/* SAVE BUTTON */}
//                     <td>
//                       <Button
//                         variant="primary"
//                         size="sm"
//                         onClick={() => handleSave(role.id)}
//                       >
//                         Save
//                       </Button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan={5} className="text-center">
//                     No Roles Found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </Table>
//         </div>
//       </Card.Body>
//     </Card>
//   );
// }

// export default RolePermissionAssign;
