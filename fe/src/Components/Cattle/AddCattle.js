import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, createCattle } from '../../actions/cattleActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { CircularProgress, Container, MenuItem, Select, Typography } from '@mui/material';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { REGISTER_CATTLE_RESET } from '../../constants/cattleConstants';

const AddCattle = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { success, error , loading } = useSelector((state) => state.newCattle);
    // const { isAuthenticated } = useSelector((state) => state.user);

    const [disable , setDisable] = useState(false)

    const [age, setAge] = useState('')
    const [height, setHeight] = useState('')
    const [width, setWidth] = useState('')
    const [weight, setWeight] = useState('')
    const [category, setCategory] = useState('')
    const [feed, setFeed] = useState('')
    const [cost, setCost] = useState('')
    const [milk, setMilk] = useState('')
    const [vaccinationDates, setVaccinationDates] = useState('')
    const [pregnancyDate, setPregnancyDate] = useState('')
    const [calvingDate, setCalvingDate] = useState('')
    const [images, setImages] = useState([])
    const [imagesPreview, setImagesPreview] = useState([])
    // const [formData, setFormData] = useState({
    //     age: '',
    //     height: '',
    //     width: '',
    //     weight: '',
    //     category: '',
    //     feed: '',
    //     cost: '',
    //     milk: '',
    //     vaccinationDates: '',
    //     pregnancyDate: '',
    //     calvingDate: '',
    //     images: [],
    //     imagesPreview: [],
    // });

    const showToastErrorMessage = (e) => {
        toast.success(e, {
        position: toast.POSITION.TOP_RIGHT,
        });
    };

    const showToastSuccessMessage = () => {
        toast.success(`Successfully Created Cattle!`, {
        position: toast.POSITION.TOP_RIGHT,
        });
    };

    useEffect(() => {
        if (error) {
            showToastErrorMessage(error);
            dispatch(clearErrors());
        }
    //     if (!isAuthenticated) {
    //     navigate('/');
    //     }
        if (success) {
            showToastSuccessMessage();
            navigate('/');
            // navigate('/cattle');
            dispatch({ type: REGISTER_CATTLE_RESET });
        }
    }, [dispatch , navigate , success , error]);
    // }, [dispatch, error, success, isAuthenticated]);



    const createProductImagesChange = (e) => {
        const files = Array.from(e.target.files);
        setImages([]);
        setImagesPreview([]);

        files.forEach((file) => {
            const reader = new FileReader();

        reader.onload = () => {
        if (reader.readyState === 2) {
            setImagesPreview((old) => [...old, reader.result]);
            setImages((old) => [...old, reader.result]);
        }
        };

        reader.readAsDataURL(file);
    });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        setDisable(!disable)

        // const formattedData = {
        // ...formData,
        // vaccinationDates: vaccinationDates
        //     ? format(new Date(vaccinationDates), 'MM/dd/yyyy')
        //     : null,
        // pregnancyDate: pregnancyDate
        //     ? format(new Date(pregnancyDate), 'MM/dd/yyyy')
        //     : null,
        // calvingDate: calvingDate
        //     ? format(new Date(calvingDate), 'MM/dd/yyyy')
        //     : null,
        // };


        const myForm = new FormData();
    
        myForm.set("age", age);
        myForm.set("size.height", height);
        myForm.set("size.width", width);
        myForm.set("size.weight", weight);
        myForm.set("category", category);
        myForm.set("feed", feed);
        myForm.set("cost", cost);
        myForm.set("vaccinationDate", vaccinationDates);
        myForm.set("pregnancyDate", pregnancyDate);
        myForm.set("calvingDate", calvingDate);
        
        images.forEach((image) => {
            myForm.append("images", image);
        });

        // for (const key in formattedData) {
        // if (Array.isArray(formattedData[key])) {
        //     formattedData[key].forEach((item) => {
        //     myForm.append(key, item);
        //     });
        // } else {
        //     myForm.set(key, formattedData[key]);
        // }
        // }

        dispatch(createCattle(myForm));
    };

    const categoryOptions = [
        'Option 1',
        'Option 2',
        'Option 3',
        // Add more category options here
    ];

    return (
        <Container maxWidth="md" style={{ margin: '2rem auto', border: '1px solid #ccc', padding: '1rem' }}>
        <form onSubmit={handleSubmit}>
            <Grid item xs={12}>
            <Typography variant="h4" component="div" style={{ color: 'orange', width: '100%' }}>
                Add Cattle
            </Typography>
            </Grid>
            <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
                <TextField
                fullWidth
                type="file"
                name="images"
                label="Images"
                variant="outlined"
                onChange={createProductImagesChange}
                />
            </Grid>

            <Grid item xs={10} sm={6} md={4}>
            <TextField
                fullWidth
                name="age"
                label="Age"
                variant="outlined"
                value={age}
                onChange={(e) => setAge(e.target.value)}
            />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
            <TextField
                fullWidth
                name="category"
                select
                label="Category"
                variant="outlined"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            >
    <MenuItem value="" disabled={true}>Select Category</MenuItem> {/* Add this line */}
    {categoryOptions.map((option) => (
      <MenuItem key={option} value={option} onChange={(e) => setCategory(e.target.value)}>
        {option}
      </MenuItem>
    ))}
  </TextField>
</Grid>

            <Grid item xs={12} sm={6} md={4}>
            <TextField
                fullWidth
                name="feed"
                label="Feed"
                variant="outlined"
                value={feed}
                onChange={(e) => setFeed(e.target.value)}
            />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
            <TextField
                fullWidth
                name="cost"
                label="Cost"
                variant="outlined"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
            />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
            <TextField
                fullWidth
                name="vaccinationDates"
                label="Vaccination Dates"
                variant="outlined"
                type="date"
                value={vaccinationDates}
                onChange={(e) => setVaccinationDates(e.target.value)}
            />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
            <TextField
                fullWidth
                name="pregnancyDate"
                label="Pregnancy Date"
                variant="outlined"
                type="date"
                value={pregnancyDate}
                onChange={(e) => setPregnancyDate(e.target.value)}
            />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
            <TextField
                fullWidth
                name="calvingDate"
                label="Calving Date"
                variant="outlined"
                type="date"
                value={calvingDate}
                onChange={(e) => setCalvingDate(e.target.value)}
            />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
            <TextField
                fullWidth
                name="weight"
                label="Weight"
                variant="outlined"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}

            />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
            <TextField
                fullWidth
                name="width"
                label="Width"
                variant="outlined"
                value={width}
                onChange={(e) => setWidth(e.target.value)}

            />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
            <TextField
                fullWidth
                name="height"
                label="Height"
                variant="outlined"
                value={height}
                onChange={(e) => setHeight(e.target.value)}

            />
            </Grid>
            <Grid item xs={12}>
            <Button style={{backgroundColor:"green"}} type="submit" variant="contained" disabled={disable}>
                Add Cattle
                </Button>
            </Grid>
            </Grid>
        </form>
        </Container>
    );
};

export default AddCattle;