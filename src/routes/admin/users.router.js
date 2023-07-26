const usersRouter = require("express").Router();

const userController = require('../../controller/admin/users.controller');
const uploadMiddleware = require("../../middlewares/upload.middlewares");

usersRouter.get("/", userController.getAllUsers);
usersRouter.post("/", uploadMiddleware, userController.createUser);
usersRouter.get("/:id", userController.getUserById);
usersRouter.patch(
  "/:id",
  uploadMiddleware,
  userController.updateUsers
);
usersRouter.delete("/:id", userController.deleteUsers);

module.exports = usersRouter;
