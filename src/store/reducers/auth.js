import * as actionTypes from '../actions/actionTypes';

const initialState = {
    authData: null,
    error: false,
    loading: false
}

const authReducer = (state=initialState, action) => {
    switch(action.type){
        case actionTypes.AUTH_START:
            return{
                ...state,
                loading: true
            }
        case actionTypes.AUTH_SUCCESS:
            return{
                ...state,
                authData: action.authData,
                loading: false
            }
        case actionTypes.AUTH_FAIL:
            return{
                ...state,
                error: action.error,
                loading: false
            }
        default:
            return state
    }
}

export default authReducer;