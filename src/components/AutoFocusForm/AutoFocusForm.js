import React from "react";
import { View, TextInput as Input } from "react-native";

export class TextInput extends React.Component {
  render = () => {
    const {
      onSubmitEditing,
      onEnter,
      inputRef,
      refCallback,
      ...props
    } = this.props;

    return (
      <Input
        ref={node => {
          if (refCallback) refCallback(node);
          inputRef(node);
        }}
        onSubmitEditing={() => {
          if (onEnter) onEnter();
          if (onSubmitEditing) onSubmitEditing();
        }}
        {...props}
      />
    );
  };
}

class AutoFocusForm extends React.Component {
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
      if (child.type.name === "DualRow") {
        const { left, right } = child.props;
        count = count + this.getTextInputCount(left);
        count = count + this.getTextInputCount(right);
        return;
      }
      if (child.type.name !== "MyTextInput") {
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
      console.log(child.type.name);
      if (!child) return;
      if (child.props.children) {
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
      if (child.type.name === "DualRow") {
        const { left, right } = child.props;
        console.log(left.type.name, right.type.name);
        const {
          newInserted: leftInserted,
          newChildren: leftModified,
        } = this.renderChildren(left, count, totalInserted);
        inserted = inserted + leftInserted;
        totalInserted = inserted + alreadyInserted;
        const {
          newInserted: rightInserted,
          newChildren: rightModified,
        } = this.renderChildren(right, count, totalInserted);
        inserted = inserted + rightInserted;
        totalInserted = inserted + alreadyInserted;
        return React.cloneElement(child, {
          left: leftModified,
          right: rightModified,
        });
      }
      if (child.type.name !== "MyTextInput") {
        console.log("No TextInput");
        return child;
      }

      const isLastTextInput = totalInserted === count - 1;
      const nextPosition = totalInserted;
      console.log(nextPosition);

      inserted++;
      return React.cloneElement(child, {
        onEnter: () => {
          console.log(nextPosition + 1);
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

export default AutoFocusForm;
