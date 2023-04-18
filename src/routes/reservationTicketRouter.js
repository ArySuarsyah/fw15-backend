const reservationTicket = require("express").Router();
const reservationTicketController = require("../controller/reservationTicketController");
const validate = require("../middlewares/validator.middleware");

reservationTicket.get("/", reservationTicketController.getReservationTicket);
reservationTicket.post(
  "/",
  validate("createReservTicket"),
  reservationTicketController.createReservationTicket
);
reservationTicket.get(
  "/:id",
  validate("paramsId"),
  reservationTicketController.getReservationTicketById
);
reservationTicket.patch(
  "/:id",
  validate("updateReservTicket"),
  reservationTicketController.updateReservationTicket
);
reservationTicket.delete(
  "/:id",
  validate("paramsId"),
  reservationTicketController.deleteReservationTicket
);

module.exports = reservationTicket;
