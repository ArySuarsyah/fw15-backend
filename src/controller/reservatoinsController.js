const reservationsModel = require("../models/reservationsModel")
const fileRemover = require("../helpers/fileRemover");
const errorHandler = require("../helpers/errorHandler");
const filterData = require("../helpers/filter.helper");

exports.getReservations = async (req, res) => {
  try {
    const filter = filterData(req.query);
    const data = await reservationsModel.getReservations(filter);
    return res.status(200).json({
      success: false,
      message: "List all Reservation",
      results: data,
    });
  } catch (err) {
    return errorHandler(err, res);
  }
};

exports.createReservations = async (req, res) => {
  try {
    if (req.file) {
      req.body.picture = req.file.createEventfilename;
    }
    const event = await reservationsModel.createReservations(req.body);
    return res.json({
      success: true,
      message: `Create Reservation ${event.id} successfully`,
      results: event,
    });
  } catch (err) {
    fileRemover(req.file);
    return errorHandler(err, res);
  }
};

exports.getReservationById = async (req, res) => {
  try {
    const data = await reservationsModel.getReservationsById(req.params.id);
    if (data) {
      return res.status(200).json({
        success: true,
        message: "Access success",
        data: data,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Reservation not found!",
      });
    }
  } catch (err) {
    return errorHandler(err, res);
  }
};

exports.updateReservations = async (req, res) => {
  try {
    const data = {
      ...req.body,
    };
    const eventData = await reservationsModel.updateReservations(
      data,
      req.params.id
    );
    if (eventData) {
      return res.json({
        success: true,
        message: "Reservation updated!",
        results: eventData,
      });
    }
    return res.status(404).json({
      success: false,
      message: "Reservation not found!",
    });
  } catch (err) {
    fileRemover(req.file);
    return errorHandler(err, res);
  }
};

exports.deleteReservations = async (req, res) => {
  try {
    const data = await reservationsModel.deleteReservations(req.params.id);
    if (data) {
      return res.json({
        success: true,
        message: "Reservation deleted successfully",
        results: data,
      });
    }
    return res.status(404).json({
      success: false,
      message: "Reservation not found!",
    });
  } catch (err) {
    return errorHandler(err, res);
  }
};
