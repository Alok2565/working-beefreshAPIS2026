const pool = require("../config/database_connection");
const { hashPassword } = require("../utils/hash");

// GET ALL
exports.getAllUsers = () => {
  return pool.query("SELECT * FROM users ORDER BY id DESC");
};

// GET BY ID
exports.getUserById = (id) => {
  return pool.query("SELECT * FROM users WHERE id=$1", [id]);
};

// CREATE
exports.createUser = async (data) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const user = await client.query(
      "INSERT INTO users(name,email,mobile,role_id) VALUES($1,$2,$3,$4) RETURNING *",
      [data.name, data.email, data.mobile, data.role_id],
    );

    const hashed = await hashPassword(data.password);

    await client.query(
      "INSERT INTO user_logins(user_id,password,mobile) VALUES($1,$2,$3)",
      [user.rows[0].id, hashed],
    );

    await client.query("COMMIT");

    return user.rows[0];
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};

// UPDATE
exports.updateUser = (id, data) => {
  return pool.query(
    "UPDATE users SET name=$1, mobile=$2, role_id=$3, status=$4 WHERE id=$5",
    [data.name, data.mobile, data.role_id, data.status, id],
  );
};

// DELETE
exports.deleteUser = (id) => {
  return pool.query("DELETE FROM users WHERE id=$1", [id]);
};
