const paymentMethod = require("express").Router();
const paymentMethodController = require("../controller/paymentMethodController");
const uploadMiddleware = require("../middlewares/upload.middlewares");
const validate = require("../middlewares/validator.middleware");

paymentMethod.get("/", paymentMethodController.getPaymentMethod);

paymentMethod.post(
  "/create", validate("nameFormat"),
  paymentMethodController.createPaymentMethod
);

paymentMethod.get(
  "/:id",
  validate("paramsId"),
  paymentMethodController.getPaymentMethodById
);

paymentMethod.patch(
  "/:id",
  uploadMiddleware("picture"), validate("updateName"),
  paymentMethodController.updatePaymentMethod
);

paymentMethod.delete(
  "/:id",
  validate("paramsId"),
  paymentMethodController.deletePaymentMethod
);

module.exports = paymentMethod;
