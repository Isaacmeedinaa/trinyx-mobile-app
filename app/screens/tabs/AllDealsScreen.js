import React, { Component } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { Dimensions } from "react-native";
import { connect } from "react-redux";
import { fetchAllDeals } from "../../config/actions/dealsActions";
import Deal from "../Deal";

import colors from "../../config/colors";

const screenWidth = Dimensions.get("window").width;

class AllDealsScreen extends Component {
  constructor() {
    super();

    this.state = {
      date: new Date(),
    };
  }

  componentDidMount() {
    this.props.fetchAllDeals();
  }

  renderAllDeals = () => {
    return this.props.deals.map((deal) => {
      return <Deal deal={deal} key={deal.id} />;
    });
  };

  render() {
    return (
      <View style={styles.allDealsContainer}>
        <ScrollView
          contentContainerStyle={styles.allDealsScrollView}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.tabTitle}>All Deals</Text>
          <Text style={styles.tabSubTitle}>
            Last Updated: {this.state.date.toLocaleDateString("en-US")}
          </Text>
          {this.renderAllDeals()}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  allDealsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  allDealsScrollView: {
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
    deals: state.deals,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDeals: () => dispatch(fetchAllDeals()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllDealsScreen);
