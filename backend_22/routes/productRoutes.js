const express = require("express");
const router = express.Router();
const upload = require("../middlewares/uploadBannerMiddleware");
const {
    verifyToken,
} = require("../middlewares/authMiddleware");

const productsController = require("../controllers/products/ProductController");

router.post(
    "/create",
    verifyToken,
    (req, res, next) => {
        req.uploadFolder = "/products/items";
        next();
    },
    upload.fields([
        {
            name: "thumbnail_image",
            maxCount: 1,
        },
        {
            name: "gallery_images",
            maxCount: 20,
        },
    ]),
    productsController.createProductController
);
router.get("/list", productsController.getProdctsRecordsList);

module.exports = router;