const express = require("express");
const router = express.Router();
const weightUnitController = require("../controllers/products/WeightUnitController");

router.post("/create", weightUnitController.createWeightUnit);
router.get("/", weightUnitController.getWeightUnits);
router.get("/:id", weightUnitController.getWeightUnitById);
router.put("/status/:id", weightUnitController.updateWeightUnitStatus);
router.put("/update/:id", weightUnitController.updateWeightUnit);
router.patch("/soft-delete/:id", weightUnitController.softDeleteWeightUnit);
router.patch("/restore/:id", weightUnitController.restoreWeightUnit);
router.delete("/delete/:id", weightUnitController.deleteWeightUnit);

module.exports = router;
