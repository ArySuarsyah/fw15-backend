const reservationsModel = require("../models/reservationsModel");
// const fileRemover = require("../helpers/fileRemover");
const errorHandler = require("../helpers/errorHandler");
// const filterData = require("../helpers/filter.helper");
// const reservationsStatusModel = require("../models/reservationStatusModel");
const reservationSectionModel = require("../models/reservationSectionModel");
const reservationTicketModel = require("../models/reservationTicketModel");

exports.getPayment = async (req, res) => {
  try {
    // const { id } = req.user
    //   if (!id) {
    //     throw Error("id_not_found");
    //   }

    const filter = {
      limit: parseInt(req.query.limit) || 5,
      page: (parseInt(req.query.page) - 0) * req.query.limit || 0,
      searchByPaymentMethod: req.query.searchByPaymentMethod || "",
    };

    const data = await reservationsModel.findByName(filter);
    if (!data) {
      throw Error("Couldn't find reservation");
    }

    if (data.length <= 0) {
      throw Error("reservation not found!");
    }

    return res.json({
      success: true,
      message: "List all reservation",
      results: data,
    });
  } catch (err) {
    return errorHandler(err, res);
  }
};

exports.createPayment = async (req, res) => {
  try {
    const { id } = req.user;
    if (!id) {
      throw Error("id_not_found");
    }
    const reservData = {
      ...req.body,
    };

    const data = await reservationsModel.create(reservData);

    const reservation = await reservationsModel.findById(data.id);

    return res.json({
      success: true,
      message: "Create Payment successfully",
      results: reservation,
    });
  } catch (err) {
    return errorHandler(err, res);
  }
};

// Payment alternative

exports.createAlternative = async (req, res) => {
  try {
    const { name, price, quantity } = req.body;
    //  const { id } = req.user;
    //  if (!id) {
    //    throw Error("id_not_found");
    //  }
    const reservData = {
      ...req.body,
    };

    const sectionData = {
      name,
      price,
      quantity,
    };

    const section = await reservationSectionModel.createReservationSection(
      sectionData
    );

    // const reservationStatus =
    //   await reservationsStatusModel.createReservationStatus(reservStatusData);

    const data = await reservationsModel.create(reservData);

    const { id: reservationId } = data;
    const { id: sectionId } = section;

    const ticketData = {
      reservationId,
      sectionId,
    };

    await reservationTicketModel.createReservationTicket(ticketData);

    const reservation = await reservationsModel.findByOne(data.id);

    return res.json({
      success: true,
      message: "Create Payment successfully",
      results: reservation,
    });
  } catch (err) {
    return errorHandler(err, res);
  }
};
