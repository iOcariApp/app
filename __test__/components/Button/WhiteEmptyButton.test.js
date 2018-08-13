import React from "react";

import WhiteEmptyButton from "components/Button/WhiteEmptyButton";

test("renders correctly", () => {
  testSnapshot(<WhiteEmptyButton />);
});

test("passes down unused props", () => {
  testSnapshot(<WhiteEmptyButton style={{ width: "50%" }} />);
});
