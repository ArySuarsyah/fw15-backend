const categories = require("express").Router();
const categoriesController = require("../controller/categoriesController");
const uploadMiddleware = require("../middlewares/upload.middlewares");

categories.get("/", categoriesController.getCategories);

categories.post(
  "/",
  uploadMiddleware("picture"),
  categoriesController.createCategories
);

categories.get("/:id", categoriesController.getCategoriesById);

categories.patch(
  "/:id",
  uploadMiddleware("picture"),
  categoriesController.updateCategories
);

categories.delete("/:id", categoriesController.deleteCategories);

module.exports = categories;
