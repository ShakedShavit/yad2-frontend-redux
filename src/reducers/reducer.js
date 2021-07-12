import { combineReducers } from 'redux'
import userDataReducer from '../features/loginSlice';
import apartmentsReducer from '../features/apartmentsSlice';
import publishApartmentReducer from '../features/publishApartmentSlice';
import searchParamsReducer from '../features/searchParamsSlice';

export default combineReducers({
    userDataState: userDataReducer,
    apartments: apartmentsReducer,
    publishApartmentData: publishApartmentReducer,
    searchParamsData: searchParamsReducer
})