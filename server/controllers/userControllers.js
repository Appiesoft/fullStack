const User = require("../models/userModel");
//register user
exports.registerUser =  (async (req, res, next) => {
  const {name,email,password} = req.body;
  const user = await User.create({
    name,email,password,
    avatar:{
      public_id: "this is sample",
      url:"dp"
    }
  });  res.status(201).json({ success: true, user });

});
