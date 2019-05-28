import * as types from "./actionTypes";

// Naming conv: verbNoun
// Requires a type and usually a payload
export function createCourse(course) {
  return { type: types.CREATE_COURSE, course };
}
