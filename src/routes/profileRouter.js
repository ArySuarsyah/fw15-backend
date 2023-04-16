const profileRouter = require("express").Router();
const profileController = require("../controller/profileController");
const validate = require("../middlewares/validator.middleware");
const uploadMiddleware = require("../middlewares/upload.middlewares");

profileRouter.get("/", profileController.getProfile);
profileRouter.post(
  "/",
  uploadMiddleware("picture"),
  validate("createProfile"),
  profileController.createProfile
);
profileRouter.get(
  "/:id",
  validate("paramsId"),
  profileController.getProfileById
);
profileRouter.patch(
  "/:id",
  uploadMiddleware("picture"),
  validate("updateProfile"),
  profileController.updateProfile
);
profileRouter.delete(
  "/:id",
  validate("deleteProfile"),
  profileController.deleteProfile
);

module.exports = profileRouter;
