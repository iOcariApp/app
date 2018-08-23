import React from "react";
import PropTypes from "prop-types";
import { View, Text, TouchableWithoutFeedback } from "react-native";
import styles from "./TabBarElement.style";

import { colors } from "theme";

import Icon from "react-native-vector-icons/MaterialIcons";

const TabBarElement = ({ navigation, routeName, active, style }) => {
  let iconName;
  let label;

  if (routeName === "Home") {
    iconName = "home";
    label = "Home";
  } else if (routeName === "Library") {
    iconName = "storage";
    label = "Biblioteca";
  } else if (routeName === "Profile") {
    iconName = "person";
    label = "Perfil";
  } else if (routeName === "Notifications") {
    iconName = "notifications";
    label = "Alertas";
  }

  const onPress = () => {
    navigation.navigate(routeName);
  };

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[style, styles.main]}>
        <View
          style={[
            {
              opacity: active ? 1 : 0.3,
            },
            styles.centerAxis,
          ]}
        >
          <Icon name={iconName} size={22} color={colors.grey} />
          <Text style={{ color: colors.grey }}>{label}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

TabBarElement.propTypes = {
  navigation: PropTypes.object,
  routeName: PropTypes.string,
  active: PropTypes.bool,
  style: PropTypes.object,
};

export default TabBarElement;
