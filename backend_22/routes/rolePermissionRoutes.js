// const express = require("express");
// const router = express.Router();

// const rolePermissionController = require("../controllers/RolePermissionController");

// router.post("/create", rolePermissionController.createRolePermission);
// router.get("/", rolePermissionController.getPermissionsData);
// router.put("/update/:id", rolePermissionController.updateRolePermission);
// router.patch(
//   "/soft-delete/:id",
//   rolePermissionController.softDeleteRolePermission,
// );
// router.patch("/restore/:id", rolePermissionController.restoreRolePermission);
// router.delete("/delete/:id", rolePermissionController.deleteRolePermission);

// router.post("/assign", rolePermissionController.assignPermissionsToRole);
// router.get("/:role_id", rolePermissionController.getPermissionsByRoleId);

// module.exports = router;
const express = require("express");
const router = express.Router();

const controller = require("../controllers/RolePermissionController");

/**
 * ASSIGN PERMISSIONS TO ROLE
 */
router.post("/assign", controller.assignPermissionsToRole);

/**
 * GET ROLE PERMISSIONS
 */
router.get("/:role_id", controller.getRolePermissions);

module.exports = router;
