import * as FilterActionTypes from '../actiontypes/filter';

export function setManifestFilter(filter) {
  return {
    type: FilterActionTypes.SET_MANIFEST_FILTER,
    manifestFilter: filter
  };
}