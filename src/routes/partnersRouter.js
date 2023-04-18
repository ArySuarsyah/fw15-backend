const partner = require("express").Router();
const partnersCotroller = require("../controller/partnersController");
const uploadMiddleware = require("../middlewares/upload.middlewares");
const validate = require("../middlewares/validator.middleware");

partner.get("/", partnersCotroller.getPartners);
partner.post(
  "/",
  uploadMiddleware("picture"),
  validate("nameFormat"),
  partnersCotroller.createPartners
);
partner.get("/:id", validate("paramsId"), partnersCotroller.getPartnersById);
partner.patch(
  "/:id",
  uploadMiddleware("picture"),
  validate("updateName"),
  partnersCotroller.updatePartners
);
partner.delete("/:id", validate("paramsId"), partnersCotroller.deletePartners);

module.exports = partner;
