// const db = require("../config/database_connection");

// // ✅ CREATE
// const createRecord = (data, client) => {
//   return client.query(
//     `INSERT INTO home_banners
//     (name, slug, url, description, image, ip_address)
//     VALUES ($1,$2,$3,$4,$5,$6)
//     RETURNING *`,
//     data,
//   );
// };
// // ✅ GET ALL
// const getRecords = () => {
//   return db.query(
//     `SELECT * FROM home_banners
//      WHERE is_deleted = false
//      ORDER BY id DESC`,
//   );
// };

// // ✅ GET BY ID
// const getRecordById = (id) => {
//   return db.query(
//     `SELECT * FROM home_banners
//      WHERE id = $1 AND is_deleted = false`,
//     [id],
//   );
// };

// // ✅ UPDATE
// const updateRecord = (data) => {
//   return db.query(
//     `UPDATE home_banners
//      SET
//        name = COALESCE($1, name),
//        slug = COALESCE($2, slug),
//        url = COALESCE($4, url),
//       description = COALESCE($5, description),
//       image = COALESCE($3, image)
//      WHERE id = $6 AND is_deleted = false
//      RETURNING *`,
//     data,
//   );
// };

// // ================= STATUS UPDATE =================
// const updateStatus = (id) => {
//   return db.query(
//     `
//     UPDATE home_banners
//     SET status = NOT status
//     WHERE id = $1
//     RETURNING *
//     `,
//     [id],
//   );
// };

// // ✅ SOFT DELETE
// const softDeleteRecord = (id) => {
//   return db.query(
//     `UPDATE home_banners
//      SET is_deleted = true, deleted_at = NOW()
//      WHERE id = $1 AND is_deleted = false
//      RETURNING *`,
//     [id],
//   );
// };

// // ✅ RESTORE
// const restoreRecord = (id) => {
//   return db.query(
//     `UPDATE home_banners
//      SET is_deleted = false, deleted_at = NULL
//      WHERE id = $1
//      RETURNING *`,
//     [id],
//   );
// };

// // ❗ FIXED DELETE
// const deleteRecord = (id) => {
//   return db.query(`DELETE FROM home_banners WHERE id = $1`, [id]);
// };

// module.exports = {
//   createRecord,
//   getRecords,
//   getRecordById,
//   updateRecord,
//   updateStatus,
//   softDeleteRecord,
//   restoreRecord,
//   deleteRecord,
// };

const db = require("../config/database_connection");

// ================= CREATE =================
const createRecord = (data, client) => {
  return client.query(
    `INSERT INTO home_banners
    (name, slug, url, description, image, ip_address)
    VALUES ($1,$2,$3,$4,$5,$6)
    RETURNING *`,
    data,
  );
};

// ================= GET ALL =================
const getRecords = () => {
  return db.query(`
    SELECT *
    FROM home_banners
    ORDER BY id DESC
  `);
};

// ================= GET BY ID =================
const getRecordById = (id) => {
  return db.query(
    `
    SELECT *
    FROM home_banners
    WHERE id = $1
    `,
    [id],
  );
};

// ================= UPDATE =================
const updateRecord = (data, client = db) => {
  return client.query(
    `UPDATE home_banners
    SET
      name = $1,
      slug = $2,
      url = $3,
      description = $4,
      image = COALESCE($5, image)
    WHERE id = $6
    RETURNING *
    `,
    data,
  );
};

// ================= STATUS UPDATE =================
const updateStatus = (id) => {
  return db.query(
    `UPDATE home_banners
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
    `UPDATE home_banners
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
    UPDATE home_banners
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
    DELETE FROM home_banners
    WHERE id = $1
    RETURNING *
    `,
    [id],
  );
};

// ================= EXPORT =================
module.exports = {
  createRecord,
  getRecords,
  getRecordById,
  updateRecord,
  updateStatus, // ✅ IMPORTANT
  softDeleteRecord,
  restoreRecord,
  deleteRecord,
};
