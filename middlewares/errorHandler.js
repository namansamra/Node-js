const ErrorResponse = require("../utils/errorResponse");

const ErrorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message; // to take the error msg which comes with err e.g. CastError: Cast to objectId failed .you can clg both below and you will get that.
  // console.log(error.message);

  // console.log(error);
  console.log(err);

  //log error for developer
  // console.log(err.stack);

  //MONGO bad objectID
  if (err.name === "CastError") {
    const message = `Resource not found with id ${err.value}`;
    error = new ErrorResponse(message, 404);
  }
  //MONGO duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate values found`;
    error = new ErrorResponse(message, 400);
  }

  //MONGO validation error
  if (err.name === "ValidationError") {
    const message = Object.keys(err.errors).map((key) => `Please add ${key}.`);   //arr has key as of the values we want.
    error = new ErrorResponse(message, 400);
  }
  res
    .status(error.statusCode || 500)
    .json({ success: false, msg: error.message || "Server Error" });
};

module.exports = ErrorHandler;
