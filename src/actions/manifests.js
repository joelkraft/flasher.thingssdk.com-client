import axios from "axios";
import { apiUrl } from "../config";
import { getIdFromUrl } from '../util';

import { REQUEST_MANIFESTS, RECEIVE_MANIFESTS } from "../actiontypes/filter";
import {
    MANIFEST_WAS_SAVED,
    MANIFEST_WAS_NOT_SAVED,
    REQUEST_SAVE_MANIFEST
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
