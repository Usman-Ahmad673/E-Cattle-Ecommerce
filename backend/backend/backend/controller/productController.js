const Product = require('../model/productModel')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncError = require('../middleware/catchAsyncError')
// const ApiFeatures = require('../utils/apifeatures')
const cloudinary = require('cloudinary')

//Create Product -- Admin
exports.createProduct = catchAsyncError(async (req, res, next) => {
    // const type = typeof req.body.cattle_id;
    // console.log(type);
    console.log('1');
    const myCloud = await cloudinary.v2.uploader.upload(req.body.images, {
        folder: "marham-products",
        width: 150,
        crop: "scale",
    });

    console.log('2');

    const images = [];

    console.log('3');

    images.push({
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
    });

    console.log('4');


    req.body.images = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
    };


    console.log('5');

    console.log('Images Added Successfully');

    console.log('6');

    // req.body.images = imagesLink[0].url
    console.log('6');

    console.log(req.body);

    console.log('7');

    // const { name, description, price, images, category, stock } = req.body;


    const product = await Product.create(req.body);
    // const product = await Product.create({
    //     name,
    //     description,
    //     price,
    //     images,
    //     category,
    //     stock,
    // });

    console.log('8');
    res.status(201).json({
        success: true,
        product
    })
})

//Get All Product
exports.getAllProducts = catchAsyncError(async (req, res, next) => {
    // return next(new ErrorHandler('This is my temp error' , 500))
    // const resultPerPage = 10

    const productCount = await Product.countDocuments()

    // ApiFeatures(Product.find() , req.query.keyword)
    // const apiFeatures = new ApiFeatures(Product.find() , req.query).search().filter().pagination(resultPerPage)
    // const apiFeatures = new ApiFeatures(Product.find() , req.query).search().filter()


    // let products = await apiFeatures.query


    // // const products = await apiFeatures.query;

    // let filteredProductsCount = products.length;

    // apiFeatures.pagination(resultPerPage);

    let products = await Product.find();

    console.log(products);

    res.status(200).json({
        message: "Successfully Get All Data",
        products,
        productCount
    })

})

//Get Admin Product
exports.getAdminProducts = catchAsyncError(async (req, res, next) => {

    const products = await Product.find();

    // const productCount = await Product.countDocuments()

    res.status(200).json({
        message: "Successfully Get All Data",
        products,
        // productCount,
    })

})




//Get Product Details
exports.getProductDetails = catchAsyncError(async (req, res, next) => {

    const product = await Product.findById(req.params.id)
    if (!product) {
        return next(new ErrorHandler('Product NOt Found', 404))
    }
    console.log('here');

    console.log(product);

    res.status(200).json({
        success: true,
        product,
        // productCount
    })

})



//Update Product --Admin
exports.updateProduct = catchAsyncError(async (req, res, next) => {
    // let id = req.params.id
    let product = await Product.findById(req.params.id)
    if (!product) {
        return next(new ErrorHandler('Product NOt Found', 404))
    }

    //Images Updated Here
    let images = []

    if (typeof req.body.images === "string") {
        images.push(req.body.images)
    }
    else {
        images = req.body.images
    }

    if (images !== undefined) {
        //Update images in cloudinary
        for (let i = 0; i < product.images.length; i++) {
            await cloudinary.v2.uploader.destroy(product.images[i].public_id)
        }
        const imagesLink = []

        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: "products images"
            })
            imagesLink.push({
                public_id: result.public_id,
                url: result.secure_url
            })
        }
        req.body.images = imagesLink
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: "true",
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true,
        message: "Successfully Updated Product",
        product
    })

})



//Delete Product --Admin
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
    // let id = req.params.id
    // const product = await Product.findById(req.params.id)
    const product = await Product.findByIdAndDelete(req.params.id)
    console.log(product)
    if (!product) {
        return next(new ErrorHandler('Product NOt Found', 404))
    }

    console.log('product images delete from cloudinary')

    //Del images from cloudinary
    // for (let i = 0; i < product.images.length; i++) {
    //     await cloudinary.v2.uploader.destroy(product.images[i])
    // }

    console.log('product images delete from cloudinary successfully')


    // await Product.findByIdAndDelete(req.params.id)
    console.log('product deleted  successfully')
    res.status(200).json({
        success: true,
        message: "Successfully Deleted Product",
    })

})







//Create New Review or Update the review
exports.createReviewProduct = catchAsyncError(async (req, res, next) => {
    // let id = req.params.id
    const { rating, comment, productId } = req.body
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }
    // const product = await Product.findById(productId)
    const product = await Product.findById(productId)
    // console.log(product._id);
    // console.log(product.reviews[0].user);
    // console.log(product.reviews[0]._id);
    // console.log(product.reviews[1].user);
    // console.log(product.reviews[1]._id);
    const isReviewed = product.reviews.find((rev) => rev.user.toString() === req.user._id.toString())
    console.log(`hello`);
    console.log(isReviewed);

    if (isReviewed) {
        product.reviews.forEach(rev => {
            if (rev.user.toString() === req.user._id.toString())
                (rev.rating = rating),
                    (rev.comment = comment)
            // (rev.rating = review.rating) , 
            // (rev.comment = review.comment)

        })
    }
    else {
        product.reviews.push(review)
        product.numbOfReviews = product.reviews.length
    }

    let avg = 0
    product.reviews.forEach(rev => {
        avg += rev.rating
    })
    const tofix = avg / product.reviews.length
    product.ratings = tofix.toFixed(1)

    await product.save({ validateBeforeSave: false })
    res.status(200).json({
        success: true
    })

})









//Get products reviews
exports.getAllReviewProduct = catchAsyncError(async (req, res, next) => {

    const product = await Product.findById(req.query.id)

    if (!product) {
        return next(new ErrorHandler("Product not Found", 404))
    }

    const reviews = product.reviews.filter(rev => rev._id.toString())

    res.status(200).json({
        success: true,
        reviews
    })

})





//Delete product review
exports.deleteReviewProduct = catchAsyncError(async (req, res, next) => {

    const product = await Product.findById(req.query.productId)

    if (!product) {
        return next(new ErrorHandler("Product not Found", 404))
    }

    const reviews = product.reviews.filter(rev => rev._id.toString() !== req.query.id.toString())
    console.log(reviews);
    let avg = 0
    reviews.forEach(rev => {
        avg += rev.rating
    })
    const tofix = avg / reviews.length
    const ratings = product.ratings = tofix.toFixed(1)
    console.log(ratings);
    const numbOfReviews = reviews.length

    console.log(numbOfReviews);

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews, ratings, numbOfReviews
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    console.log("Done");


    res.status(200).json({
        success: true,
    })

})




