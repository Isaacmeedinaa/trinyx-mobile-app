import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "./app/screens/WelcomeScreen";
import BusinessLoginScreen from "./app/screens/BusinessLoginScreen";
import UserLoginScreen from "./app/screens/UserLoginScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{ title: "" }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="UserLogin" component={UserLoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
