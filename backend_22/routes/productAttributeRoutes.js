const express = require("express");
const router = express.Router();
const productAttributeController = require("../controllers/products/ProductAttributeController");

router.post("/create", productAttributeController.createProductAttribute);
router.get("/", productAttributeController.getProductAttributes);
router.get("/:id", productAttributeController.getProductAttributeById);
router.put(
  "/status/:id",
  productAttributeController.updateProductAttributeStatus,
);
router.put("/update/:id", productAttributeController.updateProductAttribute);
router.patch(
  "/soft-delete/:id",
  productAttributeController.softDeleteProductAttribute,
);
router.patch(
  "/restore/:id",
  productAttributeController.restoreProductAttribute,
);
router.delete("/delete/:id", productAttributeController.deleteProductAttribute);

module.exports = router;
