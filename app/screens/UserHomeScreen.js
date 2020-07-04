import React, { Component, Fragment } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { fetchAllDeals } from "../config/actions/dealsActions";
import { NavigationContainer, TabActions } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import AllDealsScreen from "./tabs/AllDealsScreen";
import HottestDealsScreen from "./tabs/HottestDealsScreen";
import UserMoreScreen from "./tabs/UserMoreScreen";
import UserToolbar from "./toolbars/UserToolbar";

import colors from "../config/colors";

const Tab = createBottomTabNavigator();

class UserHomeScreen extends Component {
  componentDidMount() {
    this.props.fetchAllDeals();
  }

  componentWillUnmount() {
    this.props.fetchAllDeals();
  }

  render() {
    return (
      <Fragment>
        <UserToolbar />
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "AllDeals") {
                iconName = focused ? "ios-apps" : "ios-apps";
              } else if (route.name === "HottestDeals") {
                iconName = focused ? "ios-flame" : "ios-flame";
              } else if (route.name === "UserMore") {
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
            name="AllDeals"
            component={AllDealsScreen}
            navigation={this.props.navigation}
          />
          <Tab.Screen name="HottestDeals" component={HottestDealsScreen} />
          <Tab.Screen name="UserMore" component={UserMoreScreen} />
        </Tab.Navigator>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({});

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDeals: () => dispatch(fetchAllDeals()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserHomeScreen);
