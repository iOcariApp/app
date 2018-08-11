import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import styles from "./Register.style";

import TextInput from "components/TextInput";
import Button from "components/Button";

const Page1 = ({
  values: { nickname, email, password, passwordDouble },
  logic: {
    onChangeNickname,
    onChangeEmail,
    onChangePassword,
    onChangePasswordDouble,
    availableNickname,
    validEmail,
    passwordStrength,
    samePassword,
    goNext,
  },
}) => (
  <View style={styles.container}>
    <TextInput
      label="Nombre de jugador"
      value={nickname}
      onChangeValue={onChangeNickname}
      validation={availableNickname}
    />
    <TextInput
      label="E-mail"
      value={email}
      onChangeValue={onChangeEmail}
      validation={validEmail}
      keyboardType="email-address"
    />
    <TextInput
      value={password}
      onChangeValue={onChangePassword}
      label="Contraseña"
      validation={passwordStrength}
      secureTextEntry
    />
    <TextInput
      value={passwordDouble}
      onChangeValue={onChangePasswordDouble}
      label="Repetir contraseña"
      validation={samePassword}
      secureTextEntry
    />
    <Button title="SIGUIENTE" style={styles.marginButtons} onPress={goNext} />
  </View>
);

Page1.propTypes = {
  values: PropTypes.shape({
    nickname: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
    passwordDouble: PropTypes.string,
  }),
  logic: PropTypes.shape({
    onChangeNickname: PropTypes.func,
    onChangeEmail: PropTypes.func,
    onChangePassword: PropTypes.func,
    onChangePasswordDouble: PropTypes.func,
    availableNickname: PropTypes.func,
    validEmail: PropTypes.func,
    passwordStrength: PropTypes.func,
    samePassword: PropTypes.func,
    goNext: PropTypes.func,
  }),
};

export default Page1;
