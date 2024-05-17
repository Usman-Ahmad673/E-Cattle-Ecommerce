import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getCattleDetails } from '../../actions/cattleActions';
import { CircularProgress, Container, Grid, Typography, Paper, Card, CardMedia, Table, TableHead, TableRow, TableCell, TableContainer, TableBody, IconButton, InputBase, keyframes } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import styled from '@emotion/styled';

// Define your styles
const styles = {
    fontWeight: 'bold',
    color: 'red',
};


const blinker = keyframes`
  50% {
    opacity: 0;
  }
`;

// Define the styled component with the blinking animation
const BlinkingText = styled(Typography)`
  && {
    font-weight: bold;
    color: gray;
    animation: ${blinker} 1s linear infinite;
  }
`;

// Define your SearchResults component
const SearchResults = ({ searchResults }) => {
    return (
        <div>
            <Typography style={styles} variant="h6">Search Results:</Typography>
            {/* Render your search results here */}
            {searchResults.map((result) => (
                <div key={result.id}>
                    <Typography variant="body1">{result.name}</Typography>
                    {/* Include other details from search results */}
                </div>
            ))}
            {/* Render your custom component here */}
            <CustomComponent />
        </div>
    );
};

// Define a custom component to render
const CustomComponent = () => {
    return (
        <div>
            <Typography variant="h6">Custom Component</Typography>
            {/* Add your custom component content here */}
        </div>
    );
};

const CattleDetails = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const { cattle, loading, success } = useSelector((state) => state.cattleDetail);

    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState(''); // Store search results here

    const SearchSubmit = (e) => {
        setSearch(e.target.value);
    };

    const SearchSubmit2 = () => {
        // Dispatch your search action or filter results here
        // For this example, I'm just simulating some search results
        const results = [
            { id: 1, name: 'Search Result 1' },
            { id: 2, name: 'Search Result 2' },
            // Include more search results
        ];

        setSearchResults(results);
    };

    const medicalDetails = (dateCheck) => {
        // console.log('Date to check: ', dateCheck);
        console.log('Date');
        const currentDate = new Date();
        // const checkDate = new Date(dateCheck);

        console.log('Current Date: ', currentDate.toLocaleDateString('en-GB'));
        console.log('Check Date: ', dateCheck);
        console.log('Current Date is Greater Than Check Date: ', currentDate.toLocaleDateString('en-GB') > dateCheck);
        return (currentDate.toLocaleDateString('en-GB') > dateCheck);
    }
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
        dispatch(getCattleDetails(id));
        // addDate()
    }, [dispatch, id]);

    useEffect(() => {
        if (cattle) {
            addDate();
        }
    }, [cattle]);

    const [vaccinationDate, setVaccinationDate] = useState();
    const [pregnancyDate, setPregnancyDate] = useState();
    const [calvingDate, setCalvingDate] = useState();

    const addDate = () => {
        setVaccinationDate(cattle.vaccinationDate ? new Date(cattle.vaccinationDate).toLocaleDateString('en-GB') : 'N/A');
        setPregnancyDate(cattle.pregnancyDate ? new Date(cattle.pregnancyDate).toLocaleDateString('en-GB') : 'N/A');
        setCalvingDate(cattle.calvingDate ? new Date(cattle.calvingDate).toLocaleDateString('en-GB') : 'N/A');
    }

    console.log(vaccinationDate);
    console.log(pregnancyDate);
    console.log(calvingDate);

    // console.log('Date');
    // const currentDate = new Date();
    // const calvingDate = new Date(cattle?.vaccinationDate);

    // console.log(currentDate.toLocaleDateString('en-GB'));
    // console.log(calvingDate.toLocaleDateString('en-GB'));
    // console.log(currentDate < calvingDate);
    return (
        <React.Fragment>
            {!cattle ? (
                <CircularProgress />
            ) : (
                    <React.Fragment>
                        <Container maxWidth='xl' sx={{ marginTop: 8, color: 'green' }} >
                            <Grid container spacing={5}>
                                <Grid item xs={12} md={12} mb={8} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                    <Paper
                                        component="form"
                                        onSubmit={SearchSubmit2}
                                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                                    >
                                        <InputBase
                                            sx={{ ml: 1, flex: 1 }}
                                            placeholder="SEARCH CATTLE"
                                            onChange={(e) => SearchSubmit(e)}
                                        />
                                        <IconButton type="button" aria-label="search">
                                            <SearchIcon />
                                        </IconButton>
                                    </Paper>
                                </Grid>
                                <Grid item xs={8} md={3}>
                                    <Card>
                                        {cattle && cattle.images && cattle.images[0] ? (
                                            <CardMedia
                                                component="img"
                                                alt={cattle.images[0].public_id}
                                                height="200"
                                                image={cattle.images[0].url}
                                            />
                                        ) : (
                                                <Typography style={styles}>No images available</Typography>
                                            )}
                                    </Card>
                                    <Grid item m='10px 0' p={5}>
                                        <Typography variant="h6" mb={5}><b>Age:</b> {cattle.age}</Typography>
                                        <Typography variant="h6"><b>Category:</b> {cattle.category}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography style={styles} variant="h4">Cattle Details</Typography>
                                    <Typography variant="h6"><b>ID:</b> {cattle._id}</Typography>
                                    <Typography variant="h6"><b>Feed:</b> {cattle.feed}</Typography>
                                    <Typography variant="h6"><b>Cost:</b> {cattle.cost}</Typography>
                                    <Typography variant="h6"><b>Milk Produce:</b> {cattle.milk}</Typography>
                                    <Typography variant="h6"><b>Weight:</b> {cattle.size.weight} kg</Typography>
                                    <Typography variant="h6"><b>Hieght:</b> {cattle.size.height} cm</Typography>
                                    <Typography variant="h6"><b>Width:</b>{cattle.size.width} cm</Typography>
                                    <Typography variant="h6"><b>Created At :</b> {cattle.createdAt ? new Date(cattle.createdAt).toLocaleDateString('en-GB') : 'N/A'}</Typography>
                                    <hr />
                                    <Typography style={styles} variant="h6">Weekly Performance</Typography>
                                    <TableContainer component={Paper}>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell sx={{ fontWeight: 'bold', fontSize: '0.8rem', color: 'gray' }}>Milk Production</TableCell>
                                                    <TableCell sx={{ fontWeight: 'bold', fontSize: '0.8rem', color: 'gray' }}>Feeding Cost</TableCell>
                                                    <TableCell sx={{ fontWeight: 'bold', fontSize: '0.8rem', color: 'gray' }}>Weight</TableCell>
                                                    <TableCell sx={{ fontWeight: 'bold', fontSize: '0.8rem', color: 'gray' }}>Weeks</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {cattle.trackPerformance.map((trackPerformance, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell>{trackPerformance.milkProduction}</TableCell>
                                                        <TableCell>{trackPerformance.feedCost}</TableCell>
                                                        <TableCell>{trackPerformance.weight}</TableCell>
                                                        <TableCell>{trackPerformance.date !== undefined ? new Date(trackPerformance.date).toLocaleDateString('en-GB') : 'N/A'}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                                <Grid item xs={12} md={3}>
                                    <Typography variant='h4' style={styles}>Medical Details</Typography>
                                    <hr />
                                    {medicalDetails(vaccinationDate) ? (
                                        <BlinkingText variant="h6">
                                            <b>Vaccination Date:</b> {vaccinationDate}
                                        </BlinkingText>
                                    ) : (
                                            <Typography variant="h6">
                                                <b>Vaccination Date:</b> {vaccinationDate}
                                            </Typography>
                                        )}

                                    {medicalDetails(pregnancyDate) ? (
                                        <BlinkingText variant="h6">
                                            <b>Pregnancy Date:</b> {pregnancyDate}
                                        </BlinkingText>
                                    ) : (
                                            <Typography variant="h6">
                                                <b>Pregnancy Date:</b> {pregnancyDate}
                                            </Typography>
                                        )}

                                    {medicalDetails(calvingDate) ? (
                                        <BlinkingText variant="h6">
                                            <b>Calving Date:</b> {calvingDate}
                                        </BlinkingText>
                                    ) : (
                                            <Typography variant="h6">
                                                <b>Calving Date:</b> {calvingDate}
                                            </Typography>
                                        )}
                                </Grid>
                            </Grid>
                            {searchResults.length > 0 && <SearchResults searchResults={searchResults} />}
                        </Container>
                    </React.Fragment>
                )}
        </React.Fragment>
    );
};

export default CattleDetails;
