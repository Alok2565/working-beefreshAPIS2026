const db = require("../config/database_connection");

const createUserLogin = (createUserLoginData, client) => {
  return client.query(
    `INSERT INTO user_logins 
     (user_id, password, pwd_generated_at, token, token_expiry, status, is_deleted, deleted_at, last_login, ip_address)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
     RETURNING *`,
    createUserLoginData,
  );
};

const getUserByIdAll = (data, client) => {
  return client.query(`SELECT * FROM users WHERE id = $1`, data);
};

const findUserByEmail = async (email, client) => {
  const result = await client.query(
    `SELECT 
        ul.user_id,
        u.name,
        u.email,
        ul.password
     FROM user_logins ul
     INNER JOIN users u ON u.id = ul.user_id
     WHERE u.email = $1
       AND ul.is_deleted = false
       AND u.is_deleted = false
     LIMIT 1`,
    [email],
  );

  return result.rows[0];
};

const findByEmailToken = (data, client) => {
  return client.query(
    `SELECT 
        u.id AS user_id,
        u.name,
        u.email,
        ul.token,
        ul.token_expiry
     FROM users u
     JOIN user_logins ul ON ul.user_id = u.id
     WHERE u.email = $1
       AND ul.token = $2
       AND ul.token_expiry > NOW()
       AND u.is_deleted = false
       AND ul.is_deleted = false`,
    data,
  );
};

const updateUserLoginPassword = (data, client) => {
  return client.query(
    `UPDATE user_logins 
     SET password = $1
     WHERE user_id = $2
     RETURNING *`,
    data,
  );
};

const clearToken = (userId, client) => {
  return client.query(
    `UPDATE user_logins 
     SET token = NULL, token_expiry = NULL
     WHERE user_id = $1`,
    [userId],
  );
};

const verifyUser = (user_id, client) => {
  return client.query(
    `UPDATE user_logins 
     SET status = true 
     WHERE user_id = $1`,
    [user_id],
  );
};
// // ✅ FIND USER BY EMAIL
// const findUserByEmail = async (email, client) => {
//   const result = await client.query(
//     `
//     SELECT
//       ul.user_id AS id,
//       u.email,
//       ul.password
//     FROM user_logins ul
//     INNER JOIN users u ON u.id = ul.user_id
//     WHERE u.email = $1
//       AND ul.is_deleted = false
//       AND u.is_deleted = false
//     LIMIT 1
//     `,
//     [email],
//   );

//   return result.rows[0];
// };

// const findByEmailToken = (data, client) => {
//   return client.query(
//     `SELECT
//   u.id AS user_id,
//   u.name,
//   u.email,
//   ul.token,
//   ul.token_expiry
// FROM users u
// JOIN user_logins ul ON ul.user_id = u.id
// WHERE u.email = $1
//   AND ul.token = $2
//   AND ul.token_expiry > NOW()
//   AND u.is_deleted = false
//   AND ul.is_deleted = false
//     `,
//     data,
//   );
// };
// //  UPDATE PASSWORD
// const updateUserLoginPassword = (data, client) => {
//   return client.query(
//     `UPDATE user_logins
//      SET password = $1
//      WHERE user_id = $2 AND is_deleted = false
//      RETURNING *`,
//     data,
//   );
// };

// // CLEAR TOKEN
// const clearToken = (userId, client) => {
//   return client.query(
//     `UPDATE user_logins
//      SET token = NULL,
//          token_expiry = NULL,
//          pwd_generated_at = NOW()
//      WHERE user_id = $1`,
//     [userId],
//   );
// };

// // ✅ VERIFY USER
// const verifyUser = (user_id, client) => {
//   return client.query(
//     `UPDATE user_logins
//      SET status = true
//      WHERE user_id = $1`,
//     [user_id],
//   );
// };
// module.exports = { verifyUser };

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
const updateStatusUserLogin = (client, id) => {
  return client.query(
    `
    UPDATE user_logins
    SET status = CASE
      WHEN status = true THEN false
      ELSE true
    END
    WHERE user_id = $1
    RETURNING *
    `,
    [id],
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
  updateStatusUserLogin,
  updateUserLogin,
  softDeleteUserLogin,
  restoreUserLogin,
  deleteUser,
};
