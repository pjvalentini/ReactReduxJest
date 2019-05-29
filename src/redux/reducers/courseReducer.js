import * as types from "../actions/actionTypes";
import initialState from "./initialState";
// Default argument syntax, where state is initialized as an empty array
export default function courseReducer(state = initialState.courses, action) {
  // Here we create a swtich that looks at the action type
  switch (action.type) {
    case types.CREATE_COURSE_SUCCESS:
      // we return a new copy of state and the passed in course
      // what ever is returned from the reducer becomes the new state for that particular reducer.
      return [...state, { ...action.course }];
    case types.UPDATE_COURSE_SUCCESS:
      // map return a new array. Replacening the element with the matvhing course.id
      return state.map(course =>
        course.id === action.course.id ? action.course : course
      );
    case types.LOAD_COURSES_SUCCESS:
      return action.courses;
    default:
      // if the reducer recieves an action that it doesn't care about then is should return the default state.
      return state;
  }
}
