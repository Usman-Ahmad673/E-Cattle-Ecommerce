const catchAsyncErrors = require('../middleware/catchAsyncError')
const dotenv = require('dotenv').config();


const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)


exports.processPayment = catchAsyncErrors(async (req, res, next) => {
    console.log('Payment Method');
    console.log('Payment Method Amount: ', req.body.amount);
    const myPayment = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "pkr",
        metadata: {
            company: "Ecommerce",
        },
    });

    console.log('Payment Method Response');
    res
        .status(200)
        .json({ success: true, client_secret: myPayment.client_secret });
});

exports.sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {
    console.log('Stripte Api Key Method', process.env.STRIPE_API_KEY);
    res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});