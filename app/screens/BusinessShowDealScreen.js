import React, { Component, Fragment } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import UserToolbar from "./toolbars/UserToolbar";
import BusinessDealComment from "./BusinessDealComment";

import colors from "../config/colors";

class BusinessShowDealScreen extends Component {
  renderDealComments = () => {
    return this.props.route.params.deal.comments.map((comment) => {
      return <BusinessDealComment comment={comment} key={comment.id} />;
    });
  };

  render() {
    console.log(this.props.route.params.deal.comments);
    return (
      <Fragment>
        <UserToolbar />
        <View style={styles.showDealScreenContainer}>
          <KeyboardAwareScrollView
            contentContainerStyle={styles.showDealScrollView}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.dealCard}>
              <Text style={styles.dealTitle}>
                {this.props.route.params.deal.title}
              </Text>
              <Text style={styles.dealDetails}>
                Posted by on {this.props.route.params.deal.posted_on}
              </Text>
              <Text style={styles.dealDates}>
                Valid Thru: {this.props.route.params.deal.begin_date} •{" "}
                {this.props.route.params.deal.expiration_date}
              </Text>
              <Image
                resizeMode="center"
                // resizeMode='cover'
                style={styles.dealImage}
                source={{ uri: this.props.route.params.deal.image }}
              />
              <Text style={styles.dealContent}>
                {this.props.route.params.deal.content}
              </Text>
              <Text style={styles.dealCode}>
                {this.props.route.params.deal.code}
              </Text>
              <View style={styles.dealLikesContainer}>
                <TouchableOpacity
                  style={styles.dealLikeButton}
                  onPress={this.handleLikeDealPress}
                >
                  <Ionicons name="ios-heart" size={20} color={colors.primary} />
                </TouchableOpacity>
                <Text style={styles.dealLikeCount}>
                  {this.props.route.params.deal.like_count}
                </Text>
              </View>
            </View>
            {this.renderDealComments()}
          </KeyboardAwareScrollView>
        </View>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  showDealScreenContainer: {
    flex: 1,
    backgroundColor: colors.light,
    width: "100%",
  },
  showDealScrollView: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 25,
    paddingBottom: 50,
  },
  backButton: {
    position: "absolute",
    left: 30,
    top: 30,
    color: colors.primary,
    fontSize: 20,
  },
  dealCard: {
    paddingTop: 18,
    paddingBottom: 18,
    paddingRight: 15,
    paddingLeft: 15,
    width: 320,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  dealTitle: {
    fontSize: 22,
    color: colors.primary,
    fontWeight: "bold",
  },
  dealDetails: {
    fontSize: 14,
    marginTop: 10,
  },
  dealDates: {
    fontSize: 14,
    marginTop: 5,
  },
  dealImage: {
    marginTop: 25,
    width: "100%",
    height: 290,
    backgroundColor: colors.light,
  },
  dealContent: {
    marginTop: 25,
    fontSize: 18,
    textAlign: "center",
  },
  dealCode: {
    marginTop: 25,
    fontSize: 16,
    fontWeight: "bold",
  },
  dealLikesContainer: {
    width: "100%",
    marginTop: 25,
    flexDirection: "row",
  },
  dealLikeButton: {
    marginStart: 10,
    width: 20,
    height: 20,
  },
  dealLikeCount: {
    marginStart: 5,
    fontSize: 17,
  },
});

export default BusinessShowDealScreen;
