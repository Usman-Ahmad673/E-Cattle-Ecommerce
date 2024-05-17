import React, { useEffect , useState } from 'react';
import axios from 'axios';
import './App.css';
import Header from './component/layout/Header/Header.js'
import Home from './component/Home/Home.js'
import Cart from './component/Cart/Cart'
import Payment from './component/Cart/Payment.js'
import ConfirmOrder from './component/Cart/ConfirmOrder.js'
import Shipping from './component/Cart/Shipping.js'
import OrderSuccess from "./component/Cart/OrderSuccess.js";
import MyOrder from "./component/Order/MyOrder.js";
import OrderDetails from "./component/Order/OrderDetails.js";
import ProductDetails from './component/Product/ProductDetails.js'
import Footer from './component/layout/Footer/Footer.js'
import Products from './component/Product/Products.js'
import Search from './component/Product/Search.js'
import Dashboard from './component/admin/Dashboard.js'
import ProductList from './component/admin/ProductList.js'
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom';
import Webfont from 'webfontloader'
import LoginSignUp from './component/User/LoginSignUp';
import Profile from './component/User/Profile.js';
import UpdateProfile from './component/User/UpdateProfile.js';
import UpdatePassword from './component/User/UpdatePassword.js';
import ForgotPassword from './component/User/ForgotPassword.js';
import ResetForgotPassword from './component/User/ResetForgotPassword.js';
import store from './store'
import { loadUser } from './actions/userActions';
import UserOptions from './component/layout/Header/UserOptions'
import { useSelector } from 'react-redux';
import { Elements } from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CreateProduct from './component/admin/CreateProduct';
import UpdateProduct from './component/admin/UpdateProduct';
import OrderList from './component/admin/OrderList';
import UpdateOrder from './component/admin/UpdateOrder';
import UpdateUser from './component/admin/UpdateUser';
import UsersList from './component/admin/UsersList';
import ProductReviews from './component/admin/ProductReviews';

// import ProtectedRoute from './component/Route/ProtectedRoute';

function App() {
  

  // const {isAuthenticated , user} = useSelector(state=> state.user)

  const [stripeApiKey, setStripeApiKey] = useState("")
  
  async function getStripedApiKey() {
    const { data } = await axios.get("http://127.0.0.1:5000/api/v1/stripeapikey")
    console.log(`Data.stripe api key${data.stripeApiKey}`)
    // const api_key = data.stripeApiKey
    setStripeApiKey(data.stripeApiKey)
    // console.log(api_key);
    console.log("Stripe Api :" + stripeApiKey);
    console.log("Stripe Api Type is:" + typeof stripeApiKey);
    console.log("Stripe Api of data  is:" + typeof data.stripeApiKey);
  }
  useEffect(() => {
    Webfont.load({
      google:{
        families:['Roboto' , 'Droid Sans' , 'Chilanka']
      }
    })
    // store.dispatch(loadUser())
    getStripedApiKey()
  } , [])
  // console.log(stripeApiKey);


  return (
        <Router>
          <Header />
          {/* {isAuthenticated && <UserOptions user = {user}/>} */}
          {<UserOptions />}
              {/* <ProtectedRoute exact path="/process/payment" component={Payment} /> */}
          {stripeApiKey && (
              <Elements  stripe={loadStripe(stripeApiKey)}>
              <Routes>
              <Route exact path="/process/payment" element={<Payment />} />
              </Routes>
              </Elements>
              )}
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/product/:id" element={<ProductDetails />} />
              <Route exact path="/products" element={<Products />} />
              {/* <Route path="/products/:keyword" element={<Products />} /> */}
              {/* <Route exact path="/search" element={<Search />} /> */}
              {/* <ProtectedRoute exact path="/account" component={Profile} /> */}
              {/* <Route exact path="/account" element={<Profile />} /> */}
              {/* <ProtectedRoute exact path="/me/update" component={Profile} /> */}
              {/* <Route exact path="/me/update" element={<UpdateProfile />} /> */}
              {/* <ProtectedRoute exact path="/password/update" component={Profile} /> */}
              {/* <Route exact path="/password/update" element={<UpdatePassword />} /> */}
              {/* <Route exact path="/password/forgot" element={<ForgotPassword />} /> */}
              {/* <Route exact path="/password/forgot/reset/:token" element={<ResetForgotPassword />} /> */}
              <Route exact path="/login" element={<LoginSignUp />} />
              <Route exact path="/cart" element={<Cart />} />
              {/* <ProtectedRoute exact path="/shipping" component={Profile} /> */}
              <Route exact path="/login/shipping" element={<Shipping />} />
              {/* <ProtectedRoute exact path="/order/confirm" component={Profile} /> */}
              {/* <ProtectedRoute exact path="/order/confirm" component={Profile} /> */}
              <Route exact path="/order/confirm" element={<ConfirmOrder />} />
              <Route exact path="/success" element={<OrderSuccess />} />
              {/* <ProtectedRoute exact path="/orders" component={Profile} /> */}
              <Route exact path="/orders" element={<MyOrder />} />
              <Route exact path="/order/:id" element={<OrderDetails />} />



              <Route exact path="/admin/dashboard" element={<Dashboard />} />
              <Route exact path="/admin/products" element={<ProductList />} />
              <Route exact path="/admin/product" element={<CreateProduct />} />
              <Route exact path="/admin/product/:id" element={<UpdateProduct />} />




              <Route exact path="/admin/orders" element={<OrderList />} />
              <Route exact path="/admin/order/:id" element={<UpdateOrder />} />





              {/* <Route exact path="/admin/users" element={<UsersList />} /> */}
              {/* <Route exact path="/admin/user/:id" element={<UpdateUser />} /> */}



              {/* <Route exact path="/admin/reviews" element={<ProductReviews />} /> */}



            </Routes>
          <Footer />
        </Router>
  );
}

export default App;