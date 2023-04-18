const reservationStatus = require("express").Router();
const reservationStatusController = require("../controller/reservationStatusController");
const validate = require("../middlewares/validator.middleware");

reservationStatus.get("/", reservationStatusController.getReservationStatus);
reservationStatus.post(
  "/", validate("nameFormat"),
  reservationStatusController.createReservationStatus
);
reservationStatus.get(
  "/:id", validate("paramsId"),
  reservationStatusController.getReservationStatusById
);
reservationStatus.patch(
  "/:id", validate("nameFormat", "paramsId"),
  reservationStatusController.updateReservationStatus
);
reservationStatus.delete(
  "/:id", validate("paramsId"),
  reservationStatusController.deleteReservationStatus
);

module.exports = reservationStatus;
