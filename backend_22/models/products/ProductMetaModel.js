// const db = require("../../config/database_connection");


// const createProductMeta = async (data, client) => {
//     return client.query(
//         `INSERT INTO product_meta
//         (
//         product_id,
//         meta_title,
//         meta_keywords,
//         meta_description,
//         canonical_url,
//         schema_json,
//         og_image
//         meta.canonical_url,
//         JSON.stringify(meta.schema_json || {}),
//         meta.og_image,
//         )
//       VALUES ($1,$2,$3,$4,$5)
//     RETURNING *`,
//         data,
//     );
// }
// module.exports = {
//     createProductMeta,
// };
const db = require("../../config/database_connection");

const createProductMeta = async (
    data,
    client = db
) => {
    const query = `
    INSERT INTO product_meta
    (
      product_id,
      meta_title,
      meta_keywords,
      meta_description,
      canonical_url,
      schema_json,
      og_image
    )

    VALUES
    (
      $1,$2,$3,$4,$5,$6,$7
    )

    RETURNING *;
  `;

    return client.query(query, data);
};

module.exports = {
    createProductMeta,
};