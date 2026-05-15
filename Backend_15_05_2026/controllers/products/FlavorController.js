const flavorModel = require("../../models/products/FlavorModel");
const permissionModel = require("../../models/PermissionModel");
const ApiError = require("../../utils/ApiError");
const logger = require("../../utils/logger");
const withTransaction = require("../../utils/transaction");

// ================= CREATE =================
exports.createFlavor = async (req, res, next) => {
  try {
    const { flavor_name, flavor_slug } = req.body;

    if (!flavor_name) {
      return next(new ApiError("Flavor name is required", 400));
    }

    const result = await withTransaction(async (client) => {
      const flavor = await flavorModel.createRecord(
        [flavor_name, flavor_slug || null],
        client,
      );
      const flavorId = flavor.rows[0].id;
      return flavor;
    });

    logger.info("Flavor created successfully", {
      flavor_name,
    });
    res.status(201).json({
      success: true,
      message: "Flavor created successfully",
      data: result.rows[0],
    });
  } catch (err) {
    console.log("CREATE FLAVOR ERROR:", err);

    if (err.code === "23505") {
      return next(new ApiError("Flavor already exists", 400));
    }

    return next(new ApiError("Failed to create flavor", 500));
  }
};

// GET ALL

exports.getFlavors = async (req, res, next) => {
  try {
    const result = await flavorModel.getRecords();

    res.status(200).json({
      success: true,
      message: "Flavors retrieved successfully",
      data: result.rows,
    });
  } catch (err) {
    return next(new ApiError("Failed to retrieve flavors", 500));
  }
};

// GET BY ID

exports.getFlavorById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await flavorModel.getRecordById(id);

    if (result.rows.length === 0) {
      return next(new ApiError("Flavor not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Flavor retrieved successfully",
      data: result.rows[0],
    });
  } catch (err) {
    return next(new ApiError("Failed to retrieve flavor", 500));
  }
};

// UPDATE

exports.updateFlavor = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { flavor_name, flavor_slug, permissions = [] } = req.body;

    if (!flavor_name) {
      return next(new ApiError("Flavor name is required", 400));
    }

    const result = await withTransaction(async (client) => {
      const updatedFlavor = await flavorModel.updateRecord(
        [flavor_name, flavor_slug || null, id],
        client,
      );
      return updatedFlavor;
    });

    if (result.rows.length === 0) {
      return next(new ApiError("Flavor not found", 404));
    }

    logger.info("Flavor updated successfully", {
      id,
    });

    res.status(200).json({
      success: true,
      message: "Flavor updated successfully",
      data: result.rows[0],
    });
  } catch (err) {
    console.log(err);

    return next(new ApiError("Failed to update flavor", 500));
  }
};

// STATUS UPDATE
exports.updateFlavorStatus = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await flavorModel.updateStatus(id);

    if (result.rows.length === 0) {
      return next(new ApiError("Flavor not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Flavor status updated successfully",
      data: result.rows[0],
    });
  } catch (err) {
    return next(new ApiError("Failed to update flavor status", 500));
  }
};

// SOFT DELETE

exports.softDeleteFlavor = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await flavorModel.softDeleteRecord(id);

    if (result.rows.length === 0) {
      return next(new ApiError("Flavor not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Flavor deleted successfully",
    });
  } catch (err) {
    return next(new ApiError("Failed to delete flavor", 500));
  }
};

// RESTORE

exports.restoreFlavor = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await flavorModel.restoreRecord(id);

    if (result.rows.length === 0) {
      return next(new ApiError("Flavor not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Flavor restored successfully",
    });
  } catch (err) {
    return next(new ApiError("Failed to restore flavor", 500));
  }
};

// HARD DELETE
exports.deleteFlavor = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await flavorModel.deleteRecord(id);

    if (result.rowCount === 0) {
      return next(new ApiError("Flavor not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Flavor permanently deleted",
    });
  } catch (err) {
    return next(new ApiError("Failed to delete flavor", 500));
  }
};
