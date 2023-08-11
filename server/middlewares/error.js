const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "internal server error";

  res.status(err.statusCode).json({ success: false, error: err });
};

// mongoose dup key error

// if (err.code === 11000){
//     const message =
//     err = new res
//     .status(400)
//     .json({ success: false, message: "reset password token is invalid has been expired" });
// }
