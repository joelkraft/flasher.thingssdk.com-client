import axios from 'axios';

import * as auth from '../actiontypes/authenticate';

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
    console.log('encodedCred', encodedCred);
    return function(dispatch) {
        dispatch(requestAuth());
        return axios.get(
            'http://localhost:3001/v2/authorize',
            {
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': encodedCred
                }
            }
        ).then((json) => {
            const token = json.data.access_token;
            document.cookie = `Authorization=${token}`;
            dispatch(receiveAuth(token));
        }) 
    }
}

export function checkForToken() {
    return function(dispatch) {
        const cookie = document.cookie;
        if (cookie) {
            // TODO put a library here?
            const parseCookie = c => c.substr(c.search('=') + 1);
            const tokenInCookie = parseCookie(cookie);
            // set token on state
            dispatch(receiveAuth(tokenInCookie));
            // fetch manifests with token
        }
    }
    // redirect to login
}
