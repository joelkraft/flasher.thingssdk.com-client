import { REQUEST_MANIFESTS, RECEIVE_MANIFESTS } from "../actiontypes/filter";
import {
    MANIFEST_WAS_SAVED,
    MANIFEST_WAS_NOT_SAVED,
    REQUEST_SAVE_MANIFEST
} from "../actiontypes/manifests";

export default (state = { items: [] }, action) => {
    switch (action.type) {
        case REQUEST_MANIFESTS:
            return {
                ...state,
                isFetching: true
            };
        case RECEIVE_MANIFESTS:
            return {
                isFetching: false,
                items: action.items,
                lastUpdated: action.receivedAt
            };
        case REQUEST_SAVE_MANIFEST:
            return {
                ...state,
                isSaving: true
            };
        case MANIFEST_WAS_SAVED:
            return {
                ...state,
                isSaving: false,
                items: state.items.map(item => {
                    if (item.manifest === action.item.manifest) {
                        return action.item
                    }
                    return { ...item }
                })
            };
        case MANIFEST_WAS_NOT_SAVED:
            return {
                ...state,
                isSaving: false
            };
        default:
            return state;
    }
};
