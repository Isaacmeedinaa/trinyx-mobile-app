import React, { Component } from "react";
import {
  StyleSheet,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import colors from "../config/colors";

class WelcomeScreen extends Component {
  render() {
    return (
      <View style={styles.welcomeScreenContainer}>
        <StatusBar barStyle="dark-content" />
        <Text style={styles.appName}>T R I N Y X</Text>
        <Text style={styles.appSlogan}>Find Deals In Your Community</Text>
        <Text style={styles.continueAsA}>Continue As A:</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("UserLogin")}
            style={styles.buttonUser}
          >
            <Text style={styles.buttonText}>User</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("BusinessLogin")}
            style={styles.buttonBusiness}
          >
            <Text style={styles.buttonText}>Business</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  welcomeScreenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  appName: {
    fontSize: 45,
    fontWeight: "bold",
    color: colors.primary,
  },
  appSlogan: {
    fontSize: 18,
    marginTop: 5,
  },
  continueAsA: {
    fontSize: 18,
    marginTop: 60,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonUser: {
    width: 100,
    height: 40,
    marginTop: 25,
    right: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 5,
  },
  buttonBusiness: {
    width: 100,
    height: 40,
    marginTop: 25,
    left: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default WelcomeScreen;
