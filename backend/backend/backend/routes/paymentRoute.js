const express = require('express')
const { sendStripeApiKey , processPayment } = require('../controller/paymentController')
const router = express.Router()
// const { isAuthenticatedUser } = require('../middleware/Auth')


router.route("/process/payment").post(processPayment)
router.route("/stripeapikey").get(sendStripeApiKey);
// router.route("/process/payment").post(isAuthenticatedUser , processPayment)
// router.route("/stripeapikey").get(isAuthenticatedUser, sendStripeApiKey);


module.exports = router
