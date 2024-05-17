import React, { Fragment, useEffect, useState } from 'react'
import './Products.css'
// import { useAlert } from 'react-alert'
import { useSelector , useDispatch } from 'react-redux'
import { clearErrors , getProduct } from '../../actions/productActions'
import Loader from '../layout/Loader/Loader'
import ProductCard from '../Home/ProductCard'
import { useParams } from 'react-router-dom'
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import MetaData from "../layout/MetaData";





const Products = () => {
    // console.log(categories);
    const dispatch = useDispatch()

 
    const {products , loading ,error , productCount , resultPerPage , filteredProductsCount} = useSelector((state) => state.products)

 
    // const alert = useAlert()

    // console.log(keyword);
    useEffect(() => {
        if (error) {
            alert(error);
            dispatch(clearErrors());
        }
    
    }, [dispatch , error]);
    


    return (
        <Fragment>
            {loading ? (<Loader />) : 
            (<Fragment> 
                <MetaData title="PRODUCTS -- ECOMMERCE" />
                <h2 className="productsHeading">Products</h2>
                <div className="products">
                    {products && products.map((product) => (
                        product.name === '' ? <ProductCard key={product._id} product={product}/> : ''
                    ))}
                </div>

                {/* <div className="filterBox">
                            <Typography>Price</Typography>
                            <Slider 
                                value={price}
                                onChange={priceHandler}
                                valueLabelDisplay="auto"
                                aria-labelledby='continuous-slider'
                                min={0}
                                max={32000}
                            />
                            <Typography>Categories</Typography>
                            <ul className='categoryBox'>
                                {categories.map((category) => (
                                    <li
                                    className='category-link'
                                    key={category}
                                    onClick={() => setCategory(category)}
                                    > {category} </li>
                                ))}
                            </ul>
                            <fieldset>
                            <Typography component="legend">Rating Above</Typography>
                                    <Slider 
                                        value={ratings}
                                        onChange={(e , newRatings) => {
                                            setRatings(newRatings)
                                        }}
                                        aria-labelledby="continuous-slider"
                                        min={0}
                                        max={5}
                                        valueLabelDisplay="auto"    
                                    />
                            </fieldset>
                </div> */}


            </Fragment>)}
                
        </Fragment>
    )
    }

    export default Products
