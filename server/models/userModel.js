const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "please enter your name"],
    maxLength: [30, "name cannt exceed 30 chararcters "],
    minLength: [3, "name should have more than three chararcters"],
    trim: true,
  },
  email: {
    type: String,
    require: [true, "please enter your email"],
    unique: true,
    validator: [validator.isEmail, "please enter valid email"],
  },
  password: {
    type: String,
    require: [true, "please enter your email"],
    minLength: [8, "name should have more than 8 chararcters"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      require: true,
    },
    url: {
      type: String,
      require: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

module.exports = mongoose.model("User", userSchema);
