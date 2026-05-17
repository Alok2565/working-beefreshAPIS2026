const express = require("express");
const router = express.Router();
const purityController = require("../controllers/products/PurityController");

router.post("/create", purityController.createPurity);
router.get("/", purityController.getPurities);
router.get("/:id", purityController.getPurityById);
router.put("/status/:id", purityController.updatePurityStatus);
router.put("/update/:id", purityController.updatePurity);
router.patch("/soft-delete/:id", purityController.softDeletePurity);
router.patch("/restore/:id", purityController.restorePurity);
router.delete("/delete/:id", purityController.deletePurity);

module.exports = router;
