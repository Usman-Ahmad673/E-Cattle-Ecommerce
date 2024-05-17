import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, deleteDoctor, fetchDoctor } from '../../../actions/doctorActions';
import {
Table,
TableBody,
TableCell,
TableContainer,
TableHead,
TableRow,
Paper,
Button,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { toast } from 'react-toastify';
import { DELETE_DOCTOR_RESET } from '../../../constants/doctorConstants';
import { Link } from 'react-router-dom';



const DoctorDisplay = () => {



const dispatch = useDispatch();
const { doctors, loading, error } = useSelector((state) => state.doctor);
const { isDeleted , error: deleteError } = useSelector((state) => state.delDoctor);


const showToastErrorMessage = (err) => {
    toast.error(err, {
    position: toast.POSITION.TOP_RIGHT
    });
};
const showToastSuccessMessage = () => {
    toast.success(`Successfully Deleted Doctor!`, {
    position: toast.POSITION.TOP_RIGHT
    });
};

const handleDeleteDoctor = (doctorId) => {
    console.log(doctorId);
    dispatch(deleteDoctor(doctorId));
};

useEffect(() => {
    if (error) {
        showToastErrorMessage(error);
        
        dispatch(clearErrors());
    }
    
    
    if (deleteError) {
        showToastSuccessMessage();
        
        dispatch(clearErrors());
    }
    
        if (isDeleted) {
        showToastSuccessMessage();
        
        dispatch({ type: DELETE_DOCTOR_RESET });
        }
        dispatch(fetchDoctor());
    }, [dispatch , error , isDeleted , deleteError]);



    
if (loading) {
    return <CircularProgress />;
}
if (error) {
    return <div>Error: {error}</div>;
}
return (
    <TableContainer component={Paper} sx={{bgcolor: 'rgb(2,0,36)', background: 'linear-gradient(154deg, rgba(2,0,36,0.7399334733893557) 0%, rgba(83,205,38,1) 55%, rgba(255,255,255,1) 100%)'}}>
    <Table>
        <TableHead>
        <TableRow>
            <TableCell sx={{ fontWeight: 'bold', fontSize: '0.8rem' , color:'white' }}>Name</TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize: '0.8rem' , color:'white' }}>Image</TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize: '0.8rem' , color:'white' }}>Address</TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize: '0.8rem' , color:'white' }}>Contact</TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize: '0.8rem' , color:'white' }}>Actions</TableCell> {/* Add this column for buttons */}
        </TableRow>
        </TableHead>
        <TableBody>
        {Array.isArray(doctors) && doctors.length > 0 ? (
            doctors.map((doc) => (
            <TableRow key={doc._id}>
                <TableCell>{doc.name}</TableCell>
                <TableCell>
                <img style={{borderRadius:'10%'}}
                    src={doc.images[0].url}
                    alt="Doctor-Img"
                />
                </TableCell>
                <TableCell>{doc.address}</TableCell>
                <TableCell>{doc.contact}</TableCell>
                <TableCell>
                <Link to={`/doctor/${doc._id}`}>
                    <Button variant="contained" color="primary">
                        Edit
                    </Button>
                </Link>
                <Button onClick={() => handleDeleteDoctor(doc._id)} variant="contained" color="secondary"  sx={{marginTop:'5px'}}>
                    Delete
                </Button>
                </TableCell>
            </TableRow>
            ))
        ) : (
                <TableRow>
                    <TableCell>
                        No Doctor data available
                    </TableCell>
                </TableRow>
        )}
        </TableBody>
    </Table>
    </TableContainer>
);
};
export default DoctorDisplay;