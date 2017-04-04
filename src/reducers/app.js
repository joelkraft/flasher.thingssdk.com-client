import * as FilterActionTypes from '../actiontypes/filter';
import manifests from '../dummyData';

const initialState = {
  manifestFilter: 'ALL',
  manifests: manifests
}

const AppReducer = function(state = initialState, action) {
  switch (action.type) {
    case FilterActionTypes.SET_MANIFEST_FILTER:
        return {
            ...state, 
            manifestFilter: action.manifestFilter
        };
    case 'dashboard/SET_MANIFEST_LIST':
        return {
            ...state,
            manifests: action.data
        };
    default:
      return state;
  }
}

export default AppReducer;