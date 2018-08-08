import React from "react";
import renderer from "react-test-renderer";

import Button from "components/Button";

test("renders correctly", () => {
  const tree = renderer.create(<Button />).toJSON();
  expect(tree).toMatchSnapshot();
});

describe("when receiving props", () => {
  it("should apply them correctly", () => {
    const tree = renderer
      .create(<Button style={{ width: 50 }} background="white" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
