import React from "react";
import PropTypes from "prop-types";
import { View, TextInput as Input } from "react-native";

import MyTextInput from "components/TextInput";
import DualRow from "components/DualRow";

export class TextInput extends React.Component {
  ref = node => {
    const { refCallback, inputRef } = this.props;
    if (refCallback) refCallback(node);
    inputRef(node);
  };

  onSubmitEditing = () => {
    const { onEnter, onSubmitEditing } = this.props;
    if (onEnter) onEnter();
    if (onSubmitEditing) onSubmitEditing();
  };

  render = () => {
    const {
      onSubmitEditing, // eslint-disable-line no-unused-vars
      onEnter, // eslint-disable-line no-unused-vars
      inputRef, // eslint-disable-line no-unused-vars
      refCallback, // eslint-disable-line no-unused-vars
      ...props
    } = this.props;

    return (
      <Input ref={this.ref} onSubmitEditing={this.onSubmitEditing} {...props} />
    );
  };
}

TextInput.propTypes = {
  onSubmitEditing: PropTypes.func,
  onEnter: PropTypes.func,
  inputRef: PropTypes.func.isRequired,
  refCallback: PropTypes.func,
};

export class Form extends React.Component {
  constructor() {
    super();
    this._inputs = [];
  }

  getTextInputCount = children => {
    let count = 0;
    React.Children.forEach(children, child => {
      if (!child) return;
      if (child.props.children) {
        count = count + this.getTextInputCount(child);
        return;
      }
      if (child.type === DualRow) {
        const { left, right } = child.props;
        count = count + this.getTextInputCount(left);
        count = count + this.getTextInputCount(right);
        return;
      }
      if (child.type !== MyTextInput) {
        return;
      }

      count++;
    });

    return count;
  };

  renderChildren = (children, count, alreadyInserted = 0) => {
    let inserted = 0;
    const modifiedChildren = React.Children.map(children, child => {
      let totalInserted = inserted + alreadyInserted;

      if (!child) return;
      if (child.props.children) {
        // Insert children
        const { newInserted, newChildren } = this.renderChildren(
          child.props.children,
          count,
          totalInserted
        );
        inserted = inserted + newInserted;

        return React.cloneElement(child, {
          children: newChildren,
        });
      }
      if (child.type === DualRow) {
        const { left, right } = child.props;

        // Insert TextInputs on left
        const {
          newInserted: leftInserted,
          newChildren: leftModified,
        } = this.renderChildren(left, count, totalInserted);
        inserted = inserted + leftInserted;
        totalInserted = inserted + alreadyInserted;

        // Insert TextInputs on right
        const {
          newInserted: rightInserted,
          newChildren: rightModified,
        } = this.renderChildren(right, count, totalInserted);
        inserted = inserted + rightInserted;

        return React.cloneElement(child, {
          left: leftModified,
          right: rightModified,
        });
      }
      if (child.type !== MyTextInput) {
        return child;
      }

      // We found a TextInput
      inserted++;

      const isLastTextInput = totalInserted === count - 1;
      const nextPosition = totalInserted;

      return React.cloneElement(child, {
        onEnter: () => {
          !isLastTextInput ? this._inputs[nextPosition + 1].focus() : null;
        },
        inputRef: node => {
          this._inputs[nextPosition] = node;
        },
        returnKeyType: isLastTextInput ? "done" : "next",
      });
    });

    return { newInserted: inserted, newChildren: modifiedChildren };
  };

  render = () => {
    const { children, ...props } = this.props;
    const count = this.getTextInputCount(children);
    return (
      <View {...props}>{this.renderChildren(children, count).newChildren}</View>
    );
  };
}

Form.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf([PropTypes.node]),
  ]),
};
