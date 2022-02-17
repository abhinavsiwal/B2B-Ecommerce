const express = require('express'); 
const router = express.Router();

const {signup,login,verifyOtp} = require('../controllers/seller-controller')
const {isAuthenticatedSeller} = require("../middlewares/checkSellerAuth");
const {isAdmin} = require("../middlewares/checkAdmin");


router.post("/signup",signup);
router.post("/login",login);
router.post("/verifyOtp",verifyOtp);


module.exports=router;