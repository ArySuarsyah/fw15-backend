var admin = require("firebase-admin");

var serviceAccount = require("../../eventify-5fe3e-firebase-adminsdk-lo4rt-d6c6e07f1b.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
