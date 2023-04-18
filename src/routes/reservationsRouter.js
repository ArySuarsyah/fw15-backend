const reservation = require("express").Router();
const reservationController = require("../controller/reservatoinsController");

const validate = require("../middlewares/validator.middleware");

reservation.get("/", reservationController.getReservations);
reservation.post(
  "/",
  validate("resevationCreate"),
  reservationController.createReservations
);
reservation.get(
  "/:id",
  validate("paramsId"),
  reservationController.getReservationById
);
reservation.patch(
  "/:id",
  validate("resevationUpdate"),
  reservationController.updateReservations
);
reservation.delete(
  "/:id",
  validate("paramsId"),
  reservationController.deleteReservations
);

module.exports = reservation;
