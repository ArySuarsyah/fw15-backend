const event = require("express").Router();

event.use("/event", require("./eventsRouter"));
event.use("/categories", require("../eventsCategoriesRouter"));

module.exports = event;
