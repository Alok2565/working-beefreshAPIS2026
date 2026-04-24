const express = require("express");
const router = express.Router();

const roleController = require("../controllers/roleController");

router.post("/create", roleController.createRole);
router.get("/", roleController.getRolesData);
router.put("/update/:id", roleController.updateRole);
router.patch("/soft-delete/:id", roleController.softDeleteRole);
router.patch("/restore/:id", roleController.restoreRole);
router.delete("/delete/:id", roleController.deleteRole);

module.exports = router;
// const express = require("express");
// const router = express.Router();

// const roleController = require("../controllers/RoleController");

// router.post("/", roleController.createRole);
// router.get("/", roleController.getRolesData);
// router.put("/:id", roleController.updateRole);
// router.patch("/soft-delete/:id", roleController.softDeleteRole);
// router.patch("/restore/:id", roleController.restoreRole);
// router.delete("/:id", roleController.deleteRole);

// module.exports = router;
