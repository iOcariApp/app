import React from "react";

import Page1 from "pages/Register/Page1";

const props = {
  values: {
    nickname: "",
    email: "",
    password: "",
    passwordDouble: "",
  },
  onChangeValue: noop,
  samePassword: noop,
  goNext: noop,
};

test("renders correctly", () => {
  testSnapshot(<Page1 {...props} />);
});
