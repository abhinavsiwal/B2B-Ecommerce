const Product = require("../models/Product");
const cloudinary = require("cloudinary");
const APIFeatures = require("../utils/apiFeatures");

// @route POST /newProduct
// @desc Create a Product
// @access Seller

exports.newProduct = async (req,res,next)=>{
    // let images = [];
    // if(typeOf(req.body.images==="string")){
    //     images.push(req.body.images)
    // }else{
    //     images = req.body.images;
    // }
    // let imageLinks = [];
    // for(let i=0;i<images.length;i++){
    //     const result = await cloudinary.v2.uploader.upload(images[i],{
    //         folder:"products"
    //     })
    //     imagesLinks.push({
    //         public_id:result.public_id,
    //         url:result.secure_url
    //     })
    // }
    // req.body.images=imagesLinks;
    console.log(req.seller);
    req.body.seller=req.seller._id;
    let product;
    try {
        product = await Product.create(req.body);
    } catch (err) {

        console.log(err);
        next({status:403,message:"Error in Storing Product"})
        return;
kl    }
    res.status(201).json({
        success:true,
        product,
    })
}

// @route GEt /products
// @search ==> /products?keyword=apple
// @desc Get all products
// @access Public

exports.getProducts = async(req,res,next)=>{
    const queryStr = req.query;
    const resPerPage=2;//How many products we wanna display in one page
    const productsCount = await Product.countDocuments();

    const apiFeatures = new APIFeatures(Product.find(),queryStr).search().filter();
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

}

// @route GET /product/:id
// @desc Get product by productId
// @access Public

exports.getProductById = async (req,res,next)=>{
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
      res.status(200).json({success:true,product});
}


// @route PUT /product/:id
// @desc Update product by productId
// @access Seller

exports.updateProduct=async(req,res,next)=>{
    let product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404).json({message:"Product not found."})
    }
    // let images = [];
    // if (typeof req.body.images === "string") {
    //   images.push(req.body.images);
    // } else {
    //   images = req.body.images;
    // }
  
    // if (images !== undefined) {
    //   // Deleting images associated with the product
    //   for (let i = 0; i < product.images.length; i++) {
    //     const result = await cloudinary.v2.uploader.destroy(
    //       product.images[i].public_id
    //     );
    //   }
  
    //   let imagesLinks = [];
  
    //   for (let i = 0; i < images.length; i++) {
    //     const result = await cloudinary.v2.uploader.upload(images[i], {
    //       folder: "products",
    //     });
  
    //     imagesLinks.push({
    //       public_id: result.public_id,
    //       url: result.secure_url,
    //     });
    //   }
  
    //   req.body.images = imagesLinks;
    // }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });
    
      res.status(200).json({
        success: true,
        product,
      });
}



// @route DELETE /product/:id
// @desc Delete product by productId
// @access Seller

exports.deleteProduct = async(req,res,next)=>{
    const productId = req.params.id;
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
    // try {
    //   for (let i = 0; i < product.images.length; i++) {
    //     const result = await cloudinary.v2.uploader.destroy(
    //       product.images[i].public_id
    //     );
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  
    try {
      await product.remove();
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Product could not be deleted" });
    }
    res
      .status(200)
      .json({ success: true, message: "Product deleted Successfully" });
}