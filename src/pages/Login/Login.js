import React from "react";
import { View, StatusBar, Image, Text } from "react-native";
import { SocialIcon } from "react-native-elements";
import styles from "./Login.style";

import plainLogo from "assets/plain-logo/plain-logo.png";

import TextInput from "components/TextInput";
import Button from "components/Button";

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
        <View style={[styles.padding, styles.content]}>
          <Image style={styles.logo} source={plainLogo} />
          <View>
            <TextInput
              keyboardType="email-address"
              value={email}
              onChangeValue={this.onChangeEmail}
              label="Email"
              icon="email"
            />
            <TextInput
              secureTextEntry
              value={password}
              onChangeValue={this.onChangePassword}
              label="Contraseña"
              icon="lock"
            />
          </View>
          <Button title="ACCEDER" />
          <View style={styles.socialLogin}>
            <SocialIcon
              button
              type="facebook"
              raised={false}
              style={styles.socialIcon}
            />
            <SocialIcon
              button
              type="google"
              raised={false}
              iconStyle={styles.google}
              style={[styles.google, styles.socialIcon, styles.socialIconLeft]}
            />
            <SocialIcon
              button
              type="twitter"
              raised={false}
              style={[styles.socialIcon, styles.socialIconLeft]}
            />
          </View>
        </View>
        <View style={[styles.padding, styles.footer]}>
          <Text style={styles.footerText}>¿No tienes cuenta aún?</Text>
          <Button title="CREA UNA CUENTA AHORA" backgroundColor="#0277BD" />
        </View>
      </View>
    );
  };
}

export default Login;
