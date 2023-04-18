const categories = require("express").Router();
const categoriesController = require("../controller/categoriesController");
const validate = require("../middlewares/validator.middleware");

categories.get("/", categoriesController.getCategories);

categories.post(
  "/",
  validate("nameFormat"),
  categoriesController.createCategories
);

categories.get(
  "/:id",
  validate("paramsId"),
  categoriesController.getCategoriesById
);

categories.patch(
  "/:id",
  validate("nameFormat"),
  categoriesController.updateCategories
);

categories.delete(
  "/:id",
  validate("paramsId"),
  categoriesController.deleteCategories
);

module.exports = categories;
