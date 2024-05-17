const Order = require('../model/orderModels')
const Product = require('../model/productModel')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncError = require('../middleware/catchAsyncError')


//Create new Order
exports.newOrder = catchAsyncError(async (req, res, next) => {
    console.log('new Order', req.body);
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        user_id
    } = req.body
    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user_id: user_id
        // user:"6410ccdf14416c61087e1890"
    })

    console.log('order', order);

    res.status(201).json({
        success: true,
        order
    })
})


//get Single Order / Details
exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate("name email")
    // const order = await Order.findById(req.params.id).populate("user","name email")

    if (!order) {
        return next(new ErrorHandler("Order not found with this id", 404))
    }

    res.status(201).json({
        success: true,
        order
    })
})


//get Logged in User Orders
exports.myOrders = catchAsyncError(async (req, res, next) => {
    // const orders = await Order.find({ user : req.user._id })
    const orders = await Order.find({ user_id: req.params.id })


    console.log(orders);

    res.status(201).json({
        success: true,
        orders
    })
})


//get All Orders
exports.getAllOrders = catchAsyncError(async (req, res, next) => {
    const order = await Order.find()

    let totalAmount = 0
    order.forEach((order) => {
        totalAmount += order.totalPrice
    });

    res.status(201).json({
        success: true,
        totalAmount,
        order
    })
})


//update Order Status
exports.updateOrderStatus = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id)

    if (!order) {
        return next(new ErrorHandler("Order not found with this id", 404))
    }


    if (order.orderStatus === "Delivered") {
        return next(new ErrorHandler("You Have Already Delivered This Product", 404))
    }

    if (order.orderStatus === "Shipped") {
        order.orderItems.forEach(async (order) => {
            await updateStock(order.product, order.quantity)
        })
    }


    order.orderStatus = req.body.status

    if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now()
    }

    await order.save({ validatorBeforeSave: false })
    res.status(201).json({
        success: true,
        order
    })
})

async function updateStock(id, quantity) {
    const product = await Product.findById(id)

    product.stock -= quantity

    await product.save({ validatorBeforeSave: false })
}


//Delete  Order
exports.deleteOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findByIdAndDelete(req.params.id)


    if (!order) {
        return next(new ErrorHandler("Order not found with this id", 404))
    }

    res.status(201).json({
        success: true
    })
})
