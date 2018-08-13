import React from "react";
import renderer from "react-test-renderer";

import WhiteEmptyButton from "components/Button/WhiteEmptyButton";

test("renders correctly", () => {
  const tree = renderer.create(<WhiteEmptyButton />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("passes down unused props", () => {
  const tree = renderer
    .create(<WhiteEmptyButton style={{ width: "50%" }} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
