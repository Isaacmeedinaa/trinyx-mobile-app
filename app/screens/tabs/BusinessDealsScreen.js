import React, { Component } from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import { Dimensions } from "react-native";
import { connect } from "react-redux";
import { fetchBusinessDeals } from "../../config/actions/businessDealsActions";
import BusinessDeal from "../BusinessDeal";

import colors from "../../config/colors";

const screenWidth = Dimensions.get("window").width;

class BusinessDealsScreen extends Component {
  componentDidMount() {
    this.props.fetchBusinessDeals(this.props.business.id);
  }

  renderBusinessDeals = () => {
    return this.props.businessDeals.map((deal) => {
      return (
        <BusinessDeal
          deal={deal}
          key={deal.id}
          navigation={this.props.navigation}
        />
      );
    });
  };

  render() {
    return (
      <View style={styles.businessDealsContainer}>
        <ScrollView
          contentContainerStyle={styles.businessDealsScrollView}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.tabTitle}>Your Deals</Text>
          <Text style={styles.tabSubTitle}>
            You have {this.props.businessDeals.length} deals
          </Text>
          {this.renderBusinessDeals()}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  businessDealsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  businessDealsScrollView: {
    width: screenWidth,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 25,
  },
  tabTitle: {
    marginTop: 25,
    marginStart: 29,
    color: colors.primary,
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "flex-start",
  },
  tabSubTitle: {
    marginTop: 6,
    marginStart: 29,
    fontSize: 12,
    alignSelf: "flex-start",
  },
});

const mapStateToProps = (state) => {
  return {
    business: state.business,
    businessDeals: state.businessDeals,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBusinessDeals: (businessId) =>
      dispatch(fetchBusinessDeals(businessId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BusinessDealsScreen);
