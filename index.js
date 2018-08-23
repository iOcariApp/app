import { AppRegistry } from "react-native";
import Routes from "./src/routes";
import { name as appName } from "./app.json";

import { YellowBox } from "react-native";
YellowBox.ignoreWarnings([
  "Warning: isMounted",
  "Module RCTImageLoader requires main queue",
  "Remote debugger is in a background tab",
]);

AppRegistry.registerComponent(appName, () => Routes);
