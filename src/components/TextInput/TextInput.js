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

import { Icon } from "react-native-elements";

import FillingBorder from "components/FillingBorder";

const VALIDATION_TIMEOUT = 1000;
const ANIMATION_DURATION = 250;
const ANIMATION_FORWARDS = "forward";
const ANIMATION_BACKWARDS = "backward";

class MyTextInput extends React.PureComponent {
  state = {
    focused: false,
    showError: false,
    myWidth: 2,
    labelSize: new Animated.Value(16),
  };

  onChangeText = value => {
    // Validation time out
    this.setValidationTimeout();

    // Update value
    this.props.onChangeValue(value);
  };

  onFocus = () => {
    const { focused } = this.state;
    if (!focused) {
      if (this._textInput) {
        this._textInput.focus();
      }
      this.setState({ focused: true });
      this.playAnimation(ANIMATION_FORWARDS);
    }
  };

  onBlur = () => {
    const { value } = this.props;
    if (value === "") {
      this.setState({ focused: false });
      this.playAnimation(ANIMATION_BACKWARDS);
    }
  };

  onLayout = event => {
    const { width } = event.nativeEvent.layout;
    this.setState({ myWidth: width });
  };

  setValidationTimeout = () => {
    clearTimeout(this._checkTimeout);
    this._checkTimeout = setTimeout(this.checkValue, VALIDATION_TIMEOUT);
  };

  playAnimation = mode => {
    Animated.timing(this.state.labelSize, {
      toValue: mode === ANIMATION_FORWARDS ? 12 : 16,
      duration: ANIMATION_DURATION,
    }).start();
  };

  checkValue = () => {
    const { value, validation } = this.props;

    const validValue = validation(value);
    this.setState({ showError: !validValue });
  };

  ref = node => {
    this._textInput = node;
  };

  render = () => {
    const { showError, focused, myWidth, labelSize } = this.state;
    const { value, icon, label, error, ...rest } = this.props;

    return (
      <View style={styles.main} onLayout={this.onLayout}>
        <View style={styles.content}>
          <TouchableWithoutFeedback onPress={this.onFocus}>
            <View style={styles.inputMain}>
              {icon && (
                <Icon containerStyle={styles.icon} size={24} name={icon} />
              )}
              <View style={styles.input}>
                <Animated.Text
                  style={[
                    focused ? styles.labelFocused : styles.label,
                    {
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
            </View>
          </TouchableWithoutFeedback>
          {focused && (
            <View
              style={[
                styles.bottomBorder,
                { transform: [{ translateX: -myWidth / 2 }] },
              ]}
            >
              <FillingBorder duration={ANIMATION_DURATION} />
            </View>
          )}
        </View>
        {showError && <Text style={styles.validation}>{error}</Text>}
      </View>
    );
  };
}

MyTextInput.propTypes = {
  value: PropTypes.string.isRequired,
  icon: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.string,
  onChangeValue: PropTypes.func.isRequired,
  validation: PropTypes.func,
};
MyTextInput.defaultProps = {
  error: "No error message set",
  validation: () => true,
};

export default MyTextInput;
