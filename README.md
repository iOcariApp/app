# app

iOcari app

## Setup

1.  create-react-native-app
2.  Set app entry point
3.  Set splash screen
4.  Set routing (react-navigation)
5.  Added react-native-elements
6.  Set aliases

## Notes

**Networking errors**

- Remove all network adapters and make sure the IPv4 ip is being used by react native.

- Setting `REACT_NATIVE_PACKAGER_HOSTNAME` to the correct ip can also help.

- If problem still persists or you get a `packager is not running at` try running the react native using Expo XDE.

**Entry point**

`app.json`

```json
{
  "expo": {
    "entryPoint": "./src/app/index.js"
  }
}
```

`./src/app/index.js`

```jsx
import Expo from 'expo'
...

class App extends Component {
  ...
}

export default Expo.registerRootComponent(App);
```

**Splash screen**

[Expo docs](https://docs.expo.io/versions/latest/guides/splash-screens.html)

**Link libraries**

Add a npm script like `"link": "react-native link"`.

**Hide status bar**

Render `<StatusBar hidden />` in the component.

**Aliases**

`npm install --save babel babel-plugin-module-alias`

In `.babelrc`:

```json
  "plugins": [[
    "module-alias", [
      { "src": "./app", "expose": "app" },
      { "src": "./app/resources/icon", "expose": "icon" }
      ]
   ]]
 }
```

**Multiple styles**

Set the `style` attribute as an array of the styles.

i.e: `style={[styles.padding, styles.content]}`

## Errors and solutions

- "Trying to add a root view with an explicit id already set"

=> Reload the app

- "`react-native link` only produces `Scanning folders for symlinks in node_modules` message"

=> You need to eject the app in order to use `link` command

- "TypeError: In this environment the sources for assign MUST be an object."

=> Use Stylesheet.flatten to concatenate styles objects instead of spread operator.

- "TypeError: undefined is not a function (evaluating 'singleValue.stopTracking()')"

=> Initial value of the animation must be est using `new Animated.Value()`.

## Resources

[Official docs](https://facebook.github.io/react-native/docs/getting-started)
[Search built components](https://js.coach/?collection=React+Native)
[react-natigation docs](https://reactnavigation.org/docs/en/getting-started.html)
[react-native-elements components](https://react-native-training.github.io/react-native-elements/docs/0.19.0/overview.html)
[React made native easy](https://www.reactnative.guide/)
