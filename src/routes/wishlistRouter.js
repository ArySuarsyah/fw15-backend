const wishlist = require("express").Router();
const wishlistController = require("../controller/wishlistController");
const uploadMiddleware = require("../middlewares/upload.middlewares");

wishlist.get("/", wishlistController.getWishlist);

wishlist.post(
  "/",
  uploadMiddleware("picture"),
  wishlistController.createWishlist
);

wishlist.get("/:id", wishlistController.getWishlistById);

wishlist.patch(
  "/:id",
  uploadMiddleware("picture"),
  wishlistController.updateWishlist
);

wishlist.delete("/:id", wishlistController.deleteWishlist);

module.exports = wishlist;
