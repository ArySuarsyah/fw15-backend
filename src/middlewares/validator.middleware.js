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

const name = body("name")
  .isAlpha()
  .withMessage("Name is invalid")
  .isLength(minMaxValue)
  .withMessage("Min length 3, max length 100");

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
  profession: body("profession").isAlpha().withMessage("Profession invalid"),
  nationality: body("nationality").isAlpha().withMessage("Nationality invalid"),
  birthdate: body("birthdate").isDate().withMessage("Birth date is invalid"),
};

const createReservationFormat = {
  eventId: eventCategoriesFormat.eventId,
  userId: body("userId").isNumeric().withMessage("User Id invalid"),
  statusId: body("statusId").isNumeric().withMessage("Status Id invalid"),
};

const reservSectionFormat = {
  name: name,
  price: body("price").isNumeric().withMessage("Price value must be number"),
};

const reservTicketFormat = {
  reservationId: body("reservationId")
    .isNumeric()
    .withMessage("Reservation Id is invalid!"),
  sectionId: body("sectionId").isNumeric().withMessage("Section Id is invalid"),
  quantityId: body("quantityId")
    .isNumeric()
    .withMessage("Quantity Id is invalid!"),
};

const wishlistFormat = {
  eventId: createReservationFormat.eventId,
  userId: createReservationFormat.userId,
};

const eventFormat = {
  title: body("title")
    .isAlpha()
    .withMessage("Title is invalid")
    .isLength()
    .withMessage("Title length is invalid"),
  date: body("date").isDate().withMessage("Event date is invalid"),
  cityId: body("cityId").isNumeric().withMessage("City Id is invalid"),
  description: body("description")
    .isLength({ min: 5 })
    .withMessage("Please Insert min 5 character"),
};

// Validator Rules

const rules = {
  authLogin: [
    emailFormat,
    body("password").isLength({ min: 1 }).withMessage("Password invalid"),
  ],
  paramsId: [idParamsFormat],
  nameFormat: [name],
  updateName: [name, idParamsFormat],
  authRegister: [fullNameFormat, emailFormat, strongPassword],
  createProfile: Object.values(createProfileFormat),
  updateProfile: [Object.values(createProfileFormat), idParamsFormat],
  deleteProfile: [idParamsFormat],
  createEventCat: Object.values(eventCategoriesFormat),
  updateEventCat: [Object.values(eventCategoriesFormat), idParamsFormat],
  deleteEventCat: [idParamsFormat],
  resevationCreate: Object.values(createReservationFormat),
  resevationUpdate: [Object.values(createReservationFormat), idParamsFormat],
  createReservSection: Object.values(reservSectionFormat),
  updateReservSection: [Object.values(reservSectionFormat), idParamsFormat],
  createReservTicket: Object.values(reservTicketFormat),
  updateReservTicket: [Object.values(reservTicketFormat), idParamsFormat],
  creatWishlist: Object.values(wishlistFormat),
  updateWishlist: [Object.values(wishlistFormat), idParamsFormat],
  createEvent: Object.values(eventFormat),
  updateEven: [Object.values(eventFormat), idParamsFormat],
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
