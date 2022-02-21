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
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
})


module.exports = mongoose.model("Design", designSchema);