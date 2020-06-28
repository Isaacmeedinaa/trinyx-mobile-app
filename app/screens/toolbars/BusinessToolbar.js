import React, { Component } from "react";
import { StyleSheet, View, Text, SafeAreaView } from "react-native";
import { NavigationBar } from "navigationbar-react-native";
import { Ionicons } from "@expo/vector-icons";
import BusinessComponentRight from "../toolbars/BusinessComponentRight";

import colors from "../../config/colors";

const ComponentLeft = () => {
  return (
    <View style={{ flex: 1, alignItems: "flex-start", marginStart: 25 }}>
      <Text style={styles.toolBarTitle}>T R I N Y X</Text>
    </View>
  );
};

class BusinessToolbar extends Component {
  render() {
    return (
      <SafeAreaView style={styles.navBarContainer}>
        <NavigationBar
          navigationBarStyle={styles.navBar}
          componentLeft={() => <ComponentLeft />}
          componentRight={() => (
            <BusinessComponentRight navigation={this.props.navigation} />
          )}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  navBarContainer: {
    backgroundColor: colors.primary,
  },
  navBar: {
    backgroundColor: colors.primary,
  },
  toolBarTitle: {
    color: "white",
    fontSize: 22,
    marginBottom: 10,
  },
});

export default BusinessToolbar;
