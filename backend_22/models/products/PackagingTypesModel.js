const db = require("../../config/database_connection");

// ================= CREATE =================
const createRecord = (data, client = db) => {
  return client.query(
    `
      INSERT INTO packaging_types (
        packaging_name,
        packaging_slug,
        status
      )
      VALUES ($1, $2, $3)
      RETURNING *
    `,
    data,
  );
};

// ================= GET ALL =================
const getRecords = () => {
  return db.query(`
    SELECT *
    FROM packaging_types
    ORDER BY id DESC
  `);
};

// ================= GET BY ID =================
const getRecordById = (id) => {
  return db.query(
    `
      SELECT *
      FROM packaging_types
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
      UPDATE packaging_types
      SET
        packaging_name = COALESCE($1, packaging_name),
        packaging_slug = COALESCE($2, packaging_slug),
        status = COALESCE($3, status),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $4
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
      UPDATE packaging_types
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
      UPDATE packaging_types
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
      UPDATE packaging_types
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
      DELETE FROM packaging_types
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
