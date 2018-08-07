import { StyleSheet } from "react-native";
import { green } from "variables";

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
    borderColor: "#7C7C7C",
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
    position: "relative",
    color: green,
  },
  inputText: {
    fontSize: 16,
  },
  bottomBorder: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    left: "50%",
  },
  validation: {
    marginLeft: 15,
    marginTop: 5,
    fontSize: 12,
    color: "white",
  },
});
