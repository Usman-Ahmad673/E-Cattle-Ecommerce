// import React, { useEffect } from 'react';
// import { Box, CssBaseline, Grid } from '@mui/material';
// import { Route, Routes } from 'react-router-dom';
// import Sidebar from './Components/Sidebar/Sidebar';
// import Login from './Components/Login/Login';
// import Signup from './Components/Signup/Signup';
// import Forgotpassword from './Components/ForgotPassword/Forgotpassword';
// import Home from './Components/Home/Home';
// import Resetpassword from './Components/ForgotPassword/Resetpassword';


// const App = () => {
  
  

//   return (
//     <React.Fragment>
//       <Box style={{ flexGrow: 1 }}>
//         <CssBaseline />
//           <Grid container-fluid>
            
//             <Sidebar />
//             <Grid item xs={12} md={12}>z              
//               <Routes>
//                     <Route path="/home" element={<Home />} />

//                     <Route path="/" element={<Login />} />
//                     <Route path="/signup" element={<Signup />} />
//                     <Route path="/password/forgot" element={<Forgotpassword />} />
//                     <Route path="/password/reset/:token" element={<Resetpassword />} />
                
//               </Routes>
//             </Grid>
//           </Grid>
//       </Box>
//     </React.Fragment>
//   );
// };

// export default App;





import React, { useEffect } from 'react';
import { Box, CssBaseline, Grid } from '@mui/material';
import { Navigate, Route, BrowserRouter as Router, Routes, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, loadUser } from './actions/userActions';
import Sidebar from './Components/Sidebar/Sidebar';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import Forgotpassword from './Components/ForgotPassword/Forgotpassword';
import Home from './Components/Home/Home';
import AddCattle from './Components/Cattle/AddCattle';
import AddDoctor from './Components/Cattle/Doctor/AddDoctor';
import DoctorDashboard from './Components/Cattle/Doctor/DoctorDashboard.js';
import store from './store';
import Resetpassword from './Components/ForgotPassword/Resetpassword';
import ProtectedRoute from './Components/Route/ProtectedRoute';
import CattleDetails from './Components/Cattle/CattleDetails';
import DoctorDetails from './Components/Cattle/Doctor/DoctorDetails';
import AdminDashboard from './Components/Admin/AdminDashboard';


const App = () => {
  
  const navigate = useNavigate()
  const dispatch = useDispatch();
  

  // const { user , isAuthenticated , error , success } = useSelector((state) => state.loadUser);

  // console.log('App.js Page load User : ' , user);
  // console.log('App.js Page load User Authentication: ' , isAuthenticated);
  // console.log('App.js Page load User Error: ' , error);
  // console.log('App.js Page load User Success: ' , success);

  // useEffect(() => {
  //   if(error){
  //     console.log('error: ' , error);
  //     dispatch(clearErrors)
  //   }
  //   if(!isAuthenticated){
  //     navigate('/')
  //   }
  //     dispatch(loadUser());
  // }, []);


  // const { isAuthenticated , error } = useSelector((state) => state.loadUser);

  // console.log('App.js Page load User Authentication: ' , isAuthenticated);

  // useEffect(() => {
  //   if(!isAuthenticated){
  //     navigate('/')
  //   }
  //   if(error){
  //     console.log(error);
  //     dispatch(clearErrors)
  //   }
  //   dispatch(loadUser());
  // }, [isAuthenticated, navigate]);

  

  return (
    <React.Fragment>
      <Box style={{ flexGrow: 1 }}>
        <CssBaseline />
          <Grid container-fluid="true">
            {/* {isAuthenticated ? <Sidebar /> : ''} */}
            
            <Sidebar />
            <Grid item xs={12} md={12}>           
              <Routes>

              {/* {isAuthenticated ? 
                <React.Fragment> */}

                {/* Admin Routes */}
                    <Route path="/admin-Dashboard" element={<AdminDashboard />} /> 

                
                {/* Cattle Routes */}
                    <Route path="/cattle/new" element={<AddCattle />} /> 
                    <Route path="/cattle/:id" element={<CattleDetails />} />
                    

                {/* Cattle - Doctor Display */}
                    <Route path="/home" element={<Home />} />
                    

                {/* Doctor Routes */}
                    <Route path="/doctor/new" element={<AddDoctor />} />
                    <Route path="/doctor/:id" element={<DoctorDetails />} />
                    <Route path="/doctor-Dashboard" element={<DoctorDashboard />} />
                    <Route path="/" element={<Login />} />
                {/* </React.Fragment>
              :
                    <Route path="/" element={<Login />} />
              } */}
                    

                {/* Login - SignUp - Reset Password */}
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/password/forgot" element={<Forgotpassword />} />
                    <Route path="/password/reset/:token" element={<Resetpassword />} />
                
              </Routes>
            </Grid>
          </Grid>
      </Box>
    </React.Fragment>
  );
};

export default App;



































// // const App = () => {
// //   const dispatch = useDispatch();
// //   const {isAuthenticated , user} = useSelector(state=> state.user)

// //   // useEffect(() => {
// //   //   const authToken = localStorage.getItem('authToken');
// //   //   const userData = JSON.parse(localStorage.getItem('userData'));
// //   //   console.log(authToken);
// //   //   if (authToken) {
// //   //     dispatch({ type: 'SET_AUTHENTICATED', payload: true });
// //   //     dispatch({ type: 'LOAD_USER_SUCCESS', payload: userData });
// //   //     dispatch(loadUser());
// //   //   }
// //   // }, [dispatch]);
// //   useEffect(() => {
// //     Webfont.load({
// //       google:{
// //         families:['Roboto' , 'Droid Sans' , 'Chilanka']
// //       }
// //     })
// //     store.dispatch(loadUser())
// //   } , [])

// //   return (
// //     <React.Fragment>
// //       <Box style={{ flexGrow: 1 }}>
// //         <CssBaseline />
// //         <Router>
// //           <Grid container-fluid>
// //             {/* Sidebar */}
// //             {isAuthenticated && <Sidebar />}

// //             {/* Main Content */}
// //             <Grid item xs={12} md={12}>
// //               <Routes>
// //                 {/* Routes for logged-in users */}
// //                 {isAuthenticated ? (
// //                   <React.Fragment>
// //                     <Route path="/cattle" element={<Home />} />
// //                     <Route path="/cattle/new" element={<AddCattle />} />
// //                     <Route path="/doctor/new" element={<AddDoctor />} />
// //                   </React.Fragment>
// //                 ) : null}

// //                 {/* Routes for non-logged-in users */}
// //                 {!isAuthenticated && (
// //                   <React.Fragment>
// //                     <Route path="/" element={<Login />} />
// //                     <Route path="/signup" element={<Signup />} />
// //                     <Route path="/password/forgot" element={<Forgotpassword />} />
// //                   </React.Fragment>
// //                 )}
// //               </Routes>
// //             </Grid>
// //           </Grid>
// //         </Router>
// //       </Box>
// //     </React.Fragment>
// //   );
// // };

// // export default App;
