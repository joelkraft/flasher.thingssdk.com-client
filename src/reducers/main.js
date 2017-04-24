import { combineReducers } from 'redux';
import manifests from './manifests';
import manifestFilter from './manifestFilter';
import authenticate from './authenticate';
import user from './user';

const MainReducer = combineReducers({
    manifests,
    manifestFilter,
    authenticate,
    user
})

export default MainReducer;