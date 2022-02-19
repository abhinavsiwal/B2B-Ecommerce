const mongoose = require('mongoose');

const referralSchema = new mongoose.Schema({
    referralId: {
        type: String,
        unique: true
      },
      referralLink: {
        type: String,
        unique: true
      },
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
      createdAt: {
        type: Date,
        default: Date.now()
      }
})

module.exports = mongoose.model("Referral",referralSchema)