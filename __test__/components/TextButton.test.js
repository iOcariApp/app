import React from "react";
import renderer from "react-test-renderer";

import TextButton from "components/Button/TextButton";

test("renders correctly", () => {
  const tree = renderer.create(<TextButton />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("applies props correctly", () => {
  const tree = renderer.create(<TextButton color="yellow" />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("passes down unused props", () => {
  const tree = renderer
    .create(<TextButton style={{ width: "50%" }} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
