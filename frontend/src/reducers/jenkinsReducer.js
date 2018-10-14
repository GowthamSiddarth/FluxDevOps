import { FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE, JOB_CREATION_SUCCESS } from '../actions/types';

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
        default: return { ...state }
    }
} 