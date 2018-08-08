import { StyleSheet } from "react-native";

export default StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1F253D",
  },
  padding: {
    paddingRight: 30,
    paddingLeft: 30,
  },
  content: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  logo: {
    marginTop: 42,
  },
  socialLogin: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 36,
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
    fontSize: 16,
    marginBottom: -20,
  },
});
