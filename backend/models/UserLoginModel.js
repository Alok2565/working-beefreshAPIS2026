const db = require("../config/database_connection");

// ✅ CREATE USER LOGIN
const createUserLogin = (createUserLoginData, client) => {
  return client.query(
    `INSERT INTO user_logins 
     (user_id, email, password, pwd_generated_at, mobile, token, status, last_login, is_deleted, deleted_at, token_expiry, ip_address)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
     RETURNING *`,
    createUserLoginData,
  );
};

// ✅ GET USER BY ID (FROM USERS TABLE)
const getUserByIdAll = (data, client) => {
  return client.query(`SELECT * FROM users WHERE id = $1`, data);
};

// ✅ FIND USER BY EMAIL
const findUserByEmail = async (email, client) => {
  const result = await client.query(
    `SELECT * 
     FROM user_logins 
     WHERE email = $1 AND is_deleted = false`,
    [email],
  );
  return result.rows[0];
};

// ✅ FIND BY EMAIL + TOKEN
const findByEmailToken = (data, client) => {
  return client.query(
    `SELECT * FROM user_logins 
     WHERE email = $1 
       AND token = $2 
       AND is_deleted = false`,
    data,
  );
};

// ✅ UPDATE PASSWORD
const updateUserLoginPassword = (data, client) => {
  return client.query(
    `UPDATE user_logins 
     SET password = $1
     WHERE id = $2 AND is_deleted = false
     RETURNING *`,
    data,
  );
};

// ✅ CLEAR TOKEN
const clearToken = (userId, client) => {
  return client.query(
    `UPDATE user_logins 
     SET token = NULL, 
         token_expiry = NULL, 
         pwd_generated_at = NOW()
     WHERE id = $1`,
    [userId],
  );
};

// ✅ VERIFY USER
const verifyUser = (user_id, client) => {
  return client.query(
    `UPDATE user_logins 
     SET status = 1 
     WHERE user_id = $1`,
    [user_id],
  );
};

// ✅ UPDATE USER LOGIN
const updateUserLogin = (data, client) => {
  return client.query(
    `UPDATE user_logins 
     SET 
       email = COALESCE($1, email),
       mobile = COALESCE($2, mobile),
       password = COALESCE($3, password),
       token = COALESCE($4, token),
       token_expiry = COALESCE($5, token_expiry)
     WHERE user_id = $6 AND is_deleted = false
     RETURNING *`,
    data,
  );
};

// ✅ SOFT DELETE
const softDeleteUserLogin = (userId, client) => {
  return client.query(
    `UPDATE user_logins 
     SET is_deleted = true, deleted_at = NOW()
     WHERE user_id = $1 AND is_deleted = false
     RETURNING *`,
    [userId],
  );
};

// ✅ RESTORE USER
const restoreUserLogin = (userId, client) => {
  return client.query(
    `UPDATE user_logins 
     SET is_deleted = false, deleted_at = NULL
     WHERE user_id = $1`,
    [userId],
  );
};

// ✅ DELETE USER (FROM USERS TABLE)
const deleteUser = (id, client) => {
  return client.query(`DELETE FROM users WHERE id = $1 RETURNING *`, [id]);
};

// ✅ FINAL EXPORT (IMPORTANT)
module.exports = {
  createUserLogin,
  getUserByIdAll,
  findUserByEmail,
  findByEmailToken,
  updateUserLoginPassword,
  clearToken,
  verifyUser,
  updateUserLogin,
  softDeleteUserLogin,
  restoreUserLogin,
  deleteUser,
};
// const db = require("../config/database_connection");

// // exports.createUserLogin = (createUserLoginData, client) => {
// //   return client.query(
// //     `INSERT INTO user_logins
// //    (user_id, email, password, mobile, token, status, ip_address,last_login,token_expiry)
// //     VALUES ($1, $2, $3, $4, $5, $6, $7,$8,$9)
// //     RETURNING *`,
// //     createUserLoginData,
// //   );
// // };

// const createUserLogin = (createUserLoginData, client) => {
//   return client.query(
//     `INSERT INTO user_logins
//      (user_id, email, password, pwd_generated_at, mobile, token, status, last_login, is_deleted, deleted_at, token_expiry, ip_address)
//      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
//      RETURNING *`,
//     createUserLoginData,
//   );
// };

// exports.getUserByIdAll = (data, client) => {
//   return client.query(
//     `SELECT *
//      FROM users
//      WHERE id = $1`,
//     data,
//   );
// };
// exports.findUserByEmail = async (email, client) => {
//   const result = await client.query(
//     `SELECT *
//      FROM user_logins
//      WHERE email = $1 AND is_deleted = false`,
//     [email],
//   );

//   return result.rows[0];
// };

// const findByEmailToken = (data, client) => {
//   return client.query(
//     `SELECT * FROM user_logins
//      WHERE email = $1
//        AND token = $2
//        AND is_deleted = false`,
//     data,
//   );
// };

// const updateUserLoginPassword = (data, client) => {
//   return client.query(
//     `UPDATE user_logins
//      SET password = $1
//      WHERE id = $2 AND is_deleted = false
//      RETURNING *`,
//     data,
//   );
// };

// // const clearToken = (userId, client) => {
// //   return client.query(
// //     `UPDATE user_logins
// //      SET token = $1, token_expiry = $2, pwd_generate=$3
// //      WHERE id = $1`,
// //     [userId],
// //   );
// // };
// const clearToken = (userId, client) => {
//   return client.query(
//     `UPDATE user_logins
//      SET token = NULL,
//          token_expiry = NULL,
//          pwd_generated_at = NOW()
//      WHERE id = $1`,
//     [userId], // This matches $1 in the WHERE clause
//   );
// };
// exports.verifyUser = async (user_id, client) => {
//   return await client.query(
//     `UPDATE user_logins
//      SET status = 1
//      WHERE user_id = $1`,
//     [user_id],
//   );
// };
// const updateUserLogin = (data, client) => {
//   return client.query(
//     `UPDATE user_logins
//      SET
//        email = COALESCE($1, email),
//        mobile = COALESCE($2, mobile),
//        password = COALESCE($3, password),
//        token = COALESCE($4, token),
//        token_expiry = COALESCE($5, token_expiry)
//      WHERE user_id = $6 AND is_deleted = false
//      RETURNING *`,
//     data,
//   );
// };
// module.exports = {
//   findByEmailToken,
//   updateUserLoginPassword,
//   clearToken,
//   updateUserLogin,
// };
// exports.softDeleteUserLogin = (userId, client) => {
//   return client.query(
//     `UPDATE user_logins
//      SET is_deleted = true, deleted_at = NOW()
//      WHERE user_id = $1 AND is_deleted = false
//      RETURNING *`,
//     [userId],
//   );
// };
// exports.restoreUserLogin = (userId, client) => {
//   return client.query(
//     `UPDATE user_logins
//      SET is_deleted = false, deleted_at = NULL
//      WHERE user_id = $1`,
//     [userId],
//   );
// };
// exports.deleteUser = (id, client) => {
//   return client.query(`DELETE FROM users WHERE id = $1 RETURNING *`, [id]);
// };
