import fetch from "isomorphic-fetch";
import { apiUrl } from "../config";
import { getIdFromUrl, getUrlFromId } from "../util";

import {
    REQUEST_MANIFESTS,
    RECEIVE_MANIFESTS,
    RECEIVE_MANIFESTS_FAILED,
    REQUEST_MANIFEST,
    RECEIVE_MANIFEST,
    RECEIVE_MANIFEST_FAILED,
    MANIFEST_WAS_SAVED,
    MANIFEST_WAS_NOT_SAVED,
    REQUEST_SAVE_MANIFEST,
    REQUEST_CREATE_MANIFEST,
    MANIFEST_WAS_CREATED,
    MANIFEST_WAS_NOT_CREATED,
    REQUEST_DELETE_MANIFEST,
    MANIFEST_WAS_DELETED,
    MANIFEST_WAS_NOT_DELETED
} from "../actiontypes/manifests";

const processData = data =>
    data.options.reduce((arr, man) => {
        const { name } = man;
        const rows = man.versions.map(version => {
            return { ...version, name };
        });
        return arr.concat(rows);
    }, []);

export function requestManifest() {
    return {
        type: REQUEST_MANIFEST
    };
}

export function receiveManifest(item) {
    return {
        type: RECEIVE_MANIFEST,
        item
    };
}

export function receiveManifestFailed() {
    return {
        type: RECEIVE_MANIFEST_FAILED
    };
}

export function fetchManifest(manifestId, token) {
    const authHeaderValue = `Bearer ${token}`;
    return function(dispatch) {
        dispatch(requestManifest());
        return fetch(`${apiUrl.root}/manifests/${manifestId}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: authHeaderValue
            }
        })
            .then(response => response.json())
            .then(doc => {
                dispatch(receiveManifest(doc));
            })
            .catch(err => {
                dispatch(receiveManifestFailed());
                throw err;
            });
    };
}

export function requestManifests() {
    return {
        type: REQUEST_MANIFESTS
    };
}

export function receiveManifests(items) {
    return {
        type: RECEIVE_MANIFESTS,
        items
    };
}

export function receiveManifestsFailed() {
    return {
        type: RECEIVE_MANIFESTS_FAILED
    };
}

export function fetchManifests(token) {
    const authHeaderValue = `Bearer ${token}`;
    return function(dispatch) {
        dispatch(requestManifests());
        return fetch(apiUrl.root, {
            headers: {
                "Content-Type": "application/json",
                Authorization: authHeaderValue
            }
        })
            .then(response => response.json())
            .then(res => {
                const processedData = processData(res);
                dispatch(receiveManifests(processedData));
            })
            .catch(err => {
                dispatch(receiveManifestsFailed());
                throw err;
            });
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
    const authHeaderValue = `Bearer ${token}`;
    return function(dispatch) {
        dispatch(requestSaveManifest());
        return fetch(`${apiUrl.root}/manifests/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: authHeaderValue
            },
            body: JSON.stringify(item)
        })
            .then(response => response.json())
            .then(doc => dispatch(manifestWasSaved()))
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
    const authHeaderValue = `Bearer ${token}`;
    return function(dispatch) {
        dispatch(requestCreateManifest());
        return fetch(`${apiUrl.root}/manifests`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: authHeaderValue
            },
            body: JSON.stringify(item)
        })
            .then(response => response.json())
            .then(doc => {
                const manifestDoc = {
                    ...doc,
                    manifest: getUrlFromId(doc._id),
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

export function requestDeleteManifest() {
    return {
        type: REQUEST_DELETE_MANIFEST
    };
}

export function manifestWasDeleted(id) {
    return {
        type: MANIFEST_WAS_DELETED,
        id
    };
}

export function manifestWasNotDeleted() {
    return {
        type: MANIFEST_WAS_NOT_DELETED
    };
}

export function deleteManifest(id, token) {
    const authHeaderValue = `Bearer ${token}`;
    return function(dispatch) {
        dispatch(requestDeleteManifest());
        return fetch(`${apiUrl.root}/manifests/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: authHeaderValue
            }
        })
            .then(response => response.json())
            .then(doc => dispatch(manifestWasDeleted(id)))
            .catch(err => {
                dispatch(manifestWasNotDeleted());
                throw err;
            });
    };
}
