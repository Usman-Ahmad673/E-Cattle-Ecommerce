const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookie_parser = require('cookie-parser')
const fileUpload = require('express-fileupload')

const cors = require('cors') 
// const dotenv = require('dotenv')



const errMiddleware = require('./middleware/error')




app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(cookie_parser())
// app.use(
//     bodyParser.urlencoded({
//         extended: true,
//     }),
// );
app.use(fileUpload({
    limits: { fileSize: 350 * 1024 * 1024 }, // Adjust the limit as needed
}));
app.use(bodyParser.urlencoded({ extended: true }));


//Routes
const cattleRoute = require('./routes/cattleRoutes')
const userRoute = require('./routes/userRoute')
const doctorRoute = require('./routes/doctorRoutes')
const productRoute = require('./routes/productRoute')
const paymentRoute = require('./routes/paymentRoute')
const orderRoute = require('./routes/orderRoute')


app.use('/api/v1',cattleRoute)
app.use('/api/v1',userRoute)
app.use('/api/v1',doctorRoute)
app.use('/api/v1',productRoute)
app.use('/api/v1',paymentRoute)
app.use('/api/v1',orderRoute)




//MiddleWare for Error
app.use(errMiddleware)

module.exports = app