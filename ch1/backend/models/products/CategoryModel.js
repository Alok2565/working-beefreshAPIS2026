const db = require("../../config/database_connection");

const createRecord = (data, client = db) => {
  console.log("CREATE DATA =>", data);

  console.log("TOTAL PARAMS =>", data.length);

  return client.query(
    `
    INSERT INTO categories (
      parent_id,
      category_name,
      category_slug,
      description,
      created_by
    )
    VALUES ($1,$2,$3,$4,$5)
    RETURNING *
    `,
    data,
  );
};

const getRecords = (client = db) => {
  return client.query(`
    SELECT
      c.*,
      p.category_name AS parent_category_name

    FROM categories c

    LEFT JOIN categories p
      ON p.id = c.parent_id

    WHERE c.is_deleted = false

    ORDER BY c.id DESC
  `);
};

const getRecordById = (id, client = db) => {
  return client.query(
    `
    SELECT
      c.*,
      p.category_name AS parent_category_name

    FROM categories c

    LEFT JOIN categories p
      ON p.id = c.parent_id

    WHERE c.id = $1
      AND c.is_deleted = false
    `,
    [id],
  );
};

const updateRecord = (data, client = db) => {
  return client.query(
    `
    UPDATE categories
    SET
      parent_id = COALESCE($1, parent_id),
      category_name = COALESCE($2, category_name),
      category_slug = COALESCE($3, category_slug),
      description = COALESCE($4, description),
      updated_by = COALESCE($5, updated_by),
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $6
    RETURNING *
    `,
    data,
  );
};

// ================= STATUS UPDATE =================
const updateStatus = (id) => {
  return db.query(
    `
    UPDATE categories
    SET status = NOT status
    WHERE id = $1
    RETURNING *
    `,
    [id],
  );
};

// ================= SOFT DELETE =================
const softDeleteRecord = (id) => {
  return db.query(
    `
    UPDATE categories
    SET is_deleted = true
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
    UPDATE categories
    SET is_deleted = false
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
    DELETE FROM categories
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
