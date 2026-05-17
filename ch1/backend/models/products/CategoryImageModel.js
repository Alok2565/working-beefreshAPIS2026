const db = require("../../config/database_connection");

const createImgRecord = (data, client = db) => {
  return client.query(
    `
    INSERT INTO category_images (
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

const updateImgRecord = (data, client = db) => {
  return client.query(
    `
    UPDATE category_images
    SET
      category_id = COALESCE($1, category_id),
      image = COALESCE($2, image),
      is_primary = COALESCE($3, is_primary),
      status = COALESCE($4, status),
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $6
    RETURNING *
    `,
    data,
  );
};

// const updateImgRecord = (data, client = db) => {
//   return client.query(
//     `
//     UPDATE category_images
//     SET
//       image = COALESCE($1, image),
//       updated_at = CURRENT_TIMESTAMP
//     WHERE id = $2
//     RETURNING *
//     `,
//     data,
//   );
// };
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
