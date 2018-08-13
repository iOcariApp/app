import React from "react";
import renderer from "react-test-renderer";

import Page2 from "pages/Register/Page2";

const noop = () => {};

const props = {
  values: {
    name: "",
    surname: "",
    birthdate: "",
    address: "",
    country: "",
    city: "",
    postalCode: "",
  },
  onChangeValue: noop,
  goPrev: noop,
  showPrivacyPopup: noop,
  showCalendarBirthdate: noop,
};

test("renders correctly", () => {
  const tree = renderer.create(<Page2 {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
