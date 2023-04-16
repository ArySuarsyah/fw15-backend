const { body, param, validationResult } = require("express-validator");
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

const minMaxValue = {
  min: 3,
  max: 100,
};

const emailFormat = body("email").isEmail().withMessage("Email is invalid");

const strongPassword = body("password")
  .isStrongPassword(passwordRequirement)
  .withMessage("Must be 8 caracteres, 1 uppercase, 1 lowercase, 1 number.");

const fullNameFormat = body("fullName")
  .isAlpha()
  .withMessage("Name is invalid!");

const idParamsFormat = param("id").isFloat().withMessage("Id is invalid");

const name = body("name").isAlpha().withMessage("Name is invalid");
const eventCategoriesFormat = {
  eventId: body("eventId").isFloat().withMessage("Event Id is invalid"),
  categoryId: body("categoryId").isNumeric().withMessage("Category Id invalid"),
};

const createProfileFormat = {
  fullName: fullNameFormat,
  phoneNumber: body("phoneNumber")
    .isLength(minMaxValue)
    .withMessage("Phone number is invalid"),
  gender: body("gender").isBoolean().withMessage("Gender input invalid"),
  profession: body("profession")
    .isAlpha()
    .withMessage("Profession invalid"),
  nationality: body("nationality")
    .isAlpha()
    .withMessage("Nationality invalid"),
  // birthdate: body("birthdate").isDate().withMessage("Birth date is invalid"),
};




const rules = {
  authLogin: [
    emailFormat,
    body("password").isLength({ min: 1 }).withMessage("Password invalid"),
  ],
  authRegister: [fullNameFormat, emailFormat, strongPassword],
  createProfile: Object.values(createProfileFormat),
  updateProfile: [Object.values(createProfileFormat), idParamsFormat],
  deleteProfile: [idParamsFormat],
  paramsId: [idParamsFormat],
  createEventCat: Object.values(eventCategoriesFormat),
  updateEventCat: [Object.values(eventCategoriesFormat), idParamsFormat],
  deleteEventCat: [idParamsFormat],
  createCities: [name],
  updateCities: [name, idParamsFormat],
};

const validator = (req, res, next) => {
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      fileRemover(req.file);
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
