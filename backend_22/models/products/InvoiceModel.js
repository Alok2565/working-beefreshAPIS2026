const db = require("../../config/database_connection");

// ================= CREATE =================
const createRecord = (data, client = db) => {
  return client.query(
    `
    INSERT INTO invoices
    (
      invoice_no,
      user_id,
      financial_year,
      invoice_prefix,
      subtotal,
      tax_amount,
      discount_amount,
      total_amount,
      tax_type,
      payment_status,
      payment_method,
      billing_address,
      shipping_address,
      notes
    )
    VALUES
    ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
    RETURNING *
    `,
    data
  );
};

// ================= GET ALL =================
const getRecords = () => {
  return db.query(`
    SELECT
      i.*,
      u.name AS customer_name
    FROM invoices i
    LEFT JOIN users u ON u.id = i.user_id
    WHERE i.is_deleted = false
    ORDER BY i.id DESC
  `);
};

// ================= GET BY ID =================
const getRecordById = (id) => {
  return db.query(
    `
    SELECT
      i.*,
      u.name AS customer_name
    FROM invoices i
    LEFT JOIN users u ON u.id = i.user_id
    WHERE i.id = $1
    `,
    [id]
  );
};

// ================= UPDATE =================
const updateRecord = (data, client = db) => {
  return client.query(
    `
    UPDATE invoices
    SET
      subtotal = $1,
      tax_amount = $2,
      discount_amount = $3,
      total_amount = $4,
      payment_status = $5,
      payment_method = $6,
      billing_address = $7,
      shipping_address = $8,
      notes = $9,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $10
    RETURNING *
    `,
    data
  );
};

// ================= STATUS UPDATE =================
const updateStatus = (id) => {
  return db.query(
    `
    UPDATE invoices
    SET
      status = NOT status,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $1
    RETURNING *
    `,
    [id]
  );
};

// ================= SOFT DELETE =================
const softDeleteRecord = (id) => {
  return db.query(
    `
    UPDATE invoices
    SET
      is_deleted = true,
      deleted_at = CURRENT_TIMESTAMP
    WHERE id = $1
    RETURNING *
    `,
    [id]
  );
};

module.exports = {
  createRecord,
  getRecords,
  getRecordById,
  updateRecord,
  updateStatus,
  softDeleteRecord,
};