import React, { Component } from "react";
import { StyleSheet, View, Text, SafeAreaView } from "react-native";
import { NavigationBar } from "navigationbar-react-native";

import colors from "../../config/colors";

const ComponentCenter = () => {
  return (
    <View>
      <Text style={styles.toolBarTitle}>T R I N Y X</Text>
    </View>
  );
};

class UserToolbar extends Component {
  render() {
    return (
      <SafeAreaView style={styles.navBarContainer}>
        <NavigationBar
          navigationBarStyle={styles.navBar}
          componentCenter={() => <ComponentCenter />}
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

export default UserToolbar;
