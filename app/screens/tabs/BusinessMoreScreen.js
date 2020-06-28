import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { connect } from "react-redux";
import { logoutBusiness } from "../../config/actions/businessActions";

import colors from "../../config/colors";

class BusinessMoreScreen extends Component {
  handleLogoutPress = () => {
    this.props.logoutBusiness();
    this.props.navigation.navigate("Welcome");
  };

  render() {
    return (
      <View style={styles.businessMoreScreenContainer}>
        <View>
          <TouchableOpacity
            style={styles.logoutBtn}
            onPress={this.handleLogoutPress}
          >
            <Text style={styles.logoutBtnText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  businessMoreScreenContainer: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },
  logoutBtn: {
    borderRadius: 5,
    alignSelf: "center",
    width: 150,
    height: 40,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  logoutBtnText: {
    color: "white",
    fontSize: 16,
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    logoutBusiness: () => dispatch(logoutBusiness()),
  };
};

export default connect(null, mapDispatchToProps)(BusinessMoreScreen);
