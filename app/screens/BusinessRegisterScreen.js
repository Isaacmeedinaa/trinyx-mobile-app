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
import { businessRegister } from "../config/actions/businessActions";

import colors from "../config/colors";
import { IP_ADDRESS } from "../config/ip";

class BusinessRegisterScreen extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
      business_industry: "",
      email: "",
      phone_number: "",
      location: "",
      password: "",
      password_confirmation: "",
    };
  }

  handleRegisterPress = () => {
    const businessRegisterURL = `http://${IP_ADDRESS}:4000/api/v1/business_register`;

    const registerData = {
      business: {
        name: this.state.name,
        business_industry: this.state.business_industry,
        email: this.state.email.toLowerCase(),
        phone_number: this.state.phone_number,
        location: this.state.location,
        password: this.state.password,
        password_confirmation: this.state.password_confirmation,
      },
    };

    const reqObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json",
      },
      body: JSON.stringify(registerData),
    };

    fetch(businessRegisterURL, reqObj)
      .then((resp) => resp.json())
      .then((obj) => {
        if (obj.status === 200) {
          this.props.businessRegister(obj.business);
          this.props.navigation.navigate("BusinessHome");
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
      <View style={styles.businessRegisterScreenContainer}>
        <StatusBar barStyle="dark-content" />
        <KeyboardAwareScrollView
          contentContainerStyle={styles.businessRegisterScrollView}
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
            style={[
              styles.businessRegisterTextInput,
              styles.firstTextInputMargin,
            ]}
            placeholder="Name"
            placeholderTextColor="#5e5e5e"
            textContentType="name"
            onChangeText={(name) => this.setState({ name })}
            value={this.state.name}
          />
          <TextInput
            style={styles.businessRegisterTextInput}
            placeholder="Business Indusry"
            placeholderTextColor="#5e5e5e"
            keyboardType="default"
            onChangeText={(business_industry) =>
              this.setState({ business_industry })
            }
            value={this.state.business_industry}
          />
          <TextInput
            style={styles.businessRegisterTextInput}
            placeholder="Email"
            placeholderTextColor="#5e5e5e"
            textContentType="emailAddress"
            keyboardType="email-address"
            onChangeText={(email) => this.setState({ email })}
            value={this.state.email}
          />
          <TextInput
            style={styles.businessRegisterTextInput}
            placeholder="Phone Number"
            placeholderTextColor="#5e5e5e"
            textContentType="telephoneNumber"
            keyboardType="phone-pad"
            onChangeText={(phone_number) => this.setState({ phone_number })}
            value={this.state.phone_number}
          />
          <TextInput
            style={styles.businessRegisterTextInput}
            placeholder="Location"
            placeholderTextColor="#5e5e5e"
            textContentType="streetAddressLine1"
            onChangeText={(location) => this.setState({ location })}
            value={this.state.location}
          />
          <TextInput
            style={styles.businessRegisterTextInput}
            placeholder="Password"
            placeholderTextColor="#5e5e5e"
            textContentType="password"
            secureTextEntry={true}
            onChangeText={(password) => this.setState({ password })}
            value={this.state.password}
          />
          <TextInput
            style={styles.businessRegisterTextInput}
            placeholder="Confirm Password"
            placeholderTextColor="#5e5e5e"
            textContentType="password"
            secureTextEntry={true}
            onChangeText={(password_confirmation) =>
              this.setState({ password_confirmation })
            }
            value={this.state.password_confirmation}
          />
          <TouchableOpacity
            style={styles.registerBusinessBtn}
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
  businessRegisterScreenContainer: {
    flex: 1,
    backgroundColor: "white",
    width: "100%",
  },
  businessRegisterScrollView: {
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
  businessRegisterTextInput: {
    width: 270,
    height: 42,
    paddingRight: 10,
    paddingLeft: 10,
    marginTop: 28,
    borderColor: colors.primary,
    borderWidth: 1.5,
    borderRadius: 5,
  },
  registerBusinessBtn: {
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
    businessRegister: (business) => dispatch(businessRegister(business)),
  };
};

export default connect(null, mapDispatchToProps)(BusinessRegisterScreen);
