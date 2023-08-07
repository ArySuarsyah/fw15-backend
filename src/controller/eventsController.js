const eventModel = require("../models/eventsModel");
const fileRemover = require("../helpers/fileRemover");
const errorHandler = require("../helpers/errorHandler");
const filterData = require("../helpers/filter.helper");
const admin = require("../helpers/firebase");
const eventCategoriesModels = require("../models/eventCategoriesModel");
const deviceTokenModel = require("../models/deviceTokenModel");

exports.getEvents = async (req, res) => {
  try {
    const filter = filterData(req.query);

    const data = await eventModel.getEvents(filter);

    return res.status(200).json({
      success: false,
      message: "List all Events",
      results: data,
    });
  } catch (err) {
    return errorHandler(err, res);
  }
};

exports.createEvents = async (req, res) => {
  try {
    if (req.file) {
      req.body.picture = req.file.filename;
    }
    const event = await eventModel.createEvents(req.body);

    const listToken = await deviceTokenModel.getToken(1, 1000);
    const message = listToken.map((item) => ({
      token: item.token,
      notification: {
        title: "There is a new event",
        body: `${req.body.title} will be held at ${req.body.date}, check it out!!`,
      },
    }));
    const messaging = admin.messaging;

    messaging().sendEach(message);
    return res.json({
      success: true,
      message: `Create Events ${req.body.title} successfully`,
      results: event,
    });
  } catch (err) {
    fileRemover(req.file);
    return errorHandler(err, res);
  }
};

exports.getEventsById = async (req, res) => {
  try {
    const data = await eventModel.getEventsById(req.params.id);
    if (data) {
      return res.status(200).json({
        success: true,
        message: "Access success",
        data: data,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "event not found!",
      });
    }
  } catch (err) {
    return errorHandler(err, res);
  }
};

exports.updateEvents = async (req, res) => {
  try {
    const data = {
      ...req.body,
    };
    const eventData = await eventModel.updateEvents(data, req.params.id);
    if (eventData) {
      return res.json({
        success: true,
        message: "event updated!",
        results: eventData,
      });
    }
    return res.status(404).json({
      success: false,
      message: "event not found!",
    });
  } catch (err) {
    fileRemover(req.file);
    return errorHandler(err, res);
  }
};

exports.deleteEvents = async (req, res) => {
  try {
    const data = await eventModel.deleteEvents(req.params.id);
    if (data) {
      return res.json({
        success: true,
        message: "events deleted successfully",
        results: data,
      });
    }
    return res.status(404).json({
      success: false,
      message: "event not found!",
    });
  } catch (err) {
    return errorHandler(err, res);
  }
};

// Main Business Flow

exports.getAllEvents = async (req, res) => {
  try {
const filter = {
  limit: parseInt(req.query.limit) || 5,
  page: (parseInt(req.query.page) - 1) * parseInt(req.query.limit) || 0,
  searchByName: req.query.searchByName || "",
  searchByCategory: req.query.searchByCategories || "",
  searchByLocation: req.query.searchByLocation || "",
  sort: req.query.sort || "id",
  sortBy: req.query.sortBy || "ASC",
};


    const data = await eventCategoriesModels.findAllByEventId(filter);

    return res.status(200).json({
      success: true,
      message: "List all Events",
      results: data,
    });
  } catch (err) {
    return errorHandler(err, res);
  }
};

exports.insertEvent = async (req, res) => {
  try {
    const { categoryId } = req.body;

    const data = {
      ...req.body,
    };
    if (req.file) {
      data.picture = req.file.filename;
    }


    const eventData = await eventModel.insertEvent(data);
    const ecData = {
      eventId: eventData.id,
      categoryId,
    };

    await eventCategoriesModels.insertEventsCategories(ecData);

    const event = await eventCategoriesModels.findOneById(eventData.id);

    return res.json({
      success: true,
      message: `Create Events ${req.body.title} successfully`,
      results: event,
    });
  } catch (err) {
    fileRemover(req.file);
    return errorHandler(err, res);
  }
};

exports.updateEv = async (req, res) => {
  try {
    const { id } = req.params;
    // const event = await eventCategoriesModels.findOneById(id);
    const { categoryId } = req.body;
    const data = {
      ...req.body,
    };
    if (req.file) {
      // if (event.picture) {
      //   fileRemover({ filename: event.picture });
      // }

      data.picture = req.file.filename;
    }
    const eventData = await eventModel.updateEvents(data, id);

    const ecData = {
      categoryId,
    };

    await eventCategoriesModels.updateEvntCategories(ecData, id);

    const eventResults = await eventCategoriesModels.findOneById(eventData.id);

    return res.json({
      success: true,
      message: "Update Event Successfully",
      results: eventResults,
    });
  } catch (err) {
    return errorHandler(err, res);
  }
};


exports.deleteEvent = async (req, res) => {
  try {

    await eventModel.deleteEvents(req.params.id);
    await eventCategoriesModels.deleteEventsCategories(req.params.id);

    return res.json({
      success: true,
      message: `Delete Event Successfully`,
    });
  } catch (err) {
    fileRemover(req.file);
    return errorHandler(err, res);
  }
};
