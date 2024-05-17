// import React from 'react'
// import {ReactNavbar} from "overlay-navbar"
// import logo from '../../../images/logo512.png'
// import {AiOutlineShoppingCart , AiOutlineSearch } from 'react-icons/ai'
// import {CgProfile } from 'react-icons/cg'

// const Header = () => {
//     return (
//         <ReactNavbar
//             burgerColor="red"
//             burgerColorHover="orange"
//             logo={logo}
//             logoWidth="20vmax"
//             navColor1="gray"
//             // navColor1="rgba(127,175,180,0.7)"
//             logoHoverSize="10px"
//             logoHoverColor="#eb4034"
//             link1Text="Home"
//             link2Text="Products"
//             link3Text="Contact"
//             link4Text="About"
//             link1Url="/"
//             link2Url="/products"
//             link3Url="/contact"
//             link4Url="/about"
//             link1Size="2vmax"
//             link1Color="rgb(158, 175, 125)"
//             // link1Color="rgba(35 , 35 , 35 , 0.8)"
//             nav1justifyContent="flex-end"
//             nav2justifyContent="flex-end"
//             nav3justifyContent="flex-start"
//             nav4justifyContent="flex-start"
//             link1ColorHover="#eb4034"
//             // link2ColorHover="#eb4034"
//             // link3ColorHover="#eb4034"
//             // link4ColorHover="#eb4034"
//             link1Margin="1vmax"
//             // link3Margin="0"
//             // link4Margin="5vmax"
//             profileIcon={true}
//             profileIconUrl='/login'
//             ProfileIconElement = {CgProfile }
//             profileIconColor="rgb(158, 175, 125)"
//             // profileIconColor="rgba(35 , 35 , 35 , 0.8)"
//             profileIconColorHover="#eb4034"
//             searchIcon={true}
//             SearchIconElement = {AiOutlineSearch }
//             // searchIconColor="rgba(35 , 35 , 35 , 0.8)"
//             searchIconColor="rgb(158, 175, 125)"
//             searchIconColorHover="#eb4034"
//             cartIcon={true}
//             cartIconColor="rgb(158, 175, 125)"
//             // cartIconColor="rgba(35 , 35 , 35 , 0.8)"
//             CartIconElement = {AiOutlineShoppingCart }
//             cartIconColorHover="#eb4034"
//             cartIconMargin="1vmax"
//         />
//     )
// }

// export default Header

import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Grid,
  Divider,
  Tooltip,
} from "@mui/material";
import { AiOutlineShoppingCart, AiOutlineSearch } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../images/logo512.png";

const Header = () => {
  const navigate = useNavigate();

  const headerItems = [
    { name: "Home", func: home },
    { name: "Cattles", func: cattles },
    // { icon: CgProfile, name: 'Profile', func: login },
    { icon: AiOutlineShoppingCart, name: "Cart", func: cart },
    // { icon: ExitToAppIcon, name: 'Logout', func : logoutUser },
  ];

  function cattles() {
    try {
      navigate("/products");
    } catch (error) {
      console.error("Error in navigation to Cattles: ", error);
    }
  }

  function login() {
    try {
      navigate("/login");
    } catch (error) {
      console.error("Error in navigation to Profile Page: ", error);
    }
  }

  function cart() {
    try {
      navigate("/cart");
    } catch (error) {
      console.error("Error in navigation to Cart: ", error);
    }
  }

  function home() {
    try {
      navigate("/");
    } catch (error) {
      console.error("Error in navigation to Home Page: ", error);
    }
  }

  return (
    <React.Fragment>
      <Grid container-fluid="true" justifyContent="center">
        <Grid item xs={10} sm={8} md={6}>
          <AppBar sx={{ bgcolor: "rgb(110,220,10)" }}>
            <Toolbar>
              <Grid container alignItems="center">
                <Grid item>
                  <IconButton
                    edge="start"
                    color="inherit"
                    component={Link}
                    to="/"
                  >
                    <img src={logo} alt="Logo" width="90" height="90" />
                  </IconButton>
                </Grid>
                {/* <Grid item>
                  <Typography
                    variant="h5"
                    color="rgb(110,220,10)"
                    bgcolor="rgb(110,220,10)"
                  >
                    E-Cattle
                  </Typography>
                </Grid> */}
              </Grid>
              <Divider />
              <Grid
                container
                alignItems="start"
                justifyContent="start"
                spacing={5}
              >
                {headerItems.map((item, index) => (
                  <Grid item key={index}>
                    <Tooltip title={item.name}>
                      <IconButton color="inherit" onClick={item.func}>
                        {item.icon && React.createElement(item.icon)}
                        {!item.icon && item.name}
                      </IconButton>
                    </Tooltip>
                  </Grid>
                ))} 
              </Grid>
            </Toolbar>
          </AppBar>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Header;
