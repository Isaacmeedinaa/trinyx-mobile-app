import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { setBusiness, logoutBusiness } from "../config/actions/businessActions";

import colors from "../config/colors";

class BusinessHomeScreen extends Component {
  handleLogoutPress = () => {
    this.props.logoutBusiness();
    this.props.navigation.navigate("Welcome");
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.props.business.name}</Text>
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
    business: state.business,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setBusiness: (business) => dispatch(setBusiness(business)),
    logoutBusiness: () => dispatch(logoutBusiness()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BusinessHomeScreen);
