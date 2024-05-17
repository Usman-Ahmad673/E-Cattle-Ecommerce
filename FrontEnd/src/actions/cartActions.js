        import axios from "axios";
        import { ADD_TO_CART , REMOVE_TO_CART , SAVE_SHIPPING_INFO } from "../constants/cartConstants";


        // Add to Cart
        export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
                const { data } = await axios.get(`http://127.0.0.1:5000/api/v1/product/${id}`);
        
                dispatch({
                type: ADD_TO_CART,
                payload: {
                product: data.product._id,
                name: data.product.name,
                price: data.product.price,
                image: data.product.images,
                stock: data.product.stock,
                quantity,
                },
                });
        
                localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
        };


        // Remove from Cart
        export const removeItemsFromCart = (id) => async (dispatch, getState) => {
        
                dispatch({
                type: REMOVE_TO_CART,
                payload: id,
                });
        
                localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
        };


        // Save Shipping Info
        export const saveShippingInfo = (data) => async (dispatch) => {
        
                dispatch({
                type: SAVE_SHIPPING_INFO,
                payload: data,
                });
        
                localStorage.setItem("shippingInfo", JSON.stringify(data));
        };