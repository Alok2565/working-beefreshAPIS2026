// // backend/Models/products/productVariantsModel.js

// const db = require("../../config/database_connection");

// const createVariant = async (data, client) => {
//     return client.query(
//         `INSERT INTO product_variants
//     (
//       product_id,
//       tax_id,
//       weight_unit_id,
//       variant_name,
//       sku,
//       barcode,
//       weight,
//       price,
//       discount_price,
//       low_stock_alert,
//       status,
//       created_by
//     )
//     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
//     RETURNING *`,
//         data,
//     );
// };
// module.exports = {
//     createVariant,
// };

const db = require("../../config/database_connection");

const createVariant = async (data, client = db) => {
    const query = `
    INSERT INTO product_variants
    (
      product_id,
      tax_id,
      weight_unit_id,
      variant_name,
      sku,
      barcode,
      weight,
      price,
      discount_price,
      low_stock_alert,
      status,
      created_by
    )

    VALUES
    (
      $1,$2,$3,$4,$5,$6,
      $7,$8,$9,$10,$11,$12
    )

    RETURNING *;
  `;

    return client.query(query, data);
};

module.exports = {
    createVariant,
};