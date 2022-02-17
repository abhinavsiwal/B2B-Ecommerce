const express = require('express'); 
const router = express.Router();

const {signup,login,verifyOtp, allSellers, getSellerDetails, deleteSeller} = require('../controllers/seller-controller')
const {isAuthenticatedSeller} = require("../middlewares/checkSellerAuth");
const {isAdmin} = require("../middlewares/checkAdmin");


router.post("/signup",signup);
router.post("/login",login);
router.post("/verifyOtp",verifyOtp);
router.get("/sellers",isAuthenticatedSeller,isAdmin,allSellers);
router.get("/seller/:id",isAuthenticatedSeller,isAdmin,getSellerDetails);
router.delete("/seller/:id",isAuthenticatedSeller,isAdmin,deleteSeller);


module.exports=router;