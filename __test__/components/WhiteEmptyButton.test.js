import React from "react";
import renderer from "react-test-renderer";

import WhiteEmptyButton from "components/Button/WhiteEmptyButton";

test("renders correctly", () => {
  const tree = renderer.create(<WhiteEmptyButton />).toJSON();
  expect(tree).toMatchSnapshot();
});
