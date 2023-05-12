const paymentRouter = require("express").Router();

const paymentController = require("../../controller/paymentController");
// const uploadMiddleware = require("../../middlewares/upload.middlewares");
// const validate = require("../../middlewares/validator.middleware");

paymentRouter.get('/', paymentController.getPayment);

paymentRouter.get("/find", paymentController.getPayment);

paymentRouter.post("/create", paymentController.createPayment);

paymentRouter.post("/create-alternative", paymentController.createAlternative);


module.exports = paymentRouter;
