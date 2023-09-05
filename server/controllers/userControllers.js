const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const sendToken = require("../middlewares/jwtToken");
const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary")
//register user
exports.registerUser = catchAsyncErrors(async (req, res, next) => {

  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar,{
    folder: "avatars",
    width:150,
    crop:"scale"
  });
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  // jwt import
  sendToken(user, 201, res);
});

//login user
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return next(new ErrorHandler("Invalid email or password", 400));
  }

  // Find user by email and select the password field
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 400));
  }

  // Compare the provided password with the user's stored password
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 400));
  }
  sendToken(user, 200, res);
});

//logOut user
exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", "", {
    expires: new Date(0), // Set the expiration date to a past time
    httpOnly: true,
    sameSite: "none", // Adjust this based on your requirements
    secure: true, // Set secure to true if using HTTPS
    path: "/", // Set the same path as the original cookie
  });
  res.status(200).json({ success: true, message: "you are logged out now" });
});

//forgetPassword
exports.forgetPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  const resetToken = user.getResetPasswordToken();

  try {
    await user.save({ validateBeforeSave: false });

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
    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
    //res.status(500).json({ success: false, error: "Email could not be sent" });
  }
});

//resetPassword
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  // create hash token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.fineOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(
      new ErrorHandler("reset password token is invalid has been expired", 400)
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("password does not password", 400));
  }
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  sendToken(user, 200, res);
});

// get user Detail login krne k baad khud ki details get krni hai toh
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

// get user updatePassword
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");
  try {
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
      return next(new ErrorHandler("Old password is incorrect", 400));
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
      return next(new ErrorHandler("Passwords don't match", 400));
    }
    user.password = req.body.newPassword;
    await user.save();
    sendToken(user, 200, res);
  } catch (error) {
    next(error);
  }
});

//update user profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email, // Corrected the typo here
  };

  // we will add cloud latr
  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false, // Corrected the typo here
  });
  res.status(200).json({
    success: true,
  });
});

//  all users details get by (admin)
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.findOne();

  res.status(200).json({
    success: true,
    users,
  });
});

// single users detail get by admin
exports.getSingleUsers = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorHandler(`user does not exist with Id:${req.params.id}`, 400)
    );
  }
  res.status(200).json({
    success: true,
    user,
  });
});

// update user role by admin
exports.updateUserRole= catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role, // Corrected the typo here
  };

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false, // Corrected the typo here
  });

  if (!user) {
    return next(
      new ErrorHandler(`user does not exist with Id:${req.user.id}`, 400)
    );
  }
  res.status(200).json({
    success: true,
  });
});

// delete user role by admin
exports.deleteUserRole = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`user does not exist with Id:${req.params.id}`, 400)
    );
  }
  await user.deleteOne();
  res.status(200).json({
    success: true,
    message:"User deleted is Successfully"
  });
});
