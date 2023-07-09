const deviceTokenRouter = require("express").Router();

const deviceTokenController = require('../controller/deviceTokenController')

deviceTokenRouter.post("/", deviceTokenController.saveToken);
module.exports = deviceTokenRouter;
