const reservationsModel = require("../models/reservationsModel");
// const fileRemover = require("../helpers/fileRemover");
const errorHandler = require("../helpers/errorHandler");
// const filterData = require("../helpers/filter.helper");



exports.getPayment = async (req, res) => {
  try {

  // const { id } = req.user
  //   if (!id) {
  //     throw Error("id_not_found");
  //   }

  const filter = {
    limit: parseInt(req.query.limit) || 5,
    page: (parseInt(req.query.page) - 0) * req.query.limit || 0,
    searchByPaymentMethod: req.query.searchByPaymentMethod || '',
    // searchByCategory: req.query.searchByCategory || "",
    // searchByLocation: req.query.searchByLocation || "",
    // sort: req.query.sort || "id",
    // sortBy: req.query.sortBy || "ASC",
  };

  const data = await reservationsModel.findById(filter)
  if (!data) {
    throw Error("Couldn't find reservation")
  }

  // if (data.length <= 0) {
  //   throw Error("reservation not found!")
  // }

    return res.json({
      success: true,
      message: "List all reservation",
      results: data,
    });
  } catch (err) {
    return errorHandler(err, res);
  }
}