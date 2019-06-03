import React from "react";
// importing the named export here as we csn use this for testing
import { ManageContactPage } from "./ManageContactPage.jsx";
import { creators, newContact, contacts } from "../../../tools/mockData";
import { mount } from "enzyme";

function render(args) {
  const defaultProps = {
    creators,
    contacts,
    history: {},
    saveContact: jest.fn(),
    loadCreators: jest.fn(),
    loadContacts: jest.fn(),
    contact: newContact,
    match: {}
  };
  const props = { ...defaultProps, ...args };
  return mount(<ManageContactPage {...props} />);
}

// test if error is set when attempting to save an empty title field
it("sets error when attempting to save an empty title field", () => {
  const wrapper = render();
  wrapper.find("form").simulate("submit");
  const error = wrapper.find(".alert").first(); // find the first alert
  expect(error.text()).toBe("Name is required.");
});
