const eventsCategoriesRouter = require("express").Router();

const eventsCategories = require("../controller/eventsCategiresController");

eventsCategoriesRouter.get("/", eventsCategories.getEventsCategories);
eventsCategoriesRouter.post("/", eventsCategories.createEventsCategories);
eventsCategoriesRouter.get("/:id", eventsCategories.getEventsCategoriesById);
eventsCategoriesRouter.patch("/:id", eventsCategories.updateEventsCategories);
eventsCategoriesRouter.delete("/:id", eventsCategories.deleteEventsCategories);

module.exports = eventsCategoriesRouter;
