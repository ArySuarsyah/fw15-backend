const profileRouter = require("express").Router();
const profileController = require("../controller/profileController");
// const validate = require("../middlewares/validator.middleware");
const uploadMiddleware = require("../middlewares/upload.middlewares");
const authMiddleware = require("../middlewares/auth.middleware");


profileRouter.post(
  "/",
  uploadMiddleware("picture"), authMiddleware,
  profileController.updateProfileByUserId
);

profileRouter.get(
  "/profile-detail",
  authMiddleware, profileController.readProfile
);


module.exports = profileRouter;
