const db = require("../config/database_connection");

// exports.createUser = (userData, client) => {
//   return client.query(
//     `INSERT INTO users
//       (name, email, mobile, role_id, status, ip_address)
//       VALUES ($1, $2, $3, $4, $5, $6)
//     RETURNING *`,
//     userData,
//   );
// };
const createUser = (userData, client) => {
  return client.query(
    `INSERT INTO users 
      (name, email, mobile, role_id, status, ip_address,is_deleted,deleted_at)
      VALUES ($1, $2, $3, $4, $5, $6,$7,$8)
    RETURNING *`,
    userData,
  );
};
const getUsersData = () => {
  return db.query(
    "SELECT * FROM users WHERE is_deleted = false ORDER BY id DESC",
  );
};
const getUserById = (data, client) => {
  return client.query(
    `SELECT * 
     FROM users 
     WHERE id = $1 AND is_deleted = false`,
    data,
  );
};

const updateUser = (data, client) => {
  return client.query(
    `UPDATE users 
     SET 
       name = COALESCE($1, name),
       email = COALESCE($2, email),
       mobile = COALESCE($3, mobile)
     WHERE id = $4 AND is_deleted = false
     RETURNING *`,
    data,
  );
};
const softDeleteUser = (id, client) => {
  return client.query(
    `UPDATE users 
     SET is_deleted = true, deleted_at = NOW()
     WHERE id = $1 AND is_deleted = false
     RETURNING *`,
    [id], // always array
  );
};
const restoreUser = (id, client) => {
  return client.query(
    `UPDATE users 
     SET is_deleted = false, deleted_at = NULL
     WHERE id = $1
     RETURNING *`,
    [id],
  );
};

const deleteUserLogin = (userId, client) => {
  return client.query(`DELETE FROM user_logins WHERE user_id = $1`, [userId]);
};

module.exports = {
  createUser,
  getUsersData,
  getUserById,
  updateUser,
  softDeleteUser,
  restoreUser,
  deleteUserLogin,
};
