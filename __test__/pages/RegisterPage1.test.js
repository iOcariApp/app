import React from "react";
import renderer from "react-test-renderer";

import Page1 from "pages/Register/Page1";

const noop = () => null;

const props = {
  values: {
    nickname: "",
    email: "",
    password: "",
    passwordDouble: "",
  },
  onChangeValue: noop,
  samePassword: noop,
  goNext: noop,
};

test("renders correctly", () => {
  const tree = renderer.create(<Page1 {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
