import { SET_MANIFEST_FILTER } from '../actiontypes/filter';

export default ( state = 'ALL', action ) => {
    switch (action.type) {
        case SET_MANIFEST_FILTER:
            return action.manifestFilter;
        default:
            return state;
    }
}
