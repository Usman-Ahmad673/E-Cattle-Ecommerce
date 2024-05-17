const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");
// const dotenv = require('dotenv');

exports.isAuthenticatedUser = catchAsyncError( async(req,res,next) => {
    const authToken = req.headers['authorization'];
    console.log('Auth Header is : ', authToken);
    // const {token}  = req.cookies
    // console.log('Req Cookies Data: ',req.cookies);
    console.log(authToken);
    if(!authToken){
        return next(new ErrorHandler("Please login to Access this Resource",401))
    }
    
    console.log('token and data is');
    const decodedData = jwt.verify(authToken , process.env.JWT_SECRET_KEY)
    
    console.log('token and data is' , decodedData);
    console.log(decodedData);
    
    req.user = await User.findById(decodedData.id)
    
    console.log('Req User Data: ', req.user);
    next()

})



// exports.adminRoles = (...roles) => {
//     return(req,res,next) => {
//         if(!roles.includes(req.user.role)){
//             return next( new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resource` , 403))
//         }
//         next()
//     }
// }