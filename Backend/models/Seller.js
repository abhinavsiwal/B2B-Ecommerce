const mongoose = require("mongoose");

const sellerSchema = new Schema({
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
  phoneOtp: String,
  products: [
    {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Product",
    },
  ],
});

module.exports = mongoose.model("Seller", sellerSchema);
