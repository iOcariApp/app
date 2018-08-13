import React from "react";
import renderer from "react-test-renderer";

import EmptyButton from "components/Button/EmptyButton";

test("renders correctly", () => {
  const tree = renderer.create(<EmptyButton />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("applies props correctly", () => {
  const tree = renderer
    .create(<EmptyButton color="yellow" buttonStyle={{ width: "50%" }} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test("passes down unused props", () => {
  const tree = renderer
    .create(<EmptyButton style={{ width: "50%" }} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
