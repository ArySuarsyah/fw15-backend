const categoriesModel = require('../models/categoriesModel')
const fileRemover = require("../helpers/fileRemover");
const errorHandler = require("../helpers/errorHandler");
const filterData = require("../helpers/filter.helper");

exports.getCategories = async (req, res) => {
  try {
    const filter = filterData(req.query);
    const data = await categoriesModel.getCategories(filter);
    return res.status(200).json({
      success: false,
      message: "List all Categories",
      results: data,
    });
  } catch (err) {
    return errorHandler(err, res);
  }
};

exports.createCategories = async (req, res) => {
  try {
    if (req.file) {
      req.body.picture = req.file.createEventfilename;
    }
    const event = await categoriesModel.createCategories(req.body);
    return res.json({
      success: true,
      message: `Create Categories ${event.id} successfully`,
      results: event,
    });
  } catch (err) {
    fileRemover(req.file);
    return errorHandler(err, res);
  }
};

exports.getCategoriesById = async (req, res) => {
  try {
    const data = await categoriesModel.getCategoriesById(req.params.id);
    if (data) {
      return res.status(200).json({
        success: true,
        message: "Access success",
        data: data,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Categories not found!",
      });
    }
  } catch (err) {
    return errorHandler(err, res);
  }
};

exports.updateCategories = async (req, res) => {
  try {
    const data = {
      ...req.body,
    };
    const eventData = await categoriesModel.updateCategories(
      data,
      req.params.id
    );
    if (eventData) {
      return res.json({
        success: true,
        message: "Categories updated!",
        results: eventData,
      });
    }
    return res.status(404).json({
      success: false,
      message: "Categories not found!",
    });
  } catch (err) {
    fileRemover(req.file);
    return errorHandler(err, res);
  }
};

exports.deleteCategories = async (req, res) => {
  try {
    const data = await categoriesModel.deleteCategories(req.params.id);
    if (data) {
      return res.json({
        success: true,
        message: "Categories deleted successfully",
        results: data,
      });
    }
    return res.status(404).json({
      success: false,
      message: "Categories not found!",
    });
  } catch (err) {
    return errorHandler(err, res);
  }
};
