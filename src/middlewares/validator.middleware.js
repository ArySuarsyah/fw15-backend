const { body, validationResult } = require("express-validator");
const fileRemover = require("../helpers/fileRemover");
// const errorHandler = require('../helpers/errorHandler');

const passwordRequirement = {
  minLength: 3, // minimal panjang password
  minLowercase: 1, // minimal jumlah huruf kecil
  minUppercase: 1, // minimal jumlah huruf besar
  minNumbers: 1, // minimal jumlah angka
  minSymbols: 0, // minimal simbol
  returnScore: false,
  pointsPerUnique: 0,
  pointsPerRepeat: 0,
  pointsForContainingLower: 0,
  pointsForContainingUpper: 0,
  pointsForContainingNumber: 0,
  pointsForContainingSymbol: 0,
};

const emailFormat = body("email").isEmail().withMessage("Email is invalid");

const strongPassword = body("password")
  .isStrongPassword(passwordRequirement)
  .withMessage("Must be 8 caracteres, 1 uppercase, 1 lowercase, 1 number.");

const fullNameFormat = body("fullName")
  .isFloat({min:3, max:80})
  .withMessage("Name is invalid!");

const rules = {
  authLogin: [
    emailFormat,
    body("password").isLength({ min: 1 }).withMessage("Password invalid"),
  ],
  authRegister: [fullNameFormat, emailFormat, strongPassword],
  profile:[fullNameFormat]
};

const validator = (req, res, next) => {
  const errors = validationResult(req);
  try {

    if (!errors.isEmpty()) {
      fileRemover(req.file)
      throw Error("validation");
    }
    return next();
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Validation error",
      results: errors.array(),
    });
  }
};

const validate = (selectedRules) => [rules[selectedRules], validator];

module.exports = validate;
