const Razorpay = require("razorpay");
const uniqId = require("uniqid");
const crypto = require("crypto");
const Order = require("../models/Order");

let instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: "5IleBUFesuSkE49WgfxKzXL2",
});

exports.createOrder = async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
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

  let payAmount = req.body.totalPrice * 100;
  console.log(totalPrice);

  let options = {
    amount: payAmount, // amount in the smallest currency unit
    currency: "INR",
    receipt: uniqId(),
  };

  const orderDetail = await instance.orders.create(options);

  if (!orderDetail) return res.status(500).send("Some error occured");

  res.status(200).json({ success: true, orderDetail, dbOrderId: order._id });
};

exports.paymentCallback = async (req, res, next) => {
  const { paymentInfo, dbOrderId } = req.body;

  const {
    orderCreationId,
    razorpayPaymentId,
    razorpayOrderId,
    razorpaySignature,
  } = paymentInfo;
  console.log(paymentInfo);
  console.log(dbOrderId);
  try {
    const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
    shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

    const digest = shasum.digest("hex");
    if (digest !== razorpaySignature)
      return res.status(400).json({ msg: "Transaction not legit!" });
    let order;
    try {
      // order = await Order.findByIdAndUpdate(dbOrderId,paymentInfo)
      order = await Order.findById(dbOrderId);
      order.paymentInfo = paymentInfo;
      await order.save();
    } catch (err) {
      console.log(err);
    }

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
    order = await Order.findById(req.params.id).populate("user", "name email");
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Failed Getting Orders" });
  }
  if (!order) {
    return res.status(404).json({ message: "No order found with this id" });
  }
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
