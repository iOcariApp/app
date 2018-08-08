import React from "react";
import renderer from "react-test-renderer";

import FillingBorder from "components/FillingBorder";

test("renders correctly", () => {
  const tree = renderer.create(<FillingBorder />).toJSON();
  expect(tree).toMatchSnapshot();
});
