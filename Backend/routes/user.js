const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  verifyOtp,
  updateProfile,
  getAllUsers,
  deleteUser,
  getUserDetails,
} = require("../controllers/user-controller");
const { isAuthenticatedUser } = require("../middlewares/checkUserAuth");
const { isAuthenticatedSeller } = require("../middlewares/checkSellerAuth");
const { isAdmin } = require("../middlewares/checkAdmin");

router.post("/signup", signup);
router.post("/login", login);
router.post("/verifyOtp", verifyOtp);
router.get("/user", isAuthenticatedUser, getUserDetails);
router.put("/update", isAuthenticatedUser, updateProfile);
router.get("/users", isAuthenticatedSeller, isAdmin, getAllUsers);
router.get("/user/:id",isAuthenticatedSeller, isAdmin, getUserDetails);
router.delete("/user/:id", isAuthenticatedSeller, isAdmin, deleteUser);
module.exports = router;
