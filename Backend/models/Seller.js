const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
    trim: true,
    unique: true,
  },
  storeName: {
    type: String,
  },
  pincode: {
    type: Number,
    required: true,
  },
  referralCode: {
    type: String,
  },
  phoneOtp: String,
  products: [
    {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Product",
    },
  ],
  role:{
    type:String,
    default:'seller',
},
createdAt:{
  type: Date,
  default: Date.now,
}
});

module.exports = mongoose.model("Seller", sellerSchema);
