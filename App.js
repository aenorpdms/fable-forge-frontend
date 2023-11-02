import React, { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import AsyncStorage from "@react-native-async-storage/async-storage";
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

// Importation des écrans
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

// Importation des reducers 
import user from "./reducers/user";
import stories from "./reducers/stories";
import newStory from "./reducers/newStory";
import subscriptionReducer from "./reducers/subscription"

// Initialisation du SplashScreen pour empêcher sa disparition automatique
SplashScreen.preventAutoHideAsync();

// Création des navigateurs pour l'application
const Stack = createNativeStackNavigator();

// Combinaison de tous les reducers pour le store Redux
const reducers = combineReducers({ subscription: subscriptionReducer, user, stories, newStory });

// Configuration de redux-persist pour stocker le state de Redux
const persistConfig = {
  key: "fable-forge",
  storage: AsyncStorage,
};

// AsyncStorage.getAllKeys()
//   .then(keys => AsyncStorage.multiRemove(keys))
//   .then(() => console.log("clear"));
// AsyncStorage.clear().then(() => console.log("clear"));

// Création du store Redux persistant
const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: getDefaultMiddleware => 
    getDefaultMiddleware({ serializableCheck: false }),
});
const persistor = persistStore(store);


export default function App() {
  // Masquer le SplashScreen après le chargement initial
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  // Chargement des polices personnalisées via useFonts
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

  // Affichage d'un écran vide si les polices ne sont pas chargées
  if (!fontsLoaded) {
    return null;
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
