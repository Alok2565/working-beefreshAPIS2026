const db = require("../../config/database_connection");

// GET SETTINGS
const getSettings = () => {
  return db.query(`SELECT * FROM gst_settings LIMIT 1`);
};

// UPSERT SETTINGS (INSERT OR UPDATE)
const upsertSettings = async (data) => {
  const existing = await db.query(`SELECT id FROM gst_settings LIMIT 1`);

  if (existing.rows.length === 0) {
    return db.query(
      `
      INSERT INTO gst_settings
      (
        company_name,
        gst_number,
        registration_type,
        invoice_prefix,
        default_gst_percent,
        currency,
        financial_year,
        state_code,
        address,
        phone,
        email
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
      RETURNING *
      `,
      data
    );
  } else {
    return db.query(
      `
      UPDATE gst_settings
      SET
        company_name = $1,
        gst_number = $2,
        registration_type = $3,
        invoice_prefix = $4,
        default_gst_percent = $5,
        currency = $6,
        financial_year = $7,
        state_code = $8,
        address = $9,
        phone = $10,
        email = $11,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = (SELECT id FROM gst_settings LIMIT 1)
      RETURNING *
      `,
      data
    );
  }
};

module.exports = { getSettings, upsertSettings };