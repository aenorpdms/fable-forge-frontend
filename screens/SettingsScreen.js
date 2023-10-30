import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, ImageBackground, Switch } from "react-native";
import * as Font from "expo-font";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { ScrollView } from "react-native-gesture-handler";

import TabBar from "../TabBar";

export default function SettingsScreen({ navigation }) {
  // const [isEnabled, setIsEnabled] = useState(false);
  // const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [isFontEnabled, setIsFontEnabled] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [isAmbianceEnabled, setIsAmbianceEnabled] = useState(false);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);
  const [isModeEnabled, setIsModeEnabled] = useState(false);

  const [fontSize, setFontSize] = useState(16);

  const increaseFontSize = () => {
    if (fontSize < 30) {
      setFontSize(fontSize + 2);
    }
  };

  const decreaseFontSize = () => {
    if (fontSize > 10) {
      setFontSize(fontSize - 2);
    }
  };

  const handleNavigateToStoryDisplay = () => {
    navigation.navigate("StoryDisplay", { fontSize: fontSize });
  };

  const toggleFontSwitch = () => setIsFontEnabled(previousState => !previousState);
  const toggleAudioSwitch = () => setIsAudioEnabled(previousState => !previousState);
  const toggleAmbianceSwitch = () => setIsAmbianceEnabled(previousState => !previousState);
  const toggleNotificationsSwitch = () => setIsNotificationsEnabled(previousState => !previousState);
  const toggleModeSwitch = () => setIsModeEnabled(previousState => !previousState);

  const handleCguv = () => {
    // call back delete account
    // go back to sign in
    navigation.navigate("Cguv");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground style={styles.imagBgd} source={require("../assets/ImageBibliotheque.png")}>
        {/* <Text style={styles.title1}>Bienvenue Pierre</Text> */}
        <Text style={styles.title2}>Paramètres</Text>
      </ImageBackground>

      <View style={styles.settingsApp}>
        <View style={styles.containerPolice}>
          <FontAwesome name='minus' size={20} style={styles.iconDec} color='white' onPress={decreaseFontSize} />
          <Text style={[styles.textPolice, {fontSize : fontSize}]}>Taille de police : {fontSize} px</Text>
          <FontAwesome name='plus' size={20} style={styles.iconInc} color='white' onPress={increaseFontSize} />
        </View>

        <View style={styles.setting}>
          <Text style={styles.fontSettings}>Audio :</Text>
          <Switch
            style={styles.switchBtn}
            trackColor={{ false: "white", true: "#FFCE4A" }}
            thumbColor={isAudioEnabled ? "#FFCE4A" : "white"}
            ios_backgroundColor='#3e3e3e'
            onValueChange={toggleAudioSwitch}
            value={isAudioEnabled}
          />
        </View>

        <View style={styles.setting}>
          <Text style={styles.fontSettings}>Ambiance :</Text>
          <Switch
            style={styles.switchBtn}
            trackColor={{ false: "white", true: "#FFCE4A" }}
            thumbColor={isAmbianceEnabled ? "#FFCE4A" : "white"}
            ios_backgroundColor='#3e3e3e'
            onValueChange={toggleAmbianceSwitch}
            value={isAmbianceEnabled}
          />
        </View>

        <View style={styles.setting}>
          <Text style={styles.fontSettings}>Notifications :</Text>
          <Switch
            style={styles.switchBtn}
            trackColor={{ false: "white", true: "#FFCE4A" }}
            thumbColor={isNotificationsEnabled ? "#FFCE4A" : "white"}
            ios_backgroundColor='#3e3e3e'
            onValueChange={toggleNotificationsSwitch}
            value={isNotificationsEnabled}
          />
        </View>

        <View style={styles.setting}>
          <Text style={styles.fontSettings}>Mode :</Text>
          <Switch
            style={styles.switchBtn}
            trackColor={{ false: "white", true: "#FFCE4A" }}
            thumbColor={isModeEnabled ? "#FFCE4A" : "white"}
            ios_backgroundColor='#3e3e3e'
            onValueChange={toggleModeSwitch}
            value={isModeEnabled}
          />
        </View>
        <TouchableOpacity onPress={() => handleCguv("Cguv")} style={styles.cgvBtn}>
          <Text style={styles.fontCGU}>CGU / CGV</Text>
        </TouchableOpacity>
      </View>

      <TabBar navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2C1A51",
  },
  imagBgd: {
    flex: 2,
    marginTop: "-12%",
    width: "100%",
    height: "64%",
  },

  title2: {
    fontFamily: "Lato_400Regular",
    fontSize: 32,
    textAlign: "left",
    color: "#FFCE4A",
    lineHeight: 60,
    marginLeft: "4%",
    marginTop: "47%",
  },
  settingsApp: {
    flex: 2,
    width: "92%",
    marginTop: "-40%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  containerPolice: {
    flexDirection: "row",
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    width: "92%",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FFCE4A",
    borderRadius: 10,
    height: 55,
    marginBottom: 15,
    marginTop: 20,
  },
  textPolice: {
    fontFamily: "Lato_400Regular",
    color: "white",
    fontSize: 16,
  },
  setting: {
    width: "92%",
    flexDirection: "row",
    padding: 10,
    width: "92%",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FFCE4A",
    borderRadius: 10,
    marginBottom: 15,
  },

  fontSettings: {
    fontFamily: "Lato_400Regular",
    textAlign: "center",
    color: "white",
    marginLeft: 10,
    fontSize: 16,
  },

  switchBtn: {
    marginRight: 10,
    transform: [{ scaleX: 1.1 }, { scaleY: 1 }],
  },
  cgvBtn: {
    flexDirection: "row",
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    width: "92%",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FFCE4A",
    borderRadius: 10,
    height: 55,
    marginBottom: 15,
    marginTop: 35,
  },
  fontCGU: {
    fontFamily: "Lato_400Regular",
    color: "white",
    paddingLeft: "39%",
  },
  iconDec: {
    padding: 5,
  },
  iconInc: {
    padding: 5,
  },
});
