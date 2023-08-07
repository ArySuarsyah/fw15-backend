const wishlist = require("express").Router();
const wishlistController = require("../controller/wishlistController");
const validate = require("../middlewares/validator.middleware");
// const authMiddleware = require("../middlewares/auth.middleware");

wishlist.get("/", wishlistController.getWishlist);

wishlist.get("/list", wishlistController.getWishlistByUserId);


wishlist.post(
  "/",
  wishlistController.createWishlist
);

wishlist.get("/:id", validate("paramsId"), wishlistController.getWishlistById);

wishlist.patch(
  "/:id",
  validate("updateWishlist"),
  wishlistController.updateWishlist
);

wishlist.delete(
  "/:id",
  validate("paramsId"),
  wishlistController.deleteWishlist
);

module.exports = wishlist;
