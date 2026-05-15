const db = require("../../config/database_connection");

// ================= CREATE =================
const createRecord = (data, client = db) => {
  return client.query(
    `
    INSERT INTO categories
    (
      category_name,
      category_slug,
      description
    )
    VALUES ($1,$2,$3)
    RETURNING *
    `,
    data,
  );
};

// ================= GET ALL =================
// const getRecords = () => {
//   return db.query(`
//     SELECT *
//     FROM categories
//     WHERE is_deleted = false
//     ORDER BY id DESC
//   `);
// };

const getRecords = () => {
  return db.query(`
    SELECT *
    FROM categories
     WHERE is_deleted = false
    ORDER BY id DESC
  `);
};
// ================= GET BY ID =================
const getRecordById = (id) => {
  return db.query(
    `
    SELECT *
    FROM categories
    WHERE id = $1
    `,
    [id],
  );
};

// ================= UPDATE =================
// const updateRecord = (data, client = db) => {
//   return client.query(
//     `
//     UPDATE categories
//     SET
//       category_name = $1,
//       category_slug = $2,
//       description = $3
//     WHERE id = $4
//     RETURNING *
//     `,
//     data,
//   );
// };

const updateRecord = (data, client = db) => {
  return client.query(
    `
    UPDATE categories
    SET
      category_name = COALESCE($1, category_name),
      category_slug = COALESCE($2, category_slug),
      description = COALESCE($3, description)
    WHERE id = $4
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
