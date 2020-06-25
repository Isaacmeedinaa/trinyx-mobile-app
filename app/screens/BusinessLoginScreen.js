import React, { Component } from "react";
import {
  StyleSheet,
  StatusBar,
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

import colors from "../config/colors";

class BusinessLoginScreen extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
    };
  }

  handleLoginPress = (event) => {
    // do fetch stuff
  };

  onRegisterRoutePress = () => {
    // do routing stuff
  };

  render() {
    return (
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.businessLoginScreenContainer}
      >
        <StatusBar barStyle="dark-content" />
        <Text style={styles.appName}>T R I N Y X</Text>
        <Text style={styles.appSlogan}>Upload Deals In Your Community</Text>
        <TextInput
          style={styles.loginEmailTextInput}
          placeholder="Email"
          placeholderTextColor="#5e5e5e"
          textContentType="emailAddress"
          keyboardType="email-address"
          onChangeText={(email) => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          style={styles.loginPasswordTextInput}
          placeholder="Password"
          placeholderTextColor="#5e5e5e"
          textContentType="password"
          secureTextEntry={true}
          onChangeText={(password) => this.setState({ password })}
          value={this.state.password}
        />
        <TouchableOpacity
          style={styles.loginBusinessBtn}
          onPress={this.handleLoginPress}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.registerText} onPress={this.onRegisterRoutePress}>
          Register
        </Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  businessLoginScreenContainer: {
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
  loginEmailTextInput: {
    width: 270,
    height: 42,
    paddingRight: 10,
    paddingLeft: 10,
    marginTop: 40,
    borderColor: colors.primary,
    borderWidth: 1.5,
    borderRadius: 5,
  },
  loginPasswordTextInput: {
    width: 270,
    height: 42,
    paddingRight: 10,
    paddingLeft: 10,
    marginTop: 28,
    borderColor: colors.primary,
    borderWidth: 1.5,
    borderRadius: 5,
  },
  loginBusinessBtn: {
    width: 270,
    height: 42,
    marginTop: 28,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  registerText: {
    marginTop: 25,
    color: colors.primary,
    fontSize: 18,
  },
});

export default BusinessLoginScreen;
