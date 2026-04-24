// const roleModel = require("../models/roleModel");
// const ApiError = require("../utils/ApiError");
// const logger = require("../utils/logger");
// const withTransaction = require("../utils/transaction");

// // CREATE ROLE
// exports.createRole = async (req, res, next) => {
//   try {
//     const { name } = req.body;

//     if (!name) {
//       return next(new ApiError("Role name is required", 400));
//     }

//     const result = await roleModel.createRole(name);

//     logger.info(`Role created successfully: ${name}`, { code: 201 });

//     res.status(201).json({
//       success: true,
//       message: "Role created successfully",
//       data: result.rows[0],
//     });
//   } catch (err) {
//     if (err.code === "23505") {
//       return next(new ApiError("Role already exists", 400));
//     }

//     logger.error(`Role creation failed: ${err.message}`, { code: 500 });
//     next(err);
//   }
// };

const roleModel = require("../models/roleModel");
const permissionModel = require("../models/PermissionModel");
const ApiError = require("../utils/ApiError");
const logger = require("../utils/logger");
const withTransaction = require("../utils/transaction");

exports.createRole = async (req, res, next) => {
  try {
    const { name, permissions } = req.body;

    if (!name) {
      logger.warn("Role creation failed: name missing");
      return next(new ApiError("Role name is required", 400));
    }

    const result = await withTransaction(
      async (client) => {
        const role = await roleModel.createRole(name, client);

        if (permissions && permissions.length > 0) {
          await permissionModel.assignPermissions(
            role.rows[0].id,
            permissions,
            client,
          );
        }

        return role;
      },
      { logSuccess: true },
    );

    logger.info("Role created successfully", {
      roleName: name,
      permissionsCount: permissions ? permissions.length : 0,
    });

    res.status(201).json({
      success: true,
      message: "Role created with permissions",
      data: result.rows[0],
    });
  } catch (err) {
    if (err.code === "23505") {
      logger.warn("Duplicate role creation attempt", {
        roleName: req.body.name,
        error: err.detail,
      });
      return next(new ApiError("Role already exists", 400));
    }

    if (err.code === "23503") {
      logger.warn("Invalid permission ID provided", {
        permissions: req.body.permissions,
        error: err.detail,
      });
      return next(new ApiError("Invalid permission reference", 400));
    }
    logger.error("Role creation failed", {
      message: err.message,
      stack: err.stack,
      body: req.body,
    });

    next(err);
  }
};
exports.getRolesData = async (req, res, next) => {
  try {
    const result = await roleModel.getRolesData();

    logger.info(`Roles fetched successfully`, { code: 200 });

    res.status(200).json({
      success: true,
      count: result.rows.length,
      data: result.rows,
    });
  } catch (err) {
    logger.error(`Role fetch failed: ${err.message}`, { code: 500 });
    next(err);
  }
};

exports.updateRole = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      return next(new ApiError("Role name is required", 400));
    }

    const result = await roleModel.updateRole(id, name);

    if (result.rows.length === 0) {
      return next(new ApiError("Role not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Role updated successfully",
      data: result.rows[0],
    });
  } catch (err) {
    if (err.code === "23505") {
      return next(new ApiError("Role already exists", 400));
    }
    logger.error(err.message);
    next(err);
  }
};

exports.softDeleteRole = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await roleModel.softDeleteRole(id);
    if (result.rows.length === 0) {
      return next(new ApiError("Role not found", 404));
    }
    res.status(200).json({
      success: true,
      message: "Role soft deleted successfully",
    });
  } catch (err) {
    logger.error(err.message);
    next(err);
  }
};

exports.restoreRole = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await roleModel.restoreRole(id);

    if (result.rows.length === 0) {
      return next(new ApiError("Role not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Role restored successfully",
      data: result.rows[0],
    });
  } catch (err) {
    logger.error(err.message);
    next(err);
  }
};
exports.deleteRole = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await roleModel.deleteRole(id);
    if (result.rows.length === 0) {
      logger.warn("Delete role failed: Role not found", {
        roleId: id,
        user: req.user ? req.user.id : null,
      });

      return next(new ApiError("Role not found", 404));
    }
    logger.info("Role deleted permanently", {
      roleId: id,
      deletedBy: req.user ? req.user.id : null,
    });

    res.status(200).json({
      success: true,
      message: "Role permanently deleted",
    });
  } catch (err) {
    if (err.code === "23503") {
      logger.warn("Delete role failed: Role is in use", {
        roleId: req.params.id,
        error: err.detail,
      });

      return next(
        new ApiError("Cannot delete role, it is assigned to users", 400),
      );
    }
    logger.error("Delete role failed", {
      message: err.message,
      stack: err.stack,
      roleId: req.params.id,
      body: req.body,
    });

    next(err);
  }
};
