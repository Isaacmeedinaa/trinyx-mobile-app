import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import { Dimensions } from "react-native";
import { connect } from "react-redux";

import colors from "../../config/colors";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

class BusinessProfileScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lat: props.business.lat,
      lng: props.business.lng,
    };
  }

  componentWillUnmount() {
    this.setState({
      lat: 0,
      lng: 0,
    });
  }

  render() {
    return (
      <View style={styles.profileContainer}>
        <Text style={styles.tabTitle}>Hello, {this.props.business.name}!</Text>
        <Text style={styles.tabSubTitle}>
          Member since: {this.props.business.member_since}
        </Text>
        <View style={styles.profileCard}>
          {this.props.business.image !== null ? (
            <Image
              source={{ uri: this.props.business.image }}
              resizeMode="center"
              style={styles.profilePfp}
            />
          ) : null}
          <Text style={styles.businessName}>{this.props.business.name}</Text>
          <Text style={styles.businessIndustry}>
            {this.props.business.business_industry}
          </Text>
          <Text style={styles.businessStats}>
            Likes: {this.props.business.like_count} • Deals Posted:{" "}
            {this.props.businessDeals.length}
          </Text>
          <Text style={styles.businessStats}>
            Phone Number: +{this.props.business.phone_number}
          </Text>
          <Text style={styles.businessStats}>
            Email: {this.props.business.email}
          </Text>
          <Text style={styles.businessStats}>
            Location: {this.props.business.location}
          </Text>
        </View>
        <View style={styles.profileMapContainer}>
          <MapView
            style={styles.profileMap}
            initialRegion={{
              latitude: parseFloat(this.state.lat),
              longitude: parseFloat(this.state.lng),
              latitudeDelta: 0.0013,
              longitudeDelta: 0.0013,
            }}
          >
            <Marker
              coordinate={{
                latitude: parseFloat(this.state.lat),
                longitude: parseFloat(this.state.lng),
              }}
            />
          </MapView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    alignItems: "center",
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
  profileCard: {
    paddingTop: 18,
    paddingBottom: 18,
    paddingRight: 15,
    paddingLeft: 15,
    marginTop: 25,
    width: 320,
    backgroundColor: "white",
    alignItems: "center",
  },
  profilePfp: {
    padding: 0,
    width: 80,
    height: 80,
    backgroundColor: colors.light,
  },
  businessName: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primary,
  },
  businessIndustry: {
    marginTop: 10,
    fontSize: 16,
  },
  businessStats: {
    marginTop: 10,
    color: colors.primary,
    textAlign: "center",
  },
  profileMapContainer: {
    paddingTop: 18,
    paddingBottom: 18,
    paddingRight: 15,
    paddingLeft: 15,
    marginTop: 25,
    width: 320,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  profileMap: {
    width: "100%",
    height: "100%",
  },
});

const mapStateToProps = (state) => {
  return {
    business: state.business,
    businessDeals: state.businessDeals,
  };
};

export default connect(mapStateToProps)(BusinessProfileScreen);
