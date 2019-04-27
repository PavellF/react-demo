import {AUTH_FAILED, AUTH_LOGOUT, AUTH_REDIRECT, AUTH_START, AUTH_SUCCESS,} from "../actions/actionsEnum";

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirect: "/builder",
};

const reducer = (currentState = initialState, action) => {

    switch (action.type) {
        case AUTH_SUCCESS: {
            return Object.assign({}, currentState, {
                loading: false,
                error: null,
                token: action.payload.idToken,
                userId: action.payload.localId
            });
        }
            break;
        case AUTH_FAILED: {
            return Object.assign({}, currentState, {loading: false, error: action.payload});
        }
            break;
        case AUTH_START: {
            return Object.assign({}, currentState, {loading: true, error: null});
        }
        case AUTH_LOGOUT: {
            localStorage.removeItem("credentials");
            return Object.assign({}, currentState, {
                loading: false,
                error: null,
                token: null,
                userId: null
            });
        }
            break;
        case AUTH_REDIRECT: {
            return Object.assign({}, currentState, {authRedirect: action.payload});
        }
            break;
        default: {
            return currentState;
        }
    }

}

export default reducer;