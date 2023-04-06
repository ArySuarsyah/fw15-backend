// const fs = require('fs')
const userModels = require("../models/users.model");
const errorHandler = require("../helpers/error.handler");

exports.createUser = async (req, res) => {
  try {
    const data = await userModels.insert(req.body);
    return res.json({
      success: true,
      message: `Create user ${req.body.email}`,
      results: data,
    });
  } catch (err) {
    if (err) return errorHandler(err, res);
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
    if (err) return errorHandler;
  }
};

exports.getUserById = async (req, res) => {
  try {
    const data = await userModels.getUserById(req.params);
    return res.status(200).json({
      success: true,
      message: "Access success",
      data: data,
    });
  } catch (err) {
    if (err) return errorHandler(err, res);
  }
};

exports.updateUsers = async (req, res) => {
  try {
    const data = await userModels.updateUsers(req.params);
    return res.json({
      success: true,
      message: "User updated!",
      data: data,
    });
  } catch (err) {
    if (err) return errorHandler(err, res);
  }
};

exports.deleteUsers = async (req, res) => {
  try {
    const data = await userModels.deleteUsers(req.params.id);
    return res.json({
      success: true,
      message: "Users deleted successfully",
      results: data,
    });
  } catch (err) {
    if (err) return errorHandler(err, res);
  }
};
