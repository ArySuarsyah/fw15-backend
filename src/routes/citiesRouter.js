const cities = require("express").Router();

const citiesController = require('../controller/citiesController');
const uploadMiddleware = require('../middlewares/upload.middlewares');
const validate = require('../middlewares/validator.middleware')

cities.get("/", citiesController.getCities);
cities.post(
  "/",
  uploadMiddleware("picture"),
  validate("nameFormat"),
  citiesController.createCities
);
cities.get("/:id", validate("paramsId"), citiesController.getCitiesById);
cities.patch("/:id", uploadMiddleware("picture"), validate("updateName"), citiesController.updateCities);
cities.delete("/:id", validate("paramsId"), citiesController.deleteCities);

module.exports = cities;
