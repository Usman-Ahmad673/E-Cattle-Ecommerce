    import React, { Fragment, useEffect, useState } from "react";
    import { useParams } from 'react-router-dom';
    import Carousel from "react-material-ui-carousel";
    // import {Carousel}from "react-responsive-carousel";
    import './ProductDetails.css'
    import { useDispatch, useSelector } from "react-redux";
    import {clearErrors, getProductDetails, newReview} from "../../actions/productActions";
    import ReactStars from 'react-rating-stars-component'
    import ReviewCard from "./ReviewCard.js";
    import Loader from "../layout/Loader/Loader";
    // import { useAlert } from "react-alert";
    import MetaData from "../layout/MetaData";
    import { addItemsToCart } from "../../actions/cartActions";
    import { Rating } from "@material-ui/lab";
    import {
        Dialog,
        DialogActions,
        DialogContent,
        DialogTitle,
        Button,
    } from "@material-ui/core";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";








    const ProductDetails = () => {
        
    const dispatch = useDispatch();
    // const alert = useAlert()

    const { id } = useParams();

    const { product, loading, error } = useSelector(
        (state) => state.productDetails
    );

    console.log("Product Details in ProductDetails.js: ");
    console.log(product);

    const { success, error: reviewError } = useSelector(
        (state) => state.newReview
    );

    


    const [quantity, setQuantity] = useState(1)


    const increaseQuantity = () => {
        const qty = quantity+1
        if(product.stock >= qty){
            setQuantity(qty)
        }
    }
    const decreaseQuantity = () => {
        const qty = quantity-1
        if(quantity > 1){
            setQuantity(qty)
        }
    }


    const addToCartHandler = () => {
        dispatch(addItemsToCart(id , quantity))
        // alert.success("Item Added TO Cart")
        alert('Item Added Successfully In Cart')
    }

    
        


        useEffect(() => {
            if(error){
                console.log(error)
                dispatch(clearErrors())
            }
            else if(reviewError){
                console.log(reviewError)
                // alert.error(reviewError)
                dispatch(clearErrors())
            }
            else if(success){
                alert("Review Submitted Successfully");
                dispatch({ type: NEW_REVIEW_RESET }); 
            }
            
            // console.log(id);
            dispatch(getProductDetails(id));
        // }, [id]);   
        }, [dispatch, id , error , success , reviewError]);



    return (
        
        
            <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                <MetaData title={`${product.name ? `${product.name} --` : ''} ECOMMERCE`}/>
                <div className="ProductDetails">
            <div>
            <Carousel>
            
                        <img
                        className="CarouselImage"
                        src={product.images && product.images.url ? product.images.url : product.images}
                        alt={`Slide`}
                        />
            
            </Carousel>
            </div>
            <div>
                <div className="detailsBlock-1">
                    <h2>{product.name ? product.name : 'N/A'}</h2>
                    <p>Product # {product._id}</p>
                </div>
                <div className="detailsBlock-3">
                    <h1>{`RS${product.price}`}</h1>
                    <div className="detailsBlock-3-1">
                    <div className="detailsBlock-3-1-1">
                        <button 
                        onClick={decreaseQuantity}
                        >-</button>
                        <input readOnly type="number" 
                        value={quantity} 
                        />
                        <button 
                        onClick={increaseQuantity}
                        >+</button>
                    </div>
                    <button
                        disabled={product.Stock < 1 ? true : false}
                        onClick={addToCartHandler}
                    >
                        Add to Cart
                    </button>
                    </div>

                    <p>
                    Status:
                    <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                        {product.stock < 1 ? "OutOfStock" : "InStock"}
                    </b>
                    </p>
                </div>

                <div className="detailsBlock-4">
                    Description : <p>{product.description}</p>
                </div>

                </div>
            </div>

                </Fragment>
            )}
        
        </Fragment>
    );
    };

    export default ProductDetails;