// const express = require("express");
// const router = express.Router();

// const homeBannerController = require("../controllers/Banners/HomeBannerController");

// router.post("/create", homeBannerController.createHomeBanner);
// router.get("/", homeBannerController.getHomeBannersData);
// router.get("/:id", homeBannerController.getHomeBannerById);
// router.put("/update/:id", homeBannerController.updateHomeBanner);
// router.patch("/soft-delete/:id", homeBannerController.softDeleteHomeBanner);
// router.patch("/restore/:id", homeBannerController.restoreHomeBanner);
// router.delete("/delete/:id", homeBannerController.deleteHomeBanner);

// module.exports = router;

const express = require("express");
const router = express.Router();

const homeBannerController = require("../controllers/Banners/HomeBannerController");
const upload = require("../middlewares/uploadBannerMiddleware");

router.post(
  "/create",
  upload.single("image"),
  homeBannerController.createHomeBanner,
);
router.get("/", homeBannerController.getHomeBannersData);
router.get("/:id", homeBannerController.getHomeBannerById);
router.put(
  "/status/:id",
  upload.single("image"),
  homeBannerController.updateBannerStatus,
);
router.put(
  "/update/:id",
  upload.single("image"),
  homeBannerController.updateHomeBanner,
);

router.patch("/soft-delete/:id", homeBannerController.softDeleteHomeBanner);
router.patch("/restore/:id", homeBannerController.restoreHomeBanner);
router.delete("/delete/:id", homeBannerController.deleteHomeBanner);

module.exports = router;
