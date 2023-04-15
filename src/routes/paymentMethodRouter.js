const paymentMethod = require("express").Router();
const paymentMethodController = require("../controller/paymentMethodController");
const uploadMiddleware = require("../middlewares/upload.middlewares");

paymentMethod.get("/", paymentMethodController.getPaymentMethod);
paymentMethod.post(
  "/",
  uploadMiddleware("picture"),
  paymentMethodController.createPaymentMethod
);
paymentMethod.get("/:id", paymentMethodController.getPaymentMethodById);
paymentMethod.patch(
  "/:id",
  uploadMiddleware("picture"),
  paymentMethodController.updatePaymentMethod
);
paymentMethod.delete("/:id", paymentMethodController.deletePaymentMethod);

module.exports = paymentMethod;
