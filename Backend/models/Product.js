const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxLength: 100,
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
        "Electronics",
        "Cameras",
        "Laptops",
        "Mobiles",
        "Accessories",
        "Headphones",
        "Food",
        "Books",
        "Clothes",
        "Shoes",
        "Beauty",
        "Health",
        "Sports",
        "Outdoor",
        "Home",
      ],
      message: "Please select correct category for product",
    },
  },
  stock: {
    type: Number,
    required: true,
    maxLength: 5,
    default: 0,
  },
  seller: {
      type:mongoose.Types.ObjectId,
      ref:"Seller",
      required:true,
  },
  createdAt:{
      type:Date,
      default:Date.now,
  }
});

module.exports = mongoose.model("Product", productSchema);