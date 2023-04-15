const reservationTicketModel = require("../models/reservationTicketModel");
const fileRemover = require("../helpers/fileRemover");
const errorHandler = require("../helpers/errorHandler");
const filterData = require("../helpers/filter.helper");

exports.getReservationTicket = async (req, res) => {
  try {
    const filter = filterData(req.query);
    const data = await reservationTicketModel.getReservationTicket(filter);
    return res.status(200).json({
      success: false,
      message: "List all Reservation Status",
      results: data,
    });
  } catch (err) {
    return errorHandler(err, res);
  }
};

exports.createReservationTicket = async (req, res) => {
  try {
    if (req.file) {
      req.body.picture = req.file.createEventfilename;
    }
    const event = await reservationTicketModel.createReservationTicket(
      req.body
    );
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

exports.getReservationTicketById = async (req, res) => {
  try {
    const data = await reservationTicketModel.getReservationTicketById(
      req.params.id
    );
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

exports.updateReservationTicket = async (req, res) => {
  try {
    const data = {
      ...req.body,
    };
    const eventData = await reservationTicketModel.updateReservationTicket(
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

exports.deleteReservationTicket = async (req, res) => {
  try {
    const data = await reservationTicketModel.deleteReservationTicket(
      req.params.id
    );
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
