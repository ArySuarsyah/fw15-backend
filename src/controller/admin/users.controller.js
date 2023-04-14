const userModels = require("../../models/users.model");
const errorHandler = require("../../helpers/errorHandler");
const argon = require("argon2");
const fileRemover = require("../../helpers/fileRemover");

exports.createUser = async (req, res) => {
  try {
    if (!req.body.email.length || !req.body.password.length) {
      throw Error("Empty_Feild");
    } else if (!req.body.email.includes("@") || !req.body.email.includes(".")) {
      throw Error("Wrong_email");
    } else {
      const hash = await argon.hash(req.body.password);
      const data = {
        ...req.body,
        password: hash,
      };
      if (req.file) {
        data.picture = req.file.filename;
      }
      const user = await userModels.insert(data);
      return res.json({
        success: true,
        message: `Create user ${req.body.email} successfully`,
        results: user,
      });
    }
  } catch (err) {
    fileRemover(req.file)
    return errorHandler(err, res);
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    req.query.offset = parseInt(req.query.offset) || 1;
    req.query.limit = parseInt(req.query.limit) || 5;
    req.query.search = req.query.search || "";

    const filter = {
      limit: req.query.limit,
      offset: (req.query.offset - 1) * req.query.limit,
      search: req.query.search,
      sort: req.query.sort || "id",
      sortBy: req.query.sortBy || "ASC",
    };

    const data = await userModels.getUsers(filter);
    return res.status(200).json({
      success: true,
      message: "List of all users",
      results: data,
    });
  } catch (err) {
    return errorHandler(err, res);
  }
};

exports.getUserById = async (req, res) => {
  try {
    const data = await userModels.getUserById(req.params.id);
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
      const hash = await argon.hash(req.body.password);
      const data = {
        ...req.body,
        password: hash,
      };
    const userData = await userModels.update(data, req.params.id);
    if (userData) {
      return res.json({
        success: true,
        message: "User updated!",
        results: userData,
      });
    }
    return res.status(404).json({
      success: false,
      message: "User not found!",
    });
  } catch (err) {
    fileRemover(req.file)
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
