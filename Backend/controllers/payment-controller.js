const Razorpay = require("razorpay");
const uniqId = require('uniqid');



let instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: "5IleBUFesuSkE49WgfxKzXL2",
});


exports.createOrder= async(req,res,next)=>{

    let payAmount = req.body.totalAmount*100;

    let options = {
        amount: payAmount,  // amount in the smallest currency unit
        currency: "INR",
        receipt: uniqId()
      };

      instance.orders.create(options, function(err, order) {
        if(err){
            console.log(err);
            return res.status(500).json({
                error:err,
            })

        }
        res.status(200).json({success:true,order})
      }); 
}

exports.paymentCallback = (req,res,next)=>{

}