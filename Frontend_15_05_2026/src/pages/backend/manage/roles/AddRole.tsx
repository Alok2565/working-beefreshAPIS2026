// import React from 'react'

// function AddRole() {
//   return (
//     <div>

//     </div>
//   )
// }

// export default AddRole

import { useState } from "react";
import { createRole } from "../../../../services/roleService";

function AddRole() {
  const [name, setName] = useState("");

  const handleSubmit = async () => {
    if (!name) return alert("Enter role name");

    try {
      await createRole({ name });
      alert("Role created");
      setName("");
    } catch (err) {
      alert("Error creating role");
    }
  };

  return (
    <div>
      <h2>Create Role</h2>

      <input
        className="form-control"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button className="btn btn-primary mt-2" onClick={handleSubmit}>
        Save
      </button>
    </div>
  );
}
export default AddRole;
