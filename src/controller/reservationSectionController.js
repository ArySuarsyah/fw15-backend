const reservationSectionModel = require("../models/reservationSectionModel");
const fileRemover = require("../helpers/fileRemover");
const errorHandler = require("../helpers/errorHandler");
const filterData = require("../helpers/filter.helper");

exports.getReservationSection = async (req, res) => {
  try {
    const filter = filterData(req.query);
    const data = await reservationSectionModel.getReservationSection(filter);
    return res.status(200).json({
      success: false,
      message: "List all Reservation",
      results: data,
    });
  } catch (err) {
    return errorHandler(err, res);
  }
};

exports.createReservationSection = async (req, res) => {
  try {
    const event = await reservationSectionModel.createReservationSection(req.body);
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

exports.getReservationSectionById = async (req, res) => {
  try {
    const data = await reservationSectionModel.getReservationSectionById(req.params.id);
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

exports.updateReservationSection = async (req, res) => {
  try {
    const data = {
      ...req.body,
    };
    const eventData = await reservationSectionModel.updateReservationSection(
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

exports.deleteReservationSection = async (req, res) => {
  try {
    const data = await reservationSectionModel.deleteReservationSection(req.params.id);
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
