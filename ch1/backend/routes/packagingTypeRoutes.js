const express = require("express");
const router = express.Router();
const packTypesController = require("../controllers/products/PackagingTypesController");

router.post("/create", packTypesController.createPackagingType);
router.get("/", packTypesController.getPackagingTypes);
router.get("/:id", packTypesController.getPackagingTypeById);
router.put("/status/:id", packTypesController.updatePackagingTypeStatus);
router.put("/update/:id", packTypesController.updatePackagingType);
router.patch("/soft-delete/:id", packTypesController.softDeletePackagingType);
router.patch("/restore/:id", packTypesController.restorePackagingType);
router.delete("/delete/:id", packTypesController.deletePackagingType);

module.exports = router;
