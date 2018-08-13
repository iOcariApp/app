import React from "react";
import renderer from "react-test-renderer";

import CalendarPicker from "components/CalendarPicker";
import DualRow from "components/DualRow";

const dismiss = jest.fn();
const props = {
  refCallback: jest.fn(),
  changeCallback: jest.fn(),
};

const wrapper = shallow(<CalendarPicker {...props} />);
wrapper.instance().ref({
  dismiss,
});
const buttons = wrapper.find(DualRow).dive();

test("renders correctly", () => {
  const tree = renderer.create(<CalendarPicker {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("onLayout sets `myHeight` state", () => {
  const height = 100;
  wrapper.instance().onLayout({ nativeEvent: { layout: { height } } });
  expect(wrapper.state("myHeight")).toBe(height);
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
