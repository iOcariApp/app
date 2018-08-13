import { StyleSheet } from "react-native";

const textColor = "#4E4E4E";

export default StyleSheet.create({
  dialogStyle: {
    width: 288,
    height: 396,
    paddingTop: 29,
    paddingBottom: 35,
    paddingLeft: 31,
    paddingRight: 31,
  },
  main: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    color: textColor,
    fontWeight: "500",
    lineHeight: 24,
    textAlign: "center",
  },
  text: {
    fontSize: 14,
    color: textColor,
    lineHeight: 18,
    textAlign: "center",
  },
});
