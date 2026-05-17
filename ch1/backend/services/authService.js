const findUserByEmailMeta = async (email, client) => {
  const result = await client.query(
    `SELECT 
        u.id AS user_id,
        u.name,
        u.email,
        u.role_id
     FROM user_logins ul
     INNER JOIN users u ON ul.user_id = u.id
     WHERE u.email = $1
       AND u.is_deleted = false
       AND ul.is_deleted = false
     LIMIT 1`,
    [email],
  );

  return result.rows[0];
};
const updateLoginMeta = async (user_id, client) => {
  if (!user_id || isNaN(user_id)) {
    throw new Error("Invalid user_id passed to DB");
  }

  const result = await client.query(
    `UPDATE user_logins
     SET last_login = NOW()
     WHERE user_id = $1
     RETURNING *`,
    [Number(user_id)],
  );

  return result.rows[0];
};

module.exports = {
  findUserByEmailMeta,
  updateLoginMeta,
};
