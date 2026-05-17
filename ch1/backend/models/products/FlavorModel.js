const db = require("../../config/database_connection");

// ================= CREATE =================
const createRecord = (data, client = db) => {
  return client.query(
    `
      INSERT INTO flavors
      (
        flavor_name,
        flavor_slug
      )
      VALUES ($1,$2)
      RETURNING *
    `,
    data,
  );
};

// ================= GET ALL =================
const getRecords = () => {
  return db.query(`
    SELECT *
    FROM flavors
    ORDER BY id DESC
  `);
};

// ================= GET BY ID =================
const getRecordById = (id) => {
  return db.query(
    `
      SELECT *
      FROM flavors
      WHERE id = $1
      AND is_deleted = false
    `,
    [id],
  );
};

// ================= UPDATE =================
const updateRecord = (data, client = db) => {
  return client.query(
    `
      UPDATE flavors
      SET
        flavor_name = COALESCE($1, flavor_name),
        flavor_slug = COALESCE($2, flavor_slug),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $3
      AND is_deleted = false
      RETURNING *
    `,
    data,
  );
};

// ================= STATUS UPDATE =================
const updateStatus = (id) => {
  return db.query(
    `
      UPDATE flavors
      SET
        status = NOT status,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $1
      AND is_deleted = false
      RETURNING *
    `,
    [id],
  );
};

// ================= SOFT DELETE =================
const softDeleteRecord = (id) => {
  return db.query(
    `
      UPDATE flavors
      SET
        is_deleted = true,
        deleted_at = CURRENT_TIMESTAMP
      WHERE id = $1
      RETURNING *
    `,
    [id],
  );
};

// ================= RESTORE =================
const restoreRecord = (id) => {
  return db.query(
    `
      UPDATE flavors
      SET
        is_deleted = false,
        deleted_at = NULL
      WHERE id = $1
      RETURNING *
    `,
    [id],
  );
};

// ================= HARD DELETE =================
const deleteRecord = (id) => {
  return db.query(
    `
      DELETE FROM flavors
      WHERE id = $1
      RETURNING *
    `,
    [id],
  );
};

module.exports = {
  createRecord,
  getRecords,
  getRecordById,
  updateRecord,
  updateStatus,
  softDeleteRecord,
  restoreRecord,
  deleteRecord,
};
