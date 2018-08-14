import React from "react";
import PropTypes from "prop-types";
import { ScrollView } from "react-native";
import styles from "./Register.style";

import validValidation from "utils/validation/validValidation";

import TextInput from "components/TextInput";
import DualRow from "components/DualRow";
import Button from "components/Button";
import WhiteEmptyButton from "components/Button/WhiteEmptyButton";
import AutoFocusForm from "components/AutoFocusForm";

const Page2 = ({
  values: { name, surname, birthdate, address, country, city, postalCode },
  onChangeValue,
  goPrev,
  showPrivacyPopup,
  showCalendarBirthdate,
}) => (
  <ScrollView style={styles.containerScrollable}>
    <AutoFocusForm>
      <TextInput
        keyLabel="name"
        label="Nombre"
        value={name}
        onChangeValue={onChangeValue}
        validation={validValidation}
      />
      <TextInput
        keyLabel="surname"
        label="Apellido"
        value={surname}
        onChangeValue={onChangeValue}
        validation={validValidation}
      />
      <TextInput
        keyLabel="birthdate"
        label="Fecha de nacimiento"
        value={birthdate}
        onChangeValue={onChangeValue}
        validation={validValidation}
        onClick={showCalendarBirthdate}
      />
      <TextInput
        keyLabel="address"
        label="Dirección"
        value={address}
        onChangeValue={onChangeValue}
        validation={validValidation}
      />
      <TextInput
        keyLabel="country"
        label="País"
        value={country}
        onChangeValue={onChangeValue}
        validation={validValidation}
      />
      <DualRow
        left={
          <TextInput
            keyLabel="city"
            label="Ciudad"
            value={city}
            onChangeValue={onChangeValue}
            validation={validValidation}
          />
        }
        right={
          <TextInput
            keyLabel="postalCode"
            label="Código Postal"
            value={postalCode}
            onChangeValue={onChangeValue}
            validation={validValidation}
          />
        }
        separation={15}
      />
      <DualRow
        style={styles.marginButtons}
        left={<WhiteEmptyButton title="ATRÁS" onPress={goPrev} />}
        right={<Button title="¡LISTO!" onPress={showPrivacyPopup} />}
        separation={7}
      />
    </AutoFocusForm>
  </ScrollView>
);

Page2.propTypes = {
  values: PropTypes.shape({
    name: PropTypes.string,
    surname: PropTypes.string,
    birthdate: PropTypes.string,
    address: PropTypes.string,
    country: PropTypes.string,
    city: PropTypes.string,
    postalCode: PropTypes.string,
  }),
  onChangeValue: PropTypes.func,
  goPrev: PropTypes.func,
  showPrivacyPopup: PropTypes.func,
  showCalendarBirthdate: PropTypes.func,
};

export default Page2;
