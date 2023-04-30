const authMiddleware = require("../middlewares/auth.middleware");

const router = require("express").Router();

router.use("/auth", require("./auth.router"));
router.use("/profile", require("./admin/profileRouter"));
router.use("/events", require("./events/event.routes"));
router.use("/eventsCategories", require("./eventsCategoriesRouter"));
router.use("/cities", require("./citiesRouter"));
router.use("/partners", require("./partnersRouter"));
router.use("/payment", require("./paymentMethodRouter"));
router.use("/reservation", require("./reservationsRouter"));
router.use("/reservationSection", require("./reservationSectionRouter"));
router.use("/reservationStatus", require("./reservationStatusRouter"));
router.use("/reservationTicket", require("./reservationTicketRouter"));
router.use("/wishlist", require("./wishlistRouter"));
router.use("/categories", require("./categoriesRouter"));
router.use("/updateProfile", require("./profile.router"));





router.use("/admin", authMiddleware, require("./admin/admin.router"));

router.use("*", (req, res) => {
  return res.status(404).json({
    success: false,
    message: "Resource not found ",
  });
});

module.exports = router;
