const userModels = require("../models/users.model");
const errorHandler = require("../helpers/errorHandler");

exports.createUser = async (req, res) => {
  try {

  if (!req.body.email.length || !req.body.password.length) {
    console.log('ok');
    return res.status(400).json({
      success: false,
      message: "Please insert password or email",
    });
  } else {
    const data = await userModels.insert(req.body);
    return res.json({
      success: true,
      message: `Create user ${req.body.email} successfully`,
      results: data,
    });
  }
  } catch (err) {
    return errorHandler(err, res)
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    req.query.offset = parseInt(req.query.offset) || 1;
    req.query.limit = parseInt(req.query.limit) || 5;
    const filter = {
      limit: req.query.limit,
      offset: req.query.offset,
    };
    const data = await userModels.getUsers(filter);
    return res.json({
      success: true,
      message: "List of all users",
      results: data,
    });
  } catch (err) {
    if (err) return errorHandler(err, res);
  }
};

exports.getUserById = async (req, res) => {
  try {
    const data = await userModels.getUserById(req.params.id);
    console.log(data);
    if (data) {
      return res.status(200).json({
        success: true,
        message: "Access success",
        data: data,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }
  } catch (err) {
    return errorHandler(err, res);
  }
};

exports.updateUsers = async (req, res) => {
  try {
    const data = await userModels.update(req.body, req.params.id);
    if (data) {
      return res.json({
        success: true,
        message: "User updated!",
        results: data,
      });
    }
    return res.status(404).json({
      success: false,
      message: "User not found!",
    });
  } catch (err) {
    return errorHandler(err, res);
  }
};

exports.deleteUsers = async (req, res) => {
  try {
    const data = await userModels.deleteUsers(req.params.id);
    if (data) {
      return res.json({
        success: true,
        message: "Users deleted successfully",
        results: data,
      });
    }
    return res.status(404).json({
      success: false,
      message: "User not found!",
    });
  } catch (err) {
    return errorHandler(err, res);
  }
};
