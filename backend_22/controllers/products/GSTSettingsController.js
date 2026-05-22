const gstModel = require("../../models//products/GstSettingModel");
const ApiError = require("../../utils/ApiError");
const logger = require("../../utils/logger");

exports.getGSTSettings = async (req, res) => {
  const result = await gstModel.getSettings();
  res.json({
    success: true,
    data: result.rows[0] || null,
  });
};
exports.updateGSTSettings = async (req, res) => {
  const data = req.body;

  const result = await gstModel.upsertSettings([
    data.company_name,
    data.gst_number,
    data.registration_type,
    data.invoice_prefix,
    data.default_gst_percent,
    data.currency,
    data.financial_year,
    data.state_code,
    data.address,
    data.phone,
    data.email,
  ]);

  res.json({
    success: true,
    data: result.rows[0],
  });
};