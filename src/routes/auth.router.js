const auth = require("express").Router();
const validate = require("../middlewares/validator.middleware");

const {
  login,
  register,
  forgotPassword,
  resetPassword,
  changePassword,
} = require("../controller/admin/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");

auth.post("/login", validate("authLogin"), login);

auth.post("/register", validate("authRegister"), register);

auth.post("/forgot-password", forgotPassword);

auth.post("/reset-password", validate("resetPassword"), resetPassword);

auth.post("/change-password", authMiddleware, validate("changePassword"), changePassword);


// auth.get("/getcode", getByEmailAndCode);




module.exports = auth;
