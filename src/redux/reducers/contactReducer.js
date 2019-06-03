import * as types from "../actions/actionTypes";
import initialState from "./initialState";
// Default argument syntax, where state is initialized as an empty array
export default function contactReducer(state = initialState.contacts, action) {
  // Here we create a swtich that looks at the action type
  switch (action.type) {
    case types.CREATE_CONTACT_SUCCESS:
      // we return a new copy of state and the passed in course
      // what ever is returned from the reducer becomes the new state for that particular reducer.
      return [...state, { ...action.contact }];
    case types.UPDATE_CONTACT_SUCCESS:
      // map return a new array. Replacening the element with the matching course.id
      return state.map(contact =>
        contact.id === action.contact.id ? action.contact : contact
      );
    case types.LOAD_CONTACTS_SUCCESS:
      return action.contacts;
    case types.DELETE_CONTACT_OPTIMISTIC:
      // this will return an array of all the courses, but with the deleted course omitted.  We return an array with one less course.
      return state.filter(contact => contact.id !== action.contact.id);
    default:
      // if the reducer recieves an action that it doesn't care about then is should return the default state.
      return state;
  }
}
