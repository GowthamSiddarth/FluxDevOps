import axios from 'axios';
import { GET_ERRORS, FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE, JOB_CREATION_SUCCESS, JOB_CREATION_FAILURE, BUILD_CREATION_SUCCESS, BUILD_CREATION_FAILURE } from './types';

export const getJenkinsJobs = () => dispatch => {
    axios.get('/api/jenkins/jobs')
        .then(res => {
            dispatch({
                type: res.data.success ? FETCH_DATA_SUCCESS : FETCH_DATA_FAILURE,
                payload: res.data.message,
            })
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        });
}

export const createNewJob = (jobDetails) => dispatch => {
    axios.post('/api/jenkins/createNewJob', jobDetails)
        .then(res => {
            dispatch({
                type: res.data.success ? JOB_CREATION_SUCCESS : JOB_CREATION_FAILURE,
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

export const scheduleBuild = (jobDetails) => dispatch => {
    axios.post('/api/jenkins/scheduleBuild', jobDetails)
        .then(res => {
            dispatch({
                type: res.data.success ? BUILD_CREATION_SUCCESS : BUILD_CREATION_FAILURE,
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