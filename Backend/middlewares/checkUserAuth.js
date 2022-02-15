const User = require("../models/User");

const {verifyJwtToken} = require("../utils/token")

exports.isAuthenticatedUser = async(req,res,next)=>{

    try{
        const header = req.headers.authorization;
        if(!header){
            return res.status(403).json({message:"Authorization token missing"})
        }
        const token = header.split("Bearer ")[1];

        if(!token){
            console.log("token not found");
            return res.status(403).json({message:"Token not found"})
        }
        const userId = verifyJwtToken(token,next);
        if(!userId){
            console.log("Jwt token not decoded");
            return res.status(403).json({message:"Jwt token not decoded."})
        }
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({message:"Seller not found"})
        }
        req.user = user;
        next()
    }catch(err){
        next(err);
    }
}