const purityModel = require("../../models/products/PurityModel");
const permissionModel = require("../../models/PermissionModel");
const ApiError = require("../../utils/ApiError");
const logger = require("../../utils/logger");
const withTransaction = require("../../utils/transaction");

// ================= CREATE =================
exports.createPurity = async (req, res, next) => {
  try {
    const { purity_name, purity_slug } = req.body;

    if (!purity_name) {
      return next(new ApiError("Purity name is required", 400));
    }

    const result = await withTransaction(async (client) => {
      const purity = await purityModel.createRecord(
        [purity_name, purity_slug || null],
        client,
      );
      const purityId = purity.rows[0].id;
      return purity;
    });

    logger.info("Purity created successfully", {
      purity_name,
    });
    res.status(201).json({
      success: true,
      message: "Purity created successfully",
      data: result.rows[0],
    });
  } catch (err) {
    console.log("CREATE PURITY ERROR:", err);

    if (err.code === "23505") {
      return next(new ApiError("Purity already exists", 400));
    }

    return next(new ApiError("Failed to create purity", 500));
  }
};

// GET ALL

exports.getPurities = async (req, res, next) => {
  try {
    const result = await purityModel.getRecords();

    res.status(200).json({
      success: true,
      message: "Purities retrieved successfully",
      data: result.rows,
    });
  } catch (err) {
    return next(new ApiError("Failed to retrieve purities", 500));
  }
};

// GET BY ID

exports.getPurityById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await purityModel.getRecordById(id);

    if (result.rows.length === 0) {
      return next(new ApiError("Purity not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Purity retrieved successfully",
      data: result.rows[0],
    });
  } catch (err) {
    return next(new ApiError("Failed to retrieve purity", 500));
  }
};

// UPDATE

exports.updatePurity = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { purity_name, purity_slug, permissions = [] } = req.body;

    if (!purity_name) {
      return next(new ApiError("Purity name is required", 400));
    }

    const result = await withTransaction(async (client) => {
      const updatedPurity = await purityModel.updateRecord(
        [purity_name, purity_slug || null, id],
        client,
      );
      return updatedPurity;
    });

    if (result.rows.length === 0) {
      return next(new ApiError("Purity not found", 404));
    }

    logger.info("Purity updated successfully", {
      id,
    });

    res.status(200).json({
      success: true,
      message: "Purity updated successfully",
      data: result.rows[0],
    });
  } catch (err) {
    console.log(err);

    return next(new ApiError("Failed to update purity", 500));
  }
};

// STATUS UPDATE
exports.updatePurityStatus = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await purityModel.updateStatus(id);

    if (result.rows.length === 0) {
      return next(new ApiError("Purity not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Purity status updated successfully",
      data: result.rows[0],
    });
  } catch (err) {
    return next(new ApiError("Failed to update purity status", 500));
  }
};

// SOFT DELETE

exports.softDeletePurity = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await purityModel.softDeleteRecord(id);

    if (result.rows.length === 0) {
      return next(new ApiError("Purity not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Purity deleted successfully",
    });
  } catch (err) {
    return next(new ApiError("Failed to delete purity", 500));
  }
};

// RESTORE

exports.restorePurity = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await purityModel.restoreRecord(id);

    if (result.rows.length === 0) {
      return next(new ApiError("Purity not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Purity restored successfully",
    });
  } catch (err) {
    return next(new ApiError("Failed to restore purity", 500));
  }
};

// HARD DELETE
exports.deletePurity = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await purityModel.deleteRecord(id);

    if (result.rowCount === 0) {
      return next(new ApiError("Purity not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Purity permanently deleted",
    });
  } catch (err) {
    return next(new ApiError("Failed to delete purity", 500));
  }
};
