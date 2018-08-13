import React from "react";

import TextButton from "components/Button/TextButton";

test("renders correctly", () => {
  testSnapshot(<TextButton />);
});

test("applies props correctly", () => {
  testSnapshot(<TextButton color="yellow" />);
});

test("passes down unused props", () => {
  testSnapshot(<TextButton style={{ width: "50%" }} />);
});
