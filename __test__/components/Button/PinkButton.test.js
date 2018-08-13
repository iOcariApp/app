import React from "react";
import renderer from "react-test-renderer";

import PinkButton from "components/Button/PinkButton";

test("renders correctly", () => {
  const tree = renderer.create(<PinkButton />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("passes down unused props", () => {
  const tree = renderer
    .create(<PinkButton style={{ width: "50%" }} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
