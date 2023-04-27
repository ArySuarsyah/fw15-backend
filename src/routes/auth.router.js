const auth = require("express").Router();
const validate = require("../middlewares/validator.middleware");

const {
  login,
  register,
  forgotPassword,
  resetPassword,
} = require("../controller/admin/auth.controller");

auth.post("/login", validate("authLogin"), login);

auth.post("/register", validate("authRegister"), register);

auth.post("/forgot-password", forgotPassword);

auth.post("/reset-password", validate("resetPassword"), resetPassword);

// auth.get("/getcode", getByEmailAndCode);




module.exports = auth;
