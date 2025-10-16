const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const AppError = require("../utils/AppError");
const bcrypt = require("bcrypt");

exports.signUp = asyncHandler(async (req, res, nxt) => {
  const { username, email, password, passwordConfirm } = req.body;

  const currentUser = await User.findOne({ email });

  if (currentUser) {
    return nxt(new AppError(`User is already exist`, 400));
  }
  const user = await User.create({
    username,
    email,
    password,
    passwordConfirm,
  });
  res.redirect("/profile");
});

exports.login = asyncHandler(async (req, res, nxt) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return nxt(new AppError("Invalid email or password", 401));
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return nxt(new AppError("Invalid email or password", 401));
  }
  req.user = user;

  res.redirect("/profile");
});
