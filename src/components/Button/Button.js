import React from "react";
import PropTypes from "prop-types";
import { StyleSheet } from "react-native";

import { Button } from "react-native-elements";

import { mainColor } from "variables";

const styles = StyleSheet.create({
  main: {
    width: "100%",
  },
});

const MyButton = ({ style, backgroundColor, ...rest }) => (
  <Button
    large
    containerViewStyle={StyleSheet.flatten([style, styles.main])}
    borderRadius={7}
    backgroundColor={backgroundColor}
    {...rest}
  />
);

MyButton.propTypes = {
  style: PropTypes.object,
  backgroundColor: PropTypes.string,
};
MyButton.defaultProps = {
  style: {},
  backgroundColor: mainColor,
};

export default MyButton;
