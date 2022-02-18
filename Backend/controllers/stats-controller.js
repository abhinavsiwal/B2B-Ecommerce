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
    let products;
    try {
      products = await Product.find();
    } catch (err) {
      console.log(err);
      return res.status(500).json({message:"Error in getting Products"})
    }
    let sellers;
    try {
      sellers = await Seller.find();
    } catch (err) {
      console.log(err);
      return res.status(500).json({message:"Error in getting Sellers"})
    }
    
    let orders;
    try {
      orders = await Order.find();
    } catch (err) {
      console.log(err);
      return res.status(500).json({message:"Error in getting Orders"});
    }
    
    let totalSales=0;
    orders.forEach((order) => {
      totalSales += order.totalPrice;
    });

    return res.status(200).json({
      totalUsers : users.length,
      totalProducts:products.length,
      totalSellers:sellers.length,
      totalOrders:orders.length,
      totalSales:totalSales,
    })
  };
  