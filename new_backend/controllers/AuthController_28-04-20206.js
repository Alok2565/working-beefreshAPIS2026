const userLoginModel = require("../models/UserLoginModel");
const authService = require("../services/authService");
const { getUserPermissions } = require("../services/permissionService");
const { getMenusByPermissions } = require("../services/menuService");
const { generateToken } = require("../utils/jwt");
const ApiError = require("../utils/ApiError");
const logger = require("../utils/logger");
const { hashPassword, comparePassword } = require("../utils/hash");
const withTransaction = require("../utils/transaction");

const {
  setPasswordTemplate,
} = require("../email/templates/setPasswordTemplate");
const { sendMail } = require("../services/emailService");
const { saveOtp, verifyOtp, hasOtp } = require("../utils/otpStore");
exports.setPassword = async (req, res, next) => {
  try {
    const { email, password, token } = req.body;

    if (!email || !password || !token) {
      throw new ApiError("Password and token are required", 400);
    }

    const result = await withTransaction(async (client) => {
      logger.info("Setting password...");

      // ✅ FIX: find by token only (no email needed)
      const userResult = await userLoginModel.findByEmailToken(
        [email, token],
        client,
      );

      if (userResult.rows.length === 0) {
        throw new ApiError("Invalid or expired token", 400);
      }

      const user = userResult.rows[0];

      // ✅ IMPORTANT FIX
      const userId = Number(user.user_id);

      if (!userId) {
        throw new Error("Invalid user_id");
      }

      logger.info("User found", { userId });

      const hashedPassword = await hashPassword(password);

      // ✅ UPDATE PASSWORD
      const updateResult = await userLoginModel.updateUserLoginPassword(
        [hashedPassword, userId],
        client,
      );

      if (updateResult.rows.length === 0) {
        throw new Error("Password update failed");
      }

      // ✅ CLEAR TOKEN
      await userLoginModel.clearToken(userId, client);

      logger.info("Password updated & token cleared", { userId });

      return true;
    });

    res.status(200).json({
      success: true,
      message: "Password set successfully",
    });
  } catch (err) {
    logger.error("Set password failed", {
      message: err.message,
      stack: err.stack,
    });

    next(err);
  }
};

exports.verifyUser = async (req, res, next) => {
  try {
    const { token, userId } = req.query;

    await withTransaction(async (client) => {
      const user = await userLoginModel.verifyUser([token, userId], client);

      if (!user) {
        throw new ApiError("Invalid or expired link", 400);
      }
      await userLoginModel.verifyUser(userId, client);
      await userLoginModel.clearToken(userId, client);
    });
    return res.redirect("/");
  } catch (err) {
    next(err);
  }
};

exports.UserLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    logger.info(`Login attempt started for email: ${email} | IP: ${ip}`);

    const result = await withTransaction(async (client) => {
      const user = await userLoginModel.findUserByEmail(email, client);

      if (!user) {
        throw new ApiError("User not found", 404);
      }

      const isMatch = comparePassword(password, user.password);

      if (!isMatch) {
        throw new ApiError("Invalid credentials", 401);
      }

      // ✅ Generate OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();

      // ✅ Save OTP in memory
      saveOtp(email, otp);

      // ✅ Send Email
      await sendMail({
        to: email,
        subject: "Your Login OTP",
        html: `<h3>Your OTP is: ${otp}</h3>`,
      });

      logger.info(`OTP sent to email: ${email}`);

      return { user };
    });

    // ❗ NO TOKEN HERE
    res.json({
      success: true,
      message: "OTP sent to your email",
      email: result.user.email,
    });
  } catch (err) {
    logger.error(
      `Login error | Email: ${req.body.email} | Error: ${err.message}`,
    );
    next(err);
  }
};
exports.verifyLoginOtp = async (req, res, next) => {
  console.log("🚀 VERIFY OTP API HIT");

  try {
    const { email, otp } = req.body;

    console.log("📩 INPUT:", { email, otp });

    const isValid = verifyOtp(email, otp);
    if (!isValid) {
      throw new Error("Invalid OTP");
    }

    const result = await withTransaction(async (client) => {
      console.log("🔥 TRANSACTION START");

      const user = await authService.findUserByEmailMeta(email, client);
      console.log("👤 USER:", user);

      if (!user || !user.user_id) {
        throw new Error("User not found");
      }

      const userId = Number(user.user_id);

      if (isNaN(userId)) {
        throw new Error("Invalid user_id");
      }

      console.log("🆔 USER ID:", userId);

      const permissions = await getUserPermissions(userId, client);
      console.log("🔐 PERMISSIONS:", permissions);

      await authService.updateLoginMeta(userId, client);
      console.log("🕒 LOGIN UPDATED");

      return { user, permissions };
    });

    res.json({
      success: true,
      user: result.user,
      permissions: result.permissions,
    });
  } catch (err) {
    console.error("❌ VERIFY OTP ERROR:", err.message);
    next(err);
  }
};
exports.resendOtp = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      throw new ApiError("Email is required", 400);
    }

    const result = await withTransaction(async (client) => {
      const user = await userLoginModel.findUserByEmail(email, client);

      if (!user) {
        throw new ApiError("User not found", 404);
      }
      if (hasOtp(email)) {
        throw new ApiError("OTP already sent. Please wait", 429);
      }
      // ✅ Generate new OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();

      // ✅ Save OTP (overwrite old one)
      saveOtp(email, otp);

      // ✅ Send Email
      await sendMail({
        to: email,
        subject: "Your Resend OTP",
        html: `<h3>Your new OTP is: ${otp}</h3>`,
      });

      return true;
    });

    res.json({
      success: true,
      message: "OTP resent successfully",
    });
  } catch (err) {
    next(err);
  }
};
