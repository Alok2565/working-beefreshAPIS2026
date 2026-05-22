const db = require("../../config/database_connection");

// ================= CREATE =================

const createRecord = (data, client = db) => {
  return client.query(
    `
      INSERT INTO attribute_values
      (
        attribute_id,
        value_name,
        value_slug,
        value_code,
        status,
        description,
        sort_order
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7)
      RETURNING *
    `,
    data,
  );
};

// ================= GET ALL =================

const getRecords = () => {
  return db.query(`
    SELECT
      av.*,
      pa.attribute_name
    FROM attribute_values av
    LEFT JOIN product_attributes pa
      ON pa.id = av.attribute_id
    ORDER BY av.id DESC
  `);
};

// ================= GET BY ID =================

const getRecordById = (id) => {
  return db.query(
    `
      SELECT
        av.*,
        pa.attribute_name
      FROM attribute_values av
      LEFT JOIN product_attributes pa
        ON pa.id = av.attribute_id
      WHERE av.id = $1
      AND av.is_deleted = false
    `,
    [id],
  );
};

// ================= UPDATE =================

const updateRecord = (data, client = db) => {
  return client.query(
    `
      UPDATE attribute_values
      SET
        attribute_id = COALESCE($1, attribute_id),
        value_name = COALESCE($2, value_name),
        value_slug = COALESCE($3, value_slug),
        value_code = COALESCE($4, value_code),
        status = COALESCE($5, status),
        description = COALESCE($6, description),
        sort_order = COALESCE($7, sort_order),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $8
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
      UPDATE attribute_values
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
      UPDATE attribute_values
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
      UPDATE attribute_values
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
      DELETE FROM attribute_values
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
