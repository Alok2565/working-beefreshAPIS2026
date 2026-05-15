// const pool = require("../config/database_connection");

// exports.assignPermission = (role_id, permission_id) => {
//   return pool.query(
//     "INSERT INTO role_permissions(role_id, permission_id) VALUES($1,$2)",
//     [role_id, permission_id],
//   );
// };

// exports.getPermissionsByRole = (role_id) => {
//   return pool.query(
//     `SELECT p.*
//      FROM role_permissions rp
//      JOIN permissions p ON p.id = rp.permission_id
//      WHERE rp.role_id = $1`,
//     [role_id],
//   );
// };

const db = require("../config/database_connection");

exports.createRolePermission = (data, client) => {
  return client.query(
    "INSERT INTO role_permissions (,role_id, permission_id) VALUES ($1,$2) RETURNING *",
    data,
  );
};
/**
 * ASSIGN PERMISSION TO ROLE
 */
exports.assignRolePermission = (role_id, permission_id, client = db) => {
  return client.query(
    `INSERT INTO role_permissions(role_id, permission_id)
     VALUES ($1, $2)
     ON CONFLICT DO NOTHING`,
    [role_id, permission_id],
  );
};
/**
 * GET ROLE PERMISSIONS
 */
exports.getPermissionsByRole = (role_id, client = db) => {
  return client.query(
    `SELECT p.*
     FROM role_permissions rp
     JOIN permissions p ON p.id = rp.permission_id
     WHERE rp.role_id = $1`,
    [role_id],
  );
};

exports.updateByRolePermission = (data, client) => {
  return client.query(
    "UPDATE role_permissions SET is_active=$1 WHERE id=$2 RETURNING *",
    data,
  );
};
exports.softDeleteByRolePermission = (id) => {
  return db.query(
    "UPDATE role_permissions SET is_deleted = true, deleted_at = NOW() WHERE id = $1 RETURNING *",
    [id],
  );
};

exports.restoreByRolePermission = (id) => {
  return db.query(
    "UPDATE role_permissions SET is_deleted = false, deleted_at = NULL WHERE id = $1 RETURNING *",
    [id],
  );
};
/**
 * REMOVE ALL ROLE PERMISSIONS
 */
exports.deleteRolePermission = (role_id, client = db) => {
  return client.query("DELETE FROM role_permissions WHERE role_id=$1", [
    role_id,
  ]);
};
