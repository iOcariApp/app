import React from "react";

import PinkEmptyButton from "components/Button/PinkEmptyButton";

test("renders correctly", () => {
  testSnapshot(<PinkEmptyButton />);
});

test("passes down unused props", () => {
  testSnapshot(<PinkEmptyButton style={{ width: "50%" }} />);
});
