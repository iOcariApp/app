import React from "react";
import PropTypes from "prop-types";
import styles from "./Button.style";

import { Button } from "react-native-elements";

import { colors, button } from "theme";

const MyButton = ({ style, backgroundColor, ...rest }) => (
  <Button
    backgroundColor={backgroundColor}
    containerViewStyle={[styles.main, style]}
    buttonStyle={styles.button}
    borderRadius={button.radius}
    fontSize={button.fontSize}
    {...rest}
  />
);

MyButton.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  backgroundColor: PropTypes.string,
};
MyButton.defaultProps = {
  style: {},
  backgroundColor: colors.mainColor,
};

export default MyButton;
