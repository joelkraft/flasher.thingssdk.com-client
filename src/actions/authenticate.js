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
            });
    };
}

export function checkForToken() {
    return function(dispatch) {
        const cookie = document.cookie;
        if (cookie) {
            // TODO put a library here?
            const parseCookie = c => c.substr(c.search("=") + 1);
            const tokenInCookie = parseCookie(cookie);
            // test
            // const tokenInCookie = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU4NDRlMTdiZWU4NTJiZjgzMzc4ZmQ5ZCIsImV4cCI6MTQ5MjA2NTM3NzA5OSwiaWF0IjoxNDkyMDU4MTc3fQ.vPvb6wQaoQpqDDEk7gqRe_x974C9U0ZEqMxGvX_WQxk"
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
