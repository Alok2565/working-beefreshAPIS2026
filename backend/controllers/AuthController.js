const userLoginModel = require("../models/UserLoginModel");
const authService = require("../services/authService");
const { getUserPermissions } = require("../services/permissionService");
const { generateToken } = require("../utils/jwt");
const ApiError = require("../utils/ApiError");
const logger = require("../utils/logger");
const { hashPassword, comparePassword } = require("../utils/hash");
const withTransaction = require("../utils/transaction");

const {
  setPasswordTemplate,
} = require("../email/templates/setPasswordTemplate");
const { sendMail } = require("../services/emailService");

exports.UserLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    logger.info(`Login attempt started for email: ${email} | IP: ${ip}`);

    const result = await withTransaction(async (client) => {
      // 1. Get user
      const user = await authService.findUserByEmail(email, client);

      if (!user) {
        logger.info(
          `Login failed - User not found | Email: ${email} | IP: ${ip}`,
        );

        throw new ApiError("User not found", 404);
      }

      // 2. Password check
      const isMatch = comparePassword(password, user.password);

      if (!isMatch) {
        logger.info(
          `Login failed - Invalid password | UserID: ${user.user_id} | Email: ${email}`,
        );

        throw new ApiError("Invalid credentials", 401);
      }

      // 3. Permissions
      const permissions = await getUserPermissions(user.user_id, client);

      // 4. Token
      const token = generateToken(user, permissions);

      // 5. Update login time
      await authService.updateLoginMeta(user.user_id, client);

      logger.info(
        `Login success | UserID: ${user.user_id} | Email: ${email} | IP: ${ip}`,
      );

      return { user, token, permissions };
    });

    res.json({
      success: true,
      token: result.token,
      user: {
        id: result.user.user_id,
        email: result.user.email,
        role_id: result.user.role_id,
        permissions: result.permissions,
      },
    });
  } catch (err) {
    logger.error(
      `Login error | Email: ${req.body.email} | Error: ${err.message}`,
    );

    next(err);
  }
};

// exports.UserLogin = async (req, res, next) => {
//   try {
//     const { email, password } = req.body;
//     const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

//     logger.info(`Login attempt started for email: ${email} | IP: ${ip}`);
//     const result = await withTransaction(async (client) => {
//       // 1. Get user
//       const user = await authService.findUserByEmail(email, client);

//       if (!user) {
//         logger.info(
//           `Login failed - User not found | Email: ${email} | IP: ${ip}`,
//         );

//         throw new ApiError("User not found", 404);
//       }

//       // 2. Check password
//       const isMatch = comparePassword(password, user.password);

//       if (!isMatch) {
//         logger.info(
//           `Login failed - Invalid password | UserID: ${user.user_id} | Email: ${email}`,
//         );

//         throw new ApiError("Invalid credentials", 401);
//       }
//       // 3. Generate token
//       const token = generateToken(user, []);

//       // ✅ 4. CALL YOUR FUNCTION HERE
//       await authService.updateLoginMeta(user.user_id, client);
//       logger.info(
//         `Login success | UserID: ${user.user_id} | Email: ${email} | IP: ${ip}`,
//       );

//       return { user, token };
//     });

//     res.json({
//       success: true,
//       token: result.token,
//       user: result.user,
//     });
//   } catch (err) {
//     next(err);
//   }
// };
exports.setPassword = async (req, res, next) => {
  try {
    const { email, password, token } = req.body;

    if (!email || !password || !token) {
      logger.warn("Set password failed: missing fields", { email });
      throw new ApiError("All fields required", 400);
    }

    const result = await withTransaction(async (client) => {
      logger.info("Setting password...", { email });

      // 1. Find user by email + token
      const userResult = await userLoginModel.findByEmailToken(
        [email, token],
        client,
      );

      if (userResult.rows.length === 0) {
        logger.warn("Invalid token attempt", { email });
        throw new ApiError("Invalid or expired token", 400);
      }

      const user = userResult.rows[0];

      logger.info("User found for password setup", { userId: user.id });

      // 2. Hash password
      const hashedPassword = await hashPassword(password);

      logger.info("Password hashed", { userId: user.id });

      // 3. Update password
      await userLoginModel.updateUserLoginPassword(
        [hashedPassword, user.id],
        client,
      );

      logger.info("Password updated", { userId: user.id });

      // 4. Clear token + verify user
      await userLoginModel.clearToken(user.id, client);

      logger.info("Token cleared", { userId: user.id });

      // 5. Create email link (FIXED)
      // 6. Send email INSIDE transaction safety

      if (!process.env.FRONTEND_URL) {
        throw new Error("FRONTEND_URL is not defined in .env");
      }
      const link = `${process.env.FRONTEND_URL}/set-password?token=${token}&userId=${user.id}`;
      console.log("Verification after generate password", link);
      console.log("FRONTEND_URL:", process.env.FRONTEND_URL);
      await sendMail({
        to: email,
        subject: "Set Your Password",
        html: setPasswordTemplate(user.name, link),
      });

      logger.info("Email sent successfully", { email });

      return user;
    });

    res.status(200).json({
      success: true,
      message: "Password set successfully",
    });
  } catch (err) {
    logger.error("Set password failed", {
      message: err.message,
      stack: err.stack,
      email: req.body?.email,
    });

    next(err);
  }
};

exports.verifyUser = async (req, res, next) => {
  try {
    const { token, userId } = req.query;

    await withTransaction(async (client) => {
      const user = await userLoginModel.findByToken([token, userId], client);

      if (!user) {
        throw new ApiError("Invalid or expired link", 400);
      }

      await userLoginModel.verifyUser(userId, client);
      await userLoginModel.clearToken(userId, client);
    });

    // ✅ THIS LINE GOES HERE
    return res.redirect(`${process.env.FRONTEND_URL}/user/login?verified=true`);
  } catch (err) {
    next(err);
  }
};
// exports.setPassword = async (req, res, next) => {
//   try {
//     const { email, password, token } = req.body;

//     if (!email || !password || !token) {
//       logger.warn("Set password failed: missing fields", { email });
//       throw new ApiError("All fields required", 400);
//     }

//     await withTransaction(async (client) => {
//       logger.info("Setting password...", { email });

//       const userResult = await userLoginModel.findByEmailToken(
//         [email, token],
//         client,
//       );
//       if (userResult.rows.length === 0) {
//         logger.warn("Invalid token attempt", { email });
//         throw new ApiError("Invalid or expired token", 400);
//       }

//       const user = userResult.rows[0];

//       logger.info("User found for password setup", { userId: user.id });

//       const hashedPassword = await hashPassword(password);

//       logger.info("Password hashed", { userId: user.id });

//       await userLoginModel.updateUserLoginPassword(
//         [hashedPassword, user.id],
//         client,
//       );
//       logger.info("Password updated", { userId: user.id });

//       await userLoginModel.clearToken(user.id, client);
//       logger.info("Token cleared and timestamp updated", { userId: user.id });
//     });

//     logger.info("Password set successfully", { email });
//     await sendMail({
//       to: email,
//       subject: "Set Password",
//       html: setPasswordTemplate(user.name, link),
//     });
//     res.status(200).json({
//       success: true,
//       message: "Password set successfully",
//     });
//   } catch (err) {
//     logger.error("Set password failed", {
//       message: err.message,
//       stack: err.stack,
//       email: req.body?.email,
//     });

//     next(err);
//   }
// };
