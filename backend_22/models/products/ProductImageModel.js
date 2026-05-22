// // backend/Models/products/productimageModel.js

// const db = require("../../config/database_connection");

// const createProductImage = async (data, client) => {
//     return client.query(
//         `INSERT INTO product_images
//     (
//     product_id,
//     variant_id,
//     image_path,
//     is_primary,
//     sort_order
//     )
//     VALUES ($1,$2,$3,$4,$5)
//     RETURNING *`,
//         data,
//     );
// };
// module.exports = {
//     createProductImage,
// };

const db = require("../../config/database_connection");

const createProductImage = async (data, client = db) => {
    const query = `
    INSERT INTO product_images
    (
      product_id,
      variant_id,
      image_path,
      is_primary,
      sort_order
    )

    VALUES
    (
      $1,$2,$3,$4,$5
    )

    RETURNING *;
  `;

    return client.query(query, data);
};

module.exports = {
    createProductImage,
};