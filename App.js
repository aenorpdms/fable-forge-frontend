import { StatusBar } from "expo-status-bar";

import React, { useState, useEffect } from "react";

import { StyleSheet, Text, View } from "react-native";
import AppLoading from "expo-app-loading";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {
  useFonts,
  Lato_100Thin,
  Lato_100Thin_Italic,
  Lato_300Light,
  Lato_300Light_Italic,
  Lato_400Regular,
  Lato_400Regular_Italic,
  Lato_700Bold,
  Lato_700Bold_Italic,
  Lato_900Black,
  Lato_900Black_Italic,
} from "@expo-google-fonts/lato";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import SignScreen from "./screens/SignScreen";
import HomeScreen from "./screens/HomeScreen";
import ProfilScreen from "./screens/ProfilScreen";
import SettingsScreen from "./screens/SettingsScreen";
import StoriesScreen from "./screens/StoriesScreen";
import CguvScreen from "./screens/CguvScreen";
import SplashScreen from "./screens/SplashScreen";
import SubscriptionScreen from "./screens/SubscriptionScreen";
import StoryGenerationScreen from "./screens/StoryGenerationScreen";
import StoryGenerationStep2Screen from "./screens/StoryGenerationStep2Screen";
import StoryDisplayScreen from "./screens/StoryDisplayScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// const AppStack = () => {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name='Loading' component={LoadingPage} options={{ headerShown: false }} />
//       {/* Add other screens here */}
//     </Stack.Navigator>
//   );
// };

import user from "./reducers/user";

const store = configureStore({
  reducer: { user },
});

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = "";

          if (route.name === "Home") {
            iconName = "location-arrow";
          } else if (route.name === "Stories") {
            iconName = "map-pin";
          } else if (route.name === "Profil") {
            iconName = "map-pin";
          } else if (route.name === "Settings") {
            iconName = "map-pin";
          }

          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#ec6e5b",
        tabBarInactiveTintColor: "#335561",
        headerShown: false,
      })}
    >
      <Tab.Screen name='Home' component={HomeScreen} />
      <Tab.Screen name='Stories' component={StoriesScreen} />
      <Tab.Screen name='Profil' component={ProfilScreen} />
      <Tab.Screen name='Settings' component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  let [fontsLoaded] = useFonts({
    Lato_100Thin,
    Lato_100Thin_Italic,
    Lato_300Light,
    Lato_300Light_Italic,
    Lato_400Regular,
    Lato_400Regular_Italic,
    Lato_700Bold,
    Lato_700Bold_Italic,
    Lato_900Black,
    Lato_900Black_Italic,
  });

  console.log(fontsLoaded); // Vérifiez ici si fontsLoaded est true ou false

  let fontSize = 24;
  let paddingVertical = 6;

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    // <Provider store={configureStore({})}>
    /* <AppStack /> */

    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name='Splash' component={SplashScreen} options={{ headerShown: false }} />
          <Stack.Screen name='Sign' component={SignScreen} options={{ headerShown: false }} />
          <Stack.Screen name='Cguv' component={CguvScreen} options={{ headerShown: false }} />
          <Stack.Screen name='TabNavigator' component={TabNavigator} />
          <Stack.Screen name='Subscription' component={SubscriptionScreen} options={{ headerShown: false }} />
          <Stack.Screen name='StoryGenerationScreen' component={StoryGenerationScreen} />
          <Stack.Screen name='StoryGeneration2' component={StoryGenerationStep2Screen} />
          <Stack.Screen name='StoryDisplay' component={StoryDisplayScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Lato",
  },
});
