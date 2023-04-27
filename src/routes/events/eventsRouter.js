const eventRouter = require("express").Router();

const eventsController = require("../../controller/eventsController");
const uploadMiddleware = require("../../middlewares/upload.middlewares");
const validate = require("../../middlewares/validator.middleware");

eventRouter.get("/", eventsController.getEvents);
eventRouter.post(
  "/",
  uploadMiddleware("picture"),
  validate("createEvent"),
  eventsController.createEvents
);
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
