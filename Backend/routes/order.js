const express = require('express');
const router = express.Router();
const {createOrder,paymentCallback} = require("../controllers/payment-controller");

router.post('/createOrder',createOrder);
router.post('/payment/callback',paymentCallback)
module.exports = router;