import React from "react";
import renderer from "react-test-renderer";

import PinkEmptyButton from "components/Button/PinkEmptyButton";

test("renders correctly", () => {
  const tree = renderer.create(<PinkEmptyButton />).toJSON();
  expect(tree).toMatchSnapshot();
});
