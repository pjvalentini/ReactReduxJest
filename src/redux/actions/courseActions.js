import * as types from "./actionTypes";
import * as courseApi from "../../api/courseApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

// Naming conv: verbNoun
// Requires a type and usually a payload

export function loadCourseSuccess(courses) {
  return { type: types.LOAD_COURSES_SUCCESS, courses };
}

export function createCourseSuccess(course) {
  return { type: types.CREATE_COURSE_SUCCESS, course };
}

export function updateCourseSuccess(course) {
  return { type: types.UPDATE_COURSE_SUCCESS, course };
}

// loadCourse Thunk
export function loadCourses() {
  return function(dispatch) {
    dispatch(beginApiCall());
    return courseApi
      .getCourses()
      .then(courses => {
        dispatch(loadCourseSuccess(courses));
      })
      .catch(error => {
        // dispatching error message here.
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

// saveCourse Thunk
export function saveCourse(course) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return courseApi
      .saveCourse(course)
      .then(savedCourse => {
        course.id
          ? dispatch(updateCourseSuccess(savedCourse))
          : dispatch(createCourseSuccess(savedCourse));
      })
      .catch(error => {
        // dispatching error message here.
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
