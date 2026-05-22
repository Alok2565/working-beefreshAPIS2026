const db = require("../../config/database_connection");

// ================= CREATE =================
const createRecord = (data, client = db) => {
  return client.query(
    `
    INSERT INTO invoice_tax_reports
    (
      invoice_id,
      user_id,
      tax_type,
      tax_percent,
      tax_amount,
      total_amount
    )
    VALUES ($1,$2,$3,$4,$5,$6)
    RETURNING *
    `,
    data
  );
};

// ================= GET ALL =================
const getRecords = () => {
  return db.query(`
    SELECT
      itr.*,
      i.invoice_no,
      u.name AS customer_name
    FROM invoice_tax_reports itr
    LEFT JOIN invoices i ON i.id = itr.invoice_id
    LEFT JOIN users u ON u.id = itr.user_id
    ORDER BY itr.id DESC
  `);
};

module.exports = {
  createRecord,
  getRecords,
};