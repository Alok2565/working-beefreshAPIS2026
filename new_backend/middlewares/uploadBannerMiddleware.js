const multer = require("multer");
const path = require("path");
const fs = require("fs");

// ✅ Safe env fallback
const BASE_UPLOAD = process.env.UPLOAD_BASE_PATH || "uploads";
const BANNER_FOLDER = process.env.UPLOAD_BANNER_PATH || "home-banners";

const uploadDir = path.join(BASE_UPLOAD, BANNER_FOLDER);

// ✅ Debug (remove later)
console.log("Upload Dir:", uploadDir);

// ✅ Ensure directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = file.originalname.replace(/\s+/g, "_").split(".")[0];

    cb(null, `${name}_${Date.now()}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Only images allowed"), false);
  }
};

module.exports = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 },
});
