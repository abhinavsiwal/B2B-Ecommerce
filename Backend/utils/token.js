const jwt = require("jsonwebtoken");

exports.createJwtToken = (payload)=>{
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "365d",
      });
      return token;
}

exports.verifyJwtToken = (token,next)=>{
    try{
        const {id} = jwt.verify(token,process.env.JWT_SECRET);
        return id;
    }catch(err){
        next(err);
    }
}