import React from "react";
import PropTypes from "prop-types";
import { View, Image, TouchableWithoutFeedback, Platform } from "react-native";
import styles from "./TabBarComponent.style";

import { colors } from "theme";
import emptyLogo from "images/empty-logo/empty-logo.png";
import tabBar from "images/tab-bar/tab-bar.png";

import DimensionsHelper from "components/DimensionsHelper";
import TabBarElement from "components/TabBarElement";

const TabBarComponent = ({ navigation }) => {
  const navbar = navigation.state.routes.map((route, index) => (
    <TabBarElement
      key={`tabbar-${route.key}`}
      routeName={route.routeName}
      active={navigation.state.index === index}
      navigation={navigation}
    />
  ));

  navbar.splice(2, 0, <Image key="tabbar-separator" source={tabBar} />);

  const onPressIcon = () => {
    navigation.navigate("CreateGame");
  };

  return (
    <View>
      <View
        style={[
          styles.navbar,
          {
            ...Platform.select({
              ios: {
                shadowColor: "black",
                shadowOpacity: 0.08,
                shadowOffset: { width: 0, height: -1 },
                shadowRadius: 6,
              },
              android: {
                elevation: 100,
              },
            }),
          },
        ]}
      >
        {navbar}
      </View>
      <DimensionsHelper>
        {({ width, onLayout }) => (
          <TouchableWithoutFeedback onLayout={onLayout} onPress={onPressIcon}>
            <View
              style={[
                styles.iconContainer,
                {
                  transform: [
                    {
                      translateX: -width / 2,
                    },
                  ],
                  backgroundColor: colors.mainColor,
                  ...Platform.select({
                    ios: {
                      shadowColor: "black",
                      shadowOpacity: 0.2,
                      shadowOffset: { width: 5, height: 6 },
                      shadowRadius: 13,
                    },
                    android: {
                      elevation: 8,
                    },
                  }),
                },
              ]}
            >
              <Image source={emptyLogo} style={styles.icon} />
            </View>
          </TouchableWithoutFeedback>
        )}
      </DimensionsHelper>
    </View>
  );
};

TabBarComponent.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    state: PropTypes.shape({
      index: PropTypes.number,
      routes: PropTypes.arrayOf(
        PropTypes.shape({ routeName: PropTypes.string })
      ),
    }),
  }),
};

export default TabBarComponent;
