const express = require('express');
const router = express.Router();
const {createOrder,paymentCallback} = require("../controllers/payment-controller");
const {isAuthenticatedUser} = require("../middlewares/checkUserAuth");


router.post('/createOrder',isAuthenticatedUser,createOrder);
router.post('/payment/status',isAuthenticatedUser,paymentCallback)
module.exports = router;