import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./app/config/reducers";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "./app/screens/WelcomeScreen";
import UserLoginScreen from "./app/screens/UserLoginScreen";
import BusinessLoginScreen from "./app/screens/BusinessLoginScreen";
import UserRegisterScreen from "./app/screens/UserRegisterScreen";
import BusinessRegisterScreen from "./app/screens/BusinessRegisterScreen";
import UserHomeScreen from "./app/screens/UserHomeScreen";
import BusinessHomeScreen from "./app/screens/BusinessHomeScreen";
import BusinessToolbar from "./app/screens/toolbars/BusinessToolbar";
import BusinessComponentRight from "./app/screens/toolbars/BusinessComponentRight";
import NewDealScreen from "./app/screens/NewDealScreen";
import EditDealScreen from "./app/screens/EditDealScreen";
import * as SecureStore from "expo-secure-store";

const store = createStore(rootReducer, applyMiddleware(thunk));
const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            title: "",
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{ gestureEnabled: false }}
          />
          <Stack.Screen name="UserLogin" component={UserLoginScreen} />
          <Stack.Screen name="UserRegister" component={UserRegisterScreen} />
          <Stack.Screen name="BusinessLogin" component={BusinessLoginScreen} />
          <Stack.Screen
            name="BusinessRegister"
            component={BusinessRegisterScreen}
          />
          <Stack.Screen
            name="UserHome"
            component={UserHomeScreen}
            options={{ gestureEnabled: false }}
          />
          <Stack.Screen
            name="BusinessHome"
            component={BusinessHomeScreen}
            options={{ gestureEnabled: false }}
          />
          <Stack.Screen name="BusinessToolbar" component={BusinessToolbar} />
          <Stack.Screen
            name="BusinessComponentRight"
            component={BusinessComponentRight}
          />
          <Stack.Screen name="NewDeal" component={NewDealScreen} />
          <Stack.Screen name="EditDeal" component={EditDealScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
