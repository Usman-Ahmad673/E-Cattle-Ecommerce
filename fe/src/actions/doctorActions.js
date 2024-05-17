    import axios from 'axios';
    // src/actions/doctorActions.js
    import  { ALL_DOCTOR_FAIL, ALL_DOCTOR_REQUEST, ALL_DOCTOR_SUCCESS, DOCTOR_DETAILS_FAIL, DELETE_DOCTOR_REQUEST, DELETE_DOCTOR_SUCCESS, REGISTER_DOCTOR_FAIL, REGISTER_DOCTOR_REQUEST, REGISTER_DOCTOR_SUCCESS, UPDATE_DOCTOR_FAIL, UPDATE_DOCTOR_REQUEST, UPDATE_DOCTOR_SUCCESS, CLEAR_ERRORS, DOCTOR_DETAILS_REQUEST, DOCTOR_DETAILS_SUCCESS, ASSIGN_CATTLE_REQUEST, ASSIGN_CATTLE_SUCCESS, ASSIGN_CATTLE_FAIL } from '../constants/doctorConstants';


    // Action to create a new doctor
    export const createDoctor = (doctorData) => async(dispatch) => {
    try {
        dispatch({ type: REGISTER_DOCTOR_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.post(
            `http://127.0.0.1:5000/api/v1/doctor/new`,
            doctorData,
            config
        );
        
        // On success, dispatch DOCTOR_CREATE_SUCCESS with the new doctor data
        dispatch({ type: REGISTER_DOCTOR_SUCCESS, payload: data });
        // On failure, dispatch DOCTOR_CREATE_FAIL with the error message
    } catch (error) {
        dispatch({
        type: REGISTER_DOCTOR_FAIL,
        payload: error.response ? error.response.data.message : error.message,
        });
    }
    };

    // Action to fetch doctor data
    export const fetchDoctor = () => async(dispatch) => {
    try {
        dispatch({ type: ALL_DOCTOR_REQUEST });



        const { data } = await axios.get(`http://127.0.0.1:5000/api/v1/doctors`);
        dispatch({ type: ALL_DOCTOR_SUCCESS, payload: data.doctors });
        // console.log(data);
    } catch (error) {
        dispatch({
        type: ALL_DOCTOR_FAIL,
        payload: error.response ? error.response.data.message : error.message,
        });
    }
    };

            // Get Doctor Details
export const getDoctorDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type : DOCTOR_DETAILS_REQUEST });
    
        const { data } = await axios.get(`http://127.0.0.1:5000/api/v1/doctor/${id}`);
        console.log(data);
    
        dispatch({
            type : DOCTOR_DETAILS_SUCCESS,
            payload: data
        });
        } catch (error) {
        dispatch({
            type : DOCTOR_DETAILS_FAIL,
            payload: error.response.data.message,
        });
        }
    };

export const assignCattleToDoctor = (id , cattleId) => async (dispatch) => {
    try {
        console.log(id);
        console.log(cattleId);
        dispatch({ type : ASSIGN_CATTLE_REQUEST });
        console.log('1');
        const config = {
            headers: {"Content-Type":"application/json"}
        }
        
        console.log('2');
        
        const { data } = await axios.put(`http://127.0.0.1:5000/api/v1/doctor/addcattle/${id}` , cattleId , config);
        // const { data } = await axios.put(`http://127.0.0.1:5000/api/v1/doctor/addcattle/${id}` , cattleId);
        console.log('3');
        console.log(data);
        console.log('4');
        
        dispatch({
            type : ASSIGN_CATTLE_SUCCESS,
            payload: data
        });
        console.log('5');
    } catch (error) {
            console.log('6');
            console.log(error.response.data);
        dispatch({
            type : ASSIGN_CATTLE_FAIL,
            payload: error.response.data,
        });
        }
    };


    // Action to update doctor data
    export const updateDoctor = (doctorId, cattle) => async(dispatch) => {
    try {
        dispatch({ type: UPDATE_DOCTOR_REQUEST });



        const config = {
            headers: {"Content-Type":"application/json"}
        }
        
        console.log('Doctor Id : ',doctorId);
        console.log('Cattle Data : ',cattle);

        const { data } = await axios.put(`http://127.0.0.1:5000/api/v1/doctor`, {doctorId , cattle} , config);
        console.log('Updated Doctor Data for Cattles: ' , data);
        dispatch({ type: UPDATE_DOCTOR_SUCCESS, payload: data });
        // On failure, dispatch DOCTOR_UPDATE_FAIL with the error message
    } catch (error) {
        dispatch({
            type: UPDATE_DOCTOR_FAIL,
            payload: error.response ? error.response.data.message : error.message,
        });
    }
    };

    // Action to delete doctor
    export const deleteDoctor = (doctorId) => async(dispatch) => {
        try {
            dispatch({ type: DELETE_DOCTOR_REQUEST });
            
            
            const { data } = await axios.delete(`http://127.0.0.1:5000/api/v1/doctor/${doctorId}`);

            dispatch({ type: DELETE_DOCTOR_SUCCESS, payload: data});

        } catch (error) {
        dispatch({
        type: DOCTOR_DETAILS_FAIL,
        payload: error.response ? error.response.data.message : error.message,
        });
    }
    };



    //Clearing Errors
export const clearErrors = () => async(dispatch) =>{
    dispatch({
        type : CLEAR_ERRORS
    })
}

