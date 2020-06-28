import React, { Component } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { Dimensions } from "react-native";
import { connect } from "react-redux";
import { fetchHottestDeals } from "../../config/actions/hotDealsActions";
import HotDeal from "../HotDeal";

import colors from "../../config/colors";

const screenWidth = Dimensions.get("window").width;

class HottestDealsScreen extends Component {
  componentDidMount() {
    this.props.fetchHottestDeals();
  }

  componentWillUnmount() {
    this.props.fetchHottestDeals();
  }

  renderHottestDeals = () => {
    return this.props.hotDeals.map((deal) => {
      return <HotDeal deal={deal} key={deal.id} />;
    });
  };

  render() {
    console.log(this.props.hotDeals.length);
    return (
      <View style={styles.hottestDealsContainer}>
        <ScrollView
          contentContainerStyle={styles.hottestDealsScrollView}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.tabTitle}>Hottest Deals</Text>
          <Text style={styles.tabSubTitle}>Total: 10</Text>
          {this.renderHottestDeals()}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  hottestDealsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  hottestDealsScrollView: {
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
    hotDeals: state.hotDeals,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchHottestDeals: () => dispatch(fetchHottestDeals()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HottestDealsScreen);
