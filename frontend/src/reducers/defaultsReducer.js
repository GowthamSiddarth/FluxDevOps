import { FETCH_DEFAULT_SUCCESS, FETCH_DEFAULT_FAILURE } from "../actions/types";

export default function (state = [], action) {
    switch (action.type) {
        case FETCH_DEFAULT_SUCCESS:
            return {
                ...state,
                buildCommand: action.payload.build_command,
            };
        default: return { ...state }
    }
} 