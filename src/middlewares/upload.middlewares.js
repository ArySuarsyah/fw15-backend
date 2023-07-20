const multer = require("multer");
const errorHandler = require("../helpers/errorHandler");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const explode = file.originalname.split(".").length;
    const ext = file.originalname.split(".")[explode - 1];
    const filename = new Date().getTime().toString() + "." + ext;
    cb(null, filename);
  },
});

const limits = {
  fileSize: 2 * 1024 * 1024,
};

const upload = multer({ storage, limits });

const uploadMiddleware = (field) => {
  const uploadField = upload.single(field);
  return (req, res, next) => {
    uploadField(req, res, (err) => {
      if (err) {
        return errorHandler(err, res);
      }
      return next();
    });
  };
};

module.exports = uploadMiddleware;
