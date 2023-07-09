const errorHandler = require("../helpers/errorHandler");
const deviceTokenModel = require("../models/deviceTokenModel");

exports.saveToken = async (req, res) => {
  try {
    const { id } = req.user;
    const { token } = req.body;
    const exist = await deviceTokenModel.findOneByToken(token);

    if (exist) {
      await deviceTokenModel.updateUserIdByToken(token, id);
    } else {
      await deviceTokenModel.insertToken(id, { token });
    }

    return res.json({
      success: true,
      message: "Token saved",
      results: {
        token
      },
    });
  } catch (err) {
    return errorHandler(err, res);
  }
};
