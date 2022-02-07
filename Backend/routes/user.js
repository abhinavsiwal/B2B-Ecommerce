const express = require('express'); 
const router = express.Router();

const {signup,login,verifyOtp} = require('../controllers/user-controller')


router.post("/signup",signup);
router.post("/login",login);
router.post("/verifyOtp",verifyOtp);

module.exports=router;