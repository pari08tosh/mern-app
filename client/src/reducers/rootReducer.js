import { combineReducers } from 'redux';
import itemReducer from './itemReducer';
import authReducer from './authReducer';

export default combineReducers({
    items: itemReducer,
    auth: authReducer
});