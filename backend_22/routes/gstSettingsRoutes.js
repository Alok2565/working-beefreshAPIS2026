const express = require("express");
const router = express.Router();
const gstController = require("../controllers/products/GSTSettingsController");

router.get("/", gstController.getGSTSettings);
router.put("/update/:id", gstController.updateGSTSettings);

module.exports = router;
