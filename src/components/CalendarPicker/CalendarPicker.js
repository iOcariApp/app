import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import styles from "./CalendarPicker.style";

import PopupDialog, { SlideAnimation } from "react-native-popup-dialog";
import { Calendar } from "react-native-calendars";

const fromTopAnimation = new SlideAnimation({
  slideFrom: "top",
});

class CalendarPicker extends React.PureComponent {
  render = () => {
    const { refCallback, changeCallback } = this.props;
    return (
      <PopupDialog
        ref={refCallback}
        dialogAnimation={fromTopAnimation}
        dismissOnTouchOutside={false}
        dialogStyle={{
          backgroundColor: "transparent",
        }}
      >
        <Calendar
          onDayPress={changeCallback}
          monthFormat={"yyyy MM"}
          firstDay={1}
        />
      </PopupDialog>
    );
  };
}

CalendarPicker.propTypes = {
  refCallback: PropTypes.func.isRequired,
  changeCallback: PropTypes.func.isRequired,
};

export default CalendarPicker;
