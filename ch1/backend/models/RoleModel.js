const db = require("../config/database_connection");

const createRole = (data, client = db) => {
  return client.query("INSERT INTO roles (name) VALUES ($1) RETURNING *", [
    data,
  ]);
};
const getRolesData = () => {
  return db.query(`
    SELECT *
    FROM roles
    ORDER BY id DESC
  `);
};

const getRoleById = (id) => {
  return db.query(
    `
      SELECT *
      FROM roles
      WHERE id = $1
    `,
    [id],
  );
};

const updateRole = (data, client = db) => {
  return client.query(
    `
      UPDATE roles
      SET name = $1
      WHERE id = $2
      RETURNING *
    `,
    data,
  );
};

// ================= STATUS UPDATE =================
const updateStatus = (id) => {
  return db.query(
    `UPDATE roles
    SET status = NOT status
    WHERE id = $1
    RETURNING *
    `,
    [id],
  );
};

const softDeleteRole = (id, client = db) => {
  return client.query(
    `
      UPDATE roles
      SET
        is_deleted = true,
        deleted_at = NOW()
      WHERE id = $1
      RETURNING *
    `,
    [id],
  );
};

const restoreRole = (id, client = db) => {
  return client.query(
    `
      UPDATE roles
      SET
        is_deleted = false,
        deleted_at = NULL
      WHERE id = $1
      RETURNING *
    `,
    [id],
  );
};

const deleteRole = (id, client = db) => {
  return client.query(
    `
      DELETE FROM roles
      WHERE id = $1
      RETURNING *
    `,
    [id],
  );
};

module.exports = {
  createRole,
  getRolesData,
  getRoleById,
  updateRole,
  updateStatus,
  softDeleteRole,
  restoreRole,
  deleteRole,
};
