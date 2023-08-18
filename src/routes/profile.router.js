const profileRouter = require("express").Router();
const profileController = require("../controller/profileController");
const  uploadMiddleware  = require("../middlewares/upload.middlewares");
// const validate = require("../middlewares/validator.middleware");
// const authMiddleware = require("../middlewares/auth.middleware");

profileRouter.post(
  "/", uploadMiddleware,
  profileController.updateProfileByUserId
);

profileRouter.get("/", profileController.readProfile);

module.exports = profileRouter;
