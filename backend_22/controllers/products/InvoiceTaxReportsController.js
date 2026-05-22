const reportModel = require("../../models/products/InvoiceTaxReportModel");
const permissionModel = require("../../models/PermissionModel");
const ApiError = require("../../utils/ApiError");
const logger = require("../../utils/logger");
const withTransaction = require("../../utils/transaction");

// ================= CREATE =================
exports.createInvoiceTaxReport = async (req, res, next) => {
  try {
    const {
      invoice_id,
      user_id,
      tax_type,
      tax_percent,
      tax_amount,
      total_amount,
    } = req.body;

    const result = await reportModel.createRecord([
      invoice_id,
      user_id,
      tax_type,
      tax_percent,
      tax_amount,
      total_amount,
    ]);

    res.status(201).json({
      success: true,
      message: "Invoice tax report created successfully",
      data: result.rows[0],
    });
  } catch (err) {
    next(new ApiError("Failed to create invoice tax report", 500));
  }
};

// ================= GET ALL =================
exports.getInvoiceTaxReports = async (req, res, next) => {
  try {
    const result = await reportModel.getRecords();

    res.status(200).json({
      success: true,
      data: result.rows,
    });
  } catch (err) {
    next(new ApiError("Failed to fetch reports", 500));
  }
};