import axios from 'axios';
import { GET_ERRORS, FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE } from './types';

export const createNewProject = (projectDetails, history) => dispatch => {
    axios.post('/api/projects/createNewProject', projectDetails)
        .then(res => {
            dispatch({
                type: res.data.success ? FETCH_DATA_SUCCESS : FETCH_DATA_FAILURE,
                payload: res.data.message,
            })
            history.replace("/home");
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            })
        });
}