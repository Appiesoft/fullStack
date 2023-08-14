const catchAyscError = require("./catchAsyncErrors");
const jwt = require ("jsonwebtoken");
const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");

exports.isAuthenticatedUser = catchAyscError( async(req,res,next)=>{
  const {token} = req.cookies;

  if(!token){
      return next(new ErrorHandler("Please login to access this resources",401));
      //res.status(401).json({ success: false, message: "Please login to access this resources" });
  }
const deCodedData = jwt.verify(token,process.env.JWT_SECRET);
req.user =  await User.findById(deCodedData.id);
next();
});
  
exports.authorizedRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new ErrorHandler(`Role: ${req.user.role} is not allowed this resource`,403));
   //  res.status(403).json(`Role: ${req.user.role} is not allowed this resource`);
    }
  };
};
