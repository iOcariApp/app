import React from "react";
import { View, StatusBar, Image, Text, StyleSheet } from "react-native";

import { SocialIcon } from "react-native-elements";

import TextInput from "components/TextInput";
import Button from "components/Button";

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1F253D",
  },
  logo: {
    marginTop: 42,
  },
  socialLogin: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  socialIcon: {
    width: 60,
    height: 60,
  },
  google: {
    backgroundColor: "#DC4E41",
  },
  footer: {
    backgroundColor: "white",
    width: "100%",
    height: 120,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
});

class Login extends React.PureComponent {
  state = {
    email: "",
    password: "",
  };

  onChangeEmail = email => {
    this.setState({ email });
  };
  onChangePassword = password => {
    this.setState({ password });
  };

  render = () => {
    const { email, password } = this.state;

    return (
      <View style={styles.main}>
        <StatusBar hidden />
        <Image
          style={styles.logo}
          source={require("assets/plain-logo/plain-logo.png")}
        />

        <TextInput label="Email" icon="email" />
        <TextInput label="Contraseña" icon="lock" />
        <Button title="ACCEDER" />

        <View style={styles.socialLogin}>
          <SocialIcon
            type="facebook"
            raised={false}
            style={styles.socialIcon}
          />
          <SocialIcon
            type="google"
            raised={false}
            iconStyle={styles.google}
            style={StyleSheet.flatten([styles.google, styles.socialIcon])}
          />
          <SocialIcon type="twitter" raised={false} style={styles.socialIcon} />
        </View>
        <View style={styles.footer}>
          <Text>¿No tienes cuenta aún?</Text>
          <Button title="CREA UNA CUENTA AHORA" backgroundColor="#0277BD" />
        </View>
      </View>
    );
  };
}

export default Login;
