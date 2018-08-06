import Expo from "expo";
import { createStackNavigator } from "react-navigation";

import Login from "./pages/Login";

const routes = createStackNavigator(
  {
    Login: Login,
  },
  {
    initialRouteName: "Login",
    headerMode: "none",
  }
);

export default Expo.registerRootComponent(routes);
