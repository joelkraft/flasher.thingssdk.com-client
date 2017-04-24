import axios from "axios";
import { apiUrl } from "../config";

import { REQUEST_MANIFESTS, RECEIVE_MANIFESTS } from "../actiontypes/filter";

const processData = data =>
    data.options.reduce(
        (arr, man) => {
            const { name } = man;
            const rows = man.versions.map(version => {
                return { ...version, name };
            });
            return arr.concat(rows);
        },
        []
    );

export function requestManifests() {
    return {
        type: REQUEST_MANIFESTS
    };
}

export function receiveManifests(json) {
    return {
        type: RECEIVE_MANIFESTS,
        items: processData(json.data),
        receivedAt: Date.now()
    };
}

export function fetchManifests(token) {
    const authHeaderValue = `Bearer: ${token}`
    return function(dispatch) {
        dispatch(requestManifests());
        return axios
            .get(apiUrl.root, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authHeaderValue
                }
            })
            .then(data => {
                dispatch(receiveManifests(data));
            })
            .catch(err => console.log("ERRERER", err));
    };
}
