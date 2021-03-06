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

### Networking errors

1.  Remove all network adapters and make sure the IPv4 ip is being used by react native.
2.  Setting `REACT_NATIVE_PACKAGER_HOSTNAME` to the correct ip can also help.
3.  If problem still persists or you get a `packager is not running at` try running the react native using Expo XDE.
4.  If the problem persists even in Expo XDE, got the settings icon in the app instance, select "Host" -> "Tunnel" option and search for that url in the Expo app in the explore section.

### Entry point

```json
// app.json
{
  "expo": {
    "entryPoint": "./src/app/index.js"
  }
}
```

```jsx
// ./src/app/index.js
import Expo from 'expo'
...

class App extends Component {
  ...
}

export default Expo.registerRootComponent(App);
```

### Splash screen

[Expo docs](https://docs.expo.io/versions/latest/guides/splash-screens.html)

### Link libraries

Add a npm script like `"link": "react-native link"`.

### Hide status bar

Render `<StatusBar hidden />` in the component.

### Aliases

1.  `npm install --save babel babel-plugin-module-alias`

2.  In `.babelrc`:

```json
  "plugins": [[
    "module-alias", [
      { "src": "./app", "expose": "app" },
      { "src": "./app/resources/icon", "expose": "icon" }
      ]
   ]]
 }
```

Make sure to add the babel config in all environments.

### Multiple styles

Set the `style` attribute as an array of the styles.

i.e: `style={[styles.padding, styles.content]}`

### Transform with percentages

```jsx
class Foo extends Component {
  ...
  onLayout = event => {
    const { width } = event.nativeEvent.layout;
    this.setState({ myWidth: width });
  };
  ...
  render() {
    const { myWidth } = this.state;

    return(
      <View
        onLayout={this.onLayout}
        style={{transform: [{translateY: myWidth / 2 }]}}>
          ...
      <View/>
    )
  }
}
```

**On initial values of Animated**

Somestime giving an initial value of 0 causes unexpected blinkings. Give a value of 0.001 instead.

**On Enzyme's mount rendering**

It is not supported yet.

[https://github.com/airbnb/enzyme/issues/1436](https://github.com/airbnb/enzyme/issues/1436).

**Uninstalling linked library**

1. `react-native unlink <library-name>`
2. `npm uninstall --save <library-name>``

## Errors and solutions

**"Trying to add a root view with an explicit id already set"**

=> Reload the app

**"`react-native link` only produces `Scanning folders for symlinks in node_modules` log"**

=> You need to eject the app in order to use `link` command

**"TypeError: In this environment the sources for assign MUST be an object."**

=> Use Stylesheet.flatten to mix styles objects instead of spread operator or plain array of objects for multiple styling.

**"TypeError: undefined is not a function (evaluating 'singleValue.stopTracking()')"**

=> Initial value of the animation must be est using `new Animated.Value()`.

**While building or publishing `Error: connect ECONNREFUSED 127.0.0.1:19001`**

=> Start manually the packager and run again the build/publish command.

**When testing "TypeError: Cannot read property 'Object.<anonymous>' of null"**

=> You are probably using `Animated` library without mocking it.

```jsx
jest.mock("Animated", () => {
  const ActualAnimated = require.requireActual("Animated");
  return {
    ...ActualAnimated,
    timing: (value, config) => ({
      start: callback => {
        value.setValue(config.toValue);
        if (callback) {
          callback();
        }
      },
    }),
  };
});
```

**Could not resolve all dependencies for configuration ':app:\_debugApk'. Configuration with name 'default' not found.**

=> You have uninstalled linked libraries without unlinking them. You can see them at `android/build.gradle` so you can install them again, unlink them and reinstall.

**Failed to finalize session : INSTALL_FAILED_UPDATE_INCOMPATIBLE: Package com.iocari signatures do not match previously installed version; ignoring!**

=> Uninstall the app on the target device and run `react-native ios/android` again.

## Resources

- [Official docs](https://facebook.github.io/react-native/docs/getting-started)
- [react-natigation docs](https://reactnavigation.org/docs/en/getting-started.html)
- [react-native-elements components](https://react-native-training.github.io/react-native-elements/docs/0.19.0/overview.html)
- [React made native easy](https://www.reactnative.guide/)
- [How to build using Expo](https://docs.expo.io/versions/latest/distribution/building-standalone-apps#__next)
- [How to build for Android](https://facebook.github.io/react-native/docs/signed-apk-android.html)
- [How to build for iOS](https://facebook.github.io/react-native/docs/running-on-device.html#building-your-app-for-production)
- [Hide APK keystore for Android](https://stackoverflow.com/a/33218300/5381414)
