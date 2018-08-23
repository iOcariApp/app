import {
  createStackNavigator,
  createBottomTabNavigator,
} from "react-navigation";

import Home from "pages/Home";
import Library from "pages/Library";
import Profile from "pages/Profile";
import Notifications from "pages/Notifications";

import CreateGame from "pages/CreateGame";

import TabBarComponent from "components/TabBarComponent";

const tabs = createBottomTabNavigator(
  {
    Home: { screen: Home },
    Library: { screen: Library },
    Profile: { screen: Profile },
    Notifications: {
      screen: Notifications,
    },
  },
  {
    initialRouteName: "Home",
    tabBarComponent: TabBarComponent,
  }
);

const main = createStackNavigator(
  {
    MainTabs: tabs,
    CreateGame: CreateGame,
  },
  {
    initialRouteName: "MainTabs",
    headerMode: "none",
  }
);

export default main;
