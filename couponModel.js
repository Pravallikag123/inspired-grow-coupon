const mongoose = require('mongoose')


const couponSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true
  },
  occasionName: {
    type: String,
    required: true
  },
  couponCode: {
    type: String,
    required: true,
    unique: true
  },
  expireDate: {
    type: Date,
    required: true
  },
  couponValue: {
    type: Number,
    required: true
  },
  couponType: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  }
}, { timestamps: true })


const Coupon = mongoose.model('Coupon', couponSchema)

module.exports = Coupon
