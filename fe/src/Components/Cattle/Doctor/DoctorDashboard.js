import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getDoctorDetails } from "../../../actions/doctorActions";
import {
  Card,
  CardMedia,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DoctorCattleDetails from "./DoctorCattleDetails.js";

const DoctorDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const storedId = localStorage.getItem('ID');
  const [id, setId] = useState(storedId);

  const { doctor, success, loading } = useSelector(
    (state) => state.doctorDetail
  );

  console.log("Doctor Detail: ", doctor);
  console.log(doctor);

  const isAuthenticated = localStorage.getItem('Token')

  useEffect(() => {
    // if(error){
    //   console.log('error: ' , error);
    //   dispatch(clearErrors)
    // }
    if (!isAuthenticated) {
      navigate('/')
    }
    // dispatch(loadUser());
  }, [isAuthenticated]);

  useEffect(() => {
    if (id) {
      dispatch(getDoctorDetails(id));
    }
  }, [dispatch, id]);

  return (
    <React.Fragment>
      {!doctor ? (
        <CircularProgress />
      ) : (
          <React.Fragment>
            <Container maxWidth="xl" sx={{ marginTop: 8 }}>
              <Grid container spacing={5}>
                <Grid item xs={8} md={3}>
                  <Card
                    sx={{
                      boxShadow: "10px 10px 10px 10px rgba(0 , 200 , 0 , 0.2)",
                    }}
                  >
                    {doctor && doctor.images && doctor.images[0] ? (
                      <CardMedia
                        component="img"
                        alt={doctor.images[0].public_id}
                        height="200"
                        image={doctor.images[0].url}
                      />
                    ) : (
                        <Typography>No images available</Typography>
                      )}
                  </Card>
                  <Grid item m="10px 0" p={5}>
                    {/* <Typography variant="h6" mb={5}><b>Age:</b> {doctor?.age}</Typography>
                                    <Typography variant="h6"><b>Category:</b> {doctor?.category}</Typography> */}
                  </Grid>
                </Grid>
                <Grid item xs={12} md={6} color="green">
                  <Typography variant="h4">Doctor Details</Typography>
                  <hr />
                  <Typography variant="h6">
                    <b>ID:</b> {doctor._id}
                  </Typography>
                  <Typography variant="h6">
                    <b>Name:</b> {doctor.name}
                  </Typography>
                  <Typography variant="h6">
                    <b>Contact:</b> {doctor.contact}
                  </Typography>
                  <Typography variant="h6">
                    <b>Address:</b> {doctor.address}
                  </Typography>
                  <Typography variant="h6">
                    <b>Email:</b> {doctor.email}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={12} color="green">
                  <Typography
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    variant="h4"
                  >
                    Cattles
                </Typography>
                  <hr />
                </Grid>
                {doctor.cattle &&
                  doctor.cattle.map((cattle) => (
                    <DoctorCattleDetails
                      key={cattle._id}
                      cattle={cattle}
                      id={id}
                    />
                  ))}
              </Grid>
            </Container>
          </React.Fragment>
        )}
    </React.Fragment>
  );
};

export default DoctorDashboard;
