import * as types from "./actionTypes";
import * as creatorApi from "../../api/creatorApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

// Naming conv: verbNoun
// Requires a type and usually a payload
export function loadCreatorsSuccess(creators) {
  return { type: types.LOAD_CREATORS_SUCCESS, creators };
}

export function loadCreators() {
  return function(dispatch) {
    dispatch(beginApiCall());
    return creatorApi
      .getCreators()
      .then(creators => {
        dispatch(loadCreatorsSuccess(creators));
      })
      .catch(error => {
        // dispatching error message here.
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
