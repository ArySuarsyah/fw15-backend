const eventRouter = require("express").Router();

const eventsController = require("../controller/events.controller");

eventRouter.get("/", eventsController.getEvents);
eventRouter.post("/", eventsController.createEvents);
eventRouter.get("/:id", eventsController.getEventsById);
eventRouter.patch(
  "/:id",
  eventsController.updateEvents
);
eventRouter.delete("/:id", eventsController.deleteEvents);

module.exports = eventRouter;
