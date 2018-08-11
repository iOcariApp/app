import React from "react";
import renderer from "react-test-renderer";

import Page1 from "pages/Register/Page1";

const noop = () => {};

const props = {
  values: {
    nickname: "",
    email: "",
    password: "",
    passwordDouble: "",
  },
  logic: {
    onChangeNickname: noop,
    onChangeEmail: noop,
    onChangePassword: noop,
    onChangePasswordDouble: noop,
    availableNickname: noop,
    validEmail: noop,
    passwordStrength: noop,
    samePassword: noop,
    goNext: noop,
  },
};

test("renders correctly", () => {
  const tree = renderer.create(<Page1 {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
