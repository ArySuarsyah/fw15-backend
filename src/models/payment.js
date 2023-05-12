// // const fileRemover = require("../helpers/fileRemover.helper")
// const historysModel = require("../models/reservation.model");
// const errorHandler = require("../helpers/errorHandler.helper");
// const db = require("../helpers/db.helper");

// exports.gethistory = async (request, res) => {
//   try {
//     const { id } = request.user;
//     const data = await historysModel.findAllhistory(id);
//     return res.json({
//       success: true,
//       message: "List of all History",
//       results: data,
//     });
//   } catch (err) {
//     if (err) return errorHandler(err, res);
//   }
// };
// exports.getDetailhistory = async (request, response) => {
//   try {
//     const { id } = request.user;
//     const data = await historysModel.findOnehistory(request.params.id, id);
//     return response.json({
//       success: true,
//       message: "List of all Detail History",
//       results: data,
//     });
//   } catch (err) {
//     if (err) return errorHandler(err, response);
//   }
// };



// const db = require("../helpers/db.helper");


// exports.payment = async (req, res) => {
//   const query = `
//   SELECT * FROM
//   `
// }