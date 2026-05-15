const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

const { verifyToken } = require("../middlewares/authMiddleware");
const { checkPermission } = require("../middlewares/permissionMiddleware");

// Public
router.post("/login", authController.UserLogin);
router.post("/set-password", authController.setPassword);
router.post("/verify-otp", authController.verifyLoginOtp);
router.get("/verify-user", authController.verifyUser);
router.post("/resend-otp", authController.resendOtp);

// Protected
router.get(
  "/user-dashboard",
  verifyToken,
  checkPermission("VIEW_USER_DASHBOARD"),
  (req, res) => {
    res.json({ message: "User Dashboard", user: req.user });
  },
);

router.get(
  "/admin-dashboard",
  verifyToken,
  checkPermission("VIEW_ADMIN_DASHBOARD"),
  (req, res) => {
    res.json({ message: "Admin Dashboard", user: req.user });
  },
);

module.exports = router;

// const express = require("express");
// const router = express.Router();
// const authController = require("../controllers/authController");

// const { verifyToken } = require("../middlewares/authMiddleware");
// const { checkPermission } = require("../middlewares/permissionMiddleware");

// // Public routes
// router.post("/login", authController.UserLogin);
// router.post("/set-password", authController.setPassword);
// router.post("/verify-otp", authController.verifyLoginOtp);
// router.get("/verify-user", authController.verifyUser);
// router.post("/resend-otp", authController.resendOtp);

// // User dashboard
// router.get(
//   "/user-dashboard",
//   verifyToken,
//   checkPermission("VIEW_USER_DASHBOARD"),
//   (req, res) => {
//     res.json({
//       message: "Welcome User Dashboard",
//       user: req.user,
//     });
//   },
// );

// // Admin dashboard
// router.get(
//   "/admin-dashboard",
//   verifyToken,
//   checkPermission("VIEW_ADMIN_DASHBOARD"),
//   (req, res) => {
//     res.json({
//       message: "Welcome Admin Dashboard",
//       user: req.user,
//     });
//   },
// );

// module.exports = router;
