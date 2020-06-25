import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { setUser, logoutUser } from "../config/actions/userActions";

import colors from "../config/colors";

class UserHomeScreen extends Component {
  handleLogoutPress = () => {
    this.props.logoutUser();
    this.props.navigation.navigate("Welcome");
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.props.user.username}</Text>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={this.handleLogoutPress}
        >
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoutButton: {
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
});

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => dispatch(setUser(user)),
    logoutUser: () => dispatch(logoutUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserHomeScreen);
