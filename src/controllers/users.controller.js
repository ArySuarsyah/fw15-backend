
const userModels = require("../models/users.model");
const errorHandler = require("../helpers/error.handler");

exports.createUser = async (req, res) => {
  if (!req.body.password.lenght || !req.body.email.lenght) {
    return res.status(400).json({
      success: false,
      message: "Please insert password or email",
    });
  } else {
    const data = await userModels.insert(req.body);
    return res.json({
      success: true,
      message: `Create user ${req.body.email}`,
      results: data,
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const data = await userModels.getUsers();
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
};

exports.updateUsers = async (req, res) => {
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
};

exports.deleteUsers = async (req, res) => {
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
};
