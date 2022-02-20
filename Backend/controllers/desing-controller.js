const Design = require('../models/Design');
const cloudinary = require("cloudinary");


// @route POST /newDesign
// @desc Create a Design Request
// @access User

exports.newDesign = async(req,res,next)=>{
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
          folder: "design",
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
    req.body.user = req.user._id;

    let design;
    try {
        design = await Design.create(req.body);
    } catch (err) {
        console.log(err);
        return res.status(500).json({message:"Error in storing Design"})
    }
    res.status(201).json({
        success: true,
        message: "Design request Successfully added",
        design,
      });
}

// @route GEt /designs
// @search ==> /design
// @desc Get all products
// @access Public

exports.getDesigns = async(req,res,next)=>{
    let designs;
    try {
        designs = await Design.find();
    } catch (err) {
        console.log(err);
        return res.status(500).json({message:"Error in getting designs"})
    }
    res.status(201).json({
        success: true,
        designs,
      });
}


// @route GET /design/:id
// @desc get design detail
// @access Public

exports.getDesignDetails = async(req,res,next)=>{
    let design;
    try {
        design= await Design.findById(req.params.id);
    } catch (err) {
        console.log(err);
        return res.status(500).json({message:"Error in getting design"})
    }

    if(!design){
        res.status(500).json({
            message:"Couldn't found design with this id"
        })
    }

    res.status(200).json({
        success:true,
        design,
    })
}