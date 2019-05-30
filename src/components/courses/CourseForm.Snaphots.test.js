import React from "react";
import CourseForm from "./CourseForm.jsx";
import renderer from "react-test-renderer";
import { courses, authors } from "../../../tools/mockData";

// Test 1: Assure that the label on the save button is properly set when we set the save prop to true.
it("sets save button label to 'Saving...' when saving is true", () => {
  const tree = renderer.create(
    <CourseForm
      course={courses[0]}
      authors={authors}
      onSave={jest.fn()}
      onChange={jest.fn()}
      saving
    />
  );
  expect(tree).toMatchSnapshot();
});

// Test 2: Assure that the label on the save button is properly set when we set the save prop to false.
it("sets save button label to 'Save' when saving is false", () => {
  const tree = renderer.create(
    <CourseForm
      course={courses[0]}
      authors={authors}
      onSave={jest.fn()}
      onChange={jest.fn()}
      saving={false}
    />
  );
  expect(tree).toMatchSnapshot();
});
