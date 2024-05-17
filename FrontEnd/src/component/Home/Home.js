// import React, { Fragment, useEffect, useState } from 'react'
import React, { Fragment, useEffect } from 'react'
import { useSelector , useDispatch } from 'react-redux'
// import { useAlert } from 'react-alert'
import { CgMouse } from 'react-icons/cg'
import MetaData from '../layout/MetaData'
import './Home.css'
import ProductCard from './ProductCard.js'
import Loader from '../layout/Loader/Loader'
import { clearErrors, getProduct } from '../../actions/productActions'
// import Pagination from "react-js-pagination";




const Home = () => {

    // const [currentPage, setCurrentPage] = useState(1)


    // const setCurrentPageNo = (e) => {
    //     setCurrentPage(e)
    // }



    // const alert = useAlert()
    const dispatch = useDispatch()

    const {loading,error,products} = useSelector((state)=>state.products)
    // const {loading,error,products,resultPerPage,productCount} = useSelector((state)=>state.products)

    useEffect(() => {
        if(error){
            console.log(error)
            dispatch(clearErrors())
        }
        dispatch(getProduct())
    },[dispatch , error ])

    return (
        <Fragment>
        {loading ? (<Loader/>) : 
        (<Fragment>
        <MetaData title="ECOMMERCE"/>
            <div className="banner">
                <p>Welcome To Ecommerce</p>
                <h1>Find Amazing Products Below</h1>
                <a href="#container">
                    <button>Scroll <CgMouse /></button>
                </a>
            </div>
            <h2 className='homeHeading'>Featured Products</h2>
        

            <div className="container" id="container">
                {products && products.map((product) => (
                        product.name !== '' ? <ProductCard key={product._id} product={product}/> : ''
                    ))}
            </div>
        </Fragment>
        )}
        </Fragment>
    )
}

export default Home
