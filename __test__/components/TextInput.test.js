import React from "react";

import { colors } from "theme";

import MyTextInput from "components/TextInput";
import FillingBorder from "components/FillingBorder";
import { TextInput } from "components/AutoFocusForm";

let wrapper;
let value = "";
let keyLabel = "";
let onFocus;
let onBlur;
const myKeyLabel = "myLabel";

const onChangeValue = jest.fn((newValue, newKeyLabel) => {
  value = newValue;
  keyLabel = newKeyLabel;
});
const validationTrue = jest.fn(() => ({ valid: true, message: "Valid" }));
const validationFalse = jest.fn(() => ({ valid: false, message: "Invalid" }));
const onClick = jest.fn();

// Mount doesn't work with react-native yet, so mock TextInput DOM functions
const fakeTextInputDom = () => {
  onFocus = jest.fn(wrapper.instance().onFocus);
  onBlur = jest.fn(wrapper.instance().onBlur);
  wrapper.instance().ref({
    focus: onFocus,
    blur: onBlur,
  });
};

beforeEach(() => {
  value = "";
  wrapper = shallow(
    <MyTextInput
      icon="lock"
      keyLabel={myKeyLabel}
      value={value}
      onChangeValue={onChangeValue}
      validation={validationTrue}
    />
  );

  fakeTextInputDom();
});

afterEach(() => {
  jest.clearAllTimers(); // do not register calls to validation
  jest.clearAllMocks(); // remove call counts on mock functions
});

describe("value change is correctly handled", () => {
  let textInput;
  beforeEach(() => {
    textInput = wrapper.dive().find(TextInput);
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

  test("an optional keyLabel is passed with the value", () => {
    const text = "hi";
    textInput.simulate("changeText", text);
    expect(keyLabel).toBe(myKeyLabel);
  });
});

describe("component onPress is correctly handled", () => {
  describe("when the component is pressed by default", () => {
    it("should set `focused` state to true", () => {
      wrapper
        .dive()
        .childAt(0)
        .childAt(0)
        .simulate("press");

      expect(wrapper.state("focused")).toBe(true);
    });
  });
  describe("when the component is pressed with a onClick prop", () => {
    it("should call the onClick prop and don't show the keyboard", () => {
      wrapper = shallow(
        <MyTextInput
          icon="lock"
          keyLabel={myKeyLabel}
          value={value}
          onChangeValue={onChangeValue}
          validation={validationTrue}
          onClick={onClick}
        />
      );

      fakeTextInputDom();

      wrapper
        .dive()
        .childAt(0)
        .childAt(0)
        .simulate("press");
      expect(onClick).toHaveBeenCalledTimes(1);
      expect(onBlur).toHaveBeenCalledTimes(1);
    });
  });
});

describe("focus is correctly handled", () => {
  test("focus is false at the beginning", () => {
    expect(wrapper.state("focused")).toBe(false);
  });

  test("focus is true if initial value", () => {
    // Shallow with initial value
    wrapper = shallow(
      <MyTextInput
        icon="lock"
        value="enzo"
        onChangeValue={onChangeValue}
        validation={validationTrue}
      />
    );
    expect(wrapper.state("focused")).toBe(true);
  });

  test("focus is true if value is set from an external source (i.e: calendar)", () => {
    wrapper.setProps({ value: "set from external" });
    expect(wrapper.state("focused")).toBe(true);
  });

  describe("when the input is focused and blurred", () => {
    it("should set `focused` state correctly", () => {
      const textInput = wrapper.dive().find(TextInput);

      textInput.simulate("focus");
      expect(wrapper.state("focused")).toBe(true);

      textInput.simulate("blur");
      expect(wrapper.state("focused")).toBe(false);

      textInput.simulate("focus");
      expect(wrapper.state("focused")).toBe(true);
    });
  });

  describe("when `focused` state is true", () => {
    it("should render a <FillingBorder />", () => {
      wrapper.setState({ focused: true });
      expect(wrapper.dive().find(FillingBorder).length).toBe(1);
    });
  });
});

describe("validation is correctly handled", () => {
  let textInput;
  beforeEach(() => {
    textInput = wrapper.dive().find(TextInput);
    jest.useFakeTimers();
  });

  test("validation is called if initial value", () => {
    // Shallow with initial value
    wrapper = shallow(
      <MyTextInput
        icon="lock"
        value="enzo"
        onChangeValue={onChangeValue}
        validation={validationTrue}
      />
    );
    expect(validationTrue).toHaveBeenCalledTimes(1);
  });

  test("validation is called if value is set from an external source (i.e: calendar)", () => {
    wrapper.setProps({ value: "set from external" });
    expect(validationTrue).toHaveBeenCalledTimes(1);
  });

  test("validation timeout is set whenever the text changes", () => {
    expect(setTimeout).toHaveBeenCalledTimes(0);

    textInput.simulate("changeText", "e");
    expect(setTimeout).toHaveBeenCalledTimes(1);
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
        expect(wrapper.dive().children().length).toBe(2);
      });

      it("shouldn't render the validation message when empty", () => {
        wrapper.setState({ validationMessage: "" });
        expect(wrapper.dive().children().length).toBe(1);
      });

      it("should render the validation icon", () => {
        const inputMain = wrapper.dive().find('[data-test="input-main"]');
        expect(inputMain.children().length).toBe(3);
        expect(inputMain.childAt(2).props().name).toBe("check");
      });

      it("should set elements colors to `valid` color", () => {
        textInput.simulate("focus");

        // FillingBorder color
        expect(
          wrapper
            .dive()
            .find(FillingBorder)
            .props().color
        ).toBe(colors.valid);

        // Text color
        const inputMain = wrapper.dive().find('[data-test="input-main"]');
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
        expect(wrapper.dive().children().length).toBe(2);
      });

      it("shouldn't render the validation message when empty", () => {
        wrapper.setState({ validationMessage: "" });
        expect(wrapper.children().length).toBe(1);
      });

      it("should render the validation icon", () => {
        const inputMain = wrapper.dive().find('[data-test="input-main"]');
        expect(inputMain.children().length).toBe(3);
        expect(inputMain.childAt(2).props().name).toBe("x");
      });

      it("should set elements colors to `invalid` color", () => {
        textInput.simulate("focus");

        // FillingBorder color
        expect(
          wrapper
            .dive()
            .find(FillingBorder)
            .props().color
        ).toBe(colors.invalid);

        // Text color
        const inputMain = wrapper.dive().find('[data-test="input-main"]');
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
