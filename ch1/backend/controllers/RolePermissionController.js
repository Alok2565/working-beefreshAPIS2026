// const RolePermissionModel = require("../models/RolePermissionModel");
// const ApiError = require("../utils/ApiError");
// const logger = require("../utils/logger");
// const withTransaction = require("../utils/transaction");

// exports.createRolePermission = async (req, res, next) => {};

// exports.assignPermissionsToRole = withTransaction(async (req, res) => {
//   const { role_id, permission_ids } = req.body;

//   if (!role_id || !Array.isArray(permission_ids)) {
//     throw new Error("role_id and permission_ids are required");
//   }

//   await withTransaction(async (client) => {
//     logger.info("Starting role permission update", { role_id });

//     // STEP 1: delete old permissions
//     await RolePermissionModel.deleteByRole(role_id, client);

//     // STEP 2: assign new permissions
//     for (const permission_id of permission_ids) {
//       await RolePermissionModel.assignPermission(
//         role_id,
//         permission_id,
//         client,
//       );
//     }

//     logger.info("Role permissions updated successfully", {
//       role_id,
//       count: permission_ids.length,
//     });
//   });

//   return res.status(200).json({
//     success: true,
//     message: "Permissions assigned successfully",
//   });
// });

// exports.getRolePermissions = withTransaction(async (req, res) => {
//   const { role_id } = req.params;

//   logger.info("Fetching role permissions", { role_id });

//   const result = await RolePermissionModel.getPermissionsByRole(role_id);

//   return res.json({
//     success: true,
//     data: result.rows,
//   });
// });

// exports.getPermissionsData = async (req, res, next) => {};
// exports.updateRolePermission = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const { name } = req.body;

//     if (!name) {
//       return next(new ApiError("Role Permision name is required", 400));
//     }

//     const result = await roleModel.updateByRolePermission(id, name);

//     if (result.rows.length === 0) {
//       return next(new ApiError("Role not found", 404));
//     }

//     res.status(200).json({
//       success: true,
//       message: "Role Permision updated successfully",
//       data: result.rows[0],
//     });
//   } catch (err) {
//     if (err.code === "23505") {
//       return next(new ApiError("Role Permision already exists", 400));
//     }
//     logger.error(err.message);
//     next(err);
//   }
// };

// exports.softDeleteRolePermission = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const result = await roleModel.softDeleteByRolePermission(id);
//     if (result.rows.length === 0) {
//       return next(new ApiError("Role Permision not found", 404));
//     }
//     res.status(200).json({
//       success: true,
//       message: "Role Permision soft deleted successfully",
//     });
//   } catch (err) {
//     logger.error(err.message);
//     next(err);
//   }
// };

// exports.restoreRolePermission = async (req, res, next) => {
//   try {
//     const { id } = req.params;

//     const result = await roleModel.restoreByRolePermission(id);

//     if (result.rows.length === 0) {
//       return next(new ApiError("Role Permision not found", 404));
//     }

//     res.status(200).json({
//       success: true,
//       message: "Role Permision restored successfully",
//       data: result.rows[0],
//     });
//   } catch (err) {
//     logger.error(err.message);
//     next(err);
//   }
// };
// exports.deleteRolePermission = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const result = await roleModel.deleteByRolePermission(id);
//     if (result.rows.length === 0) {
//       logger.warn("Delete role Permision failed: Role not found", {
//         roleId: id,
//         user: req.user ? req.user.id : null,
//       });

//       return next(new ApiError("Role not found", 404));
//     }
//     logger.info("Role Permision deleted permanently", {
//       roleId: id,
//       deletedBy: req.user ? req.user.id : null,
//     });

//     res.status(200).json({
//       success: true,
//       message: "Role Permision permanently deleted",
//     });
//   } catch (err) {
//     if (err.code === "23503") {
//       logger.warn("Delete role Permision failed: Role is in use", {
//         roleId: req.params.id,
//         error: err.detail,
//       });

//       return next(
//         new ApiError(
//           "Cannot delete role,Permision it is assigned to users",
//           400,
//         ),
//       );
//     }
//     logger.error("Delete role failed", {
//       message: err.message,
//       stack: err.stack,
//       roleId: req.params.id,
//       body: req.body,
//     });

//     next(err);
//   }
// };
const RolePermissionModel = require("../models/RolePermissionModel");
const logger = require("../utils/logger");
const withTransaction = require("../utils/transaction");
const ApiError = require("../utils/ApiError");

/**
 * ASSIGN PERMISSIONS TO ROLE
 */
exports.assignPermissionsToRole = async (req, res) => {
  const { role_id, permission_id } = req.body;

  if (!role_id || !Array.isArray(permission_id)) {
    throw new ApiError("role_id and permission_ids required", 400);
  }

  await withTransaction(async (client) => {
    logger.info("Updating role permissions", { role_id });

    await RolePermissionModel.deleteRolePermission(role_id, client);

    for (const pid of permission_id) {
      await RolePermissionModel.assignRolePermission(role_id, pid, client);
    }

    logger.info("Role permissions updated", { role_id });
  });

  return res.json({
    success: true,
    message: "Permissions assigned successfully",
  });
};

/**
 * GET ROLE PERMISSIONS
 */
exports.getRolePermissions = async (req, res) => {
  const { role_id } = req.params;

  const result = await RolePermissionModel.getPermissionsByRole(role_id);

  return res.json({
    success: true,
    data: result.rows,
  });
};
