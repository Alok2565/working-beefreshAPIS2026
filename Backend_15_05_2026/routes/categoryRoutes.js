const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/products/categoryController");
const upload = require("../middlewares/uploadBannerMiddleware");

// router.post(
//   "/create",
//   upload.single("image"),
//   categoryController.createNewRecord);
router.post(
  "/create",
  (req, res, next) => {
    req.uploadFolder = "/products/category";
    next();
  },
  upload.single("image"),
  categoryController.createNewRecord,
);
router.get("/list", categoryController.fetchRecordsData);
router.get("/:id", categoryController.fetchRecordById);
router.put(
  "/status/:id",
  upload.single("image"),
  categoryController.updateRecordStatus,
);
router.put(
  "/update/:id",
  (req, res, next) => {
    req.uploadFolder = "/products/category";
    next();
  },
  upload.single("image"),
  categoryController.updateRecordData,
);

router.patch("/soft-delete/:id", categoryController.softDeleteRecord);
router.patch("/restore/:id", categoryController.restoreDeletdRecord);
router.delete("/delete/:id", categoryController.deletedRecord);

module.exports = router;
