const reservationStatus = require("express").Router();
const reservationStatusController = require("../controller/reservationStatusController");
const uploadMiddleware = require("../middlewares/upload.middlewares");

reservationStatus.get("/", reservationStatusController.getReservationStatus);
reservationStatus.post(
  "/",
  uploadMiddleware("picture"),
  reservationStatusController.createReservationStatus
);
reservationStatus.get(
  "/:id",
  reservationStatusController.getReservationStatusById
);
reservationStatus.patch(
  "/:id",
  uploadMiddleware("picture"),
  reservationStatusController.updateReservationStatus
);
reservationStatus.delete(
  "/:id",
  reservationStatusController.deleteReservationStatus
);

module.exports = reservationStatus;
