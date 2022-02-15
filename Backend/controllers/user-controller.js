const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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
  const createUser = new User({
    phone,
    name,
    storeName,
    pincode,
    referralCode,
    phoneOtp: otp,
  });
  try {
    await createUser.save();
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Signing up falied, Please try again later" });
  }
  res
    .status(201)
    .json({
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
  res.status(201).json({ success: true, message: "OTP sent successfully." ,userId:existingUser._id});
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
  res.status(201).json({ token,message:"User Logged In Successfully", userDetails: user });
};
