import {
    REQUEST_MANIFESTS,
    RECEIVE_MANIFESTS,
    MANIFEST_WAS_SAVED,
    MANIFEST_WAS_NOT_SAVED,
    REQUEST_SAVE_MANIFEST,
    REQUEST_CREATE_MANIFEST,
    MANIFEST_WAS_CREATED,
    MANIFEST_WAS_NOT_CREATED
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
                ...state,
                isFetching: false,
                items: action.items
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
                        return action.item;
                    }
                    return { ...item };
                })
            };
        case MANIFEST_WAS_NOT_SAVED:
            return {
                ...state,
                isSaving: false
            };
        case REQUEST_CREATE_MANIFEST:
            return {
                ...state,
                isCreating: true
            };
        case MANIFEST_WAS_CREATED:
            return {
                ...state,
                isCreating: false,
                items: [...state.items, action.item]
            };
        case MANIFEST_WAS_NOT_CREATED:
            return {
                ...state,
                isCreating: false
            };
        default:
            return state;
    }
};
