const catchAyscError = require("./catchAyscError");
const jwt = require ("jsonwebtoken");
const User = require("../models/userModel");
// const sendToken = require("./jwtToken");
exports.isAuthenticatedUser = catchAyscError( async(req,res,next)=>{
  const {token} = req.cookies;
  console.log(token);

  if(!token){
      return  res.status(401).json({ success: false, message: "Please login to access this resources" });
  }
const deCodedData = jwt.verify(token,process.env.JWT_SECRET);
req.user =  await User.findById(deCodedData.id);
console.log("next")
next();
});
  
// exports.authorizedRoles = (...roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//      res.status(403).json(`Role: ${req.user.role} is not allowed this resource`);
//     }
//     console.log("object")
//   next();
//   };
// };
// 