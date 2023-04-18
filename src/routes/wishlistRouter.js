const wishlist = require("express").Router();
const wishlistController = require("../controller/wishlistController");
const validate = require("../middlewares/validator.middleware");

wishlist.get("/", wishlistController.getWishlist);

wishlist.post(
  "/",
  validate("createWhislist"),
  wishlistController.createWishlist
);

wishlist.get("/:id", validate("paramsId"), wishlistController.getWishlistById);

wishlist.patch(
  "/:id",
  validate("createWhislist"),
  wishlistController.updateWishlist
);

wishlist.delete(
  "/:id",
  validate("parmasId"),
  wishlistController.deleteWishlist
);

module.exports = wishlist;
