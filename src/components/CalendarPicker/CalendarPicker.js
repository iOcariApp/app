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
import DimensionsHelper from "components/DimensionsHelper";

const fromTopAnimation = new SlideAnimation({
  slideFrom: "top",
});

class CalendarPicker extends React.PureComponent {
  state = {
    pickedDate: {},
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
    const { pickedDate } = this.state;

    return (
      <DimensionsHelper>
        {({ height, onLayout }) => (
          <PopupDialog
            ref={this.ref}
            dialogAnimation={fromTopAnimation}
            dismissOnTouchOutside={false}
            dialogStyle={[styles.dialogStyle, height > 0 ? { height } : {}]}
          >
            <View style={styles.main} onLayout={onLayout}>
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
        )}
      </DimensionsHelper>
    );
  };
}

CalendarPicker.propTypes = {
  refCallback: PropTypes.func.isRequired,
  changeCallback: PropTypes.func.isRequired,
};

export default CalendarPicker;
