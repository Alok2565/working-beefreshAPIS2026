const express = require("express");
const router = express.Router();
const taxReportController = require("../controllers/products/InvoiceTaxReportsController");

router.post("/create", taxReportController.createInvoiceTaxReport);
router.get("/", taxReportController.getInvoiceTaxReports);

module.exports = router;