import React from "react";
import { PropTypes } from "prop-types";
import { StyleSheet } from "react-native";
import { button } from "theme";

import Button from "./Button";

const EmptyButton = ({ color, buttonStyle, ...rest }) => (
  <Button
    buttonStyle={StyleSheet.flatten([
      {
        borderColor: color,
        borderWidth: button.border,
      },
      buttonStyle,
    ])}
    color={color}
    backgroundColor="transparent"
    {...rest}
  />
);

EmptyButton.propTypes = {
  color: PropTypes.string,
  buttonStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
};
EmptyButton.defaultProps = {
  color: "white",
  buttonStyle: {},
};

export default EmptyButton;
