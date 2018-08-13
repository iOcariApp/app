import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import styles from "./CalendarPicker.style";
import { colors } from "theme";

import PopupDialog, { SlideAnimation } from "react-native-popup-dialog";
import { Calendar } from "react-native-calendars";

import "./translation";
import TextButton from "components/Button/TextButton";
import DualRow from "components/DualRow";

const fromTopAnimation = new SlideAnimation({
  slideFrom: "top",
});

class CalendarPicker extends React.PureComponent {
  state = {
    pickedDate: {},
    myHeight: 0,
  };

  onLayout = event => {
    const { height } = event.nativeEvent.layout;
    this.setState({ myHeight: height });
  };

  ref = node => {
    this._calendar = node;
    this.props.refCallback(node);
  };

  onDateChange = pickedDate => {
    this.setState({ pickedDate });
  };

  onConfirmation = () => {
    this.props.changeCallback(this.state.pickedDate);
  };

  onCancellation = () => {
    this._calendar.dismiss();
  };

  render = () => {
    const { pickedDate, myHeight } = this.state;

    return (
      <PopupDialog
        ref={this.ref}
        dialogAnimation={fromTopAnimation}
        dismissOnTouchOutside={false}
        dialogStyle={[
          styles.dialogStyle,
          myHeight > 0 ? { height: myHeight } : {},
        ]}
      >
        <View style={styles.main} onLayout={this.onLayout}>
          <Calendar
            markedDates={{
              [pickedDate.dateString]: { selected: true },
            }}
            onDayPress={this.onDateChange}
            firstDay={1}
            hideExtraDays={true}
          />
          <View style={styles.buttonsContainer}>
            <DualRow
              style={styles.buttons}
              left={
                <TextButton
                  title="CANCELAR"
                  color={colors.mainColor}
                  fontSize={14}
                  onPress={this.onCancellation}
                />
              }
              right={
                <TextButton
                  title="OK"
                  color={colors.mainColor}
                  fontSize={14}
                  onPress={this.onConfirmation}
                />
              }
            />
          </View>
        </View>
      </PopupDialog>
    );
  };
}

CalendarPicker.propTypes = {
  refCallback: PropTypes.func.isRequired,
  changeCallback: PropTypes.func.isRequired,
};

export default CalendarPicker;
