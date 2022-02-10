const Product = require("../models/Product");
const cloudinary = require("cloudinary");

// @route POST /newProduct
// @desc Create a Product
// @access Public

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

const getProducts = (req,res,next)=>{
    res.status(200).json({
        success:true,
        message:"This route will show all products in database",
    })
}

exports.getProducts = getProducts;