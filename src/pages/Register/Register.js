import React from "react";
import { View, ScrollView, StatusBar, Image, Text } from "react-native";
import styles from "./Register.style";

import validEmail from "utils/validEmail";

import plainLogo from "assets/plain-logo/plain-logo.png";

import TextInput from "components/TextInput";
import Button from "components/Button";
import DualRow from "components/DualRow";
import WhiteEmptyButton from "components/Button/WhiteEmptyButton";

class Register extends React.PureComponent {
  state = {
    screen: 0,
    nickname: "",
    email: "",
    password: "",
    passwordDouble: "",
    name: "",
    surname: "",
    birthdate: "",
    address: "",
    country: "",
    city: "",
    postalCode: "",
  };

  onChangeNickname = nickname => {
    this.setState({ nickname });
  };
  onChangeEmail = email => {
    this.setState({ email });
  };
  onChangePassword = password => {
    this.setState({ password });
  };
  onChangePasswordDouble = passwordDouble => {
    this.setState({ passwordDouble });
  };
  onChangeName = name => {
    this.setState({ name });
  };
  onChangeSurname = surname => {
    this.setState({ surname });
  };
  onChangeBirthdate = birthdate => {
    this.setState({ birthdate });
  };
  onChangeAddress = address => {
    this.setState({ address });
  };
  onChangeCountry = country => {
    this.setState({ country });
  };
  onChangeCity = city => {
    this.setState({ city });
  };
  onChangePostalCode = postalCode => {
    this.setState({ postalCode });
  };

  availableNickname = () => {
    return {
      valid: true,
      message: "Disponible",
    };
  };

  validEmail = () => {
    const { email } = this.state;
    const valid = validEmail(email);

    return {
      valid,
      message: valid ? "Correcto" : "Incorrecto",
    };
  };

  passwordStrength = () => {
    return {
      valid: true,
      message: "Fuerte",
    };
  };

  samePassword = () => {
    const { password, passwordDouble } = this.state;
    if (password === passwordDouble) {
      return {
        valid: true,
        message: "Coinciden",
      };
    }

    return {
      valid: false,
      message: "Deben coincidir",
    };
  };

  validValidation = () => {
    return {
      valid: true,
      message: "",
    };
  };

  goNext = () => {
    const validNickame = this.availableNickname().valid;
    const validEmail = this.validEmail().valid;
    const validPassword = this.samePassword().valid;

    // validNickame && validEmail && validPassword
    if (true) {
      this.setState({ screen: 1 });
    }
  };

  goPrev = () => {
    this.setState({ screen: 0 });
  };

  render = () => {
    const {
      screen,
      nickname,
      email,
      password,
      passwordDouble,
      name,
      surname,
      birthdate,
      address,
      country,
      city,
      postalCode,
    } = this.state;

    return (
      <View style={styles.main}>
        <StatusBar hidden />
        <Image style={styles.logo} source={plainLogo} />
        {screen === 1 && (
          <Text style={styles.notice}>
            Sólo tu país y ciudad serán visibles en tu perfil.
          </Text>
        )}
        {screen === 0 ? (
          <View style={styles.container}>
            <TextInput
              label="Nombre de jugador"
              value={nickname}
              onChangeValue={this.onChangeNickname}
              validation={this.availableNickname}
            />
            <TextInput
              label="E-mail"
              value={email}
              onChangeValue={this.onChangeEmail}
              validation={this.validEmail}
              keyboardType="email-address"
            />
            <TextInput
              value={password}
              onChangeValue={this.onChangePassword}
              label="Contraseña"
              validation={this.passwordStrength}
              secureTextEntry
            />
            <TextInput
              value={passwordDouble}
              onChangeValue={this.onChangePasswordDouble}
              label="Repetir contraseña"
              validation={this.samePassword}
              secureTextEntry
            />
            <Button
              title="SIGUIENTE"
              style={styles.marginButtons}
              onPress={this.goNext}
            />
          </View>
        ) : (
          <ScrollView style={styles.containerScrollable}>
            <TextInput
              label="Nombre"
              value={name}
              onChangeValue={this.onChangeName}
              validation={this.validValidation}
            />
            <TextInput
              label="Apellido"
              value={surname}
              onChangeValue={this.onChangeSurname}
              validation={this.validValidation}
            />
            <TextInput
              label="Fecha de nacimiento"
              value={birthdate}
              onChangeValue={this.onChangeBirthdate}
              validation={this.validValidation}
            />
            <TextInput
              label="Dirección"
              value={address}
              onChangeValue={this.onChangeAddress}
              validation={this.validValidation}
            />
            <TextInput
              label="País"
              value={country}
              onChangeValue={this.onChangeCountry}
              validation={this.validValidation}
            />
            <DualRow
              left={
                <TextInput
                  label="Ciudad"
                  value={city}
                  onChangeValue={this.onChangeCity}
                  validation={this.validValidation}
                />
              }
              right={
                <TextInput
                  label="Código Postal"
                  value={postalCode}
                  onChangeValue={this.onChangePostalCode}
                  validation={this.validValidation}
                />
              }
              separation={15}
            />
            <DualRow
              style={styles.marginButtons}
              left={<WhiteEmptyButton title="ATRÁS" onPress={this.goPrev} />}
              right={<Button title="¡LISTO!" onPress={this.goNext} />}
              separation={7}
            />
          </ScrollView>
        )}
      </View>
    );
  };
}

export default Register;
