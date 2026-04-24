// const express = require("express");
// const router = express.Router();

// const authController = require("../controllers/AuthController");

// router.post("/set-password", authController.setPassword);
// router.post("/login", authController.UserLogin);

// module.exports = router;

const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { verifyToken } = require("../middlewares/authMiddleware");
const { checkPermission } = require("../middlewares/permissionMiddleware");

// Login
router.post("/set-password", authController.setPassword);
router.post("/login", authController.UserLogin);
router.get("/verify-user", authController.verifyUser);

router.get(
  "/user-dashboard",
  verifyToken,
  checkPermission("VIEW_USER_DASHBOARD"),
  (req, res) => {
    res.json({
      message: "Welcome User Dashboard",
      user: req.user,
    });
  },
);

// Admin Dashboard
router.get(
  "/admin-dashboard",
  verifyToken,
  checkPermission("VIEW_ADMIN_DASHBOARD"),
  (req, res) => {
    res.json({
      message: "Welcome Admin Dashboard",
      user: req.user,
    });
  },
);

module.exports = router;
