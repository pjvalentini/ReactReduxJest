import * as contactActions from "./contactActions";
import * as types from "./actionTypes";
import { contacts } from "../../../tools/mockData";
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

  describe("Load Contacts Thunk", () => {
    it("should create BEGIN_API_CALL and LOAD_CONTACTS_SUCCESS when loading courses", () => {
      // captures all fetch calls and the response is mock data.
      fetchMock.mock("*", {
        body: contacts,
        headers: { "content-type": "application/json" }
      });

      // assert that both of loadCourses() thunk will call these two actions when loading courses
      const expectedActions = [
        { type: types.BEGIN_API_CALL },
        { type: types.LOAD_CONTACTS_SUCCESS, contacts }
      ];

      const store = mockStore({ courses: [] });
      return store.dispatch(contactActions.loadContacts()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});

// using arrange/assert/act pattern
// this test confirms that when I call the createCourseSuccess action creator, I get the expected object shape back.
describe("createContactSuccess", () => {
  it("Should create a CREATE_CONTACT_SUCCESS action", () => {
    // arrange the test
    const contact = contacts[0];
    const expectedAction = {
      type: types.CREATE_CONTACT_SUCCESS,
      contact
    };

    //act
    const action = contactActions.createContactSuccess(contact);
    // console.log(expectedAction);

    // assert
    expect(action).toEqual(expectedAction);
  });
});
