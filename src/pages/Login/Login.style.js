import { StyleSheet } from "react-native";
import { padding, fontSizes } from "theme";

export default StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1F253D",
  },
  padding: {
    paddingRight: padding,
    paddingLeft: padding,
  },
  content: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
  },
  logo: {},
  socialLogin: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  socialIcon: {
    width: 60,
    height: 60,
  },
  socialIconLeft: {
    marginLeft: 30,
  },
  google: {
    backgroundColor: "#DC4E41",
  },
  footer: {
    backgroundColor: "white",
    width: "100%",
    height: 120,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
  footerText: {
    fontSize: fontSizes.medium,
    marginBottom: -20,
  },
});
