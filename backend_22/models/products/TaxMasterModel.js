const db = require("../../config/database_connection");

// ================= CREATE =================
const createRecord = (data, client = db) => {
  return client.query(
    `
      INSERT INTO taxes
      (
        tax_name,
        tax_slug,
        tax_code,
        tax_percent,
        tax_type
      )
      VALUES ($1,$2,$3,$4,$5)
      RETURNING *
    `,
    data,
  );
};

// ================= GET ALL =================
const getRecords = () => {
  return db.query(`
    SELECT *
    FROM taxes
    ORDER BY id DESC
  `);
};

// ================= GET BY ID =================
const getRecordById = (id) => {
  return db.query(
    `
      SELECT *
      FROM taxes
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
      UPDATE taxes
      SET
        tax_name = COALESCE($1, tax_name),
        tax_slug = COALESCE($2, tax_slug),
        tax_code = COALESCE($3, tax_code),
        tax_percent = COALESCE($4, tax_percent),
        tax_type = COALESCE($5, tax_type),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $6
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
      UPDATE taxes
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
      UPDATE taxes
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
      UPDATE taxes
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
      DELETE FROM taxes
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
