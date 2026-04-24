// const pool = require("../config/database_connection");

// exports.getUserPermissions = async (userId) => {
//   const result = await pool.query(
//     `
//     SELECT p.name
//     FROM users u
//     JOIN roles r ON u.role_id = r.id
//     JOIN role_permissions rp ON rp.role_id = r.id
//     JOIN permissions p ON p.id = rp.permission_id
//     WHERE u.id = $1
//   `,
//     [userId],
//   );

//   return result.rows.map((row) => row.name);
// };

exports.getUserPermissions = (permission) => {
  return (req, res, next) => {
    if (!req.user.permissions.includes(permission)) {
      return res.status(403).json({
        message: "Access Denied",
      });
    }
    next();
  };
};

// exports.getUserPermissions = async (user_id, client) => {
//   const result = await client.query(
//     `SELECT p.permission_name
//      FROM permissions p
//      JOIN role_permissions rp ON rp.permission_id = p.id
//      JOIN user_logins u ON u.role_id = rp.role_id
//      WHERE u.user_id = $1`,
//     [user_id],
//   );

//   return result.rows.map((row) => row.permission_name);
// };
