import React from "react";
import PropTypes from "prop-types";
import styles from "./Register.style";

import TextInput from "components/TextInput";
import Button from "components/Button";
import AutoFocusForm from "components/AutoFocusForm";

import availableNickname from "utils/validation/availableNickname";
import validEmail from "utils/validation/validEmail";
import passwordStrength from "utils/validation/passwordStrength";

const Page1 = ({
  values: { nickname, email, password, passwordDouble },
  onChangeValue,
  samePassword,
  goNext,
}) => (
  <AutoFocusForm style={styles.container}>
    <TextInput
      keyLabel="nickname"
      label="Nombre de jugador"
      value={nickname}
      onChangeValue={onChangeValue}
      validation={availableNickname}
    />
    <TextInput
      keyLabel="email"
      label="E-mail"
      value={email}
      onChangeValue={onChangeValue}
      validation={validEmail}
      keyboardType="email-address"
    />
    <TextInput
      keyLabel="password"
      label="Contraseña"
      value={password}
      onChangeValue={onChangeValue}
      validation={passwordStrength}
      secureTextEntry
    />
    <TextInput
      keyLabel="passwordDouble"
      label="Repetir contraseña"
      value={passwordDouble}
      onChangeValue={onChangeValue}
      validation={samePassword}
      secureTextEntry
    />
    <Button title="SIGUIENTE" style={styles.marginButtons} onPress={goNext} />
  </AutoFocusForm>
);

Page1.propTypes = {
  values: PropTypes.shape({
    nickname: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
    passwordDouble: PropTypes.string,
  }),
  onChangeValue: PropTypes.func,
  samePassword: PropTypes.func,
  goNext: PropTypes.func,
};

export default Page1;
