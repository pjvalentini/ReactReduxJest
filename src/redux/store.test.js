import { createStore } from "redux";
import rootReducer from "./reducers";
import initialState from "./reducers/initialState";
import * as contactActions from "./actions/contactActions";

// Test to make sure the store is handling creating contacts
it("should handle creating courses", () => {
  // arrange
  const store = createStore(rootReducer, initialState);
  const contact = {
    name: "Contact Name"
  };

  // act
  const action = contactActions.createContactSuccess(contact);
  store.dispatch(action);

  // assert
  const createdContact = store.getState().contacts[0];
  expect(createdContact).toEqual(contact);
});
