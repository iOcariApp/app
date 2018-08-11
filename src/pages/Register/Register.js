import React from "react";
import { View, StatusBar, Image, Text } from "react-native";
import styles from "./Register.style";

import validEmail from "utils/validEmail";

import plainLogo from "assets/plain-logo/plain-logo.png";
import privacyShield from "assets/privacy-shield/privacy-shield.png";

import PopupDialog, { SlideAnimation } from "react-native-popup-dialog";

import Page1 from "./Page1";
import Page2 from "./Page2";

import DualRow from "components/DualRow";
import PinkButton from "components/Button/PinkButton";
import PinkEmptyButton from "components/Button/PinkEmptyButton";

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

  showPrivacyModal = () => {
    this._popupDialog.show();
  };

  finish = () => {
    console.log("Registered", this.state);
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
          <Page1 values={this.state} logic={this} />
        ) : (
          <Page2 values={this.state} logic={this} />
        )}
        <PopupDialog
          ref={node => {
            this._popupDialog = node;
          }}
          dialogAnimation={
            new SlideAnimation({
              slideFrom: "top",
            })
          }
          dismissOnTouchOutside={false}
          width={288}
          height={396}
          dialogStyle={{
            paddingTop: 29,
            paddingBottom: 35,
            paddingLeft: 31,
            paddingRight: 31,
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Image source={privacyShield} />
            <Text
              style={{
                fontSize: 20,
                color: "#4E4E4E",
                fontWeight: "500",
                lineHeight: 24,
                textAlign: "center",
              }}
            >
              Tu seguridad es importante
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "#4E4E4E",
                lineHeight: 18,
                textAlign: "center",
              }}
            >
              En nuestra política de privacidad de datos y términos y
              condiciones te explicamos claramente como manejamos tu información
              y como te ayudamos a tener la mejor experiencia de juego, mirálo
              antes de proceder.
            </Text>
            <DualRow
              left={<PinkEmptyButton small title="Revisar" />}
              right={<PinkButton small title="Acepto" />}
              separation={5}
            />
          </View>
        </PopupDialog>
      </View>
    );
  };
}

export default Register;
