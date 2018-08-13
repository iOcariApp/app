import React from "react";

import PinkButton from "components/Button/PinkButton";

test("renders correctly", () => {
  testSnapshot(<PinkButton />);
});

test("passes down unused props", () => {
  testSnapshot(<PinkButton style={{ width: "50%" }} />);
});
