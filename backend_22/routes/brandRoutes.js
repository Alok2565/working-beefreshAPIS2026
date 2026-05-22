const express = require("express");
const router = express.Router();
const brandController = require("../controllers/products/BrandController");

router.post("/create", brandController.createBrand);
router.get("/", brandController.getBrands);
router.get("/:id", brandController.getBrandById);
router.put("/status/:id", brandController.updateBrandStatus);
router.put("/update/:id", brandController.updateBrand);
router.patch("/soft-delete/:id", brandController.softDeleteBrand);
router.patch("/restore/:id", brandController.restoreBrand);
router.delete("/delete/:id", brandController.deleteBrand);

module.exports = router;
