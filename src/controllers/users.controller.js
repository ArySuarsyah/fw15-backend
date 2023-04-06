// const fs = require('fs')
const userModels = require("../models/users.model");
const errorHandler = require("../helpers/error.handler");

exports.createUser = (req, res) => {
  userModels.register(req.body, (err, data) => {
    if (err) {
      return errorHandler(err, res);
    } else {
      return res.json({
        success: true,
        message: "Register user successfully",
        results: data.rows[0],
      });
    }
  });
};

exports.getAllUsers = (req, res) => {
  userModels.getUsers((err, data) => {
    if (err) {
      return errorHandler(err, res);
    } else {
      return res.json({
        success: true,
        message: "List of all users",
        results: data.rows,
      });
    }
  });
};

exports.getUserById = (request, response) => {
  userModels.getUserById(request.params, (err, data) => {
    if (err) {
      return response.status(500).json({
        success: false,
        message: "Access failed",
      });
    } else {
      return response.status(200).json({
        success: true,
        message: "Access success",
        data: data.rows[0],
      });
    }
  });
};

exports.updateUsers = (req, res) => {
  userModels.updateUsers(req, (err, data) => {
    console.log(data);
    if (err) {
      return errorHandler(err, res);
    } else {
      return res.status(200).json({
        success: true,
        message: "user created successfully",
        result: data.rows[0],
      });
    }
  });
};

exports.deleteUser = (req, res) => {
  return res.json({
    success: true,
    message: `Delete user ${req.params.id} successfully`,
  });
};
