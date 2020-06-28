import React, { Component } from "react";
import { StyleSheet, View, Text, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import colors from "../../config/colors";

class BusinessComponentRight extends Component {
  handleNewDealPress = () => {
    this.props.navigation.navigate("NewDeal");
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "flex-end",
          marginEnd: 25,
          marginBottom: 11,
        }}
      >
        <Ionicons
          name="ios-add"
          size={35}
          color={"#fff"}
          onPress={() => this.handleNewDealPress()}
        />
      </View>
    );
  }
}

export default BusinessComponentRight;
