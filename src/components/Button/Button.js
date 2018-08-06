import React from "react";
import PropTypes from "prop-types";
import { Button } from "react-native-elements";
import { mainColor } from "variables";

const MyButton = ({ backgroundColor, ...rest }) => (
  <Button large borderRadius={7} backgroundColor={backgroundColor} {...rest} />
);

MyButton.propTypes = {
  backgroundColor: PropTypes.string,
};
MyButton.defaultProps = {
  backgroundColor: mainColor,
};

export default MyButton;
