const userModel = require("../models/UserModel");
const userLoginModel = require("../models/userLoginModel");
const permissionModel = require("../models/PermissionModel");
const roleModel = require("../models/RoleModel");
const ApiError = require("../utils/ApiError");
const logger = require("../utils/logger");
const withTransaction = require("../utils/transaction");
const crypto = require("crypto");
const { hashPassword, comparePassword } = require("../utils/hash");
exports.createUser = async (req, res, next) => {
  try {
    const { name, email, mobile, status, ip_address, role_id, permissions } =
      req.body;

    if (!name || !email || !mobile || !role_id) {
      logger.warn("User creation failed: Missing required fields", {
        body: req.body,
      });
      return next(new ApiError("Name, Email and Role are required", 400));
    }
    const result = await withTransaction(async (client) => {
      const roleCheck = await roleModel.getRoleById(role_id, client);
      if (roleCheck.rows.length === 0) {
        logger.warn("Invalid role_id provided", { role_id });
        throw new ApiError("Invalid role_id", 400);
      }
      const userData = [
        name,
        email,
        mobile,
        role_id,
        status,
        ip_address,
        false,
        null,
      ];

      const userResult = await userModel.createUser(userData, client);
      const userId = userResult.rows[0].id;

      logger.info("User record created", {
        userId,
        name,
        role_id,
      });

      const token = crypto.randomBytes(32).toString("hex");
      const expiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
      const createUserLoginData = [
        userId,
        email,
        null,
        null,
        mobile,
        token,
        false,
        null,
        false,
        null,
        expiry,
        ip_address,
      ];
      const loginResult = await userLoginModel.createUserLogin(
        createUserLoginData,
        client,
      );

      logger.info("User login created", { userId, email });

      // 3. Assign Permissions
      if (permissions && permissions.length > 0) {
        await permissionModel.assignPermissions(role_id, permissions, client);

        logger.info("Permissions assigned", {
          userId,
          permissionsCount: permissions.length,
        });
      }
      return {
        user: userResult.rows[0],
        login: loginResult.rows[0],
      };
    });
    logger.info("User created successfully (transaction committed)", {
      user: result.user.id,
      email: result.login.email,
    });
    res.status(201).json({
      success: true,
      message: "User created with role",
      data: result,
    });
  } catch (err) {
    // DB Errors
    if (err.code === "23505") {
      logger.warn("Duplicate entry error", {
        detail: err.detail,
        body: req.body,
      });
      return next(new ApiError("Duplicate entry", 400));
    }

    if (err.code === "23503") {
      logger.warn("Foreign key error", {
        detail: err.detail,
      });
      return next(new ApiError("Invalid reference", 400));
    }
    logger.error("User creation failed", {
      message: err.message,
      stack: err.stack,
      body: req.body,
    });

    next(err);
  }
};

exports.getUsersData = async (req, res, next) => {
  try {
    const result = await userModel.getUsersData();
    logger.info(`Users fetched successfully`, { code: 200 });
    res.status(200).json({
      success: true,
      count: result.rows.length,
      data: result.rows,
    });
  } catch (err) {
    logger.error(`User fetch failed: ${err.message}`, { code: 500 });
    next(err);
  }
};
exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, mobile, password } = req.body;

    const result = await withTransaction(async (client) => {
      logger.info("Updating user...", { userId: id });
      const userData = [name || null, email || null, mobile || null, id];
      const userResult = await userModel.updateUser(userData, client);

      if (userResult.rows.length === 0) {
        throw new ApiError("User not found", 404);
      }
      const token = crypto.randomBytes(32).toString("hex");
      const token_expiry = new Date(Date.now() + 60 * 60 * 1000);
      let hashedPassword;
      if (password && password.trim() !== "") {
        hashedPassword = await hashPassword(password);
      }
      const userLoginData = [
        email || null,
        mobile || null,
        hashedPassword,
        token,
        token_expiry,
        id,
      ];
      await userLoginModel.updateUserLogin(userLoginData, client);
      return userResult.rows[0];
    });

    logger.info("User updated successfully", { userId: id });

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: result,
    });
  } catch (err) {
    logger.error("User update failed", {
      message: err.message,
      stack: err.stack,
    });

    if (err.code === "23505") {
      return next(new ApiError("Email or mobile already exists", 400));
    }

    next(err);
  }
};
// exports.updateUser = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const { name, email, mobile, status } = req.body;

//     const result = await withTransaction(async (client) => {
//       logger.info("Updating user...", { userId: id });

//       const userResult = await userModel.updateUser(
//         [name || null, email || null, mobile || null, status ?? null, id],
//         client,
//       );

//       if (userResult.rows.length === 0) {
//         throw new ApiError("User not found", 404);
//       }
//       // await userLoginModel.updateUserLogin(
//       //   [email || null, mobile || null, id],
//       //   client,
//       // );
//       await userLoginModel.updateUserLogin(
//         [email || null, mobile || null, id],
//         client,
//       );
//       return userResult.rows[0];
//     });
//     logger.info("User updated successfully", { userId: id });
//     res.status(200).json({
//       success: true,
//       message: "User updated successfully",
//       data: result,
//     });
//   } catch (err) {
//     logger.error("User update failed", {
//       message: err.message,
//       stack: err.stack,
//     });
//     if (err.code === "23505") {
//       return next(new ApiError("Email or mobile already exists", 400));
//     }
//     next(err);
//   }
// };
exports.softDeleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await withTransaction(async (client) => {
      logger.info("Soft deleting user...", { userId: id });

      const checkUser = await userModel.getUserById([id], client);

      if (checkUser.rows.length === 0) {
        throw new ApiError("User does not exist", 404);
      }
      if (checkUser.rows[0].is_deleted) {
        throw new ApiError("User already deleted", 400);
      }

      // ✅ Case 3: Valid → delete
      const userResult = await userModel.softDeleteUser(id, client);

      await userLoginModel.softDeleteUserLogin(id, client);

      return userResult.rows[0];
    });

    logger.info("User soft deleted", { userId: id });

    res.status(200).json({
      success: true,
      message: "User soft deleted successfully",
      data: result,
    });
  } catch (err) {
    logger.error("Soft delete failed", {
      message: err.message,
      code: err.statusCode || 500,
    });

    next(err);
  }
};

exports.restoreUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await withTransaction(async (client) => {
      logger.info("Restoring user...", { userId: id });
      const userResult = await userModel.restoreUser(id, client);
      if (userResult.rows.length === 0) {
        throw new ApiError("User not found", 404);
      }
      await userLoginModel.restoreUserLogin(id, client);
      return userResult.rows[0];
    });
    logger.info("User restored", { userId: id });
    res.status(200).json({
      success: true,
      message: "User restored successfully",
      data: result,
    });
  } catch (err) {
    logger.error("Restore failed", { message: err.message });
    next(err);
  }
};
exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await withTransaction(async (client) => {
      logger.info("Hard deleting user...", { userId: id });

      await userLoginModel.deleteUserLogin(id, client);

      const userResult = await userModel.deleteUser(id, client);
      if (userResult.rows.length === 0) {
        throw new ApiError("User not found", 404);
      }
      return userResult.rows[0];
    });
    logger.info("User permanently deleted", { userId: id });
    res.status(200).json({
      success: true,
      message: "User permanently deleted",
    });
  } catch (err) {
    logger.error("Hard delete failed", { message: err.message });
    next(err);
  }
};
