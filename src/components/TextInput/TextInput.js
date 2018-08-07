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
import { green } from "variables";

const ANIMATION_DURATION = 300;

class MyTextInput extends React.PureComponent {
  state = {
    value: "",
    showError: false,
    focused: false,
    myWidth: 2,
    labelSize: new Animated.Value(16),
  };

  onChangeText = value => {
    clearTimeout(this._checkTimeout);
    this._checkTimeout = setTimeout(this.checkValue, 2000);
    this.setState({ value });
  };

  onFocus = () => {
    const { focused } = this.state;
    if (!focused) {
      this.setState({ focused: true });

      Animated.timing(this.state.labelSize, {
        toValue: 12,
        duration: ANIMATION_DURATION,
      }).start();
    }
  };

  onBlur = () => {
    const { value } = this.state;
    if (value === "") {
      this.setState({ focused: false });

      Animated.timing(this.state.labelSize, {
        toValue: 16,
        duration: ANIMATION_DURATION,
      }).start();
    }
  };

  onLayout = event => {
    const { width } = event.nativeEvent.layout;
    this.setState({ myWidth: width });
  };

  checkValue = () => {
    const { value } = this.state;
    const { validation } = this.props;

    const validValue = validation(value);
    this.setState({ showError: !validValue });
  };

  render = () => {
    const { value, showError, focused, myWidth, labelSize } = this.state;
    const { icon, label, error, ...rest } = this.props;

    return (
      <View style={styles.main} onLayout={this.onLayout}>
        <View style={styles.inputMain}>
          {icon && <Icon containerStyle={styles.icon} size={24} name={icon} />}

          <View style={styles.input}>
            <Animated.Text
              style={[
                styles.label,
                {
                  color: focused ? green : "#7C7C7C",
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
        {showError && <Text style={styles.validation}>{error}</Text>}
      </View>
    );
  };
}

MyTextInput.propTypes = {
  icon: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.string,
  validation: PropTypes.func,
};
MyTextInput.defaultProps = {
  error: "No error message set",
  validation: () => true,
};

export default MyTextInput;
