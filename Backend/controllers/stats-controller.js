const Seller = require("../models/Seller");
const Product = require("../models/Product");
const User = require("../models/User");
const Order = require("../models/Order");

// Get Totals
exports.getTotal = async (req, res, next) => {
    let users;
    try {
      users = await User.find();
    } catch (err) {
      console.log(err);
      return res.status(500).json({message:"Error in getting users"})
    }  
    return res.status(200).json({
      totalUsers : users.length,
    })
  };
  