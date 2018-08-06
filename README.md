# app

iOcari app

## Setup

1.  create-react-native-app
2.  Set app entry point
3.  Set splash screen
4.  Set routing

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

## Errors and solutions

- "Trying to add a root view with an explicit id already set"

=> Reload the app

- "`react-native link` only produces `Scanning folders for symlinks in node_modules` message"

=> You need to eject the app in order to use `link` command

## Resources

[Official docs](https://facebook.github.io/react-native/docs/getting-started)
[Search built components](https://js.coach/?collection=React+Native)
[react-natigation docs](https://reactnavigation.org/docs/en/getting-started.html)
