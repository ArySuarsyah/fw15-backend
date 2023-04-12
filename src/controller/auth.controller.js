/* eslint-disable no-undef */
const jwt = require("jsonwebtoken");
// const resetPasswordModels = require("../models/resetPassword.model");
const errorHandler = require("../helpers/errorHandler");
const argon = require("argon2");
const { SECRET_KEY } = process.env;
const {getUserByEmail, insert} = require("../models/users.model");

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
    const { email, password, confirmPassword } = req.body;
    if (!email || !password || !confirmPassword) {
      throw Error("Empty_Feild");
    }
    if (!email.includes("@") || !email.includes(".")) {
      throw Error("Wrong_email");
    }
    if (password !== confirmPassword) {
      throw Error("Password unmatch");
    }
    const hash = await argon.hash(password);
    const data = {
      ...req.body,
      password: hash,
    };
    const user = await insert(data);
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



// exports.resetPassword = (req, res) => {
//   try {
//     const { password, confirmPassword, email, code } = req.body;
//     if (password === confirmPassword) {
//       const data = resetPasswordModels.getResetPasswordVerify(email, code);
//       if (data.length) {
//         const [requestReset] = data;

//         if (new Date(requestReset.createdAt).getTime() + 1 * 60 * 100 < new Date().getTime) {
//           throw Error('code_expired!')
//         }
//         const users = await updatePassword(requestReset.userId, { password })
//         if (users.length) {
//             resetPasswordModel.deletePassword(requestReset.id, (err, { rows }) => {
//               if (reqResetId.length) {
//                 return res.status(200).json({
//                   succes: true,
//                   message: 'password updated'
//                 })
//               }
//             })
//           } else {
//           return errorHandler(err, res);
//           }
//     }
//     } else {
//       throw Error('Password not match')
//   }
// }
