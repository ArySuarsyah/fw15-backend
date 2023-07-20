const profileRouter = require("express").Router();
const profileController = require("../controller/profileController");
// const validate = require("../middlewares/validator.middleware");
const uploadMiddleware = require("../middlewares/upload.middlewares");
// const authMiddleware = require("../middlewares/auth.middleware");


profileRouter.post(
  "/",
  uploadMiddleware("picture"),
  profileController.updateProfileByUserId
);

profileRouter.get(
  "/",
  profileController.readProfile
);


module.exports = profileRouter;
