import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { IP_ADDRESS } from "../config/ip";

import colors from "../config/colors";

class HotDeal extends Component {
  render() {
    return (
      <View style={styles.dealCard}>
        <Text style={styles.dealTitle}>{this.props.deal.title}</Text>
        <Text style={styles.dealDetails}>
          Posted by {this.props.deal.business.name} on{" "}
          {this.props.deal.posted_on}
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
            <Ionicons name="ios-flame" size={17.5} color={colors.primary} />
          </TouchableOpacity>
          <Text style={styles.dealLikeCount}>{this.props.deal.like_count}</Text>
          <TouchableOpacity style={styles.dealCommentButton}>
            <Ionicons name="ios-chatboxes" size={16} color={"gray"} />
          </TouchableOpacity>
          <Text style={styles.dealCommentCount}>
            {this.props.deal.comment_count}
          </Text>
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
    width: 17.5,
    height: 17.5,
  },
  dealLikeCount: {
    marginStart: 5,
    fontSize: 13,
  },
  dealCommentButton: {
    marginStart: 20,
    width: 16,
    height: 16,
  },
  dealCommentCount: {
    marginStart: 5,
    fontSize: 13,
  },
});

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(HotDeal);
