const express = require("express");
const router = express.Router();
const flavorController = require("../controllers/products/FlavorController");

router.post("/create", flavorController.createFlavor);
router.get("/", flavorController.getFlavors);
router.get("/:id", flavorController.getFlavorById);
router.put("/status/:id", flavorController.updateFlavorStatus);
router.put("/update/:id", flavorController.updateFlavor);
router.patch("/soft-delete/:id", flavorController.softDeleteFlavor);
router.patch("/restore/:id", flavorController.restoreFlavor);
router.delete("/delete/:id", flavorController.deleteFlavor);

module.exports = router;
