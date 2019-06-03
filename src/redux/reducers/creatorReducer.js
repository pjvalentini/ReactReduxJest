import * as types from "../actions/actionTypes";
import initialState from "./initialState";
// Default argument syntax, where state is initialized as an empty array
export default function creatorReducer(state = initialState.creators, action) {
  // Here we create a swtich that looks at the action type
  switch (action.type) {
    case types.LOAD_CREATORS_SUCCESS:
      return action.creators;
    default:
      // if the reducer recieves an action that it doesn't care about then is should return the default state.
      return state;
  }
}
