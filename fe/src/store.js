import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  profileReducer,
  userReducer,
  forgotPasswordReducer,
  allUsersReducer,
  userDetailsReducer,
  userLoginReducer,
  userLogoutReducer,
  loadUserReducer,
} from "./reducers/userReducer";
import {
  allCattlesReducer,
  cattleDetailsReducer,
  createCattleReducer,
  delCattleReducer,
} from "./reducers/cattleReducer";
import {
  allDoctorsReducer,
  assignCattleToDoctor,
  createDoctorReducer,
  delDoctorReducer,
  doctorDetailsReducer,
} from "./reducers/doctorReducer";
import { newProductReducer } from "./reducers/productReducers";

const reducer = combineReducers({
  newUser: userReducer,
  user: userReducer,
  // loadUser:loadUserReducer,
  userLogout: userReducer,
  // userLogin: userLoginReducer,
  forgotPassword: forgotPasswordReducer,
  profile: profileReducer,

  newProduct: newProductReducer,

  newCattle: createCattleReducer,
  cattle: allCattlesReducer,
  cattleDetail: cattleDetailsReducer,
  delCattle: delCattleReducer,
  updCattle: delCattleReducer,

  doctor: allDoctorsReducer,
  newDoctor: createDoctorReducer,
  doctorDetail: doctorDetailsReducer,
  updDoctor: delDoctorReducer,
  delDoctor: delDoctorReducer,
  assignCattle: assignCattleToDoctor,
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

store.subscribe(() => console.log(store.getState()));

export default store;
