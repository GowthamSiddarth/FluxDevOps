import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import jenkinsReducer from './jenkinsReducer';
import defaultsReducer from "./defaultsReducer";

export default combineReducers({
    errors: errorReducer,
    auth: authReducer,
    jenkins: jenkinsReducer,
    defaults: defaultsReducer,
});