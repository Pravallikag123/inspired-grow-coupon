const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const connectDB = require('./config/db')
const couponRoutes = require('./routes/couponRoutes')

const app = express()

app.use(express.json())


connectDB()


app.use('/api/admin/coupon', couponRoutes)


const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
