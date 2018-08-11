import React from "react";
import renderer from "react-test-renderer";

import PinkButton from "components/Button/PinkButton";

test("renders correctly", () => {
  const tree = renderer.create(<PinkButton />).toJSON();
  expect(tree).toMatchSnapshot();
});
