import React from "react";
import { StyleSheet } from "react-native";
import Button from "./Button";

const WhiteEmptyButton = ({ style, ...rest }) => (
  <Button
    style={StyleSheet.flatten([
      style,
      { borderColor: "white", borderWidth: 2 },
    ])}
    backgroundColor="transparent"
    {...rest}
  />
);

export default WhiteEmptyButton;
