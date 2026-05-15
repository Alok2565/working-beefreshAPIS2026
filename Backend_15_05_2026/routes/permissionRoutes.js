// const express = require("express");
// const router = express.Router();

// const permissionController = require("../controllers/PermissionController");

// router.post("/create", permissionController.createPermission);
// router.get("/", permissionController.getPermissionsData);
// router.put("/update/:id", permissionController.updatePermission);
// router.patch("/soft-delete/:id", permissionController.softDeletePermission);
// router.patch("/restore/:id", permissionController.restorePermission);
// router.delete("/delete/:id", permissionController.deletePermission);

// module.exports = router;
const express = require("express");
const router = express.Router();

const permissionController = require("../controllers/PermissionController");

router.post("/create", permissionController.createPermissionData);
router.get("/", permissionController.getPermissionsData);
router.put("/update/:id", permissionController.updatePermission);
router.patch("/soft-delete/:id", permissionController.softDeletePermission);
router.patch("/restore/:id", permissionController.restorePermission);
router.delete("/delete/:id", permissionController.deletePermission);

module.exports = router;
