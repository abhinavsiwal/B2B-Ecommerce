const mongoose = require("mongoose");

const designSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
    },
    description:{
        type: String,
        required: true,
        trim: true,
    },
    category:{
        type: String,
       
    },
    images: [
        {
          public_id: {
            type: String,
            // required: true,
          },
          url: {
            type: String,
            // required: true,
          },
        },
      ],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    }
})


module.exports = mongoose.model("Product", productSchema);