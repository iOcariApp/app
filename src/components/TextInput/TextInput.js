import React from "react";
import PropTypes from "prop-types";
import { View, StyleSheet } from "react-native";

import {
  Icon,
  FormLabel,
  FormInput,
  FormValidationMessage,
} from "react-native-elements";

const styles = StyleSheet.create({
  main: {
    marginBottom: 17,
  },
});

class TextInput extends React.PureComponent {
  state = {
    value: "",
    showError: false,
  };

  onChangeText = value => {
    clearTimeout(this._checkTimeout);
    this._checkTimeout = setTimeout(this.checkValue, 2000);
    this.setState({ value });
  };

  checkValue = () => {
    const { value } = this.state;
    const { validation } = this.props;

    const validValue = validation(value);
    this.setState({ showError: !validValue });
  };

  render = () => {
    const { value, showError } = this.state;
    const { icon, label, error } = this.props;

    return (
      <View style={styles.main}>
        {icon && <Icon name={icon} />}
        <FormLabel>{label}</FormLabel>
        <FormInput value={value} onChangeText={this.onChangeText} />
        {showError && <FormValidationMessage>{error}</FormValidationMessage>}
      </View>
    );
  };
}

TextInput.propTypes = {
  icon: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.string,
  validation: PropTypes.func,
};
TextInput.defaultProps = {
  validation: () => true,
};

export default TextInput;
