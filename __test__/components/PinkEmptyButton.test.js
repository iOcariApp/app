import React from "react";
import renderer from "react-test-renderer";

import PinkEmptyButton from "components/Button/PinkEmptyButton";

test("renders correctly", () => {
  const tree = renderer.create(<PinkEmptyButton />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("passes down unused props", () => {
  const tree = renderer
    .create(<PinkEmptyButton style={{ width: "50%" }} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
