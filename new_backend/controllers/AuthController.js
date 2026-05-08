const userLoginModel = require("../models/UserLoginModel");
const authService = require("../services/authService");
const { getUserPermissions } = require("../services/permissionService");
const { generateToken } = require("../utils/jwt");
const ApiError = require("../utils/ApiError");
const logger = require("../utils/logger");
const { hashPassword, comparePassword } = require("../utils/hash");
const withTransaction = require("../utils/transaction");

const { sendMail } = require("../services/emailService");
const { saveOtp, verifyOtp, hasOtp } = require("../utils/otpStore");

// =======================================
// ✅ SET PASSWORD
// =======================================
exports.setPassword = async (req, res, next) => {
  try {
    const { email, password, token } = req.body;

    if (!email || !password || !token) {
      throw new ApiError("All fields are required", 400);
    }

    const result = await withTransaction(async (client) => {
      logger.info("🔐 Setting password...");

      const userResult = await userLoginModel.findByEmailToken(
        [email, token],
        client,
      );

      if (userResult.rows.length === 0) {
        throw new ApiError("Invalid or expired token", 400);
      }

      const user = userResult.rows[0];

      const userId = Number(user.user_id);
      if (!userId) throw new Error("Invalid user_id");

      const hashedPassword = await hashPassword(password);

      const update = await userLoginModel.updateUserLoginPassword(
        [hashedPassword, userId],
        client,
      );

      if (update.rows.length === 0) {
        throw new Error("Password update failed");
      }

      await userLoginModel.clearToken(userId, client);

      logger.info("✅ Password updated", { userId });

      return true;
    });

    res.json({
      success: true,
      message: "Password set successfully",
    });
  } catch (err) {
    logger.error("❌ setPassword error", err.message);
    next(err);
  }
};

// =======================================
// ✅ EMAIL + PASSWORD LOGIN → SEND OTP
// =======================================
exports.UserLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const result = await withTransaction(async (client) => {
      const user = await userLoginModel.findUserByEmail(email, client);
      console.log("Fetch user detail for logged in", user);
      if (!user) throw new ApiError("User not found", 404);

      const isMatch = comparePassword(password, user.password);
      if (!isMatch) throw new ApiError("Invalid credentials", 401);

      const otp = Math.floor(100000 + Math.random() * 900000).toString();

      saveOtp(email, otp);

      await sendMail({
        to: email,
        subject: "Your Login OTP",
        html: `<h3>Your OTP is: ${otp}</h3>`,
      });

      return { email };
    });

    res.json({
      success: true,
      message: "OTP sent to your email",
      email: result.email,
    });
  } catch (err) {
    next(err);
  }
};

// =======================================
// ✅ VERIFY OTP → LOGIN SUCCESS
// =======================================
// exports.verifyLoginOtp = async (req, res) => {
//   try {
//     const { email, otp } = req.body;

//     if (!email || !otp) {
//       return res.status(400).json({ message: "Email & OTP required" });
//     }

//     // verify OTP logic here...

//     const user = await authService.findUserByEmailMeta(email, client);

//     const token = generateToken({
//       id: user.id,
//       role_id: user.role_id,
//     });

//     return res.json({
//       message: "Login successful",
//       token,
//       user: {
//         id: user.id,
//         email: user.email,
//         role_id: user.role_id,
//       },
//     });
//   } catch (err) {
//     return res.status(500).json({ message: err.message });
//   }
// };
exports.verifyLoginOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP required" });
    }

    const result = await withTransaction(async (client) => {
      const user = await authService.findUserByEmailMeta(email, client);
      console.log("USER FROM DB:", user);
      if (!user || !user.user_id || isNaN(user.user_id)) {
        throw new ApiError("Invalid userId", 400);
      }

      const userId = Number(user.user_id);

      const permissions = await getUserPermissions(userId, client);

      await authService.updateLoginMeta(userId, client);

      const token = generateToken({
        user_id: userId,
        email: user.email,
        role_id: user.role_id,
        name: user.name,
        permissions,
      });

      return { user, permissions, token };
    });

    res.json({
      success: true,
      token: result.token,
      user: result.user,
      permissions: result.permissions,
    });
  } catch (err) {
    next(err);
  }
};

// =======================================
// ✅ RESEND OTP
// =======================================
exports.resendOtp = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) throw new ApiError("Email required", 400);

    const result = await withTransaction(async (client) => {
      const user = await userLoginModel.findUserByEmail(email, client);

      if (!user) throw new ApiError("User not found", 404);

      if (hasOtp(email)) {
        throw new ApiError("OTP already sent. Please wait", 429);
      }

      const otp = Math.floor(100000 + Math.random() * 900000).toString();

      saveOtp(email, otp);

      await sendMail({
        to: email,
        subject: "Resend OTP",
        html: `<h3>Your OTP is: ${otp}</h3>`,
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

// =======================================
// ✅ VERIFY USER (EMAIL LINK)
// =======================================
exports.verifyUser = async (req, res, next) => {
  try {
    const { userId } = req.query;

    await withTransaction(async (client) => {
      if (!userId) {
        throw new ApiError("Invalid userId", 400);
      }

      await userLoginModel.verifyUser(userId, client);
      await userLoginModel.clearToken(userId, client);
    });
    res.redirect("/");
  } catch (err) {
    next(err);
  }
};
