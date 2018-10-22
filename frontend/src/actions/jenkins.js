import axios from 'axios';
import { GET_ERRORS, FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE, JOB_CREATION_SUCCESS, JOB_CREATION_FAILURE, BUILD_CREATION_SUCCESS, BUILD_CREATION_FAILURE, JOB_DETAILS_SUCCESS, JOB_DETAILS_FAILURE, JOB_CONFIGURATION_SUCCESS, JOB_CONFIGURATION_FAILURE } from './types';

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

export const createNewJob = (jobDetails, history) => dispatch => {
    axios.post('/api/jenkins/createNewJob', jobDetails)
        .then(res => {
            dispatch({
                type: res.data.success ? JOB_CREATION_SUCCESS : JOB_CREATION_FAILURE,
                payload: res.data.message,
            });
            history.replace("/home");
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            })
        });
}

export const getJobDetails = (jobName) => dispatch => {
    axios.get('/api/jenkins/getJobDetails/' + jobName)
        .then(res => {
            dispatch({
                type: res.data.success ? JOB_DETAILS_SUCCESS : JOB_DETAILS_FAILURE,
                payload: res.data.message,
            });
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            })
        });
}

export const configureJob = (job, history) => dispatch => {
    axios.post('/api/jenkins/configureJob', job)
        .then(res => {
            dispatch({
                type: res.data.success ? JOB_CONFIGURATION_SUCCESS : JOB_CONFIGURATION_FAILURE,
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