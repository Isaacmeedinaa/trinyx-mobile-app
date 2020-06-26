import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  View,
} from "react-native";
import { connect } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { userRegister } from "../config/actions/userActions";

import colors from "../config/colors";

class UserRegisterScreen extends Component {
  constructor() {
    super();

    this.state = {
      first_name: "",
      last_name: "",
      age: null,
      email: "",
      location: "",
      username: "",
      password: "",
      confirm_password: "",
    };
  }

  handleRegisterPress = () => {
    const userRegisterURL = "http://10.0.0.136:4000/api/v1/user_register";

    const registerData = {
      user: {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        age: parseInt(this.state.age),
        email: this.state.email,
        location: this.state.location,
        username: this.state.username.toLowerCase(),
        password: this.state.password,
        confirm_password: this.state.confirm_password,
      },
    };

    const reqObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Application: "application/json",
      },
      body: JSON.stringify(registerData),
    };

    fetch(userRegisterURL, reqObj)
      .then((resp) => resp.json())
      .then((obj) => {
        if (obj.status === 200) {
          this.props.userRegister(obj.user);
          this.props.navigation.navigate("UserHome");
        } else {
          Alert.alert(obj.messages, "Please try again.", [
            {
              text: "OK",
              onPress: () => this.setState({ username: "", password: "" }),
            },
          ]);
        }
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <View style={styles.userRegisterScreenContainer}>
        <StatusBar barStyle="dark-content" />
        <KeyboardAwareScrollView
          contentContainerStyle={styles.userRegisterScrollView}
        >
          <Text
            onPress={() => this.props.navigation.goBack()}
            style={styles.backButton}
          >
            Back
          </Text>
          <Text style={styles.appName}>T R I N Y X</Text>
          <Text style={styles.appSlogan}>Find Deals In Your Community</Text>
          <TextInput
            style={[styles.userRegisterTextInput, styles.firstTextInputMargin]}
            placeholder="First Name"
            placeholderTextColor="#5e5e5e"
            textContentType="name"
            onChangeText={(first_name) => this.setState({ first_name })}
            value={this.state.first_name}
          />
          <TextInput
            style={styles.userRegisterTextInput}
            placeholder="Last Name"
            placeholderTextColor="#5e5e5e"
            textContentType="name"
            onChangeText={(last_name) => this.setState({ last_name })}
            value={this.state.last_name}
          />
          <TextInput
            style={styles.userRegisterTextInput}
            placeholder="Age"
            placeholderTextColor="#5e5e5e"
            // textContentType="name"
            keyboardType="number-pad"
            onChangeText={(age) => this.setState({ age })}
            value={this.state.age}
          />
          <TextInput
            style={styles.userRegisterTextInput}
            placeholder="Email"
            placeholderTextColor="#5e5e5e"
            textContentType="emailAddress"
            keyboardType="email-address"
            onChangeText={(email) => this.setState({ email })}
            value={this.state.email}
          />
          <TextInput
            style={styles.userRegisterTextInput}
            placeholder="Location"
            placeholderTextColor="#5e5e5e"
            textContentType="streetAddressLine1"
            onChangeText={(location) => this.setState({ location })}
            value={this.state.location}
          />
          <TextInput
            style={styles.userRegisterTextInput}
            placeholder="Username"
            placeholderTextColor="#5e5e5e"
            textContentType="name"
            onChangeText={(username) => this.setState({ username })}
            value={this.state.username}
          />
          <TextInput
            style={styles.userRegisterTextInput}
            placeholder="Password"
            placeholderTextColor="#5e5e5e"
            textContentType="password"
            secureTextEntry={true}
            onChangeText={(password) => this.setState({ password })}
            value={this.state.password}
          />
          <TextInput
            style={styles.userRegisterTextInput}
            placeholder="Confirm Password"
            placeholderTextColor="#5e5e5e"
            textContentType="password"
            secureTextEntry={true}
            onChangeText={(confirm_password) =>
              this.setState({ confirm_password })
            }
            value={this.state.confirm_password}
          />
          <TouchableOpacity
            style={styles.regiserUserBtn}
            onPress={this.handleRegisterPress}
          >
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
          <Text
            style={styles.loginText}
            onPress={() => this.props.navigation.goBack()}
          >
            Login
          </Text>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  userRegisterScreenContainer: {
    flex: 1,
    backgroundColor: "white",
    width: "100%",
  },
  userRegisterScrollView: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 150,
    paddingBottom: 50,
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
  firstTextInputMargin: {
    marginTop: 40,
  },
  userRegisterTextInput: {
    width: 270,
    height: 42,
    paddingRight: 10,
    paddingLeft: 10,
    marginTop: 28,
    borderColor: colors.primary,
    borderWidth: 1.5,
    borderRadius: 5,
  },
  regiserUserBtn: {
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
  loginText: {
    marginTop: 25,
    color: colors.primary,
    fontSize: 18,
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    userRegister: (user) => dispatch(userRegister(user)),
  };
};

export default connect(null, mapDispatchToProps)(UserRegisterScreen);
