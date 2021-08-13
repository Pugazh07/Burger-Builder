import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
    return{
        type: actionTypes.AUTH_START,
        loading: true
    }
}

export const authSuccess = ({idToken, localId}) => {
    return{
        type: actionTypes.AUTH_SUCCESS,
        token: idToken,
        userId: localId
    }
}

export const authFail = (error) => {
    return{
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const auth = (email, password, isSignIn) => {
    return dispatch => {
        dispatch(authStart());
        let url="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDBOG9INRj7LknAB1rpUEZ5faQHEyEti-Y";
        if(isSignIn){
            url="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDBOG9INRj7LknAB1rpUEZ5faQHEyEti-Y";
        }
        axios.post(url, {
            email: email,
            password: password,
            returnSecureToken: true
        }).then( res => {
            console.log(res)
            dispatch(authSuccess(res.data))
        })
        .catch( err => {
            console.log(err.response)
            dispatch(authFail(err.response.data.error))
        })
    }
}