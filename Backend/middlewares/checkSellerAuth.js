const Seller = require("../models/Seller");

const {verifyJwtToken} = require("../utils/token")

exports.isAuthenticatedSeller = async(req,res,next)=>{
    try{
        const header = req.headers.authorization;
        if(!header){
            next({status:403,message:"Authorization token missing"})
            return;
        }
        const token = header.split("Bearer ")[1];

        if(!token){
            next({ status: 403, message:"Token not found" })
            return
        }
        const sellerId = verifyJwtToken(token,next);
        if(!sellerId){
            next({status:403,message:"JWT token not decoded"})
            return;
        }
        const seller = await Seller.findById(sellerId);
        if(!seller){
            next({status:404,message:"User not found."})
            return;
        }
        res.locals.seller = seller;
        next()
    }catch(err){
        next(err);
    }
}