import React from "react";
import Header from "./Header.jsx";
import { mount, shallow } from "enzyme";
// need this as Header needs to be run as a child of React router ans recieves RR props
import { MemoryRouter } from "react-router-dom";

// With shallow you only render the comp you search for by tag
it("contains 3 Nav links via shallow", () => {
  const numberOfLinks = shallow(<Header />).find("NavLink").length;
  // console.log(numberOfLinks);
  expect(numberOfLinks).toEqual(3);
});

// with mount you search for the finial rendered HTML.
// Header expects to have ReactRouter props passed in so we use the MemoryRouter to wrap the Header comp
// when using mout a full dom is created im memory so tis looking for a tags
it("contains 3 Nav links via mount", () => {
  const numLinks = mount(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  ).find("a").length;
  // console.log(numLinks);
  expect(numLinks).toEqual(3);
});
