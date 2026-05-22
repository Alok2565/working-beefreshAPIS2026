const express = require("express");
const router = express.Router();
const TaxMasterController = require("../controllers/products/TaxMasterController");

router.post("/create", TaxMasterController.createTaxMaster);
router.get("/", TaxMasterController.getTaxMasters);
router.get("/:id", TaxMasterController.getTaxMasterById);
router.put("/status/:id", TaxMasterController.updateTaxMasterStatus);
router.put("/update/:id", TaxMasterController.updateTaxMaster);
router.patch("/soft-delete/:id", TaxMasterController.softDeleteTaxMaster);
router.patch("/restore/:id", TaxMasterController.restoreTaxMaster);
router.delete("/delete/:id", TaxMasterController.deleteTaxMaster);

module.exports = router;
