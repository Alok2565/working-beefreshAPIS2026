const db = require("../../config/database_connection");

// ================= CREATE =================
const createImgRecord = (data, client = db) => {
  return client.query(
    `
    INSERT INTO category_images
    (
      category_id,
      image,
      is_primary,
      status
    )
    VALUES ($1,$2,$3,$4)
    RETURNING *
    `,
    data,
  );
};

// ================= GET ALL =================
// const getImgRecords = () => {
//   return db.query(`
//     SELECT *
//     FROM category_images
//     WHERE is_deleted = false
//     ORDER BY id DESC
//   `);
// };

const getImgRecords = () => {
  return db.query(`
    SELECT *
    FROM category_images
     WHERE is_deleted = false
    ORDER BY id DESC
  `);
};
// ================= GET BY ID =================
const getImgRecordById = (id) => {
  return db.query(
    `
    SELECT *
    FROM category_images
    WHERE id = $1
    `,
    [id],
  );
};

// ================= UPDATE =================
// const updateImgRecord = (data, client = db) => {
//   return client.query(
//     `
//     UPDATE category_images
//     SET
//       category_id = $1,
//       image = $2,
//       is_primary = $3,
//       status = $4
//     WHERE id = $5
//     RETURNING *

//     `,
//     data,
//   );
// };

const updateImgRecord = (data, client = db) => {
  return client.query(
    `
    UPDATE category_images
    SET
      category_id = COALESCE($1, category_id),
      image = COALESCE($2, image),
      is_primary = COALESCE($3, is_primary),
      status = COALESCE($4, status)
    WHERE id = $5
    RETURNING *
    `,
    data,
  );
};

// ================= STATUS UPDATE =================
const updateImgStatus = (id) => {
  return db.query(
    `
    UPDATE category_images
    SET status = NOT status
    WHERE id = $1
    RETURNING *
    `,
    [id],
  );
};

// ================= SOFT DELETE =================
const softDeleteImgRecord = (id) => {
  return db.query(
    `
    UPDATE category_images
    SET is_deleted = true
    WHERE id = $1
    RETURNING *
    `,
    [id],
  );
};

// ================= RESTORE =================
const restoreImgRecord = (id) => {
  return db.query(
    `
    UPDATE category_images
    SET is_deleted = false
    WHERE id = $1
    RETURNING *
    `,
    [id],
  );
};

// ================= HARD DELETE =================
const deleteImgRecord = (id) => {
  return db.query(
    `
    DELETE FROM category_images
    WHERE id = $1
    RETURNING *
    `,
    [id],
  );
};

module.exports = {
  createImgRecord,
  getImgRecords,
  getImgRecordById,
  updateImgRecord,
  updateImgStatus,
  softDeleteImgRecord,
  restoreImgRecord,
  deleteImgRecord,
};
