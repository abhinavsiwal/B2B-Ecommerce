const User = require("../models/User");

const {verifyJwtToken} = require("../utils/token")

exports.isAuthenticatedUser = async(req,res,next)=>{
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
        const userId = verifyJwtToken(token,next);
        if(!userId){
            next({status:403,message:"JWT token not decoded"})
            return;
        }
        const user = await User.findById(userId);
        if(!user){
            next({status:404,message:"User not found."})
            return;
        }
        res.locals.user = user;
        next()
    }catch(err){
        next(err);
    }
}