import axios from "axios";
import { FETCH_DEFAULT_SUCCESS, FETCH_DEFAULT_FAILURE, GET_ERRORS } from "./types";

export const getDefaultBuildCommand = (project) => dispatch => {    
    axios.post('/api/defaults/command', project)
        .then(res => {
            dispatch({
                type: res.data.success ? FETCH_DEFAULT_SUCCESS : FETCH_DEFAULT_FAILURE,
                payload: res.data.message,
            })
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            })
        });
} 
