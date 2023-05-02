/* eslint-disable no-undef */
const jwt = require("jsonwebtoken");
// const resetPasswordModels = require("../models/resetPassword.model");
const errorHandler = require("../../helpers/errorHandler");
const argon = require("argon2");
const { SECRET_KEY } = process.env;
const { getUserByEmail, insert, update } = require("../../models/users.model");
const profileModel = require("../../models/profileModel");
const forgotRequestModel = require("../../models/forgotRequestModel");
const crypto = require("crypto");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);

    const verify = await argon.verify(user.password, password);
    if (!verify) {
      throw Error("wrong_credentials");
    }
    const token = jwt.sign({ id: user.id }, SECRET_KEY);

    return res.json({
      success: true,
      message: "Login Success!",
      results: { token },
    });
  } catch (err) {
    return errorHandler(err, res);
  }
};

exports.register = async (req, res) => {
  try {
    const { fullName, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      throw Error("Password unmatch");
    }
    const hash = await argon.hash(password);
    const data = {
      ...req.body,
      password: hash,
    };

    const user = await insert(data);
    const profileData = {
      fullName,
      userId: user.id,
    };

console.log(profileData);
    await profileModel.createProfile(profileData);
    const token = jwt.sign({ id: user.id }, SECRET_KEY);

    return res.json({
      success: true,
      message: "Register Success!",
      results: { token },
    });
  } catch (err) {
    return errorHandler(err, res);
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await getUserByEmail(email);

    if (!user) {
      throw Error("user not found!");
    }
    let randomCode = crypto.randomInt(100000, 999999);

    const data = {
      email: user.email,
      code: randomCode,
    };
    const forgot = await forgotRequestModel.insert(data);

    if (!forgot) {
      throw Error("Forgot_Failed");
    }

    res.status(200).json({
      success: true,
      message: "Request success",
    });

  } catch (err) {
    return errorHandler(err, res);
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { code, email, password } = req.body;
    const find = await forgotRequestModel.getRequestByEmailAndCode(code, email);


    if (!find) {
      throw Error("no_forgot_request");
    }

    const userSelected = await getUserByEmail(email);
    const data = {
      password: await argon.hash(password),
    };

    const user = await update(data, userSelected.id);

    await forgotRequestModel.delete(find.id);
    if (!user) {
      throw Error("no_forgot_request");
    }
    return res.json({
      success: true,
      message: "Reset password success",
    });
  } catch (err) {
    return errorHandler(err, res);
  }
};

