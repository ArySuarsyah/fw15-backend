const auth = require("express").Router();
const validate = require("../middlewares/validator.middleware");

const { login, register } = require("../controller/admin/auth.controller");

auth.post("/login", validate("authLogin"), login);

auth.post("/register", validate("authRegister"), register);

module.exports = auth;
