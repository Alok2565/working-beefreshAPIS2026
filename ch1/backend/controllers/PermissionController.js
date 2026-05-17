const PermissionModel = require("../models/PermissionModel");
const ApiError = require("../utils/ApiError");
const logger = require("../utils/logger");
const withTransaction = require("../utils/transaction");

/**
 * CREATE PERMISSION
 */
exports.createPermissionData = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      throw new ApiError(400, "Permission name required");
    }

    const result = await PermissionModel.createPermission(name);

    logger.info("Permission created", { id: result.rows[0].id });

    return res.json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    logger.error(error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * GET ALL PERMISSIONS
 */
exports.getPermissionsData = async (req, res) => {
  try {
    const result = await PermissionModel.getAllPermissions();
    return res.json({
      success: true,
      data: result.rows, // This will now successfully get the rows
    });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.updatePermission = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const result = await PermissionModel.updatePermission(id, name);

    return res.json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    logger.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.softDeletePermission = async (req, res) => {
  const { id } = req.params;
  const result = await PermissionModel.softDeletePermission(id, false);

  return res.json({
    success: true,
    message: "Soft deleted",
  });
};

exports.restorePermission = async (req, res) => {
  const { id } = req.params;

  const result = await PermissionModel.restorePermission(id, true);

  return res.json({
    success: true,
    message: "Restored",
  });
};
/**
 * DELETE
 */
exports.deletePermission = async (req, res) => {
  try {
    const { id } = req.params;

    await PermissionModel.deletePermission(id);

    return res.json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    logger.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
