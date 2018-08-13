import React from "react";

import FillingBorder from "components/FillingBorder";

test("renders correctly", () => {
  testSnapshot(<FillingBorder />);
});

test("applies `color` prop", () => {
  testSnapshot(<FillingBorder color="black" />);
});
