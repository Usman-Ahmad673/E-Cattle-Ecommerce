import  { ALL_CATTLE_FAIL, ALL_CATTLE_REQUEST, ALL_CATTLE_SUCCESS, CATTLE_DETAILS_FAIL, DELETE_CATTLE_REQUEST, DELETE_CATTLE_SUCCESS, REGISTER_CATTLE_FAIL, REGISTER_CATTLE_REQUEST, REGISTER_CATTLE_SUCCESS, UPDATE_CATTLE_FAIL, UPDATE_CATTLE_REQUEST, UPDATE_CATTLE_SUCCESS, CLEAR_ERRORS, DELETE_CATTLE_FAIL, DELETE_CATTLE_RESET, UPDATE_CATTLE_RESET, REGISTER_CATTLE_RESET, CATTLE_DETAILS_REQUEST, CATTLE_DETAILS_SUCCESS } from '../constants/cattleConstants';


    export const createCattleReducer = (state = { cattle: {} }, action) => {
        switch (action.type) {
            case REGISTER_CATTLE_REQUEST:
                return {
                    ...state,
                    loading: true,
                };
                case REGISTER_CATTLE_SUCCESS:
                    return {
                        ...state,
                        loading: false,
                        success: action.payload,
                        cattle:action.payload
                    };
                    
                    case REGISTER_CATTLE_FAIL:
                        return {
                            ...state,
                            loading: false,
                            error: action.payload,
                        };
                    case REGISTER_CATTLE_RESET:
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



    export const allCattlesReducer = (state = { cattles: [] }, action) => {
        switch (action.type) {
        case ALL_CATTLE_REQUEST:
            return {
            ...state,
            loading: true,
            };
        case ALL_CATTLE_SUCCESS:
            return {
            ...state,
            loading: false,
            cattles: action.payload,
            };
    
        case ALL_CATTLE_FAIL:
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



    export const delCattleReducer = (state = { cattle: {} }, action) => {
        switch (action.type) {
        case DELETE_CATTLE_REQUEST:
        case UPDATE_CATTLE_REQUEST:
            return {
            ...state,
            loading: true,
            };
        case DELETE_CATTLE_SUCCESS:
            return {
                ...state,
                loading: false,
                cattles: action.payload,
                isDeleted: action.payload,
            };
        case UPDATE_CATTLE_SUCCESS:
            return {
            ...state,
            loading: false,
            cattles: action.payload,
            isUpdated: action.payload,
            };
    
        case DELETE_CATTLE_FAIL:
        case UPDATE_CATTLE_FAIL:
            return {
            ...state,
            loading: false,
            error: action.payload,
            };

            case DELETE_CATTLE_RESET:
            return {
                ...state,
                isDeleted: false,
            };
            case UPDATE_CATTLE_RESET:
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




export const cattleDetailsReducer = (state = { cattleDetails: [] }, action) => {
    switch (action.type) {
        case CATTLE_DETAILS_REQUEST:
            return {
            loading: true,
            ...state,
            };
        case CATTLE_DETAILS_SUCCESS:
            return {
            loading: false,
            success: action.payload.success,
            cattle: action.payload.cattle
            };
        case CATTLE_DETAILS_FAIL:
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