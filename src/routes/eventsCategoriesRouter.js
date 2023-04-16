const eventsCategoriesRouter = require("express").Router();

const eventsCategories = require("../controller/eventsCategiresController");
const validate = require("../middlewares/validator.middleware");

eventsCategoriesRouter.get("/", eventsCategories.getEventsCategories);
eventsCategoriesRouter.post(
  "/",
  validate("createEventCat"),
  eventsCategories.createEventsCategories
);
eventsCategoriesRouter.get("/:id", validate("paramsId"), eventsCategories.getEventsCategoriesById);
eventsCategoriesRouter.patch(
  "/:id",
  validate("updateEventCat"),
  eventsCategories.updateEventsCategories
);
eventsCategoriesRouter.delete(
  "/:id",
  validate("deleteEventCat"),
  eventsCategories.deleteEventsCategories
);

module.exports = eventsCategoriesRouter;
