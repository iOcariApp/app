import React from "react";
import PropTypes from "prop-types";
import { ScrollView } from "react-native";
import styles from "./Register.style";

import TextInput from "components/TextInput";
import DualRow from "components/DualRow";
import Button from "components/Button";
import WhiteEmptyButton from "components/Button/WhiteEmptyButton";

const Page2 = ({
  values: { name, surname, birthdate, address, country, city, postalCode },
  logic: {
    onChangeName,
    onChangeSurname,
    onChangeBirthdate,
    onChangeAddress,
    onChangeCountry,
    onChangeCity,
    onChangePostalCode,
    validValidation,
    goPrev,
    goNext,
  },
}) => (
  <ScrollView style={styles.containerScrollable}>
    <TextInput
      label="Nombre"
      value={name}
      onChangeValue={onChangeName}
      validation={validValidation}
    />
    <TextInput
      label="Apellido"
      value={surname}
      onChangeValue={onChangeSurname}
      validation={validValidation}
    />
    <TextInput
      label="Fecha de nacimiento"
      value={birthdate}
      onChangeValue={onChangeBirthdate}
      validation={validValidation}
    />
    <TextInput
      label="Dirección"
      value={address}
      onChangeValue={onChangeAddress}
      validation={validValidation}
    />
    <TextInput
      label="País"
      value={country}
      onChangeValue={onChangeCountry}
      validation={validValidation}
    />
    <DualRow
      left={
        <TextInput
          label="Ciudad"
          value={city}
          onChangeValue={onChangeCity}
          validation={validValidation}
        />
      }
      right={
        <TextInput
          label="Código Postal"
          value={postalCode}
          onChangeValue={onChangePostalCode}
          validation={validValidation}
        />
      }
      separation={15}
    />
    <DualRow
      style={styles.marginButtons}
      left={<WhiteEmptyButton title="ATRÁS" onPress={goPrev} />}
      right={<Button title="¡LISTO!" onPress={goNext} />}
      separation={7}
    />
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
  logic: PropTypes.shape({
    onChangeName: PropTypes.func,
    onChangeSurname: PropTypes.func,
    onChangeBirthdate: PropTypes.func,
    onChangeAddress: PropTypes.func,
    onChangeCountry: PropTypes.func,
    onChangeCity: PropTypes.func,
    onChangePostalCode: PropTypes.func,
    validValidation: PropTypes.func,
    goPrev: PropTypes.func,
    goNext: PropTypes.func,
  }),
};

export default Page2;
