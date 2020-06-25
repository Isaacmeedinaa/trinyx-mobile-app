import React, { Component } from "react";
import {
  StyleSheet,
  StatusBar,
  View,
  ScrollView,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import { businessLogin } from "../config/actions/businessActions";

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
    const businessLoginURL = "http://10.0.0.136:4000/api/v1/business_login";

    const loginData = {
      business: {
        email: this.state.email.toLowerCase(),
        password: this.state.password,
      },
    };

    const reqObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json",
      },
      body: JSON.stringify(loginData),
    };

    fetch(businessLoginURL, reqObj)
      .then((resp) => resp.json())
      .then((obj) => {
        if (obj.status === 200) {
          this.props.businessLogin(obj.business);
          this.props.navigation.navigate("BusinessHome");
        } else {
          Alert.alert("Invalid email or password!", "Please try again.", [
            {
              text: "OK",
              onPress: () => this.setState({ email: "", password: "" }),
            },
          ]);
        }
      });
  };

  onRegisterRoutePress = () => {
    this.props.navigation.navigate("BusinessRegister");
  };

  render() {
    return (
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.businessLoginScreenContainer}
      >
        <StatusBar barStyle="dark-content" />
        <Text
          onPress={() => this.props.navigation.goBack()}
          style={styles.backButton}
        >
          Back
        </Text>
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
  backButton: {
    position: "absolute",
    left: 30,
    top: 70,
    color: colors.primary,
    fontSize: 20,
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

const mapStateToProps = (state) => {
  return {
    business: state.business,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    businessLogin: (business) => dispatch(businessLogin(business)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BusinessLoginScreen);
