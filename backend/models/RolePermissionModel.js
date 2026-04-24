const pool = require("../config/database_connection");

exports.assignPermission = (role_id, permission_id) => {
  return pool.query(
    "INSERT INTO role_permissions(role_id, permission_id) VALUES($1,$2)",
    [role_id, permission_id],
  );
};

exports.getPermissionsByRole = (role_id) => {
  return pool.query(
    `SELECT p.*
     FROM role_permissions rp
     JOIN permissions p ON p.id = rp.permission_id
     WHERE rp.role_id = $1`,
    [role_id],
  );
};
