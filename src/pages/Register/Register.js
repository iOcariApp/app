import React from "react";
import { View, StatusBar, Image, Text } from "react-native";
import styles from "./Register.style";

import availableNickname from "utils/validation/availableNickname";
import validEmail from "utils/validation/validEmail";
import samePassword from "utils/validation/samePassword";

import plainLogo from "assets/plain-logo/plain-logo.png";

import Page1 from "./Page1";
import Page2 from "./Page2";

import CalendarPicker from "components/CalendarPicker";
import PrivacyPopup from "components/PrivacyPopup";

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

  /* Refs handling for popups */
  refPrivacyPopup = node => {
    this._privacyPopup = node;
  };
  showPrivacyPopup = () => {
    this._privacyPopup.show();
  };

  refCalendar = node => {
    this._calendarBirthdate = node;
  };
  showCalendarBirthdate = () => {
    this._calendarBirthdate.show();
  };

  /* Update handlers */
  onChangeValue = (value, label) => {
    this.setState({ [label]: value });
  };
  onChangeBirthdate = date => {
    this.setState({ birthdate: JSON.stringify(date) });
    this._calendarBirthdate.dismiss();
  };

  /* Global validations */
  samePassword = () => {
    const { password, passwordDouble } = this.state;
    return samePassword(password, passwordDouble);
  };

  /* Navigation */
  goNext = () => {
    const { nickname, email } = this.state;
    const isNickameValid = availableNickname(nickname).valid;
    const isEmailValid = validEmail(email).valid;
    const isPasswordValid = this.samePassword().valid;

    if (isNickameValid && isEmailValid && isPasswordValid) {
      this.setState({ screen: 1 });
    }
  };
  goPrev = () => {
    this.setState({ screen: 0 });
  };
  finish = () => {
    console.log("Registered", this.state); // eslint-disable-line no-console
  };

  render = () => {
    const { screen } = this.state;

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
          <Page1
            values={this.state}
            onChangeValue={this.onChangeValue}
            samePassword={this.samePassword}
            goNext={this.goNext}
          />
        ) : (
          <Page2
            values={this.state}
            onChangeValue={this.onChangeValue}
            goPrev={this.goPrev}
            showPrivacyPopup={this.showPrivacyPopup}
            showCalendarBirthdate={this.showCalendarBirthdate}
          />
        )}

        <PrivacyPopup
          refCallback={this.refPrivacyPopup}
          readMore={() => null}
          accept={this.finish}
        />
        <CalendarPicker
          refCallback={this.refCalendar}
          changeCallback={this.onChangeBirthdate}
        />
      </View>
    );
  };
}

export default Register;
