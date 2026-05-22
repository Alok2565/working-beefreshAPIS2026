// import React from "react";

// function AddPermission() {
//   return <div></div>;
// }

// export default AddPermission;

import { useState } from "react";
import { createPermission } from "../../../../services/permissionService";

function AddPermission() {
  const [name, setName] = useState("");

  const submit = async () => {
    if (!name) return alert("Enter permission");

    try {
      await createPermission({ name });
      alert("Created");
      setName("");
    } catch {
      alert("Error");
    }
  };

  return (
    <div>
      <h2>Create Permission</h2>

      <input
        className="form-control"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button className="btn btn-success mt-2" onClick={submit}>
        Save
      </button>
    </div>
  );
}
export default AddPermission;
