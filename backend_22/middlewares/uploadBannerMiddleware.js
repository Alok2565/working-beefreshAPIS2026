// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");

// // ================= BASE UPLOAD =================
// const BASE_UPLOAD =
//   process.env.UPLOAD_BASE_PATH || "uploads";

// // ================= STORAGE =================
// const storage = multer.diskStorage({

//   // ================= DESTINATION =================
//   destination: (req, file, cb) => {

//     try {

//       // upload folder required
//       if (!req.uploadFolder) {

//         return cb(
//           new Error(
//             "Upload folder is required"
//           ),
//           null
//         );
//       }

//       // dynamic folder from route
//       const uploadDir = path.join(
//         BASE_UPLOAD,
//         req.uploadFolder
//       );

//       // create folder if not exists
//       if (!fs.existsSync(uploadDir)) {

//         fs.mkdirSync(uploadDir, {
//           recursive: true,
//         });
//       }

//       cb(null, uploadDir);

//     } catch (err) {

//       console.error(
//         "Upload destination error:",
//         err.message
//       );

//       cb(err, null);
//     }
//   },

//   // ================= FILE NAME =================
//   filename: (req, file, cb) => {

//     try {

//       const ext = path.extname(
//         file.originalname
//       );

//       const name = path
//         .parse(file.originalname)
//         .name
//         .replace(
//           /[^a-zA-Z0-9._-]/g,
//           "_"
//         );

//       cb(
//         null,
//         `${name}_${Date.now()}${ext}`
//       );

//     } catch (err) {

//       console.error(
//         "Filename error:",
//         err.message
//       );

//       cb(err, null);
//     }
//   },
// });

// // ================= FILE FILTER =================
// const fileFilter = (req, file, cb) => {

//   try {

//     if (
//       file.mimetype.startsWith("image/")
//     ) {

//       cb(null, true);

//     } else {

//       cb(
//         new Error(
//           "Only image files are allowed"
//         ),
//         false
//       );
//     }

//   } catch (err) {

//     cb(err, false);
//   }
// };

// // ================= MULTER =================
// const upload = multer({

//   storage,

//   fileFilter,

//   limits: {
//     fileSize: 2 * 1024 * 1024,
//   },
// });

// // ================= EXPORT =================
// module.exports = upload;


const multer = require('multer')
const path = require('path')
const fs = require('fs')

// ================= BASE UPLOAD =================
const BASE_UPLOAD = process.env.UPLOAD_BASE_PATH || 'uploads'

// ================= STORAGE =================
const storage = multer.diskStorage({
  // ================= DESTINATION =================
  destination: (req, file, cb) => {
    try {
      if (!req.uploadFolder) {
        return cb(new Error('Upload folder is required'), null)
      }

      const uploadDir = path.join(BASE_UPLOAD, req.uploadFolder)

      // CREATE DIRECTORY
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, {
          recursive: true
        })
      }

      cb(null, uploadDir)
    } catch (err) {
      console.error('Upload destination error:', err.message)

      cb(err, null)
    }
  },

  // ================= FILE NAME =================
  filename: (req, file, cb) => {
    try {
      // FILE EXTENSION
      const ext = path.extname(file.originalname)

      // RANDOM NUMBER
      const random = Math.floor(1000 + Math.random() * 9000)

      // FINAL FILE NAME
      const fileName = `${Date.now()}_${random}${ext}`

      cb(null, fileName)
    } catch (err) {
      console.error('Filename error:', err.message)

      cb(err, null)
    }
  }
})

// ================= FILE FILTER =================
const fileFilter = (req, file, cb) => {
  try {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true)
    } else {
      cb(new Error('Only image files are allowed'), false)
    }
  } catch (err) {
    cb(err, false)
  }
}

// ================= MULTER =================
const upload = multer({
  storage,

  fileFilter,

  limits: {
    fileSize: 2 * 1024 * 1024
  }
})

// ================= EXPORT =================
module.exports = upload
