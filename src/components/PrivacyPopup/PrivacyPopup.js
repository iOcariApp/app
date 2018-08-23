import React from "react";
import PropTypes from "prop-types";
import { View, Text, Image } from "react-native";
import styles from "./PrivacyPopup.style";

import privacyShield from "images/privacy-shield/privacy-shield.png";

import PopupDialog, { SlideAnimation } from "react-native-popup-dialog";

import DualRow from "components/DualRow";
import PinkEmptyButton from "components/Button/PinkEmptyButton";
import PinkButton from "components/Button/PinkButton";

const fromTopAnimation = new SlideAnimation({
  slideFrom: "top",
});

class PrivacyPopup extends React.PureComponent {
  render = () => {
    const { refCallback, readMore, accept } = this.props;
    return (
      <PopupDialog
        ref={refCallback}
        dialogAnimation={fromTopAnimation}
        dismissOnTouchOutside={false}
        dialogStyle={styles.dialogStyle}
      >
        <View style={styles.main}>
          <Image source={privacyShield} />
          <Text style={styles.title}>Tu seguridad es importante</Text>
          <Text style={styles.text}>
            En nuestra política de privacidad de datos y términos y condiciones
            te explicamos claramente como manejamos tu información y como te
            ayudamos a tener la mejor experiencia de juego, mirálo antes de
            proceder.
          </Text>
          <DualRow
            left={<PinkEmptyButton small title="Revisar" onPress={readMore} />}
            right={<PinkButton small title="Acepto" onPress={accept} />}
            separation={5}
          />
        </View>
      </PopupDialog>
    );
  };
}

PrivacyPopup.propTypes = {
  refCallback: PropTypes.func.isRequired,
  readMore: PropTypes.func.isRequired,
  accept: PropTypes.func.isRequired,
};

export default PrivacyPopup;
