const express = require('express')
const router = express.Router()
const Coupon = require('../models/couponModel')


router.post('/coupon', async (req, res) => {
  const { customerName, occasionName, couponCode, expireDate, couponValue, couponType, description } = req.body;
  
  try {
    const coupon = new Coupon({
      customerName,
      occasionName,
      couponCode,
      expireDate,
      couponValue,
      couponType,
      description
    })
    
    const savedCoupon = await coupon.save();
    res.status(201).json(savedCoupon)
  } catch (err) {
    res.status(400).json({ message: 'Failed to create coupon', error: err.message })
  }
})


router.get('/add', async (req, res) => {
  try {
    const coupons = await Coupon.find()
    res.status(200).json(coupons)
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch coupons', error: err.message })
  }
})


router.get('/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const coupon = await Coupon.findById(id)
    
    if (!coupon) {
      return res.status(404).json({ message: 'Coupon not found' })
    }
    
    res.status(200).json(coupon)
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch coupon', error: err.message })
  }
})


router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { customerName, occasionName, couponCode, expireDate, couponValue, couponType, description } = req.body;
  
  try {
    const updatedCoupon = await Coupon.findByIdAndUpdate(
      id,
      { customerName, occasionName, couponCode, expireDate, couponValue, couponType, description },
      { new: true } 
    )
    
    if (!updatedCoupon) {
      return res.status(404).json({ message: 'Coupon not found' })
    }
    
    res.status(200).json(updatedCoupon)
  } catch (err) {
    res.status(500).json({ message: 'Failed to update coupon', error: err.message })
  }
})


router.delete('/:id', async (req, res) => {
  const { id } = req.params
  
  try {
    const deletedCoupon = await Coupon.findByIdAndDelete(id)
    
    if (!deletedCoupon) {
      return res.status(404).json({ message: 'Coupon not found' })
    }
    
    res.status(200).json({ message: 'Coupon deleted successfully' })
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete coupon', error: err.message })
  }
})

module.exports = router
