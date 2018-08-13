import React from "react";

import BlueButton from "components/Button/BlueButton";

test("renders correctly", () => {
  testSnapshot(<BlueButton />);
});

test("passes down unused props", () => {
  testSnapshot(<BlueButton style={{ width: "50%" }} />);
});
