const partner = require("express").Router();
const partnersCotroller = require('../controller/partnersController');
const uploadMiddleware = require('../middlewares/upload.middlewares');

partner.get("/", partnersCotroller.getPartners);
partner.post("/", uploadMiddleware("picture"), partnersCotroller.createPartners);
partner.get("/:id", partnersCotroller.getPartnersById);
partner.patch("/:id", uploadMiddleware("picture"), partnersCotroller.updatePartners);
partner.delete("/:id", partnersCotroller.deletePartners);

module.exports = partner;
