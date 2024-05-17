import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, loadUser, logout } from '../../actions/userActions';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Grid, Typography, Paper, Container } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Sidebar from '../Sidebar/Sidebar';
import CattleDisplay from '../Cattle/CattleDisplay';
import DoctorDisplay from '../Cattle/Doctor/DoctorDisplay';



const Home = () => {



    const navigate = useNavigate()
    const dispatch = useDispatch();

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




    return (
        <React.Fragment>
            <Container maxWidth="xl">
                <Grid container spacing={2}>
                    <Grid item xs={12} md={8}>
                        <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
                            <Typography variant='h5' style={{ color: 'orange' }}>Cattle Data</Typography>
                            <CattleDisplay />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
                            <Typography variant='h5' style={{ color: 'orange' }}>Doctor Data</Typography>
                            <DoctorDisplay />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </React.Fragment>
    );
};
export default Home;