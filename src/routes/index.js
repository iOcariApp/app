import { createStackNavigator } from "react-navigation";

import Main from "./Main";
import Auth from "./Auth";

const routes = createStackNavigator(
  {
    Main: Main,
    Auth: Auth,
  },
  {
    initialRouteName: "Main",
    headerMode: "none",
  }
);

export default routes;
