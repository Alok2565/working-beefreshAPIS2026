const invoiceModel = require("../../models/products/InvoiceModel");
const permissionModel = require("../../models/PermissionModel");
const ApiError = require("../../utils/ApiError");
const logger = require("../../utils/logger");
const withTransaction = require("../../utils/transaction");

// ================= CREATE =================
exports.createInvoice = async (req, res, next) => {
  try {
    const {
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
      notes,
    } = req.body;

    const result = await invoiceModel.createRecord([
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
      notes,
    ]);

    res.status(201).json({
      success: true,
      message: "Invoice created successfully",
      data: result.rows[0],
    });
  } catch (err) {
    console.log(err);
    next(new ApiError("Failed to create invoice", 500));
  }
};

// ================= GET ALL =================
exports.getInvoices = async (req, res, next) => {
  try {
    const result = await invoiceModel.getRecords();

    res.status(200).json({
      success: true,
      data: result.rows,
    });
  } catch (err) {
    next(new ApiError("Failed to fetch invoices", 500));
  }
};

// ================= GET BY ID =================
exports.getInvoiceById = async (req, res, next) => {
  try {
    const result = await invoiceModel.getRecordById(req.params.id);

    res.status(200).json({
      success: true,
      data: result.rows[0],
    });
  } catch (err) {
    next(new ApiError("Failed to fetch invoice", 500));
  }
};

// ================= UPDATE =================
exports.updateInvoice = async (req, res, next) => {
  try {
    const {
      subtotal,
      tax_amount,
      discount_amount,
      total_amount,
      payment_status,
      payment_method,
      billing_address,
      shipping_address,
      notes,
    } = req.body;

    const result = await invoiceModel.updateRecord([
      subtotal,
      tax_amount,
      discount_amount,
      total_amount,
      payment_status,
      payment_method,
      billing_address,
      shipping_address,
      notes,
      req.params.id,
    ]);

    res.status(200).json({
      success: true,
      message: "Invoice updated successfully",
      data: result.rows[0],
    });
  } catch (err) {
    next(new ApiError("Failed to update invoice", 500));
  }
};

// ================= STATUS =================
exports.updateInvoiceStatus = async (req, res, next) => {
  try {
    const result = await invoiceModel.updateStatus(req.params.id);

    res.status(200).json({
      success: true,
      message: "Invoice status updated",
      data: result.rows[0],
    });
  } catch (err) {
    next(new ApiError("Failed to update status", 500));
  }
};

// ================= DELETE =================
exports.deleteInvoice = async (req, res, next) => {
  try {
    await invoiceModel.softDeleteRecord(req.params.id);

    res.status(200).json({
      success: true,
      message: "Invoice deleted successfully",
    });
  } catch (err) {
    next(new ApiError("Failed to delete invoice", 500));
  }
};