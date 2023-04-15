const wishlistModel = require('../models/wishlistModel')
const fileRemover = require("../helpers/fileRemover");
const errorHandler = require("../helpers/errorHandler");
const filterData = require("../helpers/filter.helper");

exports.getWishlist = async (req, res) => {
  try {
    const filter = filterData(req.query);
    const data = await wishlistModel.getWishlist(filter);
    return res.status(200).json({
      success: false,
      message: "List all Wishlist",
      results: data,
    });
  } catch (err) {
    return errorHandler(err, res);
  }
};

exports.createWishlist = async (req, res) => {
  try {
    if (req.file) {
      req.body.picture = req.file.createEventfilename;
    }
    const event = await wishlistModel.createWishlist(req.body);
    return res.json({
      success: true,
      message: `Create Wishlist ${event.id} successfully`,
      results: event,
    });
  } catch (err) {
    fileRemover(req.file);
    return errorHandler(err, res);
  }
};

exports.getWishlistById = async (req, res) => {
  try {
    const data = await wishlistModel.getWishlistById(req.params.id);
    if (data) {
      return res.status(200).json({
        success: true,
        message: "Access success",
        data: data,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Wishlist not found!",
      });
    }
  } catch (err) {
    return errorHandler(err, res);
  }
};

exports.updateWishlist = async (req, res) => {
  try {
    const data = {
      ...req.body,
    };
    const eventData = await wishlistModel.updateWishlist(
      data,
      req.params.id
    );
    if (eventData) {
      return res.json({
        success: true,
        message: "Wishlist updated!",
        results: eventData,
      });
    }
    return res.status(404).json({
      success: false,
      message: "Wishlist not found!",
    });
  } catch (err) {
    fileRemover(req.file);
    return errorHandler(err, res);
  }
};

exports.deleteWishlist = async (req, res) => {
  try {
    const data = await wishlistModel.deleteWishlist(req.params.id);
    if (data) {
      return res.json({
        success: true,
        message: "Wishlist deleted successfully",
        results: data,
      });
    }
    return res.status(404).json({
      success: false,
      message: "Wishlist not found!",
    });
  } catch (err) {
    return errorHandler(err, res);
  }
};
