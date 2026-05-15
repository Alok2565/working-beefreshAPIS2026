const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");

router.post("/create", userController.createUser);
router.get("/", userController.getUsersData);
router.get("/:id", userController.getUserById);
router.put("/status/:id", userController.updateUserStatus);
router.put("/update/:id", userController.updateUser);
router.patch("/soft-delete/:id", userController.softDeleteUser);
router.patch("/restore/:id", userController.restoreUser);
router.delete("/delete/:id", userController.deleteUser);
router.delete("/assign-role", userController.assignRoleToUser);

module.exports = router;

// const express = require("express");
// const router = express.Router();
// const userController = require("../controllers/UserController");

// const { verifyToken } = require("../middlewares/authMiddleware");
// const { checkPermission } = require("../middlewares/permissionMiddleware");

// // CREATE
// router.post(
//   "/create",
//   verifyToken,
//   checkPermission("user_create"),
//   userController.createUser,
// );

// // READ
// router.get(
//   "/",
//   verifyToken,
//   checkPermission("user_read"),
//   userController.getUsersData,
// );

// // UPDATE
// router.put(
//   "/update/:id",
//   verifyToken,
//   checkPermission("user_update"),
//   userController.updateUser,
// );

// // SOFT DELETE
// router.patch(
//   "/soft-delete/:id",
//   verifyToken,
//   checkPermission("user_delete"),
//   userController.softDeleteUser,
// );

// // RESTORE
// router.patch(
//   "/restore/:id",
//   verifyToken,
//   checkPermission("user_update"),
//   userController.restoreUser,
// );

// // HARD DELETE
// router.delete(
//   "/delete/:id",
//   verifyToken,
//   checkPermission("user_delete"),
//   userController.deleteUser,
// );

// module.exports = router;
