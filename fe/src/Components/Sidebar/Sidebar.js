import React, { useEffect } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import DescriptionIcon from "@mui/icons-material/Description";
// import AnimalIcon from '@mui/icons-material/Animal';
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Divider from "@mui/material/Divider";
import LogoImage from "../../images/logo512.png"; // Replace with the path to your logo image
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Grid,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { clearErrors, logOut } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import UploadIcon from "@mui/icons-material/Upload";

const Sidebar = () => {
  const role = localStorage.getItem("Role");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { error, loading } = useSelector(
    (state) => state.userLogout
  );
  // const { error, loading, isAuthenticated } = useSelector(
  // (state) => state.userLogout
  // );

  const showToastSuccessMessage = () => {
    toast.success(`Successfully LoggedOut!`, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const showToastErrorMessage = (err) => {
    toast.error(err, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const headerItems = [
    role === "admin" && {
      icon: HomeIcon,
      name: "Home",
      func: () => navigate("/home"),
    },
    role === "admin" && {
      icon: ListAltIcon,
      name: "Cattle / Doctor List",
      func: () => navigate("/admin-Dashboard"),
    },
    role === "admin" && {
      icon: AddBoxIcon,
      name: "Add Cattle",
      func: () => navigate("/cattle/new"),
    },
    role === "admin" && {
      icon: AddBoxIcon,
      name: "Add Doctor",
      func: () => navigate("/doctor/new"),
    },
    // role === "admin" && {
    //   icon: DashboardIcon,
    //   name: "Dashboard",
    //   func: () => navigate("/doctor-Dashboard"),
    // },
    role === "admin" && {
      icon: UploadIcon,
      name: "Add Product",
      func: () =>
        (window.location.href = "http://localhost:3001/admin/product"),
    },
    role && {
      icon: ExitToAppIcon,
      name: "Logout",
      func: logoutUser,
    },
  ].filter(Boolean);

  function logoutUser() {
    dispatch(logOut());
    // showToastSuccessMessage();
    // navigate("/");
  }

  function logoutUser() {
    try {
      console.log("logout button pressed");
      dispatch(logOut());
      showToastSuccessMessage();
      navigate("/");
      // navigate('/login')
    } catch (error) {
      console.error("Error in logoutUser:", error);
    }
  }
  function doctorCattleList() {
    try {
      navigate("/home");
    } catch (error) {
      console.error("Error in navigation to Doctor/Cattle List:", error);
    }
  }
  function profile() {
    try {
      navigate("/profile");
    } catch (error) {
      console.error("Error in navigation to Profile Page:", error);
    }
  }
  function ecommerce() {
    try {
      window.location.href = "http://localhost:3001/admin/product";
    } catch (error) {
      console.error("Error in navigation to Setting Page:", error);
    }
  }
  function doctorDashboard() {
    try {
      navigate("/doctor-Dashboard");
    } catch (error) {
      console.error("Error in navigation to Doctor Dashboard:", error);
    }
  }
  function adminDashboard() {
    try {
      navigate("/admin-Dashboard");
    } catch (error) {
      console.error("Error in navigation to Admin Dashboard:", error);
    }
  }
  function addCattle() {
    try {
      navigate("/cattle/new");
    } catch (error) {
      console.error("Error in navigation to Adding Cattle:", error);
    }
  }
  function addDoctor() {
    try {
      navigate("/doctor/new");
    } catch (error) {
      console.error("Error in navigation to Adding Doctor:", error);
    }
  }


  const isAuthenticated = localStorage.getItem('Token')
  console.log('isAuthenticated', isAuthenticated);


  useEffect(() => {
    if (error) {
      showToastErrorMessage(error);
      dispatch(clearErrors());
    }
    // if (!isAuthenticated) {
    //   showToastErrorMessage("Invalid Login Details");
    //   navigate("/");
    // }
  }, [dispatch, isAuthenticated, error]);

  return (
    <React.Fragment>
      <Grid container-fluid="true" justifyContent="center">
        <Grid item xs={10} sm={8} md={6}>
          <AppBar
            position="static"
            sx={{
              bgcolor: "rgb(2,0,36)",
              background:
                "linear-gradient(354deg, rgba(2,0,36,0.7399334733893557) 0%, rgba(83,205,38,1) 55%, rgba(255,255,255,1) 100%)",
            }}
          >
            <Toolbar>
              <Grid container alignItems="center">
                <Grid item>
                  <IconButton
                    edge="start"
                    color="inherit"
                    component={Link}
                    to="/"
                  >
                    <img src={LogoImage} alt="Logo" width="120" height="120" />
                  </IconButton>
                </Grid>
                <Grid item>
                  <Typography variant="h5" color="rgba(255,255,255,1)">
                    E-Cattle
                    {/* Cattle-Heard */}
                  </Typography>
                </Grid>
              </Grid>
              <Divider />
              <Grid
                container
                alignItems="center"
                justifyContent="center"
                spacing={5}
              >
                {headerItems.map((item, index) => (
                  <Grid item key={index}>
                    <Tooltip title={item.name}>
                      <IconButton color="inherit" onClick={item.func}>
                        {React.createElement(item.icon)}
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

export default Sidebar;
