import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { IP_ADDRESS } from "../config/ip";
import { addBusinessDeal } from "../config/actions/businessDealsActions";

import colors from "../config/colors";

class NewDealScreen extends Component {
  constructor() {
    super();

    this.state = {
      title: "",
      content: "",
      code: "",
      image: "",
      begin_date: "",
      expiration_date: "",
    };
  }

  handlePostNewDealPress = () => {
    const postNewDealURL = `http://${IP_ADDRESS}:4000/api/v1/deals`;

    const newDealData = {
      deal: {
        title: this.state.title,
        content: this.state.content,
        code: this.state.code,
        image: this.state.image,
        begin_date: this.state.begin_date,
        expiration_date: this.state.expiration_date,
        business_id: this.props.business.id,
      },
    };

    const reqObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json",
      },
      body: JSON.stringify(newDealData),
    };

    fetch(postNewDealURL, reqObj)
      .then((resp) => resp.json())
      .then((obj) => {
        if (obj.status === 200) {
          this.props.addBusinessDeal(obj.deal);
          this.props.navigation.goBack();
        } else {
          Alert.alert(obj.message, "Please try again.", [
            {
              text: "OK",
              onPress: () =>
                this.setState({
                  title: "",
                  content: "",
                  code: "",
                  image: "",
                  begin_date: "",
                  expiration_date: "",
                }),
            },
          ]);
        }
      });
  };

  render() {
    return (
      <View style={styles.newDealScreenContainer}>
        <StatusBar barStyle="dark-content" />
        <KeyboardAwareScrollView
          contentContainerStyle={styles.newDealScrollView}
        >
          <Text
            onPress={() => this.props.navigation.goBack()}
            style={styles.backButton}
          >
            Back
          </Text>
          <Text style={styles.newDealTitle}>New Deal</Text>
          <Text style={styles.newDealSubTitle}>Post a new deal</Text>
          <TextInput
            style={[styles.newDealTextInput, styles.firstTextInputMargin]}
            placeholder="Title"
            placeholderTextColor="#5e5e5e"
            textContentType="name"
            onChangeText={(title) => this.setState({ title })}
            value={this.state.title}
          />
          <TextInput
            style={styles.newDealContentTextInput}
            placeholder="Content"
            placeholderTextColor="#5e5e5e"
            textContentType="none"
            multiline={true}
            onChangeText={(content) => this.setState({ content })}
            value={this.state.content}
          />
          <TextInput
            style={styles.newDealTextInput}
            placeholder="Deal Code"
            placeholderTextColor="#5e5e5e"
            keyboardType="default"
            onChangeText={(code) => this.setState({ code })}
            value={this.state.code}
          />
          <TextInput
            style={styles.newDealTextInput}
            placeholder="Image URL"
            placeholderTextColor="#5e5e5e"
            textContentType="URL"
            keyboardType="url"
            onChangeText={(image) => this.setState({ image })}
            value={this.state.image}
          />
          <TextInput
            style={styles.newDealTextInput}
            placeholder="Begin Date Ex. MM-DD-YYYY"
            placeholderTextColor="#5e5e5e"
            textContentType="none"
            onChangeText={(begin_date) => this.setState({ begin_date })}
            value={this.state.begin_date}
          />
          <TextInput
            style={styles.newDealTextInput}
            placeholder="Expiration Date Ex. MM-DD-YYYY"
            placeholderTextColor="#5e5e5e"
            textContentType="none"
            onChangeText={(expiration_date) =>
              this.setState({ expiration_date })
            }
            value={this.state.expiration_date}
          />
          <TouchableOpacity
            style={styles.newDealBtn}
            onPress={this.handlePostNewDealPress}
          >
            <Text style={styles.buttonText}>Post Deal</Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  newDealScreenContainer: {
    flex: 1,
    backgroundColor: "white",
    width: "100%",
  },
  newDealScrollView: {
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
  newDealTitle: {
    fontSize: 35,
    fontWeight: "bold",
    color: colors.primary,
  },
  newDealSubTitle: {
    fontSize: 18,
    marginTop: 5,
  },
  firstTextInputMargin: {
    marginTop: 40,
  },
  newDealTextInput: {
    width: 270,
    height: 42,
    paddingRight: 10,
    paddingLeft: 10,
    marginTop: 28,
    borderColor: colors.primary,
    borderWidth: 1.5,
    borderRadius: 5,
  },
  newDealContentTextInput: {
    width: 270,
    height: 100,
    paddingTop: 10,
    paddingRight: 10,
    paddingLeft: 10,
    marginTop: 28,
    borderColor: colors.primary,
    borderWidth: 1.5,
    borderRadius: 5,
  },
  newDealBtn: {
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
    addBusinessDeal: (businessDeal) => dispatch(addBusinessDeal(businessDeal)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewDealScreen);
