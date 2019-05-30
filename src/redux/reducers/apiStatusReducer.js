import * as types from "../actions/actionTypes";
import initialState from "./initialState";

// helper function to detmine if the api call will end in success usign substring
function actionTypeEndsInSuccess(type) {
  return type.substring(type.length - 8) === "_SUCCESS";
}

// Will determine the number of apiCalls in progress.
// This will handle the same action type in multiple reducers.
export default function apiCallStatusReducer(
  state = initialState.apiCallsInProgress,
  action
) {
  if (action.type == types.BEGIN_API_CALL) {
    return state + 1;
  } else if (
    // allows us to see an error message when the API fails to load.
    action.type === types.API_CALL_ERROR ||
    actionTypeEndsInSuccess(action.type)
  ) {
    return state - 1;
  }
  return state;
}
