import { FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE, JOB_CREATION_SUCCESS, JOB_DETAILS_SUCCESS } from '../actions/types';

export default function (state = [], action) {
    switch (action.type) {
        case FETCH_DATA_SUCCESS:
            return {
                ...state,
                jobs: action.payload
            };
        case JOB_CREATION_SUCCESS:
            return {
                ...state,
                job: action.payload
            }
        case JOB_DETAILS_SUCCESS:
            return {
                ...state,
                buildCommand: action.payload.buildCommand,
                deployCommand: action.payload.deployCommand,
            }
        default: return { ...state }
    }
} 