import React from "react";
import { TextInput } from "react-native";

import { colors } from "theme";

import MyTextInput from "components/TextInput";
import FillingBorder from "components/FillingBorder";

let wrapper;
let value = "";
const onChangeValue = jest.fn(newValue => {
  value = newValue;
});
const validationTrue = jest.fn(() => ({ valid: true, message: "Valid" }));
const validationFalse = jest.fn(() => ({ valid: false, message: "Invalid" }));

beforeEach(() => {
  value = "";
  wrapper = shallow(
    <MyTextInput
      icon="lock"
      value={value}
      onChangeValue={onChangeValue}
      validation={validationTrue}
    />
  );

  // Mount doesn't work with react-native yet
  wrapper.instance().ref({
    focus: wrapper.instance().onFocus,
  });
});

test("onLayout sets `myWidth` state", () => {
  const width = 100;
  wrapper.instance().onLayout({ nativeEvent: { layout: { width } } });
  expect(wrapper.state("myWidth")).toBe(width);
});

describe("value change is correctly handled", () => {
  let textInput;
  beforeEach(() => {
    textInput = wrapper.find(TextInput);
  });

  test("value updates", () => {
    const text = "hi";
    textInput.simulate("changeText", text);
    expect(value).toBe(text);
  });

  test("value is trimmed", () => {
    const text = " hi ";
    textInput.simulate("changeText", text);
    expect(value).toBe("hi");
  });
});

describe("focus is correctly handled", () => {
  test("focus is false at the beginning", () => {
    expect(wrapper.state("focused")).toBe(false);
  });

  test("focus is true if initial value", () => {
    wrapper.setProps({ value: "enzo" });
    wrapper.instance().componentDidMount();
    expect(wrapper.state("focused")).toBe(true);

    jest.clearAllMocks(); // remove call count on validation fn
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

  describe("when the component is pressed", () => {
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

  test("validation is called if initial value", () => {
    wrapper.setProps({ value: "enzo" });
    wrapper.instance().componentDidMount();
    expect(validationTrue).toHaveBeenCalledTimes(1);

    jest.clearAllMocks(); // remove call count on validation fn
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
    expect(validationTrue).toHaveBeenCalledTimes(1);
  });

  test("validation sets `validationMessage` state", () => {
    const text = "enzo";
    textInput.simulate("changeText", text);

    jest.runAllTimers();
    expect(wrapper.state("validationMessage")).toBe("Valid");
  });

  test("validation prop sets state flags properly", () => {
    const text = "enzo";
    textInput.simulate("changeText", text);

    jest.runAllTimers();
    expect(wrapper.state("showValid")).toBe(true);
    expect(wrapper.state("showError")).toBe(false);

    wrapper.setProps({ validation: validationFalse });
    textInput.simulate("changeText", text);

    jest.runAllTimers();
    expect(wrapper.state("showError")).toBe(true);
    expect(wrapper.state("showValid")).toBe(false);
  });

  describe("validation UI renders correctly", () => {
    describe("when validation was true", () => {
      beforeEach(() => {
        wrapper.setState({ showValid: true });
      });

      it("should render the validation message", () => {
        expect(wrapper.children().length).toBe(2);
      });

      it("shouldn't render the validation message when empty", () => {
        wrapper.setState({ validationMessage: "" });
        expect(wrapper.children().length).toBe(1);
      });

      it("should render the validation icon", () => {
        const inputMain = wrapper.find('[data-test="input-main"]');
        expect(inputMain.children().length).toBe(3);
        expect(inputMain.childAt(2).props().name).toBe("check");
      });

      it("should set elements colors to `valid` color", () => {
        textInput.simulate("focus");

        // FillingBorder color
        expect(wrapper.find(FillingBorder).props().color).toBe(colors.valid);

        // Text color
        const inputMain = wrapper.find('[data-test="input-main"]');
        expect(
          inputMain
            .childAt(1)
            .childAt(0)
            .props().style[1].color
        ).toBe(colors.valid);
      });
    });

    describe("when validation was false", () => {
      beforeEach(() => {
        wrapper.setState({ showError: true });
      });

      it("should render the validation message", () => {
        expect(wrapper.children().length).toBe(2);
      });

      it("shouldn't render the validation message when empty", () => {
        wrapper.setState({ validationMessage: "" });
        expect(wrapper.children().length).toBe(1);
      });

      it("should render the validation icon", () => {
        const inputMain = wrapper.find('[data-test="input-main"]');
        expect(inputMain.children().length).toBe(3);
        expect(inputMain.childAt(2).props().name).toBe("x");
      });

      it("should set elements colors to `invalid` color", () => {
        textInput.simulate("focus");

        // FillingBorder color
        expect(wrapper.find(FillingBorder).props().color).toBe(colors.invalid);

        // Text color
        const inputMain = wrapper.find('[data-test="input-main"]');
        expect(
          inputMain
            .childAt(1)
            .childAt(0)
            .props().style[1].color
        ).toBe(colors.invalid);
      });
    });
  });

  test("blur doesn't hide validation if filled input", () => {
    wrapper.setState({ focused: true, showValid: true, showError: true });
    wrapper.setProps({ value: "enzo" });

    textInput.simulate("blur");

    expect(wrapper.state("focused")).toBe(true);
    expect(wrapper.state("showValid")).toBe(true);
    expect(wrapper.state("showError")).toBe(true);
  });

  test("blur hides validation if empty input", () => {
    wrapper.setState({ focused: true, showValid: true, showError: true });
    wrapper.setProps({ value: "" });

    textInput.simulate("blur");

    expect(wrapper.state("focused")).toBe(false);
    expect(wrapper.state("showValid")).toBe(false);
    expect(wrapper.state("showError")).toBe(false);
  });
});
