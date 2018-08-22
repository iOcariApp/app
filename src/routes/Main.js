import { createBottomTabNavigator } from "react-navigation";

import Home from "pages/Home";
import Library from "pages/Library";
import Profile from "pages/Profile";
import Notifications from "pages/Notifications";

const main = createBottomTabNavigator(
  {
    Home: Home,
    Library: Library,
    Profile: Profile,
    Notifications: Notifications,
  },
  {
    initialRouteName: "Home",
  }
);

export default main;
