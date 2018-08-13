import React from "react";
import { Text } from "react-native";

import DualRow from "components/DualRow";

test("renders correctly", () => {
  testSnapshot(
    <DualRow
      left={<Text>left</Text>}
      right={<Text>right</Text>}
      separation={10}
    />
  );
});

test("applies `style` prop", () => {
  testSnapshot(
    <DualRow
      left={<Text>left</Text>}
      right={<Text>right</Text>}
      separation={10}
      style={{ width: "50%" }}
    />
  );
});
