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
// entry file
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

## Errors and solutions

**"Trying to add a root view with an explicit id already set"**

=> Reload the app

**"`react-native link` only produces `Scanning folders for symlinks in node_modules` log"**

=> You need to eject the app in order to use `link` command

**"TypeError: In this environment the sources for assign MUST be an object."**

=> Use Stylesheet.flatten to concatenate styles objects instead of spread operator.

**"TypeError: undefined is not a function (evaluating 'singleValue.stopTracking()')"**

=> Initial value of the animation must be est using `new Animated.Value()`.

**While building or publishing `Error: connect ECONNREFUSED 127.0.0.1:19001`**

=> Start manually the packager and run again the build/publish command.

## Resources

- [Official docs](https://facebook.github.io/react-native/docs/getting-started)
- [react-natigation docs](https://reactnavigation.org/docs/en/getting-started.html)
- [react-native-elements components](https://react-native-training.github.io/react-native-elements/docs/0.19.0/overview.html)
- [React made native easy](https://www.reactnative.guide/)
- [How to build using Expo](https://docs.expo.io/versions/latest/distribution/building-standalone-apps#__next)
