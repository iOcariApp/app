import React from "react";
import PropTypes from "prop-types";
import {
  Animated,
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import styles from "./TextInput.style";
import { colors } from "theme";

import { Icon } from "react-native-elements";

import FillingBorder from "components/FillingBorder";

const VALIDATION_TIMEOUT = 1000;
const ANIMATION_DURATION = 250;
const ANIMATION_FORWARDS = "forward";
const ANIMATION_BACKWARDS = "backward";

class MyTextInput extends React.PureComponent {
  state = {
    focused: false,
    showValid: false,
    showError: false,
    myWidth: 2,
    labelSize: new Animated.Value(16),
  };

  componentDidMount = () => {
    // Make sure correct UI is shown whenever value is not empty
    if (this.props.value !== "") {
      this.setFocusedUI();
      this.checkValue();
    }
  };

  componentDidUpdate = prevProps => {
    // Make sure correct UI is shown whenever value is set programatically
    // i.e: calendar
    if (
      prevProps.value === "" &&
      this.props.value !== "" &&
      !this.state.focused
    ) {
      this.setFocusedUI();
      this.checkValue();
    }
  };

  onChangeText = value => {
    // Validation time out
    this.setValidationTimeout();

    // Update value
    this.props.onChangeValue(value.trim(), this.props.keyLabel);
  };

  onFocus = () => {
    const { onClick } = this.props;
    if (onClick) {
      onClick();
      this._textInput.blur(); // Don't show keyboard
    } else {
      this.setFocusedUI();
    }
  };

  onBlur = () => {
    const { value } = this.props;
    if (value === "") {
      this.setState({ focused: false, showValid: false, showError: false });
      this.playAnimation(ANIMATION_BACKWARDS);
    }
  };

  onLayout = event => {
    const { width } = event.nativeEvent.layout;
    this.setState({ myWidth: width });
  };

  focusInput = () => {
    this._textInput.focus();
  };

  playAnimation = mode => {
    Animated.timing(this.state.labelSize, {
      toValue: mode === ANIMATION_FORWARDS ? 12 : 16,
      duration: ANIMATION_DURATION,
    }).start();
  };

  setFocusedUI = () => {
    this.setState({ focused: true });
    this.playAnimation(ANIMATION_FORWARDS);
  };

  setValidationTimeout = () => {
    clearTimeout(this._checkTimeout);
    this._checkTimeout = setTimeout(this.checkValue, VALIDATION_TIMEOUT);
  };

  checkValue = () => {
    const { value, validation } = this.props;

    if (validation) {
      // Reset
      this.setState({ showValid: false, showError: false });

      const result = validation(value);
      if (result.valid) {
        this.setState({ showValid: true, validationMessage: result.message });
      } else {
        this.setState({ showError: true, validationMessage: result.message });
      }
    }
  };

  ref = node => {
    this._textInput = node;
  };

  getColorLabel = () => {
    const { focused, showError } = this.state;

    if (focused) {
      return showError ? colors.invalid : colors.valid;
    }

    return colors.grey;
  };

  render = () => {
    const {
      showValid,
      showError,
      validationMessage,
      focused,
      myWidth,
      labelSize,
    } = this.state;
    const { value, icon, label, ...rest } = this.props;

    const showValidationMessage =
      (showValid || showError) && validationMessage !== "";

    return (
      <View style={styles.main} onLayout={this.onLayout}>
        <View style={styles.content}>
          <TouchableWithoutFeedback onPress={this.focusInput}>
            <View data-test="input-main" style={styles.inputMain}>
              {icon && (
                <Icon containerStyle={styles.icon} size={24} name={icon} />
              )}
              <View style={styles.input}>
                <Animated.Text
                  style={[
                    styles.label,
                    {
                      color: this.getColorLabel(),
                      top: labelSize.interpolate({
                        inputRange: [12, 16],
                        outputRange: [0, 14],
                      }),
                      fontSize: labelSize,
                    },
                  ]}
                >
                  {label}
                </Animated.Text>
                <TextInput
                  ref={this.ref}
                  style={styles.inputText}
                  value={value}
                  underlineColorAndroid={"transparent"}
                  onChangeText={this.onChangeText}
                  onFocus={this.onFocus}
                  onBlur={this.onBlur}
                  {...rest}
                />
              </View>
              {showValid && (
                <Icon
                  color={colors.valid}
                  type="feather"
                  size={24}
                  name="check"
                />
              )}
              {showError && (
                <Icon
                  color={colors.invalid}
                  type="feather"
                  size={24}
                  name="x"
                />
              )}
            </View>
          </TouchableWithoutFeedback>
          {focused && (
            <View
              style={[
                styles.bottomBorder,
                { transform: [{ translateX: -myWidth / 2 }] },
              ]}
            >
              <FillingBorder
                color={showError ? colors.invalid : colors.valid}
                duration={ANIMATION_DURATION}
              />
            </View>
          )}
        </View>
        {showValidationMessage && (
          <Text style={styles.validation}>{validationMessage}</Text>
        )}
      </View>
    );
  };
}

MyTextInput.propTypes = {
  keyLabel: PropTypes.string,
  value: PropTypes.string.isRequired,
  icon: PropTypes.string,
  label: PropTypes.string,
  onChangeValue: PropTypes.func.isRequired,
  validation: PropTypes.func,
  onClick: PropTypes.func,
};

export default MyTextInput;
