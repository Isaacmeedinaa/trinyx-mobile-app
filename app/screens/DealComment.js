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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { connect } from "react-redux";
import { deleteDealComment } from "../config/actions/dealCommentsActions";
import { Ionicons } from "@expo/vector-icons";

import colors from "../config/colors";
import { IP_ADDRESS } from "../config/ip";

class DealComment extends Component {
  deleteDealComment = () => {
    const deleteDealCommentURL = `http:${IP_ADDRESS}:4000/api/v1/comments/${this.props.comment.id}`;

    const reqObj = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json",
      },
      body: JSON.stringify({ id: this.props.comment.id }),
    };

    fetch(deleteDealCommentURL, reqObj)
      .then((resp) => resp.json())
      .then((obj) => {
        if (obj.status === 200) {
          this.props.deleteDealComment(this.props.comment);
          this.props.minusCommentNum();
        } else {
          console.log("error");
        }
      });
  };

  handleDeleteDealCommentPress = () => {
    Alert.alert(
      "Are you sure you want to delete this comment?",
      "This action can't be undone.",
      [
        {
          text: "Yes",
          style: "destructive",
          onPress: () => {
            this.deleteDealComment();
          },
        },
        { text: "Cancel" },
      ]
    );
  };

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
        {this.props.comment.user.id === this.props.user.id ? (
          <TouchableOpacity
            style={styles.dealCommentDeleteButton}
            onPress={this.handleDeleteDealCommentPress}
          >
            <Ionicons name="ios-trash" size={17} color={colors.primary} />
          </TouchableOpacity>
        ) : null}
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

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteDealComment: (comment) => dispatch(deleteDealComment(comment)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DealComment);
