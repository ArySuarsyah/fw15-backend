const paymentModel = require("../models/payment.model");
const reservationModel = require("../models/reservation.model");
const errorHandler = require("../helpers/errorHandler.helper");

exports.createPayment = async (request, res) => {
  try {
    const { id } = request.user;
    if (!id) {
      throw Error("id_not_found");
    }
    const reservationStatus = 2;
    const data = {
      ...request.body,
      statusId: reservationStatus,
    };
    const reservations = await reservationModel.findOne(data.reservationId);
    // return console.log(reservations)
    if (!reservations) {
      throw Error("reservations_not_found!");
    }
    const payment = await paymentModel.findOne(data.paymentMethodId);
    if (!payment) {
      throw Error("paymnentid_not_found");
    }
    const updatePayment = await reservationModel.update(
      data.reservationId,
      data
    );
    return res.json({
      success: true,
      message: "Create Payment successfully",
      results: updatePayment,
    });
  } catch (err) {
    return errorHandler(err, res);
  }
};
