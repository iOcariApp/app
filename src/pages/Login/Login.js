import React from "react";
import PropTypes from "prop-types";
import { View, StatusBar, Image, Text } from "react-native";
import { SocialIcon } from "react-native-elements";
import styles from "./Login.style";

import plainLogo from "images/plain-logo/plain-logo.png";

import TextInput from "components/TextInput";
import Button from "components/Button";
import BlueButton from "components/Button/BlueButton";
import { Form } from "components/AutoFocusForm";

class Login extends React.PureComponent {
  state = {
    fetching: false,
    email: "",
    password: "",
  };

  onChangeEmail = email => {
    this.setState({ email });
  };
  onChangePassword = password => {
    this.setState({ password });
  };

  login = () => {
    this.setState({ fetching: true });

    setTimeout(this.goToRegister, 1500);
  };

  goToRegister = () => {
    this.props.navigation.navigate("Register");
  };

  render = () => {
    const { fetching, email, password } = this.state;

    return (
      <View style={styles.main}>
        <StatusBar hidden />
        <View style={[styles.padding, styles.content]}>
          <Image style={styles.logo} source={plainLogo} />
          <Form>
            <TextInput
              keyboardType="email-address"
              value={email}
              onChangeValue={this.onChangeEmail}
              label="E-mail"
              icon="email"
            />
            <TextInput
              secureTextEntry
              value={password}
              onChangeValue={this.onChangePassword}
              label="Contraseña"
              icon="lock"
            />
          </Form>
          <Button title="ACCEDER" onPress={this.login} loading={fetching} />
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
          <BlueButton
            title="CREA UNA CUENTA AHORA"
            onPress={this.goToRegister}
          />
        </View>
      </View>
    );
  };
}

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
