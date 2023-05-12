const paymentRouter = require("express").Router();

const paymentController = require("../../controller/paymentController");
// const uploadMiddleware = require("../../middlewares/upload.middlewares");
// const validate = require("../../middlewares/validator.middleware");

paymentRouter.get('/', paymentController.getPayment);


module.exports = paymentRouter;
