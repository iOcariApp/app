import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import styles from "./DualRow.style";

const DualRow = ({ left, right, separation, style }) => (
  <View style={[styles.main, style]}>
    <View style={[styles.column, { marginRight: separation }]}>{left}</View>
    <View style={styles.column}>{right}</View>
  </View>
);

DualRow.propTypes = {
  left: PropTypes.node,
  right: PropTypes.node,
  separation: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
};
DualRow.defaultProps = {
  separation: 0,
  style: {},
};

export default DualRow;
