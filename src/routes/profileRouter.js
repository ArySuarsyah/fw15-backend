const profileRouter = require("express").Router();

const profileController = require("../controller/profile.controller");
const validate = require("../middlewares/validator.middleware");


profileRouter.get("/", profileController.getProfile);
profileRouter.post("/", validate("profile"), profileController.createProfile);
profileRouter.get("/:id", profileController.getProfileById);
profileRouter.patch('/:id', validate("profile"), profileController.updateProfile);
profileRouter.delete("/:id", profileController.deleteProfile);





module.exports = profileRouter;