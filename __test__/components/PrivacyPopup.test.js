import React from "react";
import renderer from "react-test-renderer";

import PrivacyPopup from "components/PrivacyPopup";
import DualRow from "components/DualRow";

const props = {
  refCallback: jest.fn(),
  readMore: jest.fn(),
  accept: jest.fn(),
};

const wrapper = shallow(<PrivacyPopup {...props} />);
const buttons = wrapper.find(DualRow).dive();

test("renders correctly", () => {
  const tree = renderer.create(<PrivacyPopup {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("`readMore` props gets called when review button is pressed", () => {
  const button = buttons.childAt(0).childAt(0);

  button.simulate("press");

  expect(props.readMore).toHaveBeenCalledTimes(1);
});

test("`accept` props gets called when accept button is pressed", () => {
  const button = buttons.childAt(1).childAt(0);

  button.simulate("press");

  expect(props.accept).toHaveBeenCalledTimes(1);
});
