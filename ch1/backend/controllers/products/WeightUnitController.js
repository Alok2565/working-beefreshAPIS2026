const weightUnitModel = require("../../models/products/WeightUnitModel");
const permissionModel = require("../../models/PermissionModel");
const ApiError = require("../../utils/ApiError");
const logger = require("../../utils/logger");
const withTransaction = require("../../utils/transaction");

// ================= CREATE =================
exports.createWeightUnit = async (req, res, next) => {
  try {
    const { unit_name, short_name, permissions } = req.body;

    if (!unit_name) {
      return next(new ApiError("Unit name is required", 400));
    }

    const result = await withTransaction(async (client) => {
      const weightUnit = await weightUnitModel.createRecord(
        [unit_name, short_name || null],
        client,
      );
      const weightUnitId = weightUnit.rows[0].id;
      return weightUnit;
    });

    logger.info("Weight unit created successfully", {
      unit_name,
    });
    res.status(201).json({
      success: true,
      message: "Weight unit created successfully",
      data: result.rows[0],
    });
  } catch (err) {
    console.log("CREATE WEIGHT UNIT ERROR:", err);

    if (err.code === "23505") {
      return next(new ApiError("Weight unit already exists", 400));
    }

    return next(new ApiError("Failed to create weight unit", 500));
  }
};

// GET ALL

exports.getWeightUnits = async (req, res, next) => {
  try {
    const result = await weightUnitModel.getRecords();

    res.status(200).json({
      success: true,
      message: "Weight units retrieved successfully",
      data: result.rows,
    });
  } catch (err) {
    return next(new ApiError("Failed to retrieve weight units", 500));
  }
};

// GET BY ID

exports.getWeightUnitById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await weightUnitModel.getRecordById(id);

    if (result.rows.length === 0) {
      return next(new ApiError("Weight unit not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Weight unit retrieved successfully",
      data: result.rows[0],
    });
  } catch (err) {
    return next(new ApiError("Failed to retrieve weight unit", 500));
  }
};

// UPDATE

exports.updateWeightUnit = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { unit_name, short_name, permissions = [] } = req.body;

    if (!unit_name) {
      return next(new ApiError("Unit name is required", 400));
    }

    const result = await withTransaction(async (client) => {
      const updatedUnit = await weightUnitModel.updateRecord(
        [unit_name, short_name || null, id],
        client,
      );
      return updatedUnit;
    });

    if (result.rows.length === 0) {
      return next(new ApiError("Weight unit not found", 404));
    }

    logger.info("Weight unit updated successfully", {
      id,
    });

    res.status(200).json({
      success: true,
      message: "Weight unit updated successfully",
      data: result.rows[0],
    });
  } catch (err) {
    console.log(err);

    return next(new ApiError("Failed to update weight unit", 500));
  }
};

// STATUS UPDATE
exports.updateWeightUnitStatus = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await weightUnitModel.updateStatus(id);

    if (result.rows.length === 0) {
      return next(new ApiError("Weight unit not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Weight unit status updated successfully",
      data: result.rows[0],
    });
  } catch (err) {
    return next(new ApiError("Failed to update weight unit status", 500));
  }
};

// SOFT DELETE

exports.softDeleteWeightUnit = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await weightUnitModel.softDeleteRecord(id);

    if (result.rows.length === 0) {
      return next(new ApiError("Weight unit not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Weight unit deleted successfully",
    });
  } catch (err) {
    return next(new ApiError("Failed to delete weight unit", 500));
  }
};

// RESTORE

exports.restoreWeightUnit = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await weightUnitModel.restoreRecord(id);

    if (result.rows.length === 0) {
      return next(new ApiError("Weight unit not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Weight unit restored successfully",
    });
  } catch (err) {
    return next(new ApiError("Failed to restore weight unit", 500));
  }
};

// HARD DELETE
exports.deleteWeightUnit = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await weightUnitModel.deleteRecord(id);

    if (result.rowCount === 0) {
      return next(new ApiError("Weight unit not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Weight unit permanently deleted",
    });
  } catch (err) {
    return next(new ApiError("Failed to delete weight unit", 500));
  }
};
