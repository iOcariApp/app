import React from "react";

import Button from "components/Button";

test("renders correctly", () => {
  testSnapshot(<Button />);
});

describe("when receiving props", () => {
  it("should apply them correctly", () => {
    testSnapshot(
      <Button small style={{ width: 50 }} background="white" fontSize={6} />
    );
  });
});
