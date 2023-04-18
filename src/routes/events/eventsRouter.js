const eventRouter = require("express").Router();

const eventsController = require("../../controller/eventsController");
const uploadMiddleware = require("../../middlewares/upload.middlewares");
const validate = require("../../middlewares/validator.middleware");

eventRouter.get(
  "/",
  uploadMiddleware("picture"),
  validate("createEvent"),
  eventsController.getEvents
);
eventRouter.post("/", eventsController.createEvents);
eventRouter.get(
  "/:id",
  validate("updateEvent"),
  eventsController.getEventsById
);
eventRouter.patch(
  "/:id",
  uploadMiddleware("picture"),
  validate("createEvent"),
  eventsController.updateEvents
);
eventRouter.delete(
  "/:id",
  validate("updateEvent"),
  eventsController.deleteEvents
);

module.exports = eventRouter;
