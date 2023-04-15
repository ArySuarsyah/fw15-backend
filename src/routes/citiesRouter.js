const cities = require("express").Router();

const citiesController = require('../controller/citiesController')

cities.get("/", citiesController.getCities);
cities.post("/", citiesController.createCities);
cities.get("/:id", citiesController.getCitiesById);
cities.patch("/:id", citiesController.updateCities);
cities.delete("/:id", citiesController.deleteCities);

module.exports = cities;
