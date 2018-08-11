import { StyleSheet } from "react-native";
import { padding } from "theme";

export default StyleSheet.create({
  main: {
    position: "relative",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#1F253D",
    paddingRight: padding,
    paddingLeft: padding,
  },
  logo: {
    marginTop: 30,
  },
  notice: {
    color: "white",
    fontStyle: "italic",
    marginTop: 10,
    marginBottom: 10,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
  },
  containerScrollable: {
    marginTop: 20,
    width: "100%",
  },
  marginButtons: {
    marginTop: 20,
    marginBottom: 20,
  },
});
