const profileModels = require("../models/profileModel");
const fileRemover = require("../helpers/fileRemover");
const errorHandler = require("../helpers/errorHandler");
const filterData = require("../helpers/filter.helper");
const usersModel = require("../models/users.model")
exports.getProfile = async (req, res) => {
  try {
    const filter = filterData(req.query);
    const data = await profileModels.getProfile(filter);
    return res.status(200).json({
      success: false,
      message: "List all profile",
      results: data,
    });
  } catch (err) {
    return errorHandler(err, res);
  }
};

exports.createProfile = async (req, res) => {
  try {
    if (req.file) {
      req.body.picture = req.file.filename;
    }
    const user = await profileModels.createProfile(req.body);
    return res.json({
      success: true,
      message: `Create profile ${req.body.fullName} successfully`,
      results: user,
    });
  } catch (err) {
    fileRemover(req.file);
    return errorHandler(err, res);
  }
};

exports.getProfileById = async (req, res) => {
  try {
    const data = await profileModels.getProfileById(req.params.id);
    if (data) {
      return res.status(200).json({
        success: true,
        message: "Access success",
        data: data,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }
  } catch (err) {
    return errorHandler(err, res);
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const data = {
      ...req.body,
    };
    if (req.file) {
      data.picture = req.file.filename;
    }

    const userData = await profileModels.updateProfile(data, req.params.id);
    if (userData) {
      return res.json({
        success: true,
        message: "User updated!",
        results: userData,
      });
    }
    return res.status(404).json({
      success: false,
      message: "User not found!",
    });
  } catch (err) {
    fileRemover(req.file);
    return errorHandler(err, res);
  }
};

exports.deleteProfile = async (req, res) => {
  try {
    const data = await profileModels.deleteProfile(req.params.id);
    if (data) {
      return res.json({
        success: true,
        message: "Users deleted successfully",
        results: data,
      });
    }
    return res.status(404).json({
      success: false,
      message: "User not found!",
    });
  } catch (err) {
    return errorHandler(err, res);
  }
};

exports.updateProfileByUserId = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await profileModels.getProfileByUserId(id);
    const data = {
      ...req.body,
    };

    if (req.file) {
      if (user.picture) {
        fileRemover({ filename: user.picture });
      }
      data.picture = req.file.filename;
    }

    if (data.userName) {
      await usersModel.update(data.userName);
    }

    const profile = await profileModels.updateProfileByUserId(id, data);

    if (!profile) {
      throw Error("User not found");
    }
    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      results: profile,
    });
  } catch (err) {
    return errorHandler(err, res);
  }
};

exports.readProfile = async (req, res) => {
  try {
    const { id } = req.user;
    const profile = await profileModels.getProfileByUserId(id);

    if (!profile) {
      throw Error("User not found");
    }

    return res.json({
      success: true,
      message: "Profile",
      results: profile,
    });
  } catch (err) {
    return errorHandler(err, res);
  }
};



exports.updateFingerprint = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await profileModels.getProfileByUserId(id);
    const data = {
      ...req.body,
    };

    if (req.file) {
      if (user.picture) {
        fileRemover({ filename: user.picture });
      }
      data.picture = req.file.filename;
    }

    const profile = await profileModels.updateProfileByUserId(id, data);

    if (!profile) {
      throw Error("User not found");
    }
    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      results: profile,
    });
  } catch (err) {
    return errorHandler(err, res);
  }
};