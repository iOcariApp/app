import React from "react";
import PropTypes from "prop-types";
import styles from "./Button.style";

import { Button } from "react-native-elements";

import { colors, button } from "theme";

const MyButton = ({ backgroundColor, small, style, buttonStyle, ...rest }) => (
  <Button
    backgroundColor={backgroundColor}
    containerViewStyle={[styles.main, style]}
    buttonStyle={[small ? styles.smallButton : styles.button, buttonStyle]}
    borderRadius={button.radius}
    fontSize={button.fontSize}
    {...rest}
  />
);

MyButton.propTypes = {
  backgroundColor: PropTypes.string,
  small: PropTypes.bool,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  buttonStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
};
MyButton.defaultProps = {
  backgroundColor: colors.mainColor,
  small: false,
  style: {},
  buttonStyle: {},
};

export default MyButton;
