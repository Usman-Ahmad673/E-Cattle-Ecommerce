    import axios from 'axios';
    // src/actions/cattleActions.js
    import  { ALL_CATTLE_FAIL, ALL_CATTLE_REQUEST, ALL_CATTLE_SUCCESS, CATTLE_DETAILS_FAIL, DELETE_CATTLE_REQUEST, DELETE_CATTLE_SUCCESS, REGISTER_CATTLE_FAIL, REGISTER_CATTLE_REQUEST, REGISTER_CATTLE_SUCCESS, UPDATE_CATTLE_FAIL, UPDATE_CATTLE_REQUEST, UPDATE_CATTLE_SUCCESS, CLEAR_ERRORS, CATTLE_DETAILS_REQUEST, CATTLE_DETAILS_SUCCESS } from '../constants/cattleConstants';


    // Action to create a new cattle
    export const createCattle = (cattleData) => async(dispatch) => {
    try {
        console.log('Request to add Cattle');
        dispatch({ type: REGISTER_CATTLE_REQUEST });
        
        const config = { headers: { "Content-Type": "application/json" } };
        console.log('Log Before Api call to add Cattle');
        const { data } = await axios.post(
            `http://127.0.0.1:5000/api/v1/cattle/new`,
            cattleData,
            config
            );
            
            console.log('Log After Api call to add Cattle');
            console.log(data);
        // On success, dispatch CATTLE_CREATE_SUCCESS with the new cattle data
        dispatch({ type: REGISTER_CATTLE_SUCCESS, payload: data });
        // On failure, dispatch CATTLE_CREATE_FAIL with the error message
    } catch (error) {
        dispatch({
        type: REGISTER_CATTLE_FAIL,
        payload: error.response ? error.response.data.message : error.message,
        });
    }
    };

    // Action to fetch cattle data
    export const fetchCattle = () => async(dispatch) => {
    try {
        dispatch({ type: ALL_CATTLE_REQUEST });



        const { data } = await axios.get(`http://127.0.0.1:5000/api/v1/cattles`);
        dispatch({ type: ALL_CATTLE_SUCCESS, payload: data.cattles });
        // console.log(data);
    } catch (error) {
        dispatch({
        type: ALL_CATTLE_FAIL,
        payload: error.response ? error.response.data.message : error.message,
        });
    }
    };



        // Get Cattle Details
export const getCattleDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type : CATTLE_DETAILS_REQUEST });
    
        const { data } = await axios.get(`http://127.0.0.1:5000/api/v1/cattle/${id}`);
        console.log(data);
    
        dispatch({
            type : CATTLE_DETAILS_SUCCESS,
            payload: data
        });
        } catch (error) {
        dispatch({
            type : CATTLE_DETAILS_FAIL,
            payload: error.response.data.message,
        });
        }
    };

    // Action to update cattle data
    export const updateCattle = (cattleId, updatedData) => async(dispatch) => {
    try {
        dispatch({ type: UPDATE_CATTLE_REQUEST });



        const config = {
            headers: {"Content-Type":"application/json"}
        }

        console.log('updatedData: ',updatedData);

        const { data } = await axios.put(`http://127.0.0.1:5000/api/v1/cattle` , {cattleId , updatedData }, config);


        console.log(data);
        
        dispatch({ type: UPDATE_CATTLE_SUCCESS, payload: data });
        // On failure, dispatch CATTLE_UPDATE_FAIL with the error message
    } catch (error) {
        dispatch({
            type: UPDATE_CATTLE_FAIL,
        payload: error.response ? error.response.data.message : error.message,
        });
    }
    };

    // Action to delete cattle
    export const deleteCattle = (cattleId) => async(dispatch) => {
        try {
            dispatch({ type: DELETE_CATTLE_REQUEST });
            
            
            const { data } = await axios.delete(`http://127.0.0.1:5000/api/v1/cattle/${cattleId}`);

            dispatch({ type: DELETE_CATTLE_SUCCESS, payload: data});

        } catch (error) {
        dispatch({
        type: CATTLE_DETAILS_FAIL,
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

