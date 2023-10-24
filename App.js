import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import SignScreen from "./screens/SignScreen";
import HomeScreen from "./screens/HomeScreen";
import ProfilScreen from "./screens/ProfilScreen";
import SettingsScreen from "./screens/SettingsScreen";
import StoriesScreen from "./screens/StoriesScreen";
import CguvScreen from "./screens/CguvScreen"
import SplashScreen from './screens/SplashScreen';

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

import user from './reducers/user';

const store = configureStore({
  reducer: { user },
});

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName = '';

        if (route.name === 'Home') {
          iconName = 'location-arrow';
        } else if (route.name === 'Stories') {
          iconName = 'map-pin';
        }else if (route.name === 'Profil') {
          iconName = 'map-pin';
         } else if (route.name === 'Settings') {
            iconName = 'map-pin';}

        return <FontAwesome name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#ec6e5b',
      tabBarInactiveTintColor: '#335561',
      headerShown: false,
    })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Stories" component={StoriesScreen} />
      <Tab.Screen name="Profil" component={ProfilScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    // <Provider store={configureStore({})}>
    /* <AppStack /> */
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name='Sign' component={SignScreen} options={{ headerShown: false }} />
        <Stack.Screen name='Cguv' component={CguvScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={TabNavigator} />
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
  },
});
