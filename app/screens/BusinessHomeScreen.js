import React, { Component, Fragment } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import BusinessToolbar from "../screens/toolbars/BusinessToolbar";
import { NavigationContainer, TabActions } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import BusinessDealsScreen from "../screens/tabs/BusinessDealsScreen";
import BusinessProfileScreen from "../screens/tabs/BusinessProfileScreen";
import BusinessMoreScreen from "../screens/tabs/BusinessMoreScreen";

import colors from "../config/colors";

const Tab = createBottomTabNavigator();

class BusinessHomeScreen extends Component {
  render() {
    return (
      <Fragment>
        <BusinessToolbar navigation={this.props.navigation} />
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "BusinessDeals") {
                iconName = focused ? "ios-apps" : "ios-apps";
              } else if (route.name === "BusinessProfile") {
                iconName = focused ? "ios-business" : "ios-business";
              } else if (route.name === "BusinessMore") {
                iconName = focused ? "ios-list-box" : "ios-list";
              }

              return <Ionicons name={iconName} size={32} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: colors.primary,
            inactiveTintColor: "gray",
            showLabel: false,
          }}
        >
          <Tab.Screen
            name="BusinessDeals"
            component={BusinessDealsScreen}
            navigation={this.props.navigation}
          />
          <Tab.Screen
            name="BusinessProfile"
            component={BusinessProfileScreen}
          />
          <Tab.Screen name="BusinessMore" component={BusinessMoreScreen} />
        </Tab.Navigator>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({});

export default BusinessHomeScreen;
