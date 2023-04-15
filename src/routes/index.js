const authMiddleware = require("../middlewares/auth.middleware");

const router = require("express").Router();

router.use("/auth", require("./auth.router"));
router.use("/profile", require("./profileRouter"));
router.use("/events", require("./events/event.routes"));
router.use("/eventsCategories", require("./eventsCategoriesRouter"));
router.use("/cities", require("./citiesRouter"));
router.use("/partners", require("./partnersRouter"));



router.use("/admin", authMiddleware, require("./admin/admin.router"));

router.use("*", (req, res) => {
  return res.status(404).json({
    success: false,
    message: "Resource not found ",
  });
});

module.exports = router;
