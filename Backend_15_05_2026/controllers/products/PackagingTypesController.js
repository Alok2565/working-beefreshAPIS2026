const pkgTypeModel = require("../../models/products/PackagingTypesModel");
const permissionModel = require("../../models/PermissionModel");
const ApiError = require("../../utils/ApiError");
const logger = require("../../utils/logger");
const withTransaction = require("../../utils/transaction");

// ================= CREATE =================
exports.createPackagingType = async (req, res, next) => {
  try {
    const { packaging_name, packaging_slug, status } = req.body;

    if (!packaging_name) {
      return next(new ApiError("Packaging name is required", 400));
    }

    const result = await withTransaction(async (client) => {
      const packagingType = await pkgTypeModel.createRecord(
        [packaging_name, packaging_slug || null, status ?? true],
        client,
      );

      return packagingType;
    });

    logger.info("Packaging type created successfully", {
      packaging_name,
    });

    res.status(201).json({
      success: true,
      message: "Packaging type created successfully",
      data: result.rows[0],
    });
  } catch (err) {
    console.log("CREATE PACKAGING TYPE ERROR:", err);

    if (err.code === "23505") {
      return next(new ApiError("Packaging slug already exists", 400));
    }

    return next(new ApiError(err.message, 500));
  }
};

// GET ALL

exports.getPackagingTypes = async (req, res, next) => {
  try {
    const result = await pkgTypeModel.getRecords();

    res.status(200).json({
      success: true,
      message: "Packaging types retrieved successfully",
      data: result.rows,
    });
  } catch (err) {
    return next(new ApiError("Failed to retrieve packaging types", 500));
  }
};

// GET BY ID

exports.getPackagingTypeById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await pkgTypeModel.getRecordById(id);

    if (result.rows.length === 0) {
      return next(new ApiError("Packaging type not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Packaging type retrieved successfully",
      data: result.rows[0],
    });
  } catch (err) {
    return next(new ApiError("Failed to retrieve packaging type", 500));
  }
};

// UPDATE

exports.updatePackagingType = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { packaging_name, packaging_slug, status } = req.body;

    if (!packaging_name) {
      return next(new ApiError("Packaging name is required", 400));
    }

    const result = await withTransaction(async (client) => {
      const updatedPackagingType = await pkgTypeModel.updateRecord(
        [packaging_name, packaging_slug || null, status ?? true, id],
        client,
      );
      return updatedPackagingType;
    });

    if (result.rows.length === 0) {
      return next(new ApiError("Packaging type not found", 404));
    }

    logger.info("Packaging type updated successfully", {
      id,
    });

    res.status(200).json({
      success: true,
      message: "Packaging type updated successfully",
      data: result.rows[0],
    });
  } catch (err) {
    console.log(err);

    return next(new ApiError("Failed to update packaging type", 500));
  }
};

// STATUS UPDATE
exports.updatePackagingTypeStatus = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await pkgTypeModel.updateStatus(id);

    if (result.rows.length === 0) {
      return next(new ApiError("Packaging type not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Packaging type status updated successfully",
      data: result.rows[0],
    });
  } catch (err) {
    return next(new ApiError("Failed to update packaging type status", 500));
  }
};

// SOFT DELETE

exports.softDeletePackagingType = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await pkgTypeModel.softDeleteRecord(id);

    if (result.rows.length === 0) {
      return next(new ApiError("Packaging type not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Packaging type deleted successfully",
    });
  } catch (err) {
    return next(new ApiError("Failed to delete packaging type", 500));
  }
};

// RESTORE

exports.restorePackagingType = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await pkgTypeModel.restoreRecord(id);

    if (result.rows.length === 0) {
      return next(new ApiError("Packaging type not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Packaging type restored successfully",
    });
  } catch (err) {
    return next(new ApiError("Failed to restore packaging type", 500));
  }
};

// HARD DELETE
exports.deletePackagingType = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await pkgTypeModel.deleteRecord(id);

    if (result.rowCount === 0) {
      return next(new ApiError("Packaging type not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Packaging type permanently deleted",
    });
  } catch (err) {
    return next(new ApiError("Failed to delete flavor", 500));
  }
};
