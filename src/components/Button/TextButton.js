import React from "react";
import { PropTypes } from "prop-types";

import Button from "./Button";

const TextButton = ({ color, ...rest }) => (
  <Button color={color} backgroundColor="transparent" {...rest} />
);

TextButton.propTypes = {
  color: PropTypes.string,
};
TextButton.defaultProps = {
  color: "white",
};

export default TextButton;
