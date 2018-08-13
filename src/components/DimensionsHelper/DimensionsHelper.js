import React from "react";
import PropTypes from "prop-types";

class DimensionsHelper extends React.PureComponent {
  state = {
    width: 0,
    height: 0,
  };

  onLayout = event => {
    const { width, height } = event.nativeEvent.layout;
    this.setState({ width, height });
  };

  render = () => {
    const { width, height } = this.state;
    const { children } = this.props;

    return children({ width, height, onLayout: this.onLayout });
  };
}

DimensionsHelper.propTypes = {
  children: PropTypes.func.isRequired,
};

export default DimensionsHelper;
