const Product = require("../models/Product");
const cloudinary = require("cloudinary");
const APIFeatures = require("../utils/apiFeatures");

// @route POST /newProduct
// @desc Create a Product
// @access Seller

exports.newProduct = async (req, res, next) => {
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }
  let imagesLinks = [];
  for (let i = 0; i < images.length; i++) {
    try {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
        fetch_format: "auto",
      });
      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    } catch (err) {
      console.log(err);
    }
  }
  req.body.images = imagesLinks;
  req.body.seller = req.seller._id;
  let product;
  try {
    product = await Product.create(req.body);
  } catch (err) {
    console.log(err);
    next({ status: 403, message: "Error in Storing Product" });
    return;
  }
  res.status(201).json({
    success: true,
    message: "Product Successfully added",
    product,
  });
};

// @route GEt /products
// @search ==> /products?keyword=apple
// @desc Get all products
// @access Public

exports.getProducts = async (req, res, next) => {
  const queryStr = req.query;
  const resPerPage = 2; //How many products we wanna display in one page
  const productsCount = await Product.countDocuments();

  const apiFeatures = new APIFeatures(Product.find(), queryStr)
    .search()
    .filter();
  let products;

  try {
    products = await apiFeatures.query;
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Fetching Products Failed" });
  }

  let filteredProductsCount = products.length;
  apiFeatures.pagination(resPerPage);

  res.status(200).json({
    success: true,
    // count: products.length,
    resPerPage,
    productsCount,
    filteredProductsCount,
    products: products.map((product) => product.toObject()),
  });
};

exports.getProductsByCategory=async(req,res,next)=>{
 let category = req.params.category;
 let products;
 try {
   products = await Product.find({
     category:category,
   })
 } catch (err) {
   console.log(err);
   return res.status(500).json({message:"No products found with this category."})
 } 
 res.status(200).json({
   success:true,
   products
 })
}

// @route GET /product/:id
// @desc Get product by productId
// @access Public

exports.getProductById = async (req, res, next) => {
  const productId = req.params.id;
  let product;
  try {
    product = await Product.findById(productId);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Fetching product failed" });
  }
  if (!product) {
    return res
      .status(500)
      .json({ message: "Could not find product for this id" });
  }
  res
    .status(200)
    .json({ success: true, message: "Product Getted Successfully", product });
};

// @route PUT /product/:id
// @desc Update product by productId
// @access Seller

exports.updateProduct = async (req, res, next) => {
  const productId = req.params.id;
  const sellerId = req.seller._id;
  console.log(productId);
  let product;
  try {
    product = await Product.findById(productId);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Something went wrong in getting Product" });
  }
  if (!product) {
    return res
      .status(404)
      .json({ message: "Could not find product for this id" });
  }


  const bool = product.seller.toString()!==sellerId.toString();
  if(bool){
      console.log(product.seller.toString(),"#####SELLER");
      console.log(sellerId.toString(),"@@@@@@@@seller");
      return res.status(401).json({message:"You are not allowed to update this product"})
    }
  

  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting images associated with the product
    for (let i = 0; i < product.images.length; i++) {
      const result = await cloudinary.v2.uploader.destroy(
        product.images[i].public_id
      );
    }

    let imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  try {

    product = await Product.findByIdAndUpdate(productId, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });    
  } catch (err) {
    console.log(err);
    return res.status(500).json({message:"Error in Updating product"})
  }


  res.status(200).json({
    success: true,
    message:"Product Updated Successfully",
    product,
  });
};

// @route Get /seller
// @desc Get all products by seller.
// @access Seller

exports.getProductBySellerId = async (req, res, next) => {
  const sellerId = req.seller._id;
  console.log(sellerId);
  let products;
  try {
    products = await Product.find({ seller: sellerId });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Fetching products failed, please try again later" });
  }
  res.status(200).json({ success: true, products });
};

// @route DELETE /product/:id
// @desc Delete product by productId
// @access Seller

exports.deleteProduct = async (req, res, next) => {
  const productId = req.params.id;
  const sellerId = req.seller._id;
  let product;
  try {
    product = await Product.findById(productId);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Something went wrong in delete Product" });
  }
  if (!product) {
    return res
      .status(500)
      .json({ message: "Could not find product for this id" });
  }
  // Deleting Images associated with the product

  
  const bool = product.seller.toString()!==sellerId.toString();
if(bool){
    console.log(product.seller.toString(),"#####SELLER");
    console.log(sellerId.toString(),"@@@@@@@@seller");
    return res.status(401).json({message:"You are not allowed to delete this product"})
  }

  try {
    for (let i = 0; i < product.images.length; i++) {
      const result = await cloudinary.v2.uploader.destroy(
        product.images[i].public_id
      );
    }
  } catch (error) {
    console.log(error);
  }

  try {
    await product.remove();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Product could not be deleted" });
  }
  res
    .status(200)
    .json({ success: true, message: "Product deleted Successfully" });
};



