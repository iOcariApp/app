import { StyleSheet } from "react-native";

const navbarHeight = 60;
const iconSize = 60;

export default StyleSheet.create({
  navbar: {
    height: navbarHeight,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  iconContainer: {
    position: "absolute",
    left: "50%",
    top: -navbarHeight / 2,
    width: iconSize,
    height: iconSize,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: { transform: [{ translateX: 1 }] },
});
