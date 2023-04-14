const authMiddleware = require("../middlewares/auth.middleware");

const router = require("express").Router();


router.use("/auth", require("./auth.router"));
router.use("/profile", require("./profileRouter"));
router.use("/events", require("./eventsRouter"));
router.use("/admin", authMiddleware, require("./admin/admin.router"));


router.use("*", (request, response) => {
  return response.status(404).json({
    success: false,
    message: "Resource not found ",
  });
});

module.exports = router;
