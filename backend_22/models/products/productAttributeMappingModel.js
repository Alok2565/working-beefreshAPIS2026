// // backend/Models/products/productattributeMappingModel.js

// const db = require("../../config/database_connection");

// const createAttributeMapping = async (data, client) => {
//     return client.qurty(
//         `INSERT INTO product_attribute_mapping
//         (
//             product_id,
//             attribute_id,
//             attribute_value_id
//         )
//             VALUES ($1,$2,$3)
//             RETURNING *`,
//         data
//     );
// }
const db = require("../../config/database_connection");

const createAttributeMapping = async (
    data,
    client = db
) => {
    const query = `
    INSERT INTO product_attribute_mapping
    (
      product_id,
      attribute_id,
      attribute_value_id
    )

    VALUES
    (
      $1,$2,$3
    )

    RETURNING *;
  `;

    return client.query(query, data);
};

module.exports = {
    createAttributeMapping,
};