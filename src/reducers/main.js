import { combineReducers } from 'redux';
import manifests from './manifests';
import manifestFilter from './manifestFilter';
import authenticate from './authenticate';

const MainReducer = combineReducers({
    manifests,
    manifestFilter,
    authenticate
})

export default MainReducer;