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

class Deal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUserLikes: [],
      likesCount: props.deal.like_count,
      isLiked: props.deal.likes
        .map((like) => like.user.id === this.props.user.id)
        .includes(true),
      commentsCount: props.deal.comment_count,
    };
  }

  componentDidMount() {
    fetch(`http:${IP_ADDRESS}:4000/api/v1/likes`)
      .then((resp) => resp.json())
      .then((likes) => {
        let currentUserLikes = likes.filter(
          (like) => like.user.id === this.props.user.id
        );
        this.setState({
          currentUserLikes: currentUserLikes,
        });
      });
  }

  createLike = () => {
    const createLikeURL = `http:${IP_ADDRESS}:4000/api/v1/likes`;

    const likeData = {
      like: {
        user_id: this.props.user.id,
        business_id: this.props.deal.business.id,
        deal_id: this.props.deal.id,
      },
    };

    const reqObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json",
      },
      body: JSON.stringify(likeData),
    };

    fetch(createLikeURL, reqObj)
      .then((resp) => resp.json())
      .then((obj) => {
        if (obj.status === 200) {
          let newCurrentUserLikes = this.state.currentUserLikes.concat(
            obj.like
          );
          this.setState({
            isLiked: true,
            currentUserLikes: newCurrentUserLikes,
          });
        } else {
          console.log(obj.message);
          this.setState({
            isLiked: true,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  deleteLike = () => {
    let foundLike = this.state.currentUserLikes.find((like) => {
      return like.deal.id === this.props.deal.id;
    });

    const deleteLikeURL = `http:${IP_ADDRESS}:4000/api/v1/likes/${foundLike.id}`;

    const reqObj = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json",
      },
      body: JSON.stringify({ id: foundLike.id }),
    };

    fetch(deleteLikeURL, reqObj)
      .then((resp) => resp.json())
      .then((obj) => {
        if (obj.status === 200) {
          let newCurrentUserLikes = this.state.currentUserLikes.filter(
            (like) => like.id !== foundLike.id
          );
          this.setState({
            isLiked: false,
            currentUserLikes: newCurrentUserLikes,
          });
        } else {
          console.log(obj.message);
          this.setState({
            isLiked: false,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  handleLikeDealPress = () => {
    if (this.state.isLiked === false) {
      this.createLike();
      this.setState((prevState) => {
        return {
          likesCount: prevState.likesCount + 1,
        };
      });
    } else if (this.state.isLiked === true) {
      this.deleteLike();
      this.setState((prevState) => {
        return {
          likesCount: prevState.likesCount - 1,
        };
      });
    }
  };

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
    user: state.user,
  };
};

const mapDispatchToProps = (disptach) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Deal);
