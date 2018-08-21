import { createStackNavigator } from "react-navigation";

import Login from "./pages/Login";
import Register from "./pages/Register";

const routes = createStackNavigator(
  {
    Login: Login,
    Register: Register,
  },
  {
    initialRouteName: "Login",
    headerMode: "none",
  }
);

export default routes;
