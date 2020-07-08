import React, { Component, Fragment } from "react";
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
} from "react-native";
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import colors from "../config/colors";

class BusinessDealComment extends Component {
  render() {
    return (
      <View style={styles.dealCommentCard}>
        <Text style={styles.dealCommentName}>
          {this.props.comment.user.first_name}{" "}
          {this.props.comment.user.last_name}
        </Text>
        <Text style={styles.dealCommentPostedOn}>
          Posted on {this.props.comment.posted_on}
        </Text>
        <Text style={styles.dealCommentContent}>
          {this.props.comment.content}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  dealCommentCard: {
    paddingTop: 18,
    paddingBottom: 18,
    paddingRight: 15,
    paddingLeft: 15,
    marginTop: 25,
    width: 320,
    backgroundColor: "white",
  },
  dealCommentName: {
    fontSize: 15,
    fontWeight: "bold",
  },
  dealCommentPostedOn: {
    marginTop: 8,
    fontSize: 12,
  },
  dealCommentContent: {
    marginTop: 15,
  },
  dealCommentDeleteButton: {
    marginTop: 15,
  },
});

export default BusinessDealComment;
