import * as courseActions from "./courseActions";
import * as types from "./actionTypes";
import { courses } from "../../../tools/mockData";

// using arrange/assert/act pattern
// this test confirms that when I call the createCourseSuccess action creator, I get the expected onject shape back.
describe("createCourseSuccess", () => {
  it("Should create a CREATE_COURSE_SUCCESS action", () => {
    // arrange the test
    const course = courses[0];
    const expectedAction = {
      type: types.CREATE_COURSE_SUCCESS,
      course
    };

    //act
    const action = courseActions.createCourseSuccess(course);
    // console.log(expectedAction);

    // assert
    expect(action).toEqual(expectedAction);
  });
});
