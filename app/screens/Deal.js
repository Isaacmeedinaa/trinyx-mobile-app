import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import {
  fetchUserLikes,
  addLike,
  removeLike,
} from "../config/actions/userLikesActions";
import { Ionicons } from "@expo/vector-icons";
import { IP_ADDRESS } from "../config/ip";

import colors from "../config/colors";

class Deal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLiked: props.deal.likes
        .map((like) => like.user.id === props.user.id)
        .includes(true),
      likesCount: props.deal.likes.length,
      commentsCount: props.deal.comments.length,
    };
  }

  componentDidMount() {
    this.props.fetchUserLikes(this.props.user);
  }

  handleDealPress = () => {
    this.props.navigation.navigate("ShowDeal", {
      dealId: this.props.deal.id,
      deal: this.props.deal,
      isLiked: this.state.isLiked,
      likesCount: this.state.likesCount,
      handleLikeDealPress: () => this.handleLikeDealPress(),
      addCommentNum: () => this.addCommentNum(),
      minusCommentNum: () => this.minusCommentNum(),
    });
  };

  createLike = () => {
    const deal = this.props.deal;
    const user = this.props.user;
    const business = this.props.deal.business;

    this.props.addLike(deal, user, business);
  };

  deleteLike = () => {
    let dealLike = this.props.userLikes.find(
      (like) => like.deal.id === this.props.deal.id
    );

    this.props.removeLike(dealLike);
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
    if (this.state.isLiked === false) {
      this.createLike();
      this.likeCountHandler("+");
      this.setState({
        isLiked: true,
      });
    } else if (this.state.isLiked === true) {
      this.deleteLike();
      this.likeCountHandler("-");
      this.setState({
        isLiked: false,
      });
    }
  };

  addCommentNum = () => {
    this.setState((prevState) => {
      return {
        commentsCount: prevState.commentsCount + 1,
      };
    });
  };

  minusCommentNum = () => {
    this.setState((prevState) => {
      return {
        commentsCount: prevState.commentsCount - 1,
      };
    });
  };

  render() {
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.dealCard}
        onPress={this.handleDealPress}
      >
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
          <TouchableOpacity
            style={styles.dealLikeButton}
            onPress={this.handleLikeDealPress}
          >
            {this.state.isLiked ? (
              <Ionicons name="ios-heart" size={14.5} color={colors.primary} />
            ) : (
              <Ionicons
                name="ios-heart-empty"
                size={14.5}
                color={colors.dark}
              />
            )}
          </TouchableOpacity>
          <Text style={styles.dealLikeCount}>{this.state.likesCount}</Text>
          <TouchableOpacity style={styles.dealCommentButton}>
            <Ionicons name="ios-chatboxes" size={16} color={"gray"} />
          </TouchableOpacity>
          <Text style={styles.dealCommentCount}>
            {this.state.commentsCount}
          </Text>
        </View>
      </TouchableOpacity>
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
    width: 14.5,
    height: 14.5,
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
    dealComments: state.dealComments,
    user: state.user,
    userLikes: state.userLikes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserLikes: (user) => dispatch(fetchUserLikes(user)),
    addLike: (deal, user, business) => dispatch(addLike(deal, user, business)),
    removeLike: (dealLike) => dispatch(removeLike(dealLike)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Deal);
