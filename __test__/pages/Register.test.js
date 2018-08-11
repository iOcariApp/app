import React from "react";

import Register from "pages/Register";
import Page1 from "pages/Register/Page1";
import Page2 from "pages/Register/Page2";

let wrapper;
beforeEach(() => {
  wrapper = shallow(<Register />);
});

test("<Page1 /> is shown initially", () => {
  expect(wrapper.find(Page1).length).toBe(1);
  expect(wrapper.find(Page2).length).toBe(0);
});

test("<Page2 /> is shown later", () => {
  wrapper.setState({ screen: 1 });
  expect(wrapper.find(Page1).length).toBe(0);
  expect(wrapper.find(Page2).length).toBe(1);
});
