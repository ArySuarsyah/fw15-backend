const wishlist = require("express").Router();
const wishlistController = require("../controller/wishlistController");
const validate = require("../middlewares/validator.middleware");

wishlist.get("/", wishlistController.getWishlist);

wishlist.post(
  "/",
  validate("creatWishlist"),
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
