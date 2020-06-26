import React, { Component } from "react";
import {
  StyleSheet,
  StatusBar,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { connect } from "react-redux";
import { userLogin } from "../config/actions/userActions";

import colors from "../config/colors";

class UserLoginScreen extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      password: "",
    };
  }

  handleLoginPress = (event) => {
    const userLoginURL = "http://10.0.0.136:4000/api/v1/user_login";

    const loginData = {
      user: {
        username: this.state.username.toLowerCase(),
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

    fetch(userLoginURL, reqObj)
      .then((resp) => resp.json())
      .then((obj) => {
        if (obj.status === 200) {
          this.props.userLogin(obj.user);
          this.props.navigation.navigate("UserHome");
        } else {
          Alert.alert("Invalid username or password!", "Please try again.", [
            {
              text: "OK",
              onPress: () => this.setState({ username: "", password: "" }),
            },
          ]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  onRegisterRoutePress = () => {
    this.props.navigation.navigate("UserRegister");
  };

  render() {
    return (
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.userLoginScreenContainer}
      >
        <StatusBar barStyle="dark-content" />
        <Text
          onPress={() => this.props.navigation.goBack()}
          style={styles.backButton}
        >
          Back
        </Text>
        <Text style={styles.appName}>T R I N Y X</Text>
        <Text style={styles.appSlogan}>Find Deals In Your Community</Text>
        <TextInput
          style={styles.loginUsernameTextInput}
          placeholder="Username"
          placeholderTextColor="#5e5e5e"
          textContentType="name"
          //   keyboardType="email-address"
          onChangeText={(username) => this.setState({ username })}
          value={this.state.username}
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
          style={styles.loginUserBtn}
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
  userLoginScreenContainer: {
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
  loginUsernameTextInput: {
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
  loginUserBtn: {
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
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userLogin: (user) => dispatch(userLogin(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserLoginScreen);
