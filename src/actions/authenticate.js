import axios from "axios";

import { fetchUserInfo } from './user'
import * as auth from "../actiontypes/authenticate";
import { apiUrl } from "../config";

export function requestAuth() {
    return {
        type: auth.REQUEST_AUTH
    };
}

export function receiveAuth(token) {
    return {
        type: auth.RECEIVE_AUTH,
        token
    };
}

export function clearAuth() {
    return {
        type: auth.CLEAR_AUTH
    };
}

export function loginError(err) {
    return {
        type: auth.DISPLAY_ERROR,
        flash: err.message
    }
}

export function logout() {
    return function(dispatch) {
        console.log(document.cookie)
        document.cookie = 'Authorization='
        console.log(document.cookie)
        return dispatch(clearAuth())
    }
}

export function sendCredentials(username, password) {
    const encodedCred = btoa(`${username}:${password}`);
    return function(dispatch) {
        dispatch(requestAuth());
        return axios
            .get(`${apiUrl.root}/authorize`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: encodedCred
                }
            })
            .then(json => {
                const token = json.data.access_token;
                document.cookie = `Authorization=${token}`;
                dispatch(receiveAuth(token));
                return dispatch(fetchUserInfo(token))
            })
            .catch(err => {
                dispatch(loginError(err))
            })
    };
}

export function checkTokenInCookies() {
    return function(dispatch) {
        const cookie = document.cookie;
        if (cookie) {
            // TODO put a library here?
            const parseCookie = c => c.substr(c.search("=") + 1);
            const tokenInCookie = parseCookie(cookie);
            // test
            if (typeof tokenInCookie !== 'string' || tokenInCookie.length === 0) {
                return false
            }
            // extract expiration from jwt
            const tokenPayload = tokenInCookie.split(".")[1];
            const decoded = atob(tokenPayload);
            const { exp } = JSON.parse(decoded);

            // if valid, set token on state
            if (exp > Date.now()) {
                dispatch(receiveAuth(tokenInCookie));
                return true;
            } else {
                return false;
            }
            // fetch manifests with token
        }
    };
    // redirect to login
}
