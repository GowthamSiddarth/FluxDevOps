import axios from 'axios';
import { GET_ERRORS, FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE } from './types';

export const createNewProject = (location, history) => dispatch => {
    axios.post('/api/projects/createNewProject', location)
        .then(res => {
            console.log(res.data);
            dispatch({
                type: res.data.success ? FETCH_DATA_SUCCESS : FETCH_DATA_FAILURE,
                payload: res.data.message,
            })
            history.push('/selectProjectType');            
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            })
        });
}