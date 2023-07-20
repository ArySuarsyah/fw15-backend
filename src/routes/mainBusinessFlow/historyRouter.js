const historyRouter = require("express").Router();

const historyController = require("../../controller/historyController");
// const uploadMiddleware = require("../../middlewares/upload.middlewares");
// const validate = require("../../middlewares/validator.middleware");

historyRouter.get("/", historyController.getHistory);
historyRouter.delete("/:id", historyController.deleteHistory);



module.exports = historyRouter;
