import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import jenkinsReducer from './jenkinsReducer';
import projectReducer from './projectReducer';

export default combineReducers({
    errors: errorReducer,
    auth: authReducer,
    jenkins: jenkinsReducer,
    project: projectReducer,
});