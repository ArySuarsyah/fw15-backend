const eventCategoriesModel = require('../models/eventCategoriesModel')
const fileRemover = require("../helpers/fileRemover");
const errorHandler = require("../helpers/errorHandler");
const filterData = require("../helpers/filter.helper");

exports.getEventsCategories = async (req, res) => {
  try {
    const filter = filterData(req.query);
    const data = await eventCategoriesModel.getEventsCategories(filter);
    return res.status(200).json({
      success: false,
      message: "List all Events Categories",
      results: data,
    });
  } catch (err) {
    return errorHandler(err, res);
  }
};

exports.createEventsCategories = async (req, res) => {
  try {
    if (req.file) {
      req.body.picture = req.file.createEventfilename;
    }
    const event = await eventCategoriesModel.createEventsCategories(req.body);
    return res.json({
      success: true,
      message: `Create Events Categories ${event.id} successfully`,
      results: event,
    });
  } catch (err) {
    fileRemover(req.file);
    return errorHandler(err, res);
  }
};

exports.getEventsCategoriesById = async (req, res) => {
  try {
    const data = await eventCategoriesModel.getEventsCategoriesById(req.params.id);
    if (data) {
      return res.status(200).json({
        success: true,
        message: "Access success",
        data: data,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Event categories not found!",
      });
    }
  } catch (err) {
    return errorHandler(err, res);
  }
};

exports.updateEventsCategories = async (req, res) => {
  try {
    const data = {
      ...req.body,
    };
    const eventData = await eventCategoriesModel.updateEventsCategories(data, req.params.id);
    if (eventData) {
      return res.json({
        success: true,
        message: "Event updated!",
        results: eventData,
      });
    }
    return res.status(404).json({
      success: false,
      message: "Event not found!",
    });
  } catch (err) {
    fileRemover(req.file);
    return errorHandler(err, res);
  }
};

exports.deleteEventsCategories = async (req, res) => {
  try {
    const data = await eventCategoriesModel.deleteEventsCategories(req.params.id);
    if (data) {
      return res.json({
        success: true,
        message: "Events Categories deleted successfully",
        results: data,
      });
    }
    return res.status(404).json({
      success: false,
      message: "event not found!",
    });
  } catch (err) {
    return errorHandler(err, res);
  }
};
