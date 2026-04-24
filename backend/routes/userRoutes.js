const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");

router.post("/create", userController.createUser);
router.get("/", userController.getUsersData);
// router.get("/:id", getUserById);
router.put("/update/:id", userController.updateUser);
router.patch("/soft-delete/:id", userController.softDeleteUser);
router.patch("/restore/:id", userController.restoreUser);
router.delete("/delete/:id", userController.deleteUser);

module.exports = router;
// const { checkPermission } = require("../middlewares/permissionMiddleware");

// router.post(
//   "/",
//   auth,
//   checkPermission("user_create"),
//   userController.createUser,
// );

// router.get("/", auth, checkPermission("user_read"), userController.getUsers);
// router.put(
//   "/:id",
//   auth,
//   checkPermission("user_update"),
//   userController.updateUser,
// );

// router.delete(
//   "/:id",
//   auth,
//   heckPermission("user_delete"),
//   userController.deleteUser,
// );
