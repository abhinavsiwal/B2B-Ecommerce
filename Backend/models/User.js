const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  storeName: {
    type: String,
  },
  pincode: {
    type: Number,
    required:true,
  },
  referralCode: {
    type: String,
  },
  phoneOtp: String,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
