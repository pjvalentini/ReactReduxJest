import React from "react";
import { cleanup, render } from "react-testing-library";
import CourseForm from "./CourseForm.jsx";

// we need to clean up after out tests when using RTL
afterEach(cleanup);

// Factory function in order to call react components with some default values.
function renderCourseForm(args) {
  const defaultProps = {
    authors: [],
    course: {},
    saving: false,
    errors: {},
    onSave: () => {},
    onChange: () => {}
  };
  const props = { ...defaultProps, ...args };
  return render(<CourseForm {...props} />);
}

// test that CourseForm will render the Add Course header.
it("should render the Add Course header", () => {
  const { getByText } = renderCourseForm();
  // getByText will search through the HTML for the targetted text. Has a built in assertion.
  getByText("Add Course");
});

it("labels save button as Save when not saving", () => {
  const { getByText } = renderCourseForm();
  getByText("Save");
});

it("labels save button as Saving... when saving", () => {
  const { getByText, debug } = renderCourseForm({ saving: true });
  debug();
  getByText("Saving...");
});
