const reservation = require("express").Router();
const reservationController = require("../controller/reservatoinsController");
const uploadMiddleware = require("../middlewares/upload.middlewares");

reservation.get("/", reservationController.getReservations);
reservation.post(
  "/",
  uploadMiddleware("picture"),
  reservationController.createReservations
);
reservation.get("/:id", reservationController.getReservationById);
reservation.patch(
  "/:id",
  uploadMiddleware("picture"),
  reservationController.updateReservations
);
reservation.delete("/:id", reservationController.deleteReservations);

module.exports = reservation;
