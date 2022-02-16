const express = require('express');
const router = express.Router();
const {createOrder,paymentCallback,usersOrders,sellerOrders,getSingleOrder,updateOrder} = require("../controllers/order-controller");
const {isAuthenticatedUser} = require("../middlewares/checkUserAuth");
const {isAuthenticatedSeller} = require("../middlewares/checkSellerAuth");

router.post('/createOrder',isAuthenticatedUser,createOrder);
router.post('/payment/status',isAuthenticatedUser,paymentCallback)
router.get("/user",isAuthenticatedUser,usersOrders);
router.get("/seller",isAuthenticatedSeller,sellerOrders);
router.get("/orderDetail/:id",getSingleOrder);
router.put("/updateOrder/:id",isAuthenticatedSeller,updateOrder)
module.exports = router;