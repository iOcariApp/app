import React from "react";
import renderer from "react-test-renderer";

import BlueButton from "components/Button/BlueButton";

test("renders correctly", () => {
  const tree = renderer.create(<BlueButton />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("passes down unused props", () => {
  const tree = renderer
    .create(<BlueButton style={{ width: "50%" }} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
