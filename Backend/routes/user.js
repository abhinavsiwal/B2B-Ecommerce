const express = require('express'); 
const router = express.Router();

const {signup,login,verifyOtp,getUserDetails,updateProfile} = require('../controllers/user-controller')
const {isAuthenticatedUser} = require("../middlewares/checkUserAuth");

router.post("/signup",signup);
router.post("/login",login);
router.post("/verifyOtp",verifyOtp);
router.get("/user",isAuthenticatedUser,getUserDetails);
router.put("/update",isAuthenticatedUser,updateProfile);

module.exports=router;