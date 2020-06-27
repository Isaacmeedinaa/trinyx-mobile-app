import React, { Component } from "react";
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import { logoutUser } from "../../config/actions/userActions";
import colors from "../../config/colors";

class UserMoreScreen extends Component {
  handleLogoutPress = () => {
    this.props.logoutUser();
    this.props.navigation.navigate("Welcome");
  };

  render() {
    return (
      <View style={styles.userMoreScreenContainer}>
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
  userMoreScreenContainer: {
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

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: () => dispatch(logoutUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserMoreScreen);
