const eventModel = require("../models/eventsModel");
const fileRemover = require("../helpers/fileRemover");
const errorHandler = require("../helpers/errorHandler");
const filterData = require("../helpers/filter.helper");

exports.getEvents = async (req, res) => {
  try {
    const filter = filterData(req.query);
    const data = await eventModel.getEvents(filter);
    console.log(data);
    return res.status(200).json({
      success: false,
      message: "List all Events",
      results: data,
    });
  } catch (err) {
    return errorHandler(err, res);
  }
};

exports.createEvents = async (req, res) => {
  try {
    if (req.file) {
      req.body.picture = req.file.createEventfilename;
    }
    const event = await eventModel.createEvents(req.body);
    return res.json({
      success: true,
      message: `Create Events ${req.body.title} successfully`,
      results: event,
    });
  } catch (err) {
    fileRemover(req.file);
    return errorHandler(err, res);
  }
};

exports.getEventsById = async (req, res) => {
  try {
    const data = await eventModel.getEventsById(req.params.id);
    if (data) {
      return res.status(200).json({
        success: true,
        message: "Access success",
        data: data,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "event not found!",
      });
    }
  } catch (err) {
    return errorHandler(err, res);
  }
};

exports.updateEvents = async (req, res) => {
  try {
    const data = {
      ...req.body,
    };
    const eventData = await eventModel.updateEvents(data, req.params.id);
    if (eventData) {
      return res.json({
        success: true,
        message: "event updated!",
        results: eventData,
      });
    }
    return res.status(404).json({
      success: false,
      message: "event not found!",
    });
  } catch (err) {
    fileRemover(req.file);
    return errorHandler(err, res);
  }
};

exports.deleteEvents = async (req, res) => {
  try {
    const data = await eventModel.deleteEvents(req.params.id);
    if (data) {
      return res.json({
        success: true,
        message: "events deleted successfully",
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
