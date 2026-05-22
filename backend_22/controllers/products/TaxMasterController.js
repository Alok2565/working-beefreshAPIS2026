const taxMasterModel = require("../../models/products/TaxMasterModel");
const permissionModel = require("../../models/PermissionModel");
const ApiError = require("../../utils/ApiError");
const logger = require("../../utils/logger");
const withTransaction = require("../../utils/transaction");

// ================= CREATE =================
exports.createTaxMaster = async (req, res, next) => {
  try {
    const { tax_name, tax_slug, tax_code, tax_percent} = req.body;

    if (!tax_name) {
      return next(new ApiError("Fla Tax Master name is required", 400));
    }

    const { tax_type } = req.body;
    const allowedTaxTypes = ["IGST","GST", "SGST", "CGST"];
    if (!allowedTaxTypes.includes(tax_type)) {
    return next(new ApiError("Invalid tax type", 400));
    }
    const result = await withTransaction(async (client) => {
      const taxMaster = await taxMasterModel.createRecord(
        [tax_name, tax_slug, tax_code, tax_percent, tax_type ],
        client,
      );
      const taxId = taxMaster.rows[0].id;
      return taxMaster;
    });

    logger.info("Tax Master created successfully", {
      tax_name,
    });
    res.status(201).json({
      success: true,
      message: "Tax Master created successfully",
      data: result.rows[0],
    });
  } catch (err) {
    console.log("CREATE Tax Master ERROR:", err);

    if (err.code === "23505") {
      return next(new ApiError("Tax Master already exists", 400));
    }

    return next(new ApiError("Failed to create Tax Master", 500));
  }
};

// GET ALL

exports.getTaxMasters = async (req, res, next) => {
  try {
    const result = await taxMasterModel.getRecords();

    res.status(200).json({
      success: true,
      message: "Tax Master retrieved successfully",
      data: result.rows,
    });
  } catch (err) {
    return next(new ApiError("Failed to retrieve Tax Master", 500));
  }
};

// GET BY ID

exports.getTaxMasterById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await taxMasterModel.getRecordById(id);

    if (result.rows.length === 0) {
      return next(new ApiError("Tax Master not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Tax Master retrieved successfully",
      data: result.rows[0],
    });
  } catch (err) {
    return next(new ApiError("Failed to retrieve Tax Master", 500));
  }
};

// UPDATE

exports.updateTaxMaster = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      tax_name,
      tax_slug,
      tax_code,
      tax_percent,
      tax_type,
      permissions = [],
    } = req.body;

    if (!tax_name) {
      return next(new ApiError("Tax Master name is required", 400));
    }

    const result = await withTransaction(async (client) => {
      const updatedTaxMaster = await taxMasterModel.updateRecord(
        [tax_name, tax_slug, tax_code, tax_percent, tax_type || null, id],
        client,
      );
      return updatedTaxMaster;
    });

    if (result.rows.length === 0) {
      return next(new ApiError("Tax Master not found", 404));
    }

    logger.info("Tax Master updated successfully", {
      id,
    });

    res.status(200).json({
      success: true,
      message: "Tax Master updated successfully",
      data: result.rows[0],
    });
  } catch (err) {
    console.log(err);

    return next(new ApiError("Failed to update Tax Master", 500));
  }
};

// STATUS UPDATE
exports.updateTaxMasterStatus = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await taxMasterModel.updateStatus(id);

    if (result.rows.length === 0) {
      return next(new ApiError("Tax Master not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Tax Master status updated successfully",
      data: result.rows[0],
    });
  } catch (err) {
    return next(new ApiError("Failed to update Tax Master status", 500));
  }
};

// SOFT DELETE

exports.softDeleteTaxMaster = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await taxMasterModel.softDeleteRecord(id);

    if (result.rows.length === 0) {
      return next(new ApiError("Tax Master not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Tax Master deleted successfully",
    });
  } catch (err) {
    return next(new ApiError("Failed to delete Tax Master", 500));
  }
};

// RESTORE

exports.restoreTaxMaster = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await taxMasterModel.restoreRecord(id);

    if (result.rows.length === 0) {
      return next(new ApiError("Tax Master not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Tax Master restored successfully",
    });
  } catch (err) {
    return next(new ApiError("Failed to restore Tax Master", 500));
  }
};

// HARD DELETE
exports.deleteTaxMaster = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await taxMasterModel.deleteRecord(id);

    if (result.rowCount === 0) {
      return next(new ApiError("Tax Master not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Tax Master permanently deleted",
    });
  } catch (err) {
    return next(new ApiError("Failed to delete Tax Master", 500));
  }
};
