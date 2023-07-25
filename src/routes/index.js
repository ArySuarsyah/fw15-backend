const authMiddleware = require("../middlewares/auth.middleware");

const router = require("express").Router();

router.use("/auth", require("./auth.router"));
router.use("/profile", authMiddleware, require("./profile.router"));
router.use("/event", require("./events/eventsRouter"));
router.use("/eventsCategories", require("./eventsCategoriesRouter"));
router.use("/cities", require("./citiesRouter"));
router.use("/partners", require("./partnersRouter"));
router.use("/paymentMethod", require("./paymentMethodRouter"));
router.use("/reservation", require("./reservationsRouter"));
router.use("/reservationSection", require("./reservationSectionRouter"));
router.use("/reservationStatus", require("./reservationStatusRouter"));
router.use("/reservationTicket", require("./reservationTicketRouter"));
router.use("/wishlist", authMiddleware, require("./wishlistRouter"));
router.use("/categories", require("./categoriesRouter"));
router.use("/admin", authMiddleware, require("./admin/admin.router"));
router.use("/device-token", authMiddleware, require("./deviceTokenRouter"));

// Main Business Flow

router.use("/events", require("./mainBusinessFlow/eventRouter"));
router.use(
  "/payment",
  authMiddleware,
  require("./mainBusinessFlow/paymentRouter")
);
router.use(
  "/history",
  authMiddleware,
  require("./mainBusinessFlow/historyRouter")
);

router.use("*", (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Backend Running",
    });
  } catch (error) {
    return error.message;
  }
});

module.exports = router;
