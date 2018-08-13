import React from "react";

import Page2 from "pages/Register/Page2";

const props = {
  values: {
    name: "",
    surname: "",
    birthdate: "",
    address: "",
    country: "",
    city: "",
    postalCode: "",
  },
  onChangeValue: noop,
  goPrev: noop,
  showPrivacyPopup: noop,
  showCalendarBirthdate: noop,
};

test("renders correctly", () => {
  testSnapshot(<Page2 {...props} />);
});
