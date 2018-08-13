import React from "react";

import EmptyButton from "components/Button/EmptyButton";

test("renders correctly", () => {
  testSnapshot(<EmptyButton />);
});

test("applies props correctly", () => {
  testSnapshot(<EmptyButton color="yellow" buttonStyle={{ width: "50%" }} />);
});

test("passes down unused props", () => {
  testSnapshot(<EmptyButton style={{ width: "50%" }} />);
});
