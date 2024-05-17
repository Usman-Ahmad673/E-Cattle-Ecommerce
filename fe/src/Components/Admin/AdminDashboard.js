import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, loadUser, logout } from '../../actions/userActions';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Grid, Typography, Paper, Container, Card, CardContent, CardMedia, Dialog, DialogActions, DialogTitle, TextField } from '@mui/material';
// import './productDetails.css'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Sidebar from '../Sidebar/Sidebar';
import CattleDisplay from '../Cattle/CattleDisplay';
import DoctorDisplay from '../Cattle/Doctor/DoctorDisplay';
import { deleteCattle, fetchCattle, updateCattle } from '../../actions/cattleActions';
import CircularProgress from '@mui/material/CircularProgress';
import { toast } from 'react-toastify';
import { DELETE_CATTLE_RESET, UPDATE_CATTLE_RESET } from '../../constants/cattleConstants';
import { Link } from 'react-router-dom';
import { fetchDoctor } from '../../actions/doctorActions';
import { createProduct } from '../../actions/productActions';
import { NEW_PRODUCT_RESET } from '../../constants/productConstants';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

const { cattles, loading, error } = useSelector((state) => state.cattle);

const { doctors, loading : doctorLoading, error: doctorError } = useSelector((state) => state.doctor);
const { product , success , error: productError} = useSelector((state) => state.newProduct);

const [name, setName] = useState('');
const [description, setDescription] = useState('');
const [price, setPrice] = useState(0);
const [stock, setStock] = useState(0);
const [open, setOpen] = useState(false);


const showToastErrorMessage = (err) => {
    toast.error(err, {
        position: toast.POSITION.TOP_RIGHT,
    });
};

const showToastSuccessMessage = () => {
    toast.success(`Successfully Added Cattle In The Ecommerce Store!`, {
        position: toast.POSITION.TOP_RIGHT,
    });
};

const submitDetailsToggle = () => {
    open ? setOpen(false) : setOpen(true);
    };

const handleAddCattleToEcommerce = (cattle) => {
    // if(stock > 0 || price > 0 || description !== ''){
            console.log(cattle);
            const formData = new FormData()
        formData.set('cattle_id',cattle._id)
        formData.set('name','')
        formData.set('images',cattle.images[0].url)
        formData.set('category',cattle.category)
        formData.set('stock',localStorage.getItem('stock'))
        formData.set('price',localStorage.getItem('price'))
        formData.set('description',localStorage.getItem('description'))
        dispatch(createProduct(formData));
        setStock(0)
        setPrice(0)
        setDescription('')
        localStorage.setItem('stock', stock)
        localStorage.setItem('price', price)
        localStorage.setItem('description', description)
    // }
    // showToastErrorMessage('Add Details Please')
}
const addDetails = () => {

    localStorage.setItem('stock', stock)
    localStorage.setItem('price', price)
    localStorage.setItem('description', description)
    // console.log(cattle);
    // const formData = new FormData()
    // formData.set('images',cattle.images[0].url)
    // formData.set('category',cattle.category)
    // formData.set('stock',localStorage.getItem('stock'))
    // formData.set('price',localStorage.getItem('price'))
    // formData.set('description',localStorage.getItem('description'))
    // console.log(cattle._id);
    // createProduct()
}

useEffect(() => {
    if (error) {
        showToastErrorMessage(error);
        dispatch(clearErrors());
    }
    if (doctorError) {
        showToastErrorMessage(doctorError);
        dispatch(clearErrors());
    }
    if (productError) {
        showToastErrorMessage('Cattle is already added in the store');
        dispatch(clearErrors());
    }
    if (success) {
        showToastSuccessMessage();
        dispatch({type: NEW_PRODUCT_RESET});
    }

    dispatch(fetchDoctor());
    dispatch(fetchCattle());
}, [dispatch , error , success , productError]);


if (loading || doctorLoading) {
    return <CircularProgress />;
}

    return (
        <React.Fragment>
        <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
            <Typography variant="h5" style={{ color: 'orange', marginBottom: '16px' , display:'flex' , justifyContent:'center', alignItems:'center' }}>
                Total Cattles in the Farm: {cattles.length}
            </Typography>
            {Array.isArray(cattles) && cattles.length > 0 ? (
                cattles.map((cattleItem) => (
                <Card key={cattleItem._id} sx={{ marginBottom: '16px' , bgcolor: 'rgb(2,0,36)', background: 'linear-gradient(154deg, rgba(2,0,36,0.7399334733893557) 0%, rgba(83,205,38,1) 55%, rgba(255,255,255,1) 100%)' }}>
                    <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={6} md={3}>
                        <CardMedia
                            component="img"
                            alt="Cattle Image"
                            height="140"
                            image={cattleItem.images[0].url}
                            sx={{ borderRadius: '10%' }}
                        />
                        </Grid>
                        <Grid item xs={12} md={12}>
                        <Typography color='white'><b>ID: </b>{cattleItem._id}</Typography>
                        </Grid>
                        <Grid item xs={12} md={3}>
                        <Typography color='white'><b>Age: </b>{cattleItem.age}</Typography>
                        </Grid>
                        <Grid item xs={12} md={3}>
                        <Typography color='white'><b>Category: </b>{cattleItem.category}</Typography>
                        </Grid>
                        {/* Add more Typography components for other details */}
                    </Grid>
                    </CardContent>
                    <CardContent>
                        <Button
                        onClick={() => handleAddCattleToEcommerce(cattleItem)}
                        disabled={cattles ? false : true}
                        variant="contained"
                        color="warning"
                        sx={{ marginTop: '5px' }}
                        >
                        Add To Ecommerce
                        </Button>
                        <Button onClick={submitDetailsToggle}>Add Details</Button>
                    <Link to={`/cattle/${cattleItem._id}`}>
                        <Button sx={{float:'right'}}  variant="text" color="warning">
                            Details
                        </Button>
                    </Link>
                    </CardContent>
                </Card>
                ))
            ) : (
                <Typography>No Cattles data available</Typography>
            )}
            
            </Paper>
        </Grid>
            <Grid item xs={12} md={4}>
                <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
            <Typography variant="h5" style={{ color: 'orange', marginBottom: '16px' , display:'flex' , justifyContent:'center', alignItems:'center' }}>
                    Total Doctors in the Farm: {doctors.length}
                </Typography>
                {Array.isArray(doctors) && doctors.length > 0 ? (
                doctors.map((doctorItem) => (
                    <Card key={doctorItem._id} sx={{ marginBottom: '16px' , bgcolor: 'rgb(2,0,36)', background: 'linear-gradient(154deg, rgba(2,0,36,0.7399334733893557) 0%, rgba(83,205,38,1) 55%, rgba(255,255,255,1) 100%)' }}>
                        <CardContent>
                        <Grid container spacing={2}>
                        <Grid item>
                            <CardMedia
                                component="img"
                                alt="doctor Image"
                                height="140"
                                image={doctorItem.images[0].url}
                                sx={{ borderRadius: '10%' }}
                            />
                        </Grid>
                        <Grid item xs={12} md={12} lg={12}>
                            <Typography color='white'><b>ID: </b>{doctorItem._id}</Typography>
                        </Grid>
                        <Grid item>
                            <Typography color='white'><b>Name: </b>{doctorItem.name}</Typography>
                        </Grid>
                    </Grid>
                    </CardContent>
                    <CardContent>
                    
                    <Link to={`/doctor/${doctorItem._id}`}>
                        <Button sx={{float:'right'}}  variant="text" color="warning">
                            Details
                        </Button>
                    </Link>
                    </CardContent>
                </Card>
                ))
                ):<Typography>No Doctors data available</Typography>}
        </Paper>
        </Grid>
    </Grid>

        {/* <Grid container spacing={0}> */}
            {/* <Grid item> */}
    <Dialog
        sx={{display:'flex' , justifyContent:'center' , alignItems:'center' , flexDirection:'column'}} 
        aria-labelledby="simple-dialog-title"
        open={open}
        onClose={() => setOpen(false)}
    >
    <DialogTitle>Add Additional Information</DialogTitle>                
        <DialogActions>
            
                        <TextField
                        fullWidth
                        label='Description'
                        type='text' 
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        size="large"
                        multiline
                        rows={3}
                        variant="outlined"
                        margin="normal"
                    />
                        <TextField 
                        fullWidth
                        label='Stock' 
                        type='Number' 
                        onChange={(e) => setStock(e.target.value)}
                        value={stock}
                        size="large"
                    />
                        <TextField 
                        fullWidth
                        label='Price' 
                        type='Number' 
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                        size="large"
                    />
                        <Button onClick={submitDetailsToggle} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={addDetails} color="primary">
                            Add Details
                        </Button>
        </DialogActions>
    </Dialog>
            {/* </Grid> */}
        {/* </Grid> */}


    </React.Fragment>
);
};

export default AdminDashboard;
