const express = require("express");
const router = express.Router();
const invoiceController = require("../controllers/products/InvoiceController");

router.post("/create", invoiceController.createInvoice);
router.get("/", invoiceController.getInvoices);
router.get("/:id", invoiceController.getInvoiceById);
router.put("/update/:id", invoiceController.updateInvoice);
router.patch("/status/:id", invoiceController.updateInvoiceStatus);
router.delete("/delete/:id", invoiceController.deleteInvoice);

module.exports = router;