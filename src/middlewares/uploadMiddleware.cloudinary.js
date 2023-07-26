
// const cloudinary = require("cloudinary").v2;
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const multer = require("multer");
// const path = require("path");
// const errorHandler = require("../helper/errorHandler.helper");
// // eslint-disable-next-line no-undef
// const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;

// cloudinary.config({
//   cloud_name: CLOUD_NAME,
//   api_key: API_KEY,
//   api_secret: API_SECRET,
// });

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: "movieId",
//     format: async (req, file) => path.extname(file.originalname).slice("1"), // supports promises as well
//     // eslint-disable-next-line no-unused-vars
//     public_id: (req, file) => {
//       const randomNumber = Math.round(Math.random() * 90000);
//       const filename = `${randomNumber}${Date.now()}`;
//       return filename;
//     },
//   },
// });

// const fileFilter = (req, file, cb) => {
//   if (
//     file.mimetype === "image/jpeg" ||
//     file.mimetype === "image/png" ||
//     file.mimetype === "image/gif"
//   ) {
//     cb(null, true);
//   } else {
//     cb(new Error("Invalid file type"), false);
//   }
// };

// const upload = multer({
//   storage,
//   limits: {
//     fileSize: 2 * 1024 * 1024,
//   },
//   fileFilter,
// });

// const uploadErrorHandler = (err, req, res, next) => {
//   if (err instanceof multer.MulterError) {
//     if (err.code === "LIMIT_FILE_SIZE") {
//       res.status(400).json({
//         success: false,
//         message: "File size exceeded 2MB limit",
//       });
//     } else {
//       res.status(400).json({
//         success: false,
//         message: err.message,
//       });
//     }
//   } else {
//     res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// };

// const uploadMiddleware = upload.single("picture");

// module.exports = (req, res, next) => {
//   uploadMiddleware(req, res, (err) => {
//     if (err) {
//       return errorHandler(err, res);
//     }
//     next();
//   });
// };

// // const multer = require('multer');
// // const errorHandler = require('../helper/errorHandler.helper');

// // const storage = multer.diskStorage({
// //   destination: (req, file, call) => {
// //     call(null, 'picture')
// //   },
// //   filename: (req, file, call) => {
// //     const extension = file.originalname.split('.');
// //     const ext = extension[extension.length - 1];

// //     const name = `${new Date().getTime()}_${new Date().getTime()}.${ext}`
// //     call(null, name)
// //   }
// // });

// // module.exports = {
// //   upload,
// //   uploadErrorHandler
// // }

// // const uploadMiddleware = upload.single("picture");

// // module.exports = (req, res, next) => {
// //   uploadMiddleware(req, res, (err) => {
// //     if (err) {
// //       return errorHandler(err, res)
// //     }
// //     next()
// //   })
// // }

// // const storage = multer.diskStorage({
// //   destination: (req, file, call) => {
// //     call(null, 'picture')
// //   },
// //   filename: (req, file, call) => {
// //     const extension = file.originalname.split('.');
// //     const ext = extension[extension.length - 1];

// //     const name = `${new Date().getTime()}_${new Date().getTime()}.${ext}`
// //     call(null, name)
// //   }
// // });

// // const upload = multer({ storage, });
