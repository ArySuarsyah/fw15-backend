const citiesModel = require("../models/citiesModel");
const fileRemover = require("../helpers/fileRemover");
const errorHandler = require("../helpers/errorHandler");
const filterData = require("../helpers/filter.helper");

exports.getCities = async (req, res) => {
  try {
    const filter = filterData(req.query);
    const data = await citiesModel.getCities(filter);
    return res.status(200).json({
      success: false,
      message: "List all Cities",
      results: data,
    });
  } catch (err) {
    return errorHandler(err, res);
  }
};

exports.createCities = async (req, res) => {
  try {
    if (req.file) {
      req.body.picture = req.file.filename;
    }
    const event = await citiesModel.createCities(req.body);
    return res.json({
      success: true,
      message: `Create Cities ${event.id} successfully`,
      results: event,
    });
  } catch (err) {
    fileRemover(req.file);
    return errorHandler(err, res);
  }
};

exports.getCitiesById = async (req, res) => {
  try {
    const data = await citiesModel.getCitiesById(req.params.id);
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

exports.updateCities = async (req, res) => {
  try {
    const data = {
      ...req.body,
    };
    if (req.file) {
      data.picture = req.file.filename;
    }
    const eventData = await citiesModel.updateCities(data, req.params.id);
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

exports.deleteCities = async (req, res) => {
  try {
    const data = await citiesModel.deleteCities(req.params.id);
    if (data) {
      return res.json({
        success: true,
        message: "Cities deleted successfully",
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
