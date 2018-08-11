import React from "react";
import { PropTypes } from "prop-types";
import { StyleSheet } from "react-native";
import { button } from "theme";

import Button from "./Button";

const WhiteEmptyButton = ({ buttonStyle, ...rest }) => (
  <Button
    buttonStyle={StyleSheet.flatten([
      buttonStyle,
      {
        borderColor: "white",
        borderWidth: 2,
        height: button.height - 2,
      },
    ])}
    backgroundColor="transparent"
    {...rest}
  />
);

WhiteEmptyButton.propTypes = {
  buttonStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
};
WhiteEmptyButton.defaultProps = {
  buttonStyle: {},
};

export default WhiteEmptyButton;
