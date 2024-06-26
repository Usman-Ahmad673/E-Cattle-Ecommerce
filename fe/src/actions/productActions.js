import axios from 'axios'

import { 
    ALL_PRODUCT_REQUEST, 
    ALL_PRODUCT_SUCCESS, 
    ALL_PRODUCT_FAIL,
    PRODUCT_DETAILS_REQUEST, 
    PRODUCT_DETAILS_SUCCESS, 
    PRODUCT_DETAILS_FAIL,
    CLEAR_ERRORS, 
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
    ADMIN_PRODUCT_REQUEST,
    ADMIN_PRODUCT_SUCCESS,
    ADMIN_PRODUCT_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    ALL_REVIEW_REQUEST,
    ALL_REVIEW_SUCCESS,
    ALL_REVIEW_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_FAIL,

} from '../constants/productConstants'

// Get All Products
export const getProduct = (keyword = "") => async(dispatch) =>{
// export const getProduct = (keyword = "" , currentPage = 1) => async(dispatch) =>{
// export const getProduct = (keyword = "" , currentPage = 1 , price = [0 , 320000] , category , ratings = 0) => async(dispatch) =>{
    try{
        dispatch({
            type : ALL_PRODUCT_REQUEST
        })
        let link = `http://127.0.0.1:5000/api/v1/products?keyword=${keyword}`
        // let link = `http://127.0.0.1:5000/api/v1/products/?keyword=${keyword}&page=${currentPage}`
        // let link = `http://127.0.0.1:5000/api/v1/products/?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings=${ratings}`
        // if(category !== "ALL"){
        //     link = `http://127.0.0.1:5000/api/v1/products/?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}`
        // }
        // else{
        //     link = `http://127.0.0.1:5000/api/v1/products/?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings=${ratings}`
        // }

        // let link = `http://127.0.0.1:5000/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

        // if (category) {
        //     link = `http://127.0.0.1:5000/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
        // }

        const {data} = await axios.get(link)
        console.log(`all products are: ${data}`);
        dispatch({
            type : ALL_PRODUCT_SUCCESS,
            payload : data
        })
    } catch(error){
        dispatch({
            type : ALL_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}
export const getAdminProduct = () => async(dispatch) =>{
    try{
        dispatch({
            type : ADMIN_PRODUCT_REQUEST
        })

        const {data} = await axios.get("http://127.0.0.1:5000/api/v1/admin/products")
        // console.log(data);
        dispatch({
            type : ADMIN_PRODUCT_SUCCESS,
            payload : data
        })
    } catch(error){
        dispatch({
            type : ADMIN_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}



// Get Product Details
export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type : PRODUCT_DETAILS_REQUEST });
    
        const { data } = await axios.get(`http://127.0.0.1:5000/api/v1/product/${id}`);
        console.log(data);
    
        dispatch({
            type : PRODUCT_DETAILS_SUCCESS,
            payload: data
        });
        } catch (error) {
        dispatch({
            type : PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message,
        });
        }
    };



// New Review
export const newReview = (reviewData) => async (dispatch) => {
    try {
        dispatch({ type : NEW_REVIEW_REQUEST });
    
        const config = {
            headers: {"Content-Type":"application/json"}
        }

        const { data } = await axios.put(`http://127.0.0.1:5000/api/v1/review`, reviewData, config);
        console.log(data);


    
        dispatch({
            type : NEW_REVIEW_SUCCESS,
            payload: data.success
        });
        } catch (error) {
        dispatch({
            type : NEW_REVIEW_FAIL,
            payload: error.response.data.message,
        });
        }
    };




    


// Create Product
export const createProduct = (productData) => async (dispatch) => {
    try {
        dispatch({ type : NEW_PRODUCT_REQUEST });
    
        const config = {
            headers: {"Content-Type":"application/json"}
        }

        console.log('Product Data: ' , productData);
        console.log(productData);
        const { data } = await axios.post(`http://127.0.0.1:5000/api/v1/admin/product/new`, productData, config);
        console.log('Product Add Data : ' ,data);


    
        dispatch({
            type : NEW_PRODUCT_SUCCESS,
            payload: data
        });
        } catch (error) {
            console.log('Error for Product Adding on Ecommerce' , error.response.data.message);
        dispatch({
            type : NEW_PRODUCT_FAIL,
            payload: error.response.data.message,
        });
        }
    };




    


// Delete Product
export const deleteProduct = (id) => async (dispatch) => {
    try {
        dispatch({ type : DELETE_PRODUCT_REQUEST });
    

        const { data } = await axios.delete(`http://127.0.0.1:5000/api/v1/admin/product/${id}`);
        console.log(data);


    
        dispatch({
            type : DELETE_PRODUCT_SUCCESS,
            payload: data.success
        });
        } catch (error) {
        dispatch({
            type : DELETE_PRODUCT_FAIL,
            payload: error.response.data.message,
        });
        }
    };




    


// Update Product
export const updateProduct = (id , updatedProductData) => async (dispatch) => {
    try {
        dispatch({ type : UPDATE_PRODUCT_REQUEST });
        
        const config = {
            headers: {"Content-Type":"application/json"}
        }

        const { data } = await axios.put(`http://127.0.0.1:5000/api/v1/admin/product/${id}`, updatedProductData, config);
        console.log(data);


    
        dispatch({
            type : UPDATE_PRODUCT_SUCCESS,
            payload: data.success
        });
        } catch (error) {
        dispatch({
            type : UPDATE_PRODUCT_FAIL,
            payload: error.response.data.message,
        });
        }
    };




    
// Get All Reviews of a Product
export const getAllReviews = (id) => async (dispatch) => {
        try {
        dispatch({ type: ALL_REVIEW_REQUEST });
    
        const { data } = await axios.get(`http://127.0.0.1:5000/api/v1/reviews?id=${id}`);
    
        dispatch({
            type: ALL_REVIEW_SUCCESS,
            payload: data.reviews,
        });
        } catch (error) {
        dispatch({
            type: ALL_REVIEW_FAIL,
            payload: error.response.data.message,
        });
        }
    };
    
    // Delete Review of a Product
    export const deleteReviews = (reviewId, productId) => async (dispatch) => {
        try {
        dispatch({ type: DELETE_REVIEW_REQUEST });
    
        const { data } = await axios.delete(
            `http://127.0.0.1:5000/api/v1/reviews?id=${reviewId}&productId=${productId}`
        );
    
        dispatch({
            type: DELETE_REVIEW_SUCCESS,
            payload: data.success,
        });
        } catch (error) {
        dispatch({
            type: DELETE_REVIEW_FAIL,
            payload: error.response.data.message,
        });
        }
    };





//Clearing Errors
export const clearErrors = () => async(dispatch) =>{
    dispatch({
        type : CLEAR_ERRORS
    })
}