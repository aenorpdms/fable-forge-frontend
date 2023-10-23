import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import LoadingPage from "./screens/loadingPage";
import SignScreen from "./screens/sign";

const Stack = createNativeStackNavigator();

// const AppStack = () => {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name='Loading' component={LoadingPage} options={{ headerShown: false }} />
//       {/* Add other screens here */}
//     </Stack.Navigator>
//   );
// };

export default function App() {
  return (
    // <Provider store={configureStore({})}>
    /* <AppStack /> */
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Sign' component={SignScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
    // {/* </Provider> */}
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
