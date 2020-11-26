const Bootcamp = require("../models/Bootcamp");
const ErrorResponse = require("../utils/errorResponse");

// api/v1/bootcamps
// GET
// public
exports.getBootcamps = async (req, res, next) => {
  try {
    const allBootcamps = await Bootcamp.find();
    res
      .status(200)
      .json({ success: true, count: allBootcamps.length, data: allBootcamps });
  } catch (error) {
    next(error);
  }
};

// api/v1/bootcamps/:id
// GET
// public
exports.getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);
    if (!bootcamp) {
      return next(
        new ErrorResponse(`Resource not found with id ${req.params.id}`, 404)
      ); // we use return otherwise it will give headers already send error
    }
    res.status(200).json({ success: true, data: bootcamp });
  } catch (error) {
    next(error); //we want it to automatically handled by errorHandler.js
  }
};

// api/v1/bootcamps
// POST
// private
exports.createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);

    res.status(201).json({
      success: true,
      data: bootcamp,
    });
  } catch (error) {
    next(error);
  }
};

// api/v1/bootcamps
// PUT/PATCH
// private
exports.updateBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!bootcamp) {
      return next(
        new ErrorResponse(`Resource not found with id ${req.params.id}`, 404)
      );
    }
    res.status(200).json({
      success: true,
      data: bootcamp,
    });
  } catch (error) {
    next(error);
  }
};

// api/v1/bootcamps
// DELETE
// private
exports.deleteBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
    if (!bootcamp) {
      return next(
        new ErrorResponse(`Resource not found with id ${req.params.id}`, 404)
      );
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};
