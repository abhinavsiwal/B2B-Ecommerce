const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    maxLength: 5,
    default: 0,
  },
  description: {
    type: String,
    required: true,
  },
  images: [
    {
      public_id: {
        type: String,
        // required: true,
      },
      url: {
        type: String,
        // required: true,
      },
    },
  ],
  category: {
    type: String,
    required: true,
    enum: {
      values: [
        "Shirt",
        "T Shirt",
        "Joggers",
        "Vests",
        "Knitwear",
        "Shorts",
        "Winterwear",
        "Sportswear",
      ],
      message: "Please select correct category for product",
    },
  },
  idealFor: {
    type: String,
    required: true,
    enum: {
      values: ["Both", "Men", "Women"],
      message: "Please select correct category for product",
    },
  },
  stock: {
    type: Number,
    required: true,
    maxLength: 5,
    default: 0,
  },
  fabric: {
    type: String,

    trim: true,
  },
  color: {
    type: String,
    trim: true,
  },
  size: {
    type: String,

    trim: true,
  },
  design: {
    type: String,
    required: true,
    trim: true,
  },
  brand: {
    type: String,
    required: true,
    trim: true,
  },
  setOfProducts:{
    type:Number,
    required:true,
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seller",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
