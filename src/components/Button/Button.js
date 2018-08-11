import React from "react";
import PropTypes from "prop-types";
import styles from "./Button.style";

import { Button } from "react-native-elements";

import { colors } from "theme";

const MyButton = ({ style, backgroundColor, ...rest }) => (
  <Button
    large
    containerViewStyle={[styles.main, style]}
    borderRadius={7}
    fontWeight="bold"
    backgroundColor={backgroundColor}
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
