import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  assignCattleToDoctor,
  getDoctorDetails,
} from "../../../actions/doctorActions";
import {
  CircularProgress,
  Container,
  Grid,
  Typography,
  Paper,
  Card,
  CardMedia,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
  TableBody,
  IconButton,
  InputBase,
  Button,
  ImageList,
  ImageListItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { toast } from "react-toastify";
import { clearErrors, fetchCattle } from "../../../actions/cattleActions";
import { ASSIGN_CATTLE_RESET } from "../../../constants/doctorConstants";

// Define your styles
const styles = {
  fontWeight: "bold",
  color: "red",
};

// Define your SearchResults component
const SearchResults = ({ searchResults }) => {
  return (
    <React.Fragment>
      <Typography style={styles} variant="h6">
        Search Results:
      </Typography>
      {/* Render your search results here */}
      {searchResults.map((result) => (
        <div key={result.id}>
          <Typography variant="body1">{result.name}</Typography>
          {/* Include other details from search results */}
        </div>
      ))}
      {/* Render your custom component here */}
      <CustomComponent />
    </React.Fragment>
  );
};

// Define a custom component to render
const CustomComponent = () => {
  return (
    <>
      <Typography variant="h6">Custom Component</Typography>
      {/* Add your custom component content here */}
    </>
  );
};

const DoctorDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { doctor, loading, success } = useSelector(
    (state) => state.doctorDetail
  );
  console.log(doctor);
  console.log(doctor?.cattle);

  const {
    cattles,
    loading: cattleLoading,
    error,
  } = useSelector((state) => state.cattle);
  console.log(cattles);

  const {
    success: assignCattleSuccess,
    message,
    error: assignCattleError,
  } = useSelector((state) => state.assignCattle);
  console.log(assignCattleError);
  console.log(assignCattleSuccess);
  console.log(message);

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState(""); // Store search results here

  const SearchSubmit = (e) => {
    setSearch(e.target.value);
  };

  const SearchSubmit2 = () => {
    // Dispatch your search action or filter results here
    // For this example, I'm just simulating some search results
    const results = [
      { id: 1, name: "Search Result 1" },
      { id: 2, name: "Search Result 2" },
      // Include more search results
    ];

    setSearchResults(results);
  };

  const showToastErrorMessage = (err) => {
    toast.error(err, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const showToastSuccessMessage = () => {
    toast.success(`Successfully Added Cattle to ${doctor.name}`, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const AssignCattleToDoctor = (cattleId) => {
    const formData = new FormData();
    formData.append("cattleId", cattleId);
    // console.log(id);
    // console.log(cattleId);
    dispatch(assignCattleToDoctor(id, formData));
  };

  useEffect(() => {
    if (error) {
      showToastErrorMessage(error);
      dispatch(clearErrors());
    }
    if (assignCattleError !== "") {
      showToastErrorMessage(assignCattleError);
      dispatch(clearErrors());
    }
    if (assignCattleSuccess) {
      showToastSuccessMessage();
      dispatch({ type: ASSIGN_CATTLE_RESET });
    }
    if (message !== "") {
      showToastErrorMessage(message);
    }
    dispatch(fetchCattle());
    dispatch(getDoctorDetails(id));
  }, [dispatch, id, error, assignCattleError, assignCattleSuccess, message]);

  return (
    <React.Fragment>
      {loading && !doctor ? (
        <CircularProgress />
      ) : (
        <React.Fragment>
          <Container maxWidth="xl" sx={{ marginTop: 8 }}>
            <Grid container spacing={5}>
              <Grid
                item
                xs={12}
                md={12}
                mb={8}
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                }}
              >
                <Paper
                  component="form"
                  onSubmit={SearchSubmit2}
                  sx={{
                    p: "2px 4px",
                    display: "flex",
                    alignItems: "center",
                    width: 400,
                  }}
                >
                  <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="SEARCH DOCTOR"
                    onChange={(e) => SearchSubmit(e)}
                  />
                  <IconButton type="button" aria-label="search">
                    <SearchIcon />
                  </IconButton>
                </Paper>
              </Grid>
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
                    <Typography style={styles}>No images available</Typography>
                  )}
                </Card>
                <Grid item m="10px 0" p={5}>
                  {/* <Typography variant="h6" mb={5}><b>Age:</b> {doctor?.age}</Typography>
                                    <Typography variant="h6"><b>Category:</b> {doctor?.category}</Typography> */}
                </Grid>
              </Grid>
              <Grid item xs={12} md={6} color="green">
                <Typography style={styles} variant="h4">
                  Doctor Details
                </Typography>
                <hr />
                <Typography variant="h6">
                  <b>ID:</b> {doctor?._id}
                </Typography>
                <Typography variant="h6">
                  <b>Name:</b> {doctor?.name}
                </Typography>
                <Typography variant="h6">
                  <b>Contact:</b> {doctor?.contact}
                </Typography>
                <Typography variant="h6">
                  <b>Address:</b> {doctor?.address}
                </Typography>
                <Typography variant="h6">
                  <b>Email:</b> {doctor?.email}
                </Typography>
                {/* <Typography variant="h6"><b>Weight:</b> {doctor?.size.weight} kg</Typography>
                    <Typography variant="h6"><b>Hieght:</b> {doctor?.size.height} cm</Typography>
                    <Typography variant="h6"><b>Width:</b>{doctor?.size.width} cm</Typography> */}
                {/*<hr />
                    <Typography style={styles} variant="h6">Weekly Performance</Typography>
                    <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '0.8rem', color: 'gray' }}>Milk Production</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '0.8rem', color: 'gray' }}>Feeding Cost</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '0.8rem', color: 'gray' }}>Weight</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '0.8rem', color: 'gray' }}>Date Created</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        <TableRow>
                            <TableCell>{doctor?.trackPerformance.milkProduction}</TableCell>
                            <TableCell>{doctor?.trackPerformance.feedingCost}</TableCell>
                            <TableCell>{doctor?.trackPerformance.weight}</TableCell>
                            <TableCell>{doctor?.trackPerformance.createdAt}</TableCell>
                        </TableRow>
                        </TableBody>
                    </Table>
                    </TableContainer>*/}
              </Grid>
              <Grid item xs={12} md={3}>
                <Typography variant="h4" style={styles}>
                  Cattle Details
                </Typography>
                <hr />
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell
                          sx={{
                            fontWeight: "bold",
                            fontSize: "0.8rem",
                            color: "gray",
                          }}
                        >
                          Cattle ID
                        </TableCell>
                        <TableCell
                          sx={{
                            fontWeight: "bold",
                            fontSize: "0.8rem",
                            color: "gray",
                          }}
                        >
                          Medicines
                        </TableCell>
                        <TableCell
                          sx={{
                            fontWeight: "bold",
                            fontSize: "0.8rem",
                            color: "gray",
                          }}
                        >
                          Diseases
                        </TableCell>
                        <TableCell
                          sx={{
                            fontWeight: "bold",
                            fontSize: "0.8rem",
                            color: "gray",
                          }}
                        >
                          Injections
                        </TableCell>
                        {/* <TableCell sx={{ fontWeight: 'bold', fontSize: '0.8rem', color: 'gray' }}>Date Created</TableCell> */}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {/* <TableCell>{doctor.cattle[0].medicines[0].name}</TableCell> */}
                      {doctor?.cattle.length > 0 ? (
                        doctor.cattle.map((cattle, index) => (
                          <TableRow>
                            <TableCell key={index}>{cattle?._id}</TableCell>

                            <TableCell>
                              <span>
                                {cattle.medicines?.name === ""
                                  ? "N/A"
                                  : cattle.medicines?.name}
                              </span>
                            </TableCell>
                            <TableCell>
                              <span>
                                {cattle.diseases?.name === ""
                                  ? "N/A"
                                  : cattle.diseases?.name}
                              </span>
                            </TableCell>
                            <TableCell>
                              <span>
                                {cattle.injections?.name === ""
                                  ? "N/A"
                                  : cattle.injections?.name}
                              </span>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell align="center" colSpan={5}>
                            No Cattle Record Against {doctor?.name}
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
              <Grid
                item
                container
                xs={12}
                sm={12}
                md={12}
                rowSpacing={2}
                columnSpacing={2}
              >
                <Typography
                  sx={{
                    backgroundColor: "rgba(0 , 200 , 0 , 0.7)",
                    color: "red",
                    padding: "0.6rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  variant="h4"
                  width="100%"
                  margin="2rem auto"
                  boxShadow="3px 5px 20px 10px rgba(50 , 200 , 0 , 0.5)"
                >
                  Cattle List
                </Typography>
                {cattles.map((cattle) => (
                  <Grid item xs={12} sm={6} md={4} key={cattle._id}>
                    {/* <Container maxWidth='xl' key={cattle._id}> */}
                    {/* <Grid item sm={12} md={5} sx={{backgroundColor: 'red'}} marginTop={4} padding={5}> */}
                    {/* <div sx={{display: 'flex' , justifyContent: 'space-around' , alignItems: 'center' }}> */}
                    <ImageList cols={3} rowHeight={100}>
                      {cattle.images.map((image) => (
                        <ImageListItem key={image._id}>
                          <img
                            src={`${image.url}`}
                            alt={image.public_id}
                            loading="lazy"
                          />
                        </ImageListItem>
                      ))}
                    </ImageList>
                    <Typography variant="h6" color="blue">
                      {cattle._id}
                    </Typography>
                    <Button
                      sx={{
                        border: "1px solid gray",
                        backgroundColor: "rgba(0 , 200 , 0 , 1)",
                        color: "black",
                        fontWeight: "bold",
                        width: "10rem",
                        border: "none",
                        "&:hover": {
                          backgroundColor: "darkgreen",
                          color: "white",
                          border: "none",
                        },
                      }}
                      onClick={() => AssignCattleToDoctor(cattle._id)}
                    >
                      Assign To Dr.{doctor?.name}
                    </Button>
                    {/* </div> */}
                    <hr />
                    {/* </Grid> */}
                    {/* </Container> */}
                  </Grid>
                ))}
              </Grid>
            </Grid>
            {searchResults.length > 0 && (
              <SearchResults searchResults={searchResults} />
            )}
          </Container>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default DoctorDetails;
