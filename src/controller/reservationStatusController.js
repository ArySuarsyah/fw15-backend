const reservationStatusModel = require("../models/reservationStatusModel");
const fileRemover = require("../helpers/fileRemover");
const errorHandler = require("../helpers/errorHandler");
const filterData = require("../helpers/filter.helper");

exports.getReservationStatus = async (req, res) => {
  try {
    const filter = filterData(req.query);
    const data = await reservationStatusModel.getReservationStatus(filter);
    return res.status(200).json({
      success: false,
      message: "List all Reservation Status",
      results: data,
    });
  } catch (err) {
    return errorHandler(err, res);
  }
};

exports.createReservationStatus = async (req, res) => {
  try {
    if (req.file) {
      req.body.picture = req.file.createEventfilename;
    }
    const event = await reservationStatusModel.createReservationStatus(req.body);
    return res.json({
      success: true,
      message: `Create Reservation Status ${event.id} successfully`,
      results: event,
    });
  } catch (err) {
    fileRemover(req.file);
    return errorHandler(err, res);
  }
};

exports.getReservationStatusById = async (req, res) => {
  try {
    const data = await reservationStatusModel.getReservationStatusById(req.params.id);
    if (data) {
      return res.status(200).json({
        success: true,
        message: "Access success",
        data: data,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Reservation Status not found!",
      });
    }
  } catch (err) {
    return errorHandler(err, res);
  }
};

exports.updateReservationStatus = async (req, res) => {
  try {
    const data = {
      ...req.body,
    };
    const eventData = await reservationStatusModel.updateReservationStatus(
      data,
      req.params.id
    );
    if (eventData) {
      return res.json({
        success: true,
        message: "Reservation Status updated!",
        results: eventData,
      });
    }
    return res.status(404).json({
      success: false,
      message: "Reservation Status not found!",
    });
  } catch (err) {
    fileRemover(req.file);
    return errorHandler(err, res);
  }
};

exports.deleteReservationStatus = async (req, res) => {
  try {
    const data = await reservationStatusModel.deleteReservationStatus(req.params.id);
    if (data) {
      return res.json({
        success: true,
        message: "Reservation Status deleted successfully",
        results: data,
      });
    }
    return res.status(404).json({
      success: false,
      message: "Reservation Status not found!",
    });
  } catch (err) {
    return errorHandler(err, res);
  }
};
