const historyModel = require("../models/historyModels");
const errorHandler = require("../helpers/errorHandler");
const reservationsModel = require("../models/reservationsModel");
exports.getHistory = async (req, res) => {
  try {
    const { id } = req.user;

    if (!id) {
      throw Error("id_not_found");
    }

    const data = await historyModel.getHistoryById(id);

    if (!data) {
      throw Error("Nothing transaction!");
    }

    if (data.length <= 0) {
      throw Error("Nothing transaction!");
    }

    return res.json({
      success: true,
      message: "List all history",
      results: data,
    });
  } catch (err) {
    return errorHandler(err, res);
  }
};

exports.deleteHistory = async (req, res) => {
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
