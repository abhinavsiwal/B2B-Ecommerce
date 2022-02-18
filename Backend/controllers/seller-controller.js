const Seller = require("../models/Seller");
const Product = require("../models/Product");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { generateOtp, fast2sms } = require("../utils/otp");

// @route POST /signup
// @desc Register a Seller
// @access Public
exports.signup = async (req, res, next) => {
  const { phone, name, storeName, pincode, referralCode } = req.body;
  let existingSeller;
  try {
    existingSeller = await Seller.findOne({ phone });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Signing up failed,Please Try again later" });
  }
  if (existingSeller) {
    return res
      .status(422)
      .json({ message: "Seller already exists. Please try to login" });
  }

  // Generate Otp
  const otp = generateOtp(6);
  console.log(otp);
  try {
    //save otp to seller collection
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
  const createSeller = new Seller({
    phone,
    name,
    storeName,
    pincode,
    referralCode,
    phoneOtp: otp,
  });
  try {
    await createSeller.save();
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Signing up falied, Please try again later" });
  }
  res.status(201).json({
    success: true,
    message: "OTP sent successfully.",
    userId: createSeller._id,
  });
};

// @route POST /login
// @desc Login a seller
// @access Public

exports.login = async (req, res, next) => {
  const { phone } = req.body;
  console.log(phone);
  let existingSeller;
  try {
    existingSeller = await Seller.findOne({ phone });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Login failed, Please try again later." });
  }
  if (!existingSeller) {
    return res.status(401).json({ message: "Seller not found." });
  }
  // Generate Otp
  const otp = generateOtp(6);
  console.log(otp);
  try {
    //  save otp to seller collection
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
    existingSeller.phoneOtp = otp;
    await existingSeller.save();
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Login falied, Please try again later" });
  }
  res.status(201).json({
    success: true,
    message: "OTP sent successfully.",
    sellerId: existingSeller._id,
  });
};

// @route POST /signup
// @desc Register a seller
// @access Public
exports.verifyOtp = async (req, res, next) => {
  const { otp, sellerId } = req.body;
  let seller;
  try {
    seller = await Seller.findById(sellerId);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Otp error,Please try again" });
  }
  if (!seller) {
    return res.status(401).json({ message: "Seller not found." });
  }
  if (seller.phoneOtp !== otp) {
    return res.status(400).json({ message: "Incorrect Otp" });
  }
  let token;
  try {
    token = jwt.sign({ id: seller._id }, process.env.JWT_SECRET, {
      expiresIn: "365d",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "JWT error." });
  }
  res.status(201).json({ token, sellerDetails: seller });
};

// @route GET /sellers
// @desc Get all  sellers
// @access Private admin

exports.allSellers = async (req, res, next) => {
  let sellers;
  try {
    sellers = await Seller.find();
  } catch (err) {
    console.log(err);

    return res.status(500).json({ message: "Getting sellers failed" });
  }
  res.status(200).json({
    success: true,
    sellers,
  });
};
// @route GET /seller/:id
// @desc Get Seller Details
// @access Private admin
exports.getSellerDetails = async (req, res, next) => {
  let seller;
  try {
    seller = await Seller.findById(req.params.id);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: `Seller does not found with id:${req.params.id}` });
  }
  if (!seller) {
    return res
      .status(500)
      .json({ message: `Seller does not found with id:${req.params.id}` });
  }

  let products;

  try {
    products = await Product.find({ seller: seller._id });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: `Products does not found with id:${req.params.id}` });
  }

  seller.products = products;

  res.status(200).json({
    success: true,
    seller,
    totalProducts:products.length,
  });
};

// @route Delete /seller/:id
// @desc Delete Seller
// @access Private admin
exports.deleteSeller = async (req, res, next) => {
  let seller;
  try {
    seller = await User.findById(req.params.id);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: `Seller does not found with id:${req.params.id}` });
  }
  if (!seller) {
    return res
      .status(500)
      .json({ message: `Seller does not found with id:${req.params.id}` });
  }
  try {
    await seller.remove();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: `Error in Deleting Seller` });
  }

  res.status(200).json({
    success: true,
  });
};

// Get Totals
exports.getTotal = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    
  }  
};
