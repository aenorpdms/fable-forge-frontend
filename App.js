import { StatusBar } from "expo-status-bar";

import React, { useState, useEffect } from "react";

import { StyleSheet, Text, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
SplashScreen.preventAutoHideAsync();

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
import { combineReducers, configureStore } from "@reduxjs/toolkit";
// redux-persist imports
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import SignScreen from "./screens/SignScreen";
import HomeScreen from "./screens/HomeScreen";
import ProfilScreen from "./screens/ProfilScreen";
import SettingsScreen from "./screens/SettingsScreen";
import StoriesScreen from "./screens/StoriesScreen";
import CguvScreen from "./screens/CguvScreen";
import LoadingScreen from "./screens/LoadingScreen";
import SubscriptionScreen from "./screens/SubscriptionScreen";
import StoryGenerationScreen from "./screens/StoryGenerationScreen";
import StoryGenerationStep2Screen from "./screens/StoryGenerationStep2Screen";
import StoryGenerationStep3Screen from "./screens/StoryGenerationStep3Screen";
import StoryDisplayScreen from "./screens/StoryDisplayScreen";
import SubscriptionPaymentScreen from "./screens/SubscriptionPaymentScreen";
import StoryReadScreen from "./screens/StoryReadScreen";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

import user from "./reducers/user";
import stories from "./reducers/stories";
import newStory from "./reducers/newStory";

// AsyncStorage.getAllKeys()
//   .then(keys => AsyncStorage.multiRemove(keys))
//   .then(() => console.log("clear"));
// AsyncStorage.clear().then(() => console.log("clear"));

const reducers = combineReducers({ user, stories, newStory });
const persistConfig = {
  key: "fable-forge",
  storage: AsyncStorage,
};

const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

export default function App() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

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
    return null;
    //hello to delete
  }

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Splash' component={LoadingScreen} options={{ headerShown: false }} />
            <Stack.Screen name='Sign' component={SignScreen} options={{ headerShown: false }} />
            <Stack.Screen name='Cguv' component={CguvScreen} options={{ headerShown: false }} />
            <Stack.Screen name='Home' component={HomeScreen} />
            <Stack.Screen name='Profil' component={ProfilScreen} />
            <Stack.Screen name='Settings' component={SettingsScreen} />
            <Stack.Screen name='Stories' component={StoriesScreen} />
            <Stack.Screen name='Subscription' component={SubscriptionScreen} options={{ headerShown: false }} />
            <Stack.Screen name='StoryGenerationScreen' component={StoryGenerationScreen} />
            <Stack.Screen name='StoryGeneration2' component={StoryGenerationStep2Screen} />
            <Stack.Screen name='StoryGeneration3' component={StoryGenerationStep3Screen} />
            <Stack.Screen name='StoryDisplay' component={StoryDisplayScreen} options={{ headerShown: false }} />
            <Stack.Screen name='SubscriptionPayment' component={SubscriptionPaymentScreen} options={{ headerShown: false }} />
            <Stack.Screen name='StoryRead' component={StoryReadScreen} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Lato_400Regular",
  },
});
