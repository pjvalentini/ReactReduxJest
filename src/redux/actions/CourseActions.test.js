import * as courseActions from "./courseActions";
import * as types from "./actionTypes";
import { courses } from "../../../tools/mockData";
// for testing thunks we need some additional imports
import thunk from "redux-thunk";
import fetchMock from "fetch-mock"; // for mocking fetch calls
import configureMockStore from "redux-mock-store"; // for creating a mock redux store

// test an async action
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe("Async Actions", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  describe("Load Courses Thunk", () => {
    it("should create BEGIN_API_CALL and LOAD_COURSES_SUCCESS when loading courses", () => {
      // captures all fetch calls and the response is mock data.
      fetchMock.mock("*", {
        body: courses,
        headers: { "content-type": "application/json" }
      });

      // assert that both of loadCourses() thunk will call these two actions when loading courses
      const expectedActions = [
        { type: types.BEGIN_API_CALL },
        { type: types.LOAD_COURSES_SUCCESS, courses }
      ];

      const store = mockStore({ courses: [] });
      return store.dispatch(courseActions.loadCourses()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});

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
