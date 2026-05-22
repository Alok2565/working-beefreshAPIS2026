// // backend/Models/products/ProductModel.js
// const db = require("../../config/database_connection");

// const createProduct = async (data, client) => {
//   return client.query(
//     `INSERT INTO products
//     (
//       category_id,
//       product_name, 
//       slug, 
//       sku, 
//       brand_name,
//       short_description,
//       long_description, 
//       thumbnail_image,
//       is_featured,
//       is_best_seller,
//       is_new_arrival,
//       seo_title,
//       seo_keywords,
//       seo_description,
//       sort_order,
//       created_by,
//     )
//     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)
//     RETURNING *`,
//     data,
//   );
// };
// module.exports = {
//   createProduct,
// };
const db = require("../../config/database_connection");

const createProduct = async (data, client = db) => {
  const query = `
    INSERT INTO products
    (
      category_id,
      product_name,
      slug,
      sku,
      brand_id,
      short_description,
      long_description,
      thumbnail_image,
      is_featured,
      is_best_seller,
      is_new_arrival,
      seo_title,
      seo_keywords,
      seo_description,
      sort_order,
      status,
      created_by
    )
    VALUES
    (
      $1,$2,$3,$4,$5,$6,$7,$8,
      $9,$10,$11,$12,$13,$14,$15,$16,$17
    )

    RETURNING *;
  `;
  return client.query(query, data);
};

module.exports = {
  createProduct,
};