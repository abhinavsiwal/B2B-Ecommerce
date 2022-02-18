const express = require('express');
const router = express.Router();
const {createOrder,paymentCallback,usersOrders,sellerOrders,getSingleOrder,updateOrder,allOrders,sellerOrderDetails} = require("../controllers/order-controller");
const {isAuthenticatedUser} = require("../middlewares/checkUserAuth");
const {isAuthenticatedSeller} = require("../middlewares/checkSellerAuth");
const {isAdmin} = require("../middlewares/checkAdmin")
router.post('/createOrder',isAuthenticatedUser,createOrder);
router.post('/payment/status',isAuthenticatedUser,paymentCallback)
router.get("/user",isAuthenticatedUser,usersOrders);
router.get("/seller",isAuthenticatedSeller,sellerOrders);
router.get("/orderDetail/:id",getSingleOrder);
router.get("/sellerOrderDetails/:id",isAuthenticatedSeller,sellerOrderDetails)
router.put("/updateOrder/:id",isAuthenticatedSeller,updateOrder)

router.get("/orders",isAuthenticatedSeller,isAdmin,allOrders)
module.exports = router;