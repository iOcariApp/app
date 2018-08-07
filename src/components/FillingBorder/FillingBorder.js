import React from "react";
import PropTypes from "prop-types";
import { Animated } from "react-native";
import styles from "./FillingBorder.style";

class FillingBorder extends React.Component {
  state = {
    scale: new Animated.Value(0),
  };

  componentDidMount = () => {
    Animated.timing(this.state.scale, {
      toValue: 1,
      duration: this.props.duration,
    }).start();
  };

  render = () => {
    const { scale } = this.state;
    return (
      <Animated.View
        style={[
          styles.main,
          {
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
  duration: PropTypes.number,
};
FillingBorder.defaultProps = {
  duration: 300,
};

export default FillingBorder;
