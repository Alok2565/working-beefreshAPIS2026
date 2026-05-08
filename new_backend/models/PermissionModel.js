// const pool = require("../config/database_connection");
// exports.createPermission = (name, client = pool) => {
//   return client.query("INSERT INTO permissions(name) VALUES($1) RETURNING *", [
//     name,
//   ]);
// };

// exports.getAllPermissions = (client = pool) => {
//   return client.query("SELECT * FROM permissions");
// };
// const assignPermissions = async (role_id, permissions, client) => {
//   for (const permission_id of permissions) {
//     await client.query(
//       `INSERT INTO role_permissions (role_id, permission_id)
//        VALUES ($1, $2)
//        ON CONFLICT (role_id, permission_id) DO NOTHING`,
//       [role_id, permission_id],
//     );
//   }
// };
// module.exports = {
//   assignPermissions,
// };

const db = require("../config/database_connection");

exports.createPermission = (name) => {
  return pool.query("INSERT INTO permissions(name) VALUES($1) RETURNING *", [
    name,
  ]);
};

exports.getAllPermissions = (client = db) => {
  return client.query("SELECT * FROM permissions");
};

exports.updatePermission = (id, name) => {
  return pool.query("UPDATE permissions SET name=$1 WHERE id=$2 RETURNING *", [
    name,
    id,
  ]);
};

exports.softDeletePermission = (id) => {
  return db.query(
    "UPDATE permissions SET is_deleted = true, deleted_at = NOW() WHERE id = $1 RETURNING *",
    [id],
  );
};

exports.restorePermission = (id) => {
  return db.query(
    "UPDATE permissions SET is_deleted = false, deleted_at = NULL WHERE id = $1 RETURNING *",
    [id],
  );
};

exports.deletePermission = (id) => {
  return pool.query("DELETE FROM permissions WHERE id=$1", [id]);
};
