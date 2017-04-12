import { REQUEST_MANIFESTS, RECEIVE_MANIFESTS } from '../actiontypes/filter';

export default ( state = {items:[]}, action ) => {
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
        default:
            return state;
    }
}
