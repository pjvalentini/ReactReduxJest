import courseReducer from "./courseReducer";
import * as actions from "../actions/courseActions";
import { combineReducers } from "redux";

// Test on how the reducer will handle the createCourse Action
// we dont need all the properties, just an array and a couple of items to test the behavior
it("should add a course when passed CREATE_COURSE_SUCCESS", () => {
  // arrange
  const initialState = [
    {
      title: "Some Title"
    },
    {
      title: "Another Title"
    }
  ];

  const newCourse = {
    title: "New Title"
  };

  const action = actions.createCourseSuccess(newCourse);
  // console.log(action); confirms our action as CREATE_COURSE_SUCCESS
  // Act
  const newState = courseReducer(initialState, action);
  // console.log(newState); will diplay the new state as an array with the newCourse added

  expect(newState.length).toEqual(3);
  expect(newState[0].title).toEqual("Some Title");
  expect(newState[1].title).toEqual("Another Title");
  expect(newState[2].title).toEqual("New Title");
});

// Test to make sure the updates occur when passed UPDATE_COURSE_SUCCESS
it("should UPDATE a course when passed UPDATE_COURSE_SUCCESS", () => {
  // arrange
  const initialState = [
    { id: 1, title: "A" },
    { id: 2, title: "B" },
    { id: 3, title: "C" }
  ];
  const course = { id: 2, title: "New B" };
  const action = actions.updateCourseSuccess(course);

  // Act
  const newState = courseReducer(initialState, action);
  const updatedCourse = newState.find(a => a.id == course.id);
  const nonUpdatedCourse = newState.find(a => a.id == 1);

  // Assert
  expect(updatedCourse.title).toEqual("New B");
  expect(nonUpdatedCourse.title).toEqual("A");
  expect(newState.length).toEqual(3);
});
