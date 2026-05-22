const multer = require("multer");

const errorHandler = (err, req, res, next) => {

  // ================= MULTER ERRORS =================
  if (err instanceof multer.MulterError) {

    // file size error
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        message:
          "File size exceeds 2MB limit",
      });
    }

    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  // ================= FILE TYPE ERROR =================
  if (
    err.message ===
    "Only image files are allowed"
  ) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  // ================= GENERAL ERROR =================
  return res.status(500).json({
    success: false,
    message:
      err.message || "Internal Server Error",
  });
};

module.exports = errorHandler;
// module.exports = (err, req, res, next) => {
//   console.error("🔥 ERROR:", err.message);

//   res.status(err.statusCode || 500).json({
//     success: false,
//     message: err.message || "Internal Server Error",
//   });
// };
