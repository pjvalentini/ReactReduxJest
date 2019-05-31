import React from "react";
import CourseForm from "./CourseForm.jsx";
// shallow can be used to reander a single comp insoloation
import { shallow } from "enzyme";

// Factory function in order to call react components with some default values.
function renderCourseForm(args) {
  // defaultProps an obj, and acccept an obj that contains args to override the defaults.
  const defaultProps = {
    authors: [],
    course: {},
    saving: false,
    errors: {},
    onSave: () => {},
    onChange: () => {}
  };
  // using spread op to blend the two togther.
  const props = { ...defaultProps, ...args };
  // render the comp using enzymes's shallow function, use spread op to assign all the porps to the comp.
  return shallow(<CourseForm {...props} />);
}

it("renders form and header", () => {
  const wrapper = renderCourseForm();
  // console.log(wrapper.debug()); use this to see the comp in the console.
  expect(wrapper.find("form").length).toBe(1);
  expect(wrapper.find("h2").text()).toEqual("Add Course");
});

// this provides more targetting than the spapshot test.
it("labels save button as Save when not saving", () => {
  const wrapper = renderCourseForm();
  //console.log(wrapper.debug());
  expect(wrapper.find("button").text()).toBe("Save");
});

it("labels save button as Saving... when saving", () => {
  const wrapper = renderCourseForm({ saving: true });
  //console.log(wrapper.debug());
  expect(wrapper.find("button").text()).toBe("Saving...");
});
