const db = require("../config/database_connection");

// const fetchCatDataById = (id) => {
//   return db.query(
//     `
//     SELECT
//       cp.id,
//       cp.category_name,
//       cp.category_slug,
//       cp.description,
//       cp.status,
//       cp.created_at,
//       cc.id AS image_id,
//       cc.image,
//       cc.is_primary
//     FROM categories AS cp
//     LEFT JOIN category_images AS cc
//       ON cc.category_id = cp.id
//       AND cc.is_deleted = false
//     WHERE cp.id = $1
//       AND cp.is_deleted = false

//     ORDER BY cp.id DESC
//     `,
//     [id],
//   );
// };
const fetchCatDataById = (id) => {
  return db.query(
    `
    SELECT
      c.id,
      c.parent_id,
      c.category_name,
      c.category_slug,
      c.description,
      c.status,

      ci.id AS image_id,
      ci.image,
      ci.is_primary

    FROM categories c

    LEFT JOIN category_images ci
      ON ci.category_id = c.id
      AND ci.is_deleted = false

    WHERE c.id = $1
      AND c.is_deleted = false
    `,
    [id],
  );
};
module.exports = {
  fetchCatDataById,
};

// const fetchCategoryDataServices = () => {
//   return db.query(`
//     SELECT
//       c.id,
//       c.category_name,
//       c.category_slug,
//       c.description,
//       c.status,
//       c.is_deleted,
//       c.created_at,
//       c.updated_at,
//       ci.id AS image_id,
//       ci.image,
//       ci.is_primary,
//       ci.status AS image_status
//     FROM categories c
//     LEFT JOIN category_images ci
//       ON ci.category_id = c.id
//       AND ci.is_deleted = false
//     WHERE c.is_deleted = false
//     ORDER BY c.id DESC

//   `);
// };
// module.exports = {
//   fetchCategoryDataServices,
// };
