import React from "react";
import { Text } from "react-native";
import renderer from "react-test-renderer";

import DualRow from "components/DualRow";

test("renders correctly", () => {
  const tree = renderer
    .create(
      <DualRow
        left={<Text>left</Text>}
        right={<Text>right</Text>}
        separation={10}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test("applies `style` prop", () => {
  const tree = renderer
    .create(
      <DualRow
        left={<Text>left</Text>}
        right={<Text>right</Text>}
        separation={10}
        style={{ width: "50%" }}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
