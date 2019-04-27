import {AUTH_FAILED, AUTH_LOGOUT, AUTH_REDIRECT, AUTH_START, AUTH_SUCCESS} from "./actionsEnum";
import axios from "axios";

export const auth = (credentials, isSignUp) => {
    return dispatch => {
        dispatch({type: AUTH_START});

        const url = isSignUp ?
            "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAY1N68UHFeTKn8230qoAVRZmIc0bxWfuo"
            :
            "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAY1N68UHFeTKn8230qoAVRZmIc0bxWfuo"

        axios.post(url, credentials).then(result => {

            const expirationDate = Date.now() + result.data.expiresIn * 1000;
            const credentials = Object.assign({}, result.data, {expirationDate});
            localStorage.setItem('credentials', JSON.stringify(credentials));

            dispatch(authSuccess(result.data));
            dispatch(checkAuthTimeout(+result.data.expiresIn));

        }).catch(error => {
            dispatch({type: AUTH_FAILED, payload: error});
        });
    }
}

export const logout = () => {
    return {
        type: AUTH_LOGOUT
    }
}

export const authSuccess = (payload) => {
    return {
        type: AUTH_SUCCESS,
        payload
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: AUTH_REDIRECT,
        payload: path
    }
}

export const checkAuthState = () => {
    return dispatch => {
        const credentials = JSON.parse(localStorage.getItem('credentials'));

        if (credentials) {
            const expirationDate = credentials["expirationDate"];

            if (expirationDate > Date.now()) {

                dispatch(authSuccess(credentials));
                dispatch(checkAuthTimeout((expirationDate - Date.now()) / 1000));
            } else {
                dispatch(logout());
            }

        } else {
            dispatch(logout());
        }
    }
}