import { StyleSheet } from "react-native";
import { colors, fontSizes } from "theme";

const baseLabel = () => ({
  position: "relative",
});

export default StyleSheet.create({
  main: {
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
    marginBottom: 17,
    position: "relative",
  },
  inputMain: {
    flexDirection: "row",
    alignContent: "center",
    width: "100%",
    height: 56,
    backgroundColor: "white",
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: colors.grey,
  },
  icon: {
    marginRight: 7,
  },
  input: {
    position: "relative",
    top: -7,
    flex: 1,
  },
  label: {
    ...baseLabel(),
    color: colors.grey,
  },
  labelFocused: {
    ...baseLabel(),
    color: colors.green,
  },
  inputText: {
    fontSize: fontSizes.medium,
  },
  bottomBorder: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    left: "50%",
  },
  validation: {
    fontSize: fontSizes.small,
    color: "white",
    marginLeft: 15,
    marginTop: 5,
  },
});
