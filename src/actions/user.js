import axios from "axios";

import * as user from "../actiontypes/user";
import { apiUrl } from "../config";

function getAuthHeader(token) {
    return `Bearer ${token}`;
}
export function requestUserInfo() {
    return {
        type: user.REQUEST_USER_INFO
    };
}

export function receiveUserInfo(data) {
    return {
        type: user.RECEIVE_USER_INFO,
        info: data.data
    };
}

export function clearUserInfo() {
    return {
        type: user.CLEAR_USER_INFO
    };
}

export function loginError(err) {
    return {
        type: user.DISPLAY_ERROR,
        flash: err.message
    };
}

export function requestSetUserInfo() {
    return {
        type: user.REQUEST_SET_USER_INFO
    };
}

export function userInfoIsSet(info) {
    return {
        type: user.USER_INFO_IS_SET,
        info
    };
}

export function fetchUserInfo(token) {
    return dispatch => {
        dispatch(requestUserInfo());
        return axios
            .get(`${apiUrl.root}/my-account`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: getAuthHeader(token)
                }
            })
            .then(data => {
                dispatch(receiveUserInfo(data));
                return data.data;
            })
            .catch(err => {
                console.log("ERRERER", err);
                throw err;
            });
    };
}

export function saveUserInfo(userDocumentObject, token) {
    return dispatch => {
        dispatch(requestSetUserInfo());
        return axios
            .put(`${apiUrl.root}/my-account`, userDocumentObject, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: getAuthHeader(token)
                }
            })
            .then(data => {
                dispatch(userInfoIsSet(data.data));
                return data.data;
            })
            .catch(err => {
                throw err;
            });
    };
}
