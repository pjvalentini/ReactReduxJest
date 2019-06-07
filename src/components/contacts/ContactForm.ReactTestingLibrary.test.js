// RTL
import React from "react";
import { cleanup, render } from "react-testing-library";
import ContactForm from "./ContactForm.jsx";

// we need to clean up after out tests when using RTL
afterEach(cleanup);

// Factory function in order to call react components with some default values.
function renderContactForm(args) {
  const defaultProps = {
    creators: [],
    contact: {},
    saving: false,
    errors: {},
    onSave: () => {},
    onChange: () => {}
  };
  const props = { ...defaultProps, ...args };
  return render(<ContactForm {...props} />);
}

// test that CourseForm will render the Add Contact header.
it("should render the Add Contact header", () => {
  const { getByText } = renderContactForm();
  // getByText will search through the HTML for the targetted text. Has a built in assertion.
  getByText("Add Contact");
});

it("labels save button as Save when not saving", () => {
  const { getByText } = renderContactForm();
  getByText("Save");
});

it("labels save button as Saving... when saving", () => {
  const { getByText, debug } = renderContactForm({ saving: true });
  debug(); // i can see my output from the call to render.
  getByText("Saving...");
});
