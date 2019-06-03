import contactReducer from "./contactReducer";
import * as actions from "../actions/contactActions";

// Test on how the reducer will handle the createCourse Action
// we dont need all the properties, just an array and a couple of items to test the behavior
it("should add a course when passed CREATE_COURSE_SUCCESS", () => {
  // arrange
  const initialState = [
    {
      name: "Some Name"
    },
    {
      name: "Another Name"
    }
  ];

  const newContact = {
    name: "New Name"
  };

  const action = actions.createContactSuccess(newContact);
  // console.log(action); confirms our action as CREATE_COURSE_SUCCESS
  // Act
  const newState = contactReducer(initialState, action);
  // console.log(newState); will diplay the new state as an array with the newCourse added

  expect(newState.length).toEqual(3);
  expect(newState[0].name).toEqual("Some Name");
  expect(newState[1].name).toEqual("Another Name");
  expect(newState[2].name).toEqual("New Name");
});

// Test to make sure the updates occur when passed UPDATE_COURSE_SUCCESS
it("should UPDATE a course when passed UPDATE_CONTACT_SUCCESS", () => {
  // arrange
  const initialState = [
    { id: 1, name: "A" },
    { id: 2, name: "B" },
    { id: 3, name: "C" }
  ];
  const course = { id: 2, name: "New B" };
  const action = actions.updateContactSuccess(course);

  // Act
  const newState = contactReducer(initialState, action);
  const updatedContact = newState.find(a => a.id == course.id);
  const nonUpdatedContact = newState.find(a => a.id == 1);

  // Assert
  expect(updatedContact.title).toEqual("New B");
  expect(nonUpdatedContact.title).toEqual("A");
  expect(newState.length).toEqual(3);
});
