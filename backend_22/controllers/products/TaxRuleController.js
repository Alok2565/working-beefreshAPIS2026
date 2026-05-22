const db = require("../../config/database_connection");

exports.getTaxRules = async (req, res) => {
  const result = await db.query(`
    SELECT * FROM taxes
    WHERE is_deleted = false
    ORDER BY id DESC
  `);

  res.json({
    success: true,
    data: result.rows,
  });
};