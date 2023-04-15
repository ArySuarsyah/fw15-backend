const partnersModel = require("../models/partnersModels");
const fileRemover = require("../helpers/fileRemover");
const errorHandler = require("../helpers/errorHandler");
const filterData = require("../helpers/filter.helper");

exports.getPartners = async (req, res) => {
  try {
    const filter = filterData(req.query);
    const data = await partnersModel.getPartners(filter);
    return res.status(200).json({
      success: false,
      message: "List all Events Categories",
      results: data,
    });
  } catch (err) {
    return errorHandler(err, res);
  }
};

exports.createPartners = async (req, res) => {
  try {
    const data = {
      ...req.body,
    };
    if (req.file) {
      data.picture = req.file.filename;
    }
    const event = await partnersModel.createPartners(data);
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

exports.getPartnersById = async (req, res) => {
  try {
    const data = await partnersModel.getPartnersById(req.params.id);
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

exports.updatePartners = async (req, res) => {
  try {
    const data = {
      ...req.body,
    };
    if (req.file) {
      data.picture = req.file.filename;
    }
    const eventData = await partnersModel.updatePartners(data, req.params.id);
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

exports.deletePartners = async (req, res) => {
  try {
    const data = await partnersModel.deletePartners(req.params.id);
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
