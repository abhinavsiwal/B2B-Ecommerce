const Seller = require("../models/Seller");

const {verifyJwtToken} = require("../utils/token")

exports.isAuthenticatedSeller = async(req,res,next)=>{
    try{
        const header = req.headers.authorization;
        if(!header){
            return res.status(403).json({message:"Authorization token missing"})
        
        }
        const token = header.split("Bearer ")[1];

        if(!token){
            return res.status(403).json({message:"Token not found"})
        
        }
        const sellerId = verifyJwtToken(token,next);
       
        if(!sellerId){
            console.log("Jwt token not decoded");
            return res.status(403).json({message:"Jwt token not decoded."})
        }
        const seller = await Seller.findById(sellerId);
        if(!seller){
            return res.status(404).json({message:"Seller not found"})
        }
        req.seller = seller;
        next()
    }catch(err){
        next(err);
    }
}