const reservationSection = require("express").Router();
const reservationController = require("../controller/reservationSectionController");
const validate = require("../middlewares/validator.middleware");

reservationSection.get("/", reservationController.getReservationSection);
reservationSection.post(
  "/",
  validate("createReservSection"),
  reservationController.createReservationSection
);
reservationSection.get(
  "/:id",
  validate("paramsId"),
  reservationController.getReservationSectionById
);
reservationSection.patch(
  "/:id",
  validate("updateReservSection"),
  reservationController.updateReservationSection
);
reservationSection.delete(
  "/:id",
  validate("paramsId"),
  reservationController.deleteReservationSection
);

module.exports = reservationSection;
