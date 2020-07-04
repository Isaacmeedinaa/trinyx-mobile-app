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
  SafeAreaView,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { connect } from "react-redux";
import {
  fetchDealComments,
  addDealComment,
} from "../config/actions/dealCommentsActions";
import { Ionicons } from "@expo/vector-icons";
import { IP_ADDRESS } from "../config/ip";
import UserToolbar from "./toolbars/UserToolbar";
import DealComment from "./DealComment";

import colors from "../config/colors";

class ShowDealScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLiked: props.route.params.isLiked,
      likesCount: props.route.params.likesCount,
      content: "",
    };
  }

  componentDidMount() {
    this.props.fetchDealComments(this.props.route.params.deal.id);
  }

  renderDealComments = () => {
    return this.props.dealComments.map((comment) => {
      return (
        <DealComment
          comment={comment}
          key={comment.id}
          minusCommentNum={this.props.route.params.minusCommentNum}
        />
      );
    });
  };

  likeCountHandler = (operator) => {
    if (operator === "+") {
      this.setState((prevState) => {
        return {
          likesCount: prevState.likesCount + 1,
        };
      });
    } else if (operator === "-") {
      this.setState((prevState) => {
        return {
          likesCount: prevState.likesCount - 1,
        };
      });
    }
  };

  handleLikeDealPress = () => {
    this.props.route.params.handleLikeDealPress();

    if (this.state.isLiked === false) {
      this.likeCountHandler("+");
      this.setState({
        isLiked: true,
      });
    } else if (this.state.isLiked === true) {
      this.likeCountHandler("-");
      this.setState({
        isLiked: false,
      });
    }
  };

  handlePostCommentPress = () => {
    const createCommentURL = `http://${IP_ADDRESS}:4000/api/v1/comments`;

    const commentData = {
      comment: {
        content: this.state.content,
        user_id: this.props.user.id,
        deal_id: this.props.route.params.deal.id,
      },
    };

    const reqObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json",
      },
      body: JSON.stringify(commentData),
    };

    if (this.state.content !== "") {
      fetch(createCommentURL, reqObj)
        .then((resp) => resp.json())
        .then((obj) => {
          if (obj.status === 200) {
            this.props.route.params.addCommentNum();
            this.props.addDealComment(obj.comment);
            this.setState({
              content: "",
            });
          } else {
            console.log(obj.message);
          }
        });
    } else {
      Alert.alert("You cannot post an empty comment", "Please try again.", [
        {
          text: "OK",
        },
      ]);
    }
  };

  handleShowBusinessProfilePress = () => {
    this.props.navigation.navigate("BusinessProfile", {
      businessId: this.props.route.params.deal.business.id,
      business: this.props.route.params.deal.business,
    });
  };

  render() {
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
              <Text
                style={styles.dealDetails}
                onPress={this.handleShowBusinessProfilePress}
              >
                Posted by {this.props.route.params.deal.business.name} on{" "}
                {this.props.route.params.deal.posted_on}
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
                  {this.state.isLiked ? (
                    <Ionicons
                      name="ios-heart"
                      size={20}
                      color={colors.primary}
                    />
                  ) : (
                    <Ionicons
                      name="ios-heart-empty"
                      size={20}
                      color={colors.dark}
                    />
                  )}
                </TouchableOpacity>
                <Text style={styles.dealLikeCount}>
                  {this.state.likesCount}
                </Text>
              </View>
              <View style={styles.newCommentForm}>
                <TextInput
                  style={styles.newCommentTextInput}
                  placeholder="New Comment"
                  placeholderTextColor="#5e5e5e"
                  onChangeText={(content) => this.setState({ content })}
                  value={this.state.content}
                />
                <TouchableOpacity
                  style={styles.postCommentBtn}
                  onPress={this.handlePostCommentPress}
                >
                  <Text style={styles.buttonText}>Post</Text>
                </TouchableOpacity>
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
  newCommentForm: {
    paddingRight: 15,
    paddingLeft: 15,
    flexDirection: "row",
    marginTop: 25,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  newCommentTextInput: {
    width: 200,
    height: 42,
    marginRight: 20,
    paddingRight: 10,
    paddingLeft: 10,
    borderColor: colors.primary,
    borderWidth: 1.5,
    borderRadius: 5,
  },
  postCommentBtn: {
    width: 60,
    height: 42,
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
    user: state.user,
    dealComments: state.dealComments,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDealComments: (dealId) => dispatch(fetchDealComments(dealId)),
    addDealComment: (comment) => dispatch(addDealComment(comment)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowDealScreen);
