// exports.findUserByEmail = async (email) => {
//   try {
//     const result = await db.query(
//       `SELECT ul.*, u.role_id
//        FROM user_logins ul
//        JOIN users u ON u.id = ul.user_id
//        WHERE LOWER(ul.email) = LOWER($1)
//          AND ul.is_deleted = false
//          AND u.is_deleted = false
//        LIMIT 1`,
//       [email],
//     );

//     return result.rows[0] || null;
//   } catch (err) {
//     logger.error("findUserByEmail failed", {
//       message: err.message,
//       email,
//     });
//     throw err;
//   }
// };

const db = require("../config/database_connection");

// GET USER
exports.findUserByEmail = async (email, client) => {
  const result = await client.query(
    `SELECT * 
     FROM user_logins 
     WHERE email = $1 AND is_deleted = false`,
    [email],
  );

  return result.rows[0];
};

// UPDATE LOGIN INFO
exports.updateLoginMeta = async (user_id, client) => {
  const result = await client.query(
    `UPDATE user_logins 
     SET last_login = NOW()
     WHERE user_id = $1
     RETURNING *`,
    [user_id],
  );

  return result.rows[0];
};
