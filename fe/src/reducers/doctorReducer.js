import  { ALL_DOCTOR_FAIL, ALL_DOCTOR_REQUEST, ALL_DOCTOR_SUCCESS, DOCTOR_DETAILS_FAIL, DELETE_DOCTOR_REQUEST, DELETE_DOCTOR_SUCCESS, REGISTER_DOCTOR_FAIL, REGISTER_DOCTOR_REQUEST, REGISTER_DOCTOR_SUCCESS, UPDATE_DOCTOR_FAIL, UPDATE_DOCTOR_REQUEST, UPDATE_DOCTOR_SUCCESS, CLEAR_ERRORS, DELETE_DOCTOR_RESET, UPDATE_DOCTOR_RESET, DELETE_DOCTOR_FAIL, REGISTER_DOCTOR_RESET, DOCTOR_DETAILS_SUCCESS, DOCTOR_DETAILS_REQUEST, ASSIGN_CATTLE_REQUEST, ASSIGN_CATTLE_SUCCESS, ASSIGN_CATTLE_FAIL, ASSIGN_CATTLE_RESET } from '../constants/doctorConstants';



    export const createDoctorReducer = (state = { doctor: {} }, action) => {
        switch (action.type) {
            case REGISTER_DOCTOR_REQUEST:
                return {
                    ...state,
                    loading: true,
                };
                case REGISTER_DOCTOR_SUCCESS:
                    return {
                        ...state,
                        loading: false,
                        success:action.payload,
                        doctor: action.payload,
                    };
                    
                    case REGISTER_DOCTOR_FAIL:
                        return {
                            ...state,
                            loading: false,
                            error: action.payload,
                        };
                    case REGISTER_DOCTOR_RESET:
                        return {
                            ...state,
                            success: false,
                        };
        case CLEAR_ERRORS:
            return {
            ...state,
            error: null,
            };
    
        default:
            return state;
        }
    };



    export const allDoctorsReducer = (state = { doctors: [] }, action) => {
        switch (action.type) {
        case ALL_DOCTOR_REQUEST:
            return {
            ...state,
            loading: true,
            };
        case ALL_DOCTOR_SUCCESS:
            return {
            ...state,
            loading: false,
            doctors: action.payload,
            };
    
        case ALL_DOCTOR_FAIL:
            return {
            ...state,
            loading: false,
            error: action.payload,
            };
    
        case CLEAR_ERRORS:
            return {
            ...state,
            error: null,
            };
    
        default:
            return state;
        }
};



export const delDoctorReducer = (state = { doctor: {} }, action) => {
    switch (action.type) {
    case DELETE_DOCTOR_REQUEST:
    case UPDATE_DOCTOR_REQUEST:
        return {
        ...state,
        loading: true,
        };
    case DELETE_DOCTOR_SUCCESS:
        return {
            ...state,
            loading: false,
            doctors: action.payload,
            isDeleted: action.payload,
        };
    case UPDATE_DOCTOR_SUCCESS:
        return {
        ...state,
        loading: false,
        doctors: action.payload,
        isUpdated: action.payload,
        };

    case DELETE_DOCTOR_FAIL:
    case UPDATE_DOCTOR_FAIL:
        return {
        ...state,
        loading: false,
        error: action.payload,
        };

        case DELETE_DOCTOR_RESET:
        return {
            ...state,
            isDeleted: false,
        };
        case UPDATE_DOCTOR_RESET:
            return {
                ...state,
                isUpdated: false,
            };

    case CLEAR_ERRORS:
        return {
        ...state,
        error: null,
        };

    default:
        return state;
    }
};



export const doctorDetailsReducer = (state = { doctorDetails: [] }, action) => {
    switch (action.type) {
        case DOCTOR_DETAILS_REQUEST:
            return {
                loading: true,
                ...state,
            };
        case DOCTOR_DETAILS_SUCCESS:
            return {
            loading: false,
            success: action.payload.success,
            doctor: action.payload.doctor
            };
        case DOCTOR_DETAILS_FAIL:
            return {
            loading: false,
            error: action.payload,
            };
    
        case CLEAR_ERRORS:
            return {
            ...state,
            error: null,
            };
        default:
            return state;
        }
    };



export const assignCattleToDoctor = (state = { doctor: {} }, action) => {
    switch (action.type) {
        case ASSIGN_CATTLE_REQUEST:
            return {
                success: false,
                ...state,
            };
        case ASSIGN_CATTLE_SUCCESS:
            return {
                success: action.payload.success,
                doctor: action.payload.doctor,
            };
        case ASSIGN_CATTLE_FAIL:
            return {
                success: false,
                error: action.payload.message,
            };
        case ASSIGN_CATTLE_RESET:
            return {
                loading: false,
                success: false
            };
    
        case CLEAR_ERRORS:
            return {
            ...state,
            error: null,
            };
        default:
            return state;
        }
    };