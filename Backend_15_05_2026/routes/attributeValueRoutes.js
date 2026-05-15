const express = require("express");
const router = express.Router();
const attributeValueController = require("../controllers/products/AttributeValuseController");

router.post("/create", attributeValueController.createAttributeValue);
router.get("/", attributeValueController.getAttributeValues);
router.get("/:id", attributeValueController.getAttributeValueById);
router.put("/status/:id", attributeValueController.updateAttributeValueStatus);
router.put("/update/:id", attributeValueController.updateAttributeValue);
router.patch(
  "/soft-delete/:id",
  attributeValueController.softDeleteAttributeValue,
);
router.patch("/restore/:id", attributeValueController.restoreAttributeValue);
router.delete("/delete/:id", attributeValueController.deleteAttributeValue);

module.exports = router;
