import React from "react";
import PropTypes from "prop-types";
import { Animated } from "react-native";
import styles from "./FillingBorder.style";
import { colors } from "theme";

class FillingBorder extends React.Component {
  state = {
    scale: new Animated.Value(0.001),
  };

  componentDidMount = () => {
    Animated.timing(this.state.scale, {
      toValue: 1,
      duration: this.props.duration,
    }).start();
  };

  render = () => {
    const { scale } = this.state;
    const { color } = this.props;
    return (
      <Animated.View
        style={[
          styles.main,
          {
            backgroundColor: color,
            transform: [
              {
                scaleX: scale,
              },
            ],
          },
        ]}
      />
    );
  };
}

FillingBorder.propTypes = {
  color: PropTypes.string,
  duration: PropTypes.number,
};
FillingBorder.defaultProps = {
  color: colors.green,
  duration: 300,
};

export default FillingBorder;
