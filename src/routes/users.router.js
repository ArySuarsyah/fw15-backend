const usersRouter = require("express").Router();

const userController = require('../controllers/users.controller')

usersRouter.get("/", userController.getAllUsers);
usersRouter.post("/", userController.createUser);
usersRouter.get("/:id", userController.getUserById);
usersRouter.patch("/:id", userController.updateUsers);
usersRouter.delete("/:id", userController.deleteUser);



module.exports = usersRouter;