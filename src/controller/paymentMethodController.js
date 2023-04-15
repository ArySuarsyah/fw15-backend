const paymentMethodModel = require('../models/paymentMethodModel')
const fileRemover = require("../helpers/fileRemover");
const errorHandler = require("../helpers/errorHandler");
const filterData = require("../helpers/filter.helper");

exports.getPaymentMethod = async (req, res) => {
  try {
    const filter = filterData(req.query);
    const data = await paymentMethodModel.getPaymentMethod(filter);
    return res.status(200).json({
      success: false,
      message: "List all Payment Method",
      results: data,
    });
  } catch (err) {
    return errorHandler(err, res);
  }
};

exports.createPaymentMethod = async (req, res) => {
  try {
    if (req.file) {
      req.body.picture = req.file.createEventfilename;
    }
    const event = await paymentMethodModel.createPaymentMethod(req.body);
    return res.json({
      success: true,
      message: `Create Payment Method ${event.id} successfully`,
      results: event,
    });
  } catch (err) {
    fileRemover(req.file);
    return errorHandler(err, res);
  }
};

exports.getPaymentMethodById = async (req, res) => {
  try {
    const data = await paymentMethodModel.getPaymentMethodById(req.params.id);
    if (data) {
      return res.status(200).json({
        success: true,
        message: "Access success",
        data: data,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Payment Method not found!",
      });
    }
  } catch (err) {
    return errorHandler(err, res);
  }
};

exports.updatePaymentMethod = async (req, res) => {
  try {
    const data = {
      ...req.body,
    };
    const eventData = await paymentMethodModel.updatePaymentMethod(data, req.params.id);
    if (eventData) {
      return res.json({
        success: true,
        message: "Payment Method updated!",
        results: eventData,
      });
    }
    return res.status(404).json({
      success: false,
      message: "Payment Method not found!",
    });
  } catch (err) {
    fileRemover(req.file);
    return errorHandler(err, res);
  }
};

exports.deletePaymentMethod = async (req, res) => {
  try {
    const data = await paymentMethodModel.deletePaymentMethod(req.params.id);
    if (data) {
      return res.json({
        success: true,
        message: "Payment Method deleted successfully",
        results: data,
      });
    }
    return res.status(404).json({
      success: false,
      message: "Payment Method not found!",
    });
  } catch (err) {
    return errorHandler(err, res);
  }
};
