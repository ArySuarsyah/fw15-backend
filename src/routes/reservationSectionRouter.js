const reservationSection = require("express").Router();
const reservationController = require("../controller/reservationSectionController");
const uploadMiddleware = require("../middlewares/upload.middlewares");

reservationSection.get("/", reservationController.getReservationSection);
reservationSection.post(
  "/",
  uploadMiddleware("picture"),
  reservationController.createReservationSection
);
reservationSection.get("/:id", reservationController.getReservationSectionById);
reservationSection.patch(
  "/:id",
  uploadMiddleware("picture"),
  reservationController.updateReservationSection
);
reservationSection.delete(
  "/:id",
  reservationController.deleteReservationSection
);

module.exports = reservationSection;
