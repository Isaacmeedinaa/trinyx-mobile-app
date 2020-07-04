import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Dimensions } from "react-native";
import { connect } from "react-redux";
import { fetchAllDeals, searchDeals } from "../../config/actions/dealsActions";
import Deal from "../Deal";

import colors from "../../config/colors";

const screenWidth = Dimensions.get("window").width;

class AllDealsScreen extends Component {
  constructor() {
    super();

    this.state = {
      date: new Date(),
      searchQuery: "",
      refreshing: true,
    };
  }

  componentDidMount() {
    this.props.fetchAllDeals();
  }

  componentWillUnmount() {
    this.props.fetchAllDeals();
  }

  onRefresh = () => {
    this.props.fetchAllDeals();
    this.setState({
      refreshing: false,
    });
  };

  handleSearchPress = () => {
    this.props.searchDeals(this.state.searchQuery);
    this.setState({
      searchQuery: "",
    });
  };

  renderAllDeals = () => {
    return this.props.deals.map((deal) => {
      return (
        <Deal deal={deal} key={deal.id} navigation={this.props.navigation} />
      );
    });
  };

  render() {
    return (
      <View style={styles.allDealsContainer}>
        <ScrollView
          contentContainerStyle={styles.allDealsScrollView}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={this.onRefresh} />
          }
        >
          <View style={styles.searchContainer}>
            <TextInput
              placeholderTextColor="#5e5e5e"
              style={styles.searchBar}
              placeholder="Search..."
              onChangeText={(searchQuery) => this.setState({ searchQuery })}
              value={this.state.searchQuery}
            />
            <TouchableOpacity
              style={styles.searchBarBtn}
              onPress={this.handleSearchPress}
            >
              <Ionicons
                style={styles.searchBarBtnIcon}
                name="ios-search"
                size={20}
                color="white"
              />
            </TouchableOpacity>
          </View>
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
  searchContainer: {
    marginTop: 25,
    width: 320,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  searchBar: {
    alignSelf: "flex-start",
    width: 270,
    height: 42,
    paddingRight: 10,
    paddingLeft: 10,
    borderColor: colors.primary,
    borderWidth: 1.5,
    borderRadius: 5,
  },
  searchBarBtn: {
    width: 42,
    height: 42,
    alignSelf: "flex-end",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 5,
  },
  searchBarBtnIcon: {
    marginTop: 1,
  },
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
    searchDeals: (searchQuery) => dispatch(searchDeals(searchQuery)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllDealsScreen);
