import React from "react";
// importing the named export here as we csn use this for testing
import { ManageCoursePage } from "./ManageCoursePage.jsx";
import { authors, newCourse, courses } from "../../../tools/mockData";
import { mount } from "enzyme";

function render(args) {
  const defaultProps = {
    authors,
    courses,
    history: {},
    saveCourse: jest.fn(),
    loadAuthors: jest.fn(),
    loadCourses: jest.fn(),
    course: newCourse,
    match: {}
  };
  const props = { ...defaultProps, ...args };
  return mount(<ManageCoursePage {...props} />);
}

// test if error is set when attempting to save an empty title field
it("sets error when attempting to save an empty title field", () => {
  const wrapper = render();
  wrapper.find("form").simulate("submit");
  const error = wrapper.find(".alert").first(); // find the first alert
  expect(error.text()).toBe("Title is required.");
});
