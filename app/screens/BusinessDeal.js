import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { IP_ADDRESS } from "../config/ip";
import { deleteBusinessDeal } from "../config/actions/businessDealsActions";

import colors from "../config/colors";

class BusinessDeal extends Component {
  handleEditDealPress = () => {
    this.props.navigation.navigate("EditDeal", {
      dealId: this.props.deal.id,
      deal: this.props.deal,
    });
  };

  deleteDeal = () => {
    const deleteDealURL = `http://${IP_ADDRESS}:4000/api/v1/deals/${this.props.deal.id}`;

    const reqObj = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json",
      },
      body: JSON.stringify({ id: this.props.deal.id }),
    };

    fetch(deleteDealURL, reqObj)
      .then((resp) => resp.json())
      .then((obj) => {
        if (obj.status === 200) {
          this.props.deleteBusinessDeal(this.props.deal);
        } else {
          console.log("error");
        }
      });
  };

  handleDeleteDealPress = () => {
    Alert.alert(
      "Are you sure you want to delete this deal?",
      "This action can't be undone.",
      [
        {
          text: "Yes",
          style: "destructive",
          onPress: () => {
            this.deleteDeal();
          },
        },
        { text: "Cancel" },
      ]
    );
  };

  handleBusinessDealPress = () => {};

  render() {
    return (
      <View
        style={styles.dealCard}
        onStartShouldSetResponder={this.handleBusinessDealPress}
      >
        <Text style={styles.dealTitle}>{this.props.deal.title}</Text>
        <Text style={styles.dealDetails}>
          Posted on {this.props.deal.posted_on}
        </Text>
        <Text style={styles.dealContent}>{this.props.deal.content}</Text>
        {this.props.deal.code === "" ? null : (
          <Text style={styles.dealCode}>Deal Code: {this.props.deal.code}</Text>
        )}
        <Text style={styles.dealDates}>
          Valid Thru: {this.props.deal.begin_date} •{" "}
          {this.props.deal.expiration_date}
        </Text>
        <View style={styles.dealLikesContainer}>
          <TouchableOpacity style={styles.dealLikeButton}>
            <Ionicons name="ios-flame" size={17} color={colors.primary} />
          </TouchableOpacity>
          <Text style={styles.dealLikeCount}>{this.props.deal.like_count}</Text>
          <TouchableOpacity style={styles.dealCommentButton}>
            <Ionicons name="ios-chatboxes" size={17} color={"gray"} />
          </TouchableOpacity>
          <Text style={styles.dealCommentCount}>
            {this.props.deal.comment_count}
          </Text>
          <TouchableOpacity
            style={styles.dealEditButton}
            onPress={this.handleEditDealPress}
          >
            <Ionicons name="md-create" size={17} color={"gray"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dealDeleteButton}
            onPress={this.handleDeleteDealPress}
          >
            <Ionicons name="ios-trash" size={17} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  dealCard: {
    paddingTop: 18,
    paddingBottom: 18,
    paddingRight: 15,
    paddingLeft: 15,
    marginTop: 25,
    width: 320,
    backgroundColor: "white",
  },
  dealTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  dealDetails: {
    marginTop: 8,
    fontSize: 10,
  },
  dealContent: {
    marginTop: 15,
    fontSize: 15,
  },
  dealCode: {
    marginTop: 15,
    fontSize: 13,
    fontWeight: "bold",
  },
  dealDates: {
    marginTop: 15,
    fontSize: 12,
  },
  dealLikesContainer: {
    marginTop: 15,
    flexDirection: "row",
  },
  dealLikeButton: {
    width: 17,
    height: 17,
  },
  dealLikeCount: {
    marginStart: 5,
    fontSize: 13,
  },
  dealCommentButton: {
    marginStart: 20,
    width: 17,
    height: 17,
  },
  dealCommentCount: {
    marginStart: 5,
    fontSize: 13,
  },
  dealEditButton: {
    marginStart: 20,
    width: 17,
    height: 17,
  },
  dealDeleteButton: {
    marginStart: 20,
    width: 17,
    height: 17,
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    deleteBusinessDeal: (businessDeal) =>
      dispatch(deleteBusinessDeal(businessDeal)),
  };
};

export default connect(null, mapDispatchToProps)(BusinessDeal);
