import axios from "axios";

import * as auth from "../actiontypes/authenticate";

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
    console.log("encodedCred", encodedCred);
    return function(dispatch) {
        dispatch(requestAuth());
        return axios
            .get("http://localhost:3001/v2/authorize", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: encodedCred
                }
            })
            .then(json => {
                const token = json.data.access_token;
                document.cookie = `Authorization=${token}`;
                dispatch(receiveAuth(token));
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
            // const tokenInCookie = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU4NDRmNDIwNTI1YTAzZmIzNDA1ZDA3NCIsImV4cCI6MTQ5MjQxMDM4MTE2OSwiaWF0IjoxNDkyNDAzMTgxfQ.Gq2sl1U8xtro2nOiQthzCIajGE5zpKiaPkyUENWnGQ8"
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
