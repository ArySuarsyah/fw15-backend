const reservationTicket = require("express").Router();
const reservationTicketController = require("../controller/reservationTicketController");
const uploadMiddleware = require("../middlewares/upload.middlewares");

reservationTicket.get("/", reservationTicketController.getReservationTicket);
reservationTicket.post(
  "/",
  uploadMiddleware("picture"),
  reservationTicketController.createReservationTicket
);
reservationTicket.get(
  "/:id",
  reservationTicketController.getReservationTicketById
);
reservationTicket.patch(
  "/:id",
  uploadMiddleware("picture"),
  reservationTicketController.updateReservationTicket
);
reservationTicket.delete(
  "/:id",
  reservationTicketController.deleteReservationTicket
);

module.exports = reservationTicket;
