const User = require("../models/User");
const Order = require("../models/Order");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const { generateOtp, fast2sms } = require("../utils/otp");

// @route POST /signup
// @desc Register a user
// @access Public
exports.signup = async (req, res, next) => {
  const { phone, name, storeName, pincode, referralCode } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ phone });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Signing up failed,Please Try again later" });
  }
  if (existingUser) {
    return res
      .status(422)
      .json({ message: "User already exists. Please try to login" });
  }

  // Generate Otp
  const otp = generateOtp(6);
  console.log(otp);
  try {
    //save otp to user collection
    await fast2sms({
      message: `Your Otp is ${otp}`,
      contactNumber: phone,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Otp sending failed,Please try again." });
  }

  let referrer;
  try {
    referrer = await User.find({
      userReferralCode: referralCode,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Refferal code not correct" });
  }
  console.log(referrer);
  console.log(referrer[0]._id);

  const createUser = new User({
    phone,
    name,
    storeName,
    pincode,
    userReferralCode: uuidv4().slice(0, 6),
    phoneOtp: otp,
    referrer: referrer[0]._id,
  });
  try {
    await createUser.save();
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Signing up falied, Please try again later" });
  }

  try {
  } catch (err) {}

  res.status(201).json({
    success: true,
    message: "OTP sent successfully.",
    userId: createUser._id,
  });
};

// @route POST /login
// @desc Login a user
// @access Public

exports.login = async (req, res, next) => {
  const { phone } = req.body;
  console.log(phone);
  let existingUser;
  try {
    existingUser = await User.findOne({ phone });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Login failed, Please try again later." });
  }
  if (!existingUser) {
    return res.status(401).json({ message: "User not found." });
  }
  // Generate Otp
  const otp = generateOtp(6);
  console.log(otp);
  try {
    //  save otp to user collection
    await fast2sms({
      message: `Your Otp is ${otp}`,
      contactNumber: phone,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Otp sending failed,Please try again." });
  }

  try {
    existingUser.phoneOtp = otp;
    await existingUser.save();
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Login falied, Please try again later" });
  }
  res.status(201).json({
    success: true,
    message: "OTP sent successfully.",
    userId: existingUser._id,
  });
};

// @route POST /signup
// @desc Register a user
// @access Public
exports.verifyOtp = async (req, res, next) => {
  const { otp, userId } = req.body;
  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Otp error,Please try again" });
  }
  if (!user) {
    return res.status(401).json({ message: "User not found." });
  }
  if (user.phoneOtp !== otp) {
    return res.status(400).json({ message: "Incorrect Otp" });
  }
  let token;
  try {
    token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "365d",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "JWT error." });
  }



  let referrer;
  try {
    referrer = await User.findById(user.referrer);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Referrer not found",
    });
  }
  if (user.referrer) {
    user.referrerName = referrer.name;
  }
  console.log(referrer);
  // console.log(referrer.name);
  console.log(user);
  res
    .status(201)
    .json({ token, message: "User Logged In Successfully", userDetails: user });
};

// @route Post /logout
// @desc Logout a user
// @access Public
exports.logoutUser = (req, res, next) => {};

// Get currently logged in user details
exports.loggedInUserDetails = async (req, res, next) => {
  const user = await User.findById(req.user._id);
  res.status(200).json({
    success: true,
    user,
  });
};

// Update user profile
exports.updateProfile = async (req, res, next) => {
  const { name } = req.body;
  const newUserData = {
    name: name,
  };
  let user;
  try {
    user = await User.findByIdAndUpdate(req.user.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Update User Failed" });
  }
  res.status(200).json({
    success: true,
    user,
    message: "User updated Successfull",
  });
};

// @route GET /users
// @desc Get all  users
// @access Private admin

exports.getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Getting users failed" });
  }
  res.status(200).json({
    success: true,
    users,
  });
};

// Get user details
exports.getUserDetails = async (req, res, next) => {
  let user;
  try {
    user = await User.findById(req.params.id);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: `User does not found with id:${req.params.id}` });
  }
  if (!user) {
    return res
      .status(500)
      .json({ message: `User does not found with id:${req.params.id}` });
  }
  let orders;
  try {
    orders = await Order.find({ user: user._id });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: `Orders does not found with id:${req.params.id}` });
  }
  user.orders = orders;

  let revenue = 0;
  orders.forEach((order) => {
    revenue += order.totalPrice;
  });

  user.totalOrders = orders.length;
  user.totalRevenue = revenue;

  res.status(200).json({
    success: true,
    user,
    orders,
    totalOrders: orders.length,
    totalRevenue: revenue,
  });
};

exports.deleteUser = async (req, res, next) => {
  let user;
  try {
    user = await User.findById(req.params.id);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: `User does not found with id:${req.params.id}` });
  }
  if (!user) {
    return res
      .status(500)
      .json({ message: `User does not found with id:${req.params.id}` });
  }
  //Remove Avatar from Cloudnary -todo
  try {
    await user.remove();
  } catch (err) {
    console.log(err);
  }
  res.status(200).json({
    success: true,
  });
};
