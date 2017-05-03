import axios from "axios";
import { apiUrl } from "../config";
import { getIdFromUrl, getUrlFromId } from "../util";

import { REQUEST_MANIFESTS, RECEIVE_MANIFESTS } from "../actiontypes/filter";
import {
    MANIFEST_WAS_SAVED,
    MANIFEST_WAS_NOT_SAVED,
    REQUEST_SAVE_MANIFEST,
    REQUEST_CREATE_MANIFEST,
    MANIFEST_WAS_CREATED,
    MANIFEST_WAS_NOT_CREATED
} from "../actiontypes/manifests";

const processData = data =>
    data.options.reduce((arr, man) => {
        const { name } = man;
        const rows = man.versions.map(version => {
            return { ...version, name };
        });
        return arr.concat(rows);
    }, []);

export function requestManifests() {
    return {
        type: REQUEST_MANIFESTS
    };
}

export function receiveManifests(items) {
    return {
        type: RECEIVE_MANIFESTS,
        items,
        receivedAt: Date.now()
    };
}

export function fetchManifests(token) {
    const authHeaderValue = `Bearer: ${token}`;
    return function(dispatch) {
        dispatch(requestManifests());
        return axios
            .get(apiUrl.root, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authHeaderValue
                }
            })
            .then(({ data }) => {
                const processedData = processData(data);
                dispatch(receiveManifests(processedData));
            })
            .catch(err => console.log("ERRERER", err));
    };
}

export function requestSaveManifest() {
    return {
        type: REQUEST_SAVE_MANIFEST
    };
}

export function manifestWasSaved(item) {
    return {
        type: MANIFEST_WAS_SAVED,
        item
    };
}

export function manifestWasNotSaved() {
    return {
        type: MANIFEST_WAS_NOT_SAVED
    };
}

export function saveManifest(item, token) {
    const id = getIdFromUrl(item.manifest);
    const authHeaderValue = `Bearer: ${token}`;
    return function(dispatch) {
        dispatch(requestSaveManifest());
        return axios
            .put(`${apiUrl.root}/manifests/${id}`, item, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authHeaderValue
                }
            })
            .then(({ data }) => dispatch(manifestWasSaved(data)))
            .catch(err => {
                dispatch(manifestWasNotSaved());
                throw err;
            });
    };
}

export function requestCreateManifest() {
    return {
        type: REQUEST_CREATE_MANIFEST
    };
}

export function manifestWasCreated(item) {
    return {
        type: MANIFEST_WAS_CREATED,
        item
    };
}

export function manifestWasNotCreated() {
    return {
        type: MANIFEST_WAS_NOT_CREATED
    };
}

export function createManifest(item, token) {
    const authHeaderValue = `Bearer: ${token}`;
    return function(dispatch) {
        dispatch(requestCreateManifest());
        return axios
            .post(`${apiUrl.root}/manifests`, item, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authHeaderValue
                }
            })
            .then(({ data }) => {
                const manifestDoc = {
                    ...data,
                    manifest: getUrlFromId(data._id),
                    isAuthor: true
                };
                return dispatch(manifestWasCreated(manifestDoc));
            })
            .catch(err => {
                dispatch(manifestWasNotCreated());
                throw err;
            });
    };
}
