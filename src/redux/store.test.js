import { createStore } from "redux";
import rootReducer from "./reducers";
import initialState from "./reducers/initialState";
import * as courseActions from "./actions/courseActions";

// Test to make sure the store is handling creating courses
it("should handle creating courses", () => {
  // arrange
  const store = createStore(rootReducer, initialState);
  const course = {
    title: "Course Title"
  };

  // act
  const action = courseActions.createCourseSuccess(course);
  store.dispatch(action);

  // assert
  const createdCourse = store.getState().courses[0];
  expect(createdCourse).toEqual(course);
});
