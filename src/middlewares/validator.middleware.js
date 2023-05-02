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
    .isLength(minMaxValue)
    .withMessage("Title length is invalid"),
  // date: body("date").isDate({format: YYYY-MM-DD}).withMessage("Event date is invalid"),
  cityId: body("cityId").isNumeric().withMessage("City Id is invalid"),
  description: body("description")
    .isLength({ min: 5 })
    .withMessage("Please Insert min 5 character"),
};

// Validator Update Format

const updateProfileFormat = {
  fullName: body()
    .optional()
    .isAlpha()
    .withMessage("Fulname is invalid")
    .isLength()
    .withMessage("Min 3 character, max 100 character"),
  phoneNumber: body("phoneNumber")
    .optional()
    .isLength(minMaxValue)
    .withMessage("Phone number is invalid"),
  gender: body("gender")
    .optional()
    .isBoolean()
    .withMessage("Gender input invalid"),
  profession: body("profession")
    .optional()
    .isAlpha()
    .withMessage("Profession invalid"),
  nationality: body("nationality")
    .optional()
    .isAlpha()
    .withMessage("Nationality invalid"),
  birthdate: body("birthdate")
    .optional()
    .isDate()
    .withMessage("Birth date is invalid"),
  idParamas: idParamsFormat,
};

const updateCategoriesFormat = {
  eventId: body("eventId")
    .optional()
    .isFloat()
    .withMessage("Event Id is invalid"),
  categoryId: body("categoryId")
    .optional()
    .isNumeric()
    .withMessage("Category Id invalid"),
  idParams: idParamsFormat,
};

const updateReservationFormat = {
  eventId: body("eventId")
    .optional()
    .isFloat()
    .withMessage("Event Id is invalid"),
  userId: body("userId").optional().isNumeric().withMessage("User Id invalid"),
  statusId: body("statusId")
    .optional()
    .isNumeric()
    .withMessage("Status Id invalid"),
  paramsId: idParamsFormat,
};

const updateReservSectionFormat = {
  name: body("name")
    .optional()
    .isAlpha()
    .withMessage("Name is invalid")
    .isLength(minMaxValue)
    .withMessage("Min length 3, max length 100"),
  price: body("price")
    .optional()
    .isNumeric()
    .withMessage("Price value must be number"),
  paramsId: idParamsFormat,
};

const updateReservTicketFormat = {
  reservationId: body("reservationId")
    .optional()
    .isNumeric()
    .withMessage("Reservation Id is invalid!"),
  sectionId: body("sectionId")
    .optional()
    .isNumeric()
    .withMessage("Section Id is invalid"),
  quantityId: body("quantityId")
    .optional()
    .isNumeric()
    .withMessage("Quantity Id is invalid!"),
  paramsId: idParamsFormat,
};

const updateWishlistFormat = {
  eventId: body("eventId")
    .optional()
    .isFloat()
    .withMessage("Event Id is invalid"),
  userId: body("userId").optional().isNumeric().withMessage("User Id invalid"),
  paramsId: idParamsFormat,
};

const updateEventFormat = {
  title: body("title")
    .optional()
    .isAlpha()
    .withMessage("Title is invalid")
    .isLength()
    .withMessage("Title length is invalid"),
  date: body("date").optional().isDate().withMessage("Event date is invalid"),
  cityId: body("cityId")
    .optional()
    .isNumeric()
    .withMessage("City Id is invalid"),
  description: body("description")
    .optional()
    .isLength({ min: 5 })
    .withMessage("Please Insert min 5 character"),
  idParamas: idParamsFormat,
};

const resetPassword = body("confirmPassword").custom((value, { req }) => {

return value === req.body.password

}).withMessage("Password and confirm password not match!")




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
  updateProfile: Object.values(updateProfileFormat), //
  deleteProfile: [idParamsFormat],
  createEventCat: Object.values(eventCategoriesFormat),
  updateEventCat: Object.values(updateCategoriesFormat), //
  deleteEventCat: [idParamsFormat],
  resevationCreate: Object.values(createReservationFormat),
  resevationUpdate: Object.values(updateReservationFormat), //
  createReservSection: Object.values(reservSectionFormat),
  updateReservSection: Object.values(updateReservSectionFormat), //
  createReservTicket: Object.values(reservTicketFormat),
  updateReservTicket: Object.values(updateReservTicketFormat), //
  creatWishlist: Object.values(wishlistFormat),
  updateWishlist: Object.values(updateWishlistFormat),
  createEvent: Object.values(eventFormat),
  updateEvent: Object.values(updateEventFormat),
  resetPassword: resetPassword,
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
