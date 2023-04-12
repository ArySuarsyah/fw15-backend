const usersRouter = require("express").Router();

const userController = require('../controller/users.controller')

usersRouter.get("/", userController.getAllUsers);
usersRouter.post("/", userController.createUser);
usersRouter.get("/:id", userController.getUserById);
usersRouter.patch("/:id", userController.updateUsers);
usersRouter.delete("/:id", userController.deleteUsers);



module.exports = usersRouter;