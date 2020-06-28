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
import { connect } from "react-redux";
import { editBusinessDeal } from "../config/actions/businessDealsActions";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { IP_ADDRESS } from "../config/ip";

import colors from "../config/colors";

class EditDealScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: props.route.params.deal.title,
      content: props.route.params.deal.content,
      code: props.route.params.deal.code,
      image: props.route.params.deal.image,
      begin_date: props.route.params.deal.begin_date,
      expiration_date: props.route.params.deal.expiration_date,
      business_id: props.route.params.deal.business.id,
    };
  }

  handleUpdateDealPress = () => {
    let dealId = this.props.route.params.deal.id;
    const editDealURL = `http://${IP_ADDRESS}:4000/api/v1/deals/${dealId}`;

    const editDealData = {
      deal: {
        title: this.state.title,
        content: this.state.content,
        code: this.state.code,
        image: this.state.image,
        begin_date: this.state.begin_date,
        expiration_date: this.state.expiration_date,
        business_id: this.props.route.params.deal.business.id,
      },
    };

    const reqObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json",
      },
      body: JSON.stringify(editDealData),
    };

    fetch(editDealURL, reqObj)
      .then((resp) => resp.json())
      .then((obj) => {
        if (obj.status === 200) {
          this.props.editBusinessDeal(obj.deal);
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
    console.log(this.props);
    return (
      <View style={styles.editDealScreenContainer}>
        <StatusBar barStyle="dark-content" />
        <KeyboardAwareScrollView
          contentContainerStyle={styles.editDealScrollView}
        >
          <Text
            onPress={() => this.props.navigation.goBack()}
            style={styles.backButton}
          >
            Back
          </Text>
          <Text style={styles.editDealTitle}>Edit Deal</Text>
          <Text style={styles.editDealSubTitle}>
            Update your deal with new info
          </Text>
          <TextInput
            style={[styles.editDealTextInput, styles.firstTextInputMargin]}
            placeholder="Title"
            placeholderTextColor="#5e5e5e"
            textContentType="name"
            onChangeText={(title) => this.setState({ title })}
            value={this.state.title}
          />
          <TextInput
            style={styles.editDealContentTextInput}
            placeholder="Content"
            placeholderTextColor="#5e5e5e"
            textContentType="none"
            multiline={true}
            onChangeText={(content) => this.setState({ content })}
            value={this.state.content}
          />
          <TextInput
            style={styles.editDealTextInput}
            placeholder="Deal Code"
            placeholderTextColor="#5e5e5e"
            keyboardType="default"
            onChangeText={(code) => this.setState({ code })}
            value={this.state.code}
          />
          <TextInput
            style={styles.editDealTextInput}
            placeholder="Image URL"
            placeholderTextColor="#5e5e5e"
            textContentType="URL"
            keyboardType="url"
            onChangeText={(image) => this.setState({ image })}
            value={this.state.image}
          />
          <TextInput
            style={styles.editDealTextInput}
            placeholder="Begin Date Ex. MM-DD-YYYY"
            placeholderTextColor="#5e5e5e"
            textContentType="none"
            onChangeText={(begin_date) => this.setState({ begin_date })}
            value={this.state.begin_date}
          />
          <TextInput
            style={styles.editDealTextInput}
            placeholder="Expiration Date Ex. MM-DD-YYYY"
            placeholderTextColor="#5e5e5e"
            textContentType="none"
            onChangeText={(expiration_date) =>
              this.setState({ expiration_date })
            }
            value={this.state.expiration_date}
          />
          <TouchableOpacity
            style={styles.editDealBtn}
            onPress={this.handleUpdateDealPress}
          >
            <Text style={styles.buttonText}>Update Deal</Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  editDealScreenContainer: {
    flex: 1,
    backgroundColor: "white",
    width: "100%",
  },
  editDealScrollView: {
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
  editDealTitle: {
    fontSize: 35,
    fontWeight: "bold",
    color: colors.primary,
  },
  editDealSubTitle: {
    fontSize: 18,
    marginTop: 5,
  },
  firstTextInputMargin: {
    marginTop: 40,
  },
  editDealTextInput: {
    width: 270,
    height: 42,
    paddingRight: 10,
    paddingLeft: 10,
    marginTop: 28,
    borderColor: colors.primary,
    borderWidth: 1.5,
    borderRadius: 5,
  },
  editDealContentTextInput: {
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
  editDealBtn: {
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
    editBusinessDeal: (businessDeal) =>
      dispatch(editBusinessDeal(businessDeal)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditDealScreen);
