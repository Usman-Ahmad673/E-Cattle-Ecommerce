import React, { useState } from 'react'
import './Header.css'
// import { useAlert } from 'react-alert'
import { SpeedDial , SpeedDialAction } from '@material-ui/lab'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PersonIcon from '@mui/icons-material/Person'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import ListAltIcon from '@mui/icons-material/ListAlt'
import Backdrop from '@material-ui/core/Backdrop'
import { useNavigate } from 'react-router-dom';
import { logOut } from '../../../actions/userActions'
import { useDispatch , useSelector } from 'react-redux'
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

// const UserOptions = ({user}) => {
//     const { cartItems } = useSelector((state)=> state.cart)
//     const navigate = useNavigate();
//     // const alert = useAlert()
//     const dispatch = useDispatch()
    
//     const [open, setOpen] = useState(false)

//     const options = [
//         { icon : <ListAltIcon /> , name : "Orders" , func : orders },
//         { icon : <PersonIcon /> , name : "Profile" , func : account },
//         { icon : <ShoppingCartIcon style={{color: cartItems.length > 0 ? 'green' : 'tomato'}} /> , name : `Cart(${cartItems.length})` , func : cart },
//         { icon : <ExitToAppIcon /> , name : "Logout" , func : logoutUser },
//     ]
//     if(user.role === "admin"){
//         options.unshift( { icon : <DashboardIcon /> , name : "Dashboard" , func : dashboard }, )
//     }

//     function dashboard() {
//         navigate('/admin/dashboard')
//     }
//     function orders() {
//         navigate('/orders')
//     }
//     function account() {
//         navigate('/account')
//     }
//     function cart() {
//         navigate('/cart')
//     }
//     function logoutUser() {
//         dispatch(logOut())
//         // alert.success("Loguot SuccessFully")
//         alert("Loguot SuccessFully")
//         navigate('/login')
//     }

//     return (
//         <>
//         <Backdrop 
//             open={open}
//             style={{zIndex : "10"}}
                
//             />
//         {/* <div>{user.avatar.public_id}</div>
//         <img src={user.avatar.url}/> */}
//         <SpeedDial
//         ariaLabel='SpeedDial tooltip example'
//         onClose={() => setOpen(false)}
//         onOpen={() => setOpen(true)}
//         open={open}
//         className='speedDial'
//         style={{ zIndex : "11"}}
//         icon={ <img 
//             className='speedDialIcon'
//             src={user.avatar.url ? user.avatar.url : "/profile.png"}
//             alt="Profile Pic"
//         /> }
//         direction="down"
        
//         >
//         {options.map((item)=> (
//             <SpeedDialAction 
//                 key={item.name} 
//                 icon={item.icon} 
//                 tooltipTitle={item.name} 
//                 onClick={item.func}
//                 tooltipOpen
//                 // tooltipOpen={window.innerWidth<=600? true :false}
//             />))}
//         {/* <SpeedDialAction icon={<DashboardIcon />} tooltipTitle="Dashboard"/> */}
//         </SpeedDial>
//         </>
//     )
// }

// export default UserOptions
const UserOptions = ({user}) => {
    const { cartItems } = useSelector((state)=> state.cart)
    const navigate = useNavigate();
    // const alert = useAlert()
    const dispatch = useDispatch()
    
    const [open, setOpen] = useState(false)

    const options = [
        { icon : <DashboardIcon /> , name : "Dashboard" , func : dashboard },
        { icon : <ListAltIcon /> , name : "Orders" , func : orders },
        { icon : <PersonIcon /> , name : "Profile" , func : account },
        { icon : <ShoppingCartIcon style={{color: cartItems.length > 0 ? 'green' : 'tomato'}} /> , name : `Cart(${cartItems.length})` , func : cart },
        { icon : <ExitToAppIcon /> , name : "Logout" , func : logoutUser },
    ]
    // if(user.role === "admin"){
        //     options.unshift( { icon : <DashboardIcon /> , name : "Dashboard" , func : dashboard }, )
    // }

    function dashboard() {
        navigate('/admin/dashboard')
    }
    function orders() {
        navigate('/orders')
    }
    function account() {
        alert("Account Page")
        navigate('/account')
    }
    function cart() {
        navigate('/cart')
    }
    function logoutUser() {
        // dispatch(logOut())
        // alert.success("Loguot SuccessFully")
        alert("Loguot SuccessFully")
        // navigate('/login')
    }

    return (
        <>
        <Backdrop 
            open={open}
            style={{zIndex : "10"}}
                
            />
        {/* <div>{user.avatar.public_id}</div>
        <img src={user.avatar.url}/> */}
        <SpeedDial
        ariaLabel='SpeedDial tooltip example'
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        className='speedDial'
        style={{ zIndex : "11"}}
        icon={ <img 
            className='speedDialIcon'
            // src={user?.avatar.url ? user?.avatar.url : "/profile.png"}
            src={"/profile.png"}
            alt="Profile Pic"
        /> }
        direction="down"
        
        >
        {options.map((item)=> (
            <SpeedDialAction 
                key={item.name} 
                icon={item.icon} 
                tooltipTitle={item.name} 
                onClick={item.func}
                tooltipOpen
                // tooltipOpen={window.innerWidth<=600? true :false}
            />))}
        {/* <SpeedDialAction icon={<DashboardIcon />} tooltipTitle="Dashboard"/> */}
        </SpeedDial>
        </>
    )
}

export default UserOptions