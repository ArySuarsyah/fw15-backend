const auth = require("express").Router();
const validate = require("../middlewares/validator.middleware");

const {
  login,
  register,
  forgotPassword,
  resetPassword,
  changePassword,
  loginFingerPrint,
} = require("../controller/admin/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");

auth.post("/login", validate("authLogin"), login);

auth.post("/register", validate("authRegister"), register);

auth.post("/forgot-password", forgotPassword);

auth.post("/reset-password", validate("resetPassword"), resetPassword);

auth.patch(
  "/change-password",
  authMiddleware,
  validate("changePassword"),
  changePassword
);

auth.post("/loginFingerprint", loginFingerPrint);

// auth.get("/getcode", getByEmailAndCode);

module.exports = auth;
