const catchAyscError = require("../middlewares/catchAyscError");
const sendToken = require("../middlewares/jwtToken");
const User = require("../models/userModel");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
//register user
exports.registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "this is sample",
      url: "dp",
    },
  });

  // jwt import
  sendToken(user, 201, res);
};

//login user
exports.loginUser = catchAyscError(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Please enter email and password" });
  }

  // Find user by email and select the password field
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid email or password" });
  }

  // Compare the provided password with the user's stored password
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid email or password" });
  }
  sendToken(user, 200, res);
});

//logOut user
exports.logoutUser = catchAyscError(async (req, res, next) => {
  res.cookie("token", "", {
    expires: new Date(0), // Set the expiration date to a past time
    httpOnly: true,
    sameSite: "none", // Adjust this based on your requirements
    secure: true, // Set secure to true if using HTTPS
    path: "/", // Set the same path as the original cookie
  });
  res.status(200).json({ success: true, message: "you are logged out now" });
});

// exports.forgetPassword = catchAyscError(async (req, res, next) => {
//   const user = await User.findOne({ email: req.body.email });
//   if (!user) {
//     return res
//       .status(404)
//       .json({ success: true, message: "user not found" });
//   }

//   const resetToken = user.getResetPasswordToken();

//   await user.save({ validateBeforeSave: false });

//   const resetPasswordUrl = `${req.protocol}://${req.get(
//     "host"
//   )}/api/v1/password/reset/${resetToken}`;
//   const message =`your password reset Token :- \n\n ${resetPasswordUrl} \n\n if you not have not requested this email then please ignore it`;

//   try {
//     await sendEmail({
//       email:user.email,
//       subject:`realEstate password Recovery`,
//       message,
//     });
//     res
//   .status(200)
//   .json({ success: true,message:`email sent to ${user.email} successfuly`});
  
//   } catch (error) {
//   user.resetPasswordToken = undefined;
//   user.resetPasswordExpire = undefined;

//   await user.save({ validateBeforeSave: false });


//   return res
//   .status(500)
//   .json({ success: false,error});
//   }
// });
exports.forgetPassword = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res
      .status(404)
      .json({ success: false, message: "User not found" });
  }

  const resetToken = user.getResetPasswordToken();

  try {
    await user.save({validateBeforeSave:false});

    const resetPasswordUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/password/reset/${resetToken}`;
    const message = `Your password reset Token: \n\n ${resetPasswordUrl} \n\n If you did not request this email, please ignore it.`;

    await sendEmail({
      email: user.email,
      subject: "RealEstate Password Recovery",
      message,
    });

    res.status(200).json({
    success: true,
    message: `Email sent to ${user.email} successfully`,
  });
  } catch (error) {
    console.error("Email send error:", error);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({validateBeforeSave:false});

    return res.status(500).json({ success: false, error: "Email could not be sent" });
  }
};

exports.resetPassword = async (req, res, next) =>{

// create hash token
const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");


const user = await User.fineOne({
  resetPasswordToken,
  resetPasswordExpire:{$gt :Data.now() },
});
if (!user) {
  return res
    .status(400)
    .json({ success: false, message: "reset password token is invalid has been expired" });
}

if(req.body.password != req.body.confirmPassword){
  res
    .status(400)
    .json({ success: false, message: "password doesnt match" });
}
user.password =req.body.password;
user.resetPasswordToken = undefined;
user.resetPasswordExpire = undefined;
await user.save();
sendToken(user, 201, res);
};
