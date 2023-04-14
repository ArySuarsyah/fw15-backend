const usersRouter = require("express").Router();

const userController = require('../../controller/admin/users.controller');
const uploadMiddleware = require("../../middlewares/upload.middlewares");

usersRouter.get("/", userController.getAllUsers);
usersRouter.post("/", uploadMiddleware("picture"), userController.createUser);
usersRouter.get("/:id", userController.getUserById);
usersRouter.patch(
  "/:id",
  uploadMiddleware("picture"),
  userController.updateUsers
);
usersRouter.delete("/:id", userController.deleteUsers);

module.exports = usersRouter;
