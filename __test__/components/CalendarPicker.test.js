import React from "react";

import CalendarPicker from "components/CalendarPicker";
import DualRow from "components/DualRow";

const dismiss = jest.fn();
const props = {
  refCallback: noop,
  changeCallback: jest.fn(),
};

const wrapper = shallow(<CalendarPicker {...props} />);
wrapper.instance().ref({
  dismiss,
});
const buttons = wrapper
  .dive()
  .find(DualRow)
  .dive();

test("renders correctly", () => {
  testSnapshot(<CalendarPicker {...props} />);
});

test("onCancellation it closes the popup", () => {
  const button = buttons.childAt(0).childAt(0);

  button.simulate("press");

  expect(dismiss).toHaveBeenCalledTimes(1);
});

test("onConfirmation it calls `changeCallback` prop", () => {
  const button = buttons.childAt(1).childAt(0);

  button.simulate("press");

  expect(props.changeCallback).toHaveBeenCalledTimes(1);
});
