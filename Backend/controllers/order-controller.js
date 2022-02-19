const Razorpay = require("razorpay");
const uniqId = require("uniqid");
const crypto = require("crypto");
const Order = require("../models/Order");
const User = require("../models/User");
const Product = require("../models/Product");

let instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: "5IleBUFesuSkE49WgfxKzXL2",
});

exports.createOrder = async (req, res, next) => {
  let payAmount = req.body.totalPrice * 100;

  let options = {
    amount: payAmount, // amount in the smallest currency unit
    currency: "INR",
    receipt: uniqId(),
  };

  const orderDetail = await instance.orders.create(options);

  if (!orderDetail) return res.status(500).send("Some error occured");

  res.status(200).json({ success: true, orderDetail });
};

exports.paymentCallback = async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
    dbOrderId,
  } = req.body;

  const {
    orderCreationId,
    razorpayPaymentId,
    razorpayOrderId,
    razorpaySignature,
  } = paymentInfo;

  try {
    const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
    shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

    const digest = shasum.digest("hex");
    if (digest !== razorpaySignature)
      return res.status(400).json({ msg: "Transaction not legit!" });

    let order;
    try {
      order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        user: req.user._id,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Order Failed" });
    }

    try {
      order = await Order.findById(order._id);
      order.paymentInfo = paymentInfo;
      order.paidAt = Date.now();
      await order.save();
    } catch (err) {
      console.log(err);
    }

    orderItems.forEach( async(item) => {
      // console.log(item);
      let product;
      try {
        console.log(item.id);
        product = await Product.findById(item.id);
        console.log(product);
        product.stock -= item.quantity;
        product.save();
      } catch (err) {
        console.log(err, "$$$$$$$$$$$$44");
      }
    
    });

    res.json({
      message: "Order Placed Successfully",
      orderId: razorpayOrderId,
      paymentId: razorpayPaymentId,
    });
  } catch (err) {
    console.log(err);
  }
};

// Get Single Order
exports.getSingleOrder = async (req, res, next) => {
  let order;
  try {
    order = await Order.findById(req.params.id);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Failed Getting Orders" });
  }
  if (!order) {
    return res.status(404).json({ message: "No order found with this id" });
  }

  let userId = order.user;
  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    console.log(err);
    return res.status(404).json({ message: "Getting User Details failed" });
  }

  order.user = user;

  return res.status(200).json({
    success: true,
    order,
  });
};

// Get Logged In User Orders
exports.usersOrders = async (req, res, next) => {
  let orders;
  try {
    orders = await Order.find({ user: req.user._id });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Failed Getting Orders" });
  }
  if (!orders) {
    return res.status(404).json({ message: "No order found with this id" });
  }

  res.status(200).json({
    success: true,
    orders,
  });
};

// @route    GET api/orders/:seller_id
// @desc     show orders on the DashBoard
// @access   Private
exports.sellerOrders = async (req, res, next) => {
  let sellerId = req.seller._id;

  let orders;
  try {
    orders = await Order.find({
      "orderItems.seller": sellerId,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Failed Getting Orders" });
  }

  if (!orders) {
    return res.status(404).json({ message: "No order found with this id" });
  }

  for (let i = 0; i < orders.length; i++) {
    let userId = orders[i].user;
    let user;
    try {
      user = await User.findById(userId);
    } catch (err) {
      console.log(err);
      return res.status(404).json({ message: "Getting User Details failed" });
    }

    orders[i].user = user;
  }

  // let sellerOrders=[];

  // orders.forEach(order=>{
  //   console.log(order);
  //   order.orderItems.forEach(item=>{
  //     if(item.seller.toString()===sellerId.toString()){
  //       let newOrder ={};
  //       newOrder.user =order.user;
  //       newOrder.orderStatus = order.orderStatus;
  //       newOrder.createdAt = order.createdAt;
  //       newOrder.orderItems = item;
  //       sellerOrders.push(newOrder);
  //     }
  //   })
  // })
  orders.sellerOrders = [];
  let seller = {};
  let orders1 = [];
  orders.forEach((order) => {
    // console.log(order);
    let sellerOrders = order.orderItems.filter(
      (item) => item.seller.toString() === sellerId.toString()
    );
    let totalAmount = 0;
    // console.log(sellerOrders);
    sellerOrders.forEach((item) => {
      totalAmount += item.quantity * item.price;
    });
    seller = {
      ...order._doc,
      orderItems: sellerOrders,
      totalPrice: totalAmount,
    };
    orders1.push(seller);
  });
  // console.log(sellerOrders);
  // console.log(sellerOrders.length);
  // console.log(orders1);
  // console.log(orders);

  res.status(200).json({
    success: true,
    orders: orders1,
  });
};

exports.sellerOrderDetails = async (req, res, next) => {
  let sellerId = req.seller._id;
  let order;
  try {
    order = await Order.findById(req.params.id);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Failed Getting Orders" });
  }
  if (!order) {
    return res.status(404).json({ message: "No order found with this id" });
  }

  let userId = order.user;
  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    console.log(err);
    return res.status(404).json({ message: "Getting User Details failed" });
  }

  order.user = user;

  let sellerOrderItems = {};
  let totalAmount = 0;
  sellerOrderItems = order.orderItems.filter(
    (item) => item.seller.toString() === sellerId.toString()
  );
  sellerOrderItems.forEach((item) => {
    totalAmount += item.quantity * item.price;
  });
  // console.log(sellerOrder);
  order.orderItems = sellerOrderItems;
  order.totalPrice = totalAmount;
  // console.log(order);

  res.status(200).json({
    success: true,
    order,
  });
};

//   Get all orders =>Admin
exports.allOrders = async (req, res, next) => {
  let orders;
  try {
    orders = await Order.find();
  } catch (err) {
    console.log(err);
  }
  if (!orders) {
    return res.status(404).json({ message: "No order found with this id" });
  }
  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });
  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
};

// Update Order Status
exports.updateOrder = async (req, res, next) => {
  console.log(req.body);
  let order;
  try {
    order = await Order.findById(req.params.id);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Failed Getting Orders" });
  }

  if (order.orderStatus === "Delivered") {
    return res
      .status(404)
      .json({ message: "You have already delivered the order" });
  }
  (order.orderStatus = req.body.status), (order.deliveredAt = Date.now());

  try {
    await order.save();
  } catch (err) {
    console.log(err);
    return res
      .status(404)
      .json({ message: "Something went wrong in saving order" });
  }

  res.status(200).json({
    success: true,
    message: "Order Status Changed",
  });
};
