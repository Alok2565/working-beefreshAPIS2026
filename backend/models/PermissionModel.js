// const pool = require("../config/database_connection");

// exports.createPermission = (name) => {
//   return pool.query("INSERT INTO permissions(name) VALUES($1) RETURNING *", [
//     name,
//   ]);
// };

// exports.getAllPermissions = () => {
//   return pool.query("SELECT * FROM permissions");
// };

const pool = require("../config/database_connection");

// CREATE PERMISSION
exports.createPermission = (name, client = pool) => {
  return client.query("INSERT INTO permissions(name) VALUES($1) RETURNING *", [
    name,
  ]);
};

// GET ALL PERMISSIONS
exports.getAllPermissions = (client = pool) => {
  return client.query("SELECT * FROM permissions");
};

// ASSIGN PERMISSIONS TO ROLE
exports.assignPermissions = (roleId, permissions, client = pool) => {
  const queries = permissions.map((permId) => {
    return client.query(
      "INSERT INTO role_permissions (role_id, permission_id) VALUES ($1, $2)",
      [roleId, permId],
    );
  });

  return Promise.all(queries);
};
