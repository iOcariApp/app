import React from "react";
import { TextInput } from "react-native";

import MyTextInput from "components/TextInput";
import FillingBorder from "components/FillingBorder";

let wrapper;
let value = "";
const error = "This is an error message";
const onChangeValue = jest.fn(newValue => {
  value = newValue;
});
const validation = jest.fn(() => false);

beforeEach(() => {
  wrapper = shallow(
    <MyTextInput
      value={value}
      onChangeValue={onChangeValue}
      validation={validation}
      error={error}
    />
  );
});

describe("focus is correctly handled", () => {
  test("focus is false at the beginning", () => {
    expect(wrapper.state("focused")).toBe(false);
  });

  describe("when the input is focused and blurred", () => {
    it("should set `focused` state correctly", () => {
      const textInput = wrapper.find(TextInput);

      textInput.simulate("focus");
      expect(wrapper.state("focused")).toBe(true);

      textInput.simulate("blur");
      expect(wrapper.state("focused")).toBe(false);

      textInput.simulate("focus");
      expect(wrapper.state("focused")).toBe(true);
    });
  });

  describe("when the components is pressed", () => {
    it("should set `focused` state to true", () => {
      wrapper
        .childAt(0)
        .childAt(0)
        .simulate("press");
      expect(wrapper.state("focused")).toBe(true);
    });
  });

  describe("when `focused` state is true", () => {
    it("should render a <FillingBorder />", () => {
      wrapper.setState({ focused: true });
      expect(wrapper.find(FillingBorder).length).toBe(1);
    });
  });
});

describe("validation is correctly handled", () => {
  let textInput;
  beforeEach(() => {
    textInput = wrapper.find(TextInput);
    jest.useFakeTimers();
  });

  test("validation timeout is set whenever the text changes", () => {
    expect(setTimeout).toHaveBeenCalledTimes(0);

    textInput.simulate("changeText", "e");
    expect(setTimeout).toHaveBeenCalledTimes(1);

    jest.clearAllTimers(); // do not register calls to validation
  });

  test("validation timeout should only be called when user finishes typing", () => {
    textInput.simulate("changeText", "e");
    textInput.simulate("changeText", "en");

    jest.runAllTimers();
    expect(validation).toHaveBeenCalledTimes(1);
  });

  test("validation prop sets `showError` state", () => {
    const text = "enzo";
    textInput.simulate("changeText", text);

    jest.runAllTimers();
    expect(wrapper.state("showError")).toBe(!validation(text));
  });

  test("validation error message is shown", () => {
    expect(wrapper.setState({ showError: true }));
    expect(wrapper.children().length).toBe(2);
    expect(
      wrapper
        .childAt(1)
        .dive()
        .text()
    ).toBe(error);
  });
});
