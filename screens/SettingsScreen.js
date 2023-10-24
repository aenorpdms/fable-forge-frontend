import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, ImageBackground, Switch } from "react-native";
import * as Font from "expo-font";
import { SafeAreaView } from "react-native-safe-area-context";

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
    setFontSize(fontSize + 1);
  };

  const decreaseFontSize = () => {
    setFontSize(fontSize - 1);
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
        <Text style={styles.title1}>Bienvenue Pierre</Text>
        <Text style={styles.title2}>Paramètres</Text>
      </ImageBackground>
      <View style={styles.settingsApp}>
        <View style={styles.police}>
          <TouchableOpacity style={styles.buttonInc} onPress={increaseFontSize}>
            <Text style={styles.buttonTextInc}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonDec} onPress={decreaseFontSize}>
            <Text style={styles.buttonTextDec}>-</Text>
          </TouchableOpacity>
          <Text style={styles.fontSettingsPolice}>Taille de police : 16px</Text>
        </View>
        <View style={styles.audio}>
          <Text style={styles.fontSettings}>Audio :</Text>
          <Switch
            style={styles.switchBtn}
            trackColor={{ false: "white", true: "#FFCE4A" }}
            thumbColor={isAudioEnabled ? "#FFCE4A" : "white"}
            ios_backgroundColor='#FFCE4A'
            onValueChange={toggleAudioSwitch}
            value={isAudioEnabled}
          />
        </View>
        <View style={styles.ambiance}>
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
        <View style={styles.notifications}>
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
        <View style={styles.notifications}>
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
      </View>
      <View style={styles.cgvBtn}>
        <TouchableOpacity onPress={() => handleCguv("Cguv")}>
          <Text style={styles.fontCGU}>CGU / CGV</Text>
        </TouchableOpacity>
      </View>
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
    height: "65%",
  },
  title1: {
    fontFamily: "Lato",
    fontSize: 20,
    // margin: 170,
    fontWeight: "200",
    textAlign: "left",
    color: "#FFFFFF",
    marginTop: 183,
    marginLeft: 16,
  },
  title2: {
    // fontFamily: "Lato",
    fontSize: 34,
    fontWeight: "500",
    textAlign: "left",
    color: "#FFCE4A",
    lineHeight: 60,
    marginLeft: 16,
  },
  settingsApp: {
    flex: 2,
    width: "92%",
  },
  fontSettingsPolice: {
    textAlign: "center",
    color: "white",
    margin: -10,
    borderWidth: 1,
    borderColor: "#FFCE4A",
    borderRadius: 10,
    padding: 10,
    bottom: 150,
  },

  fontSettings: {
    color: "white",
    margin: -10,
    borderWidth: 1,
    borderColor: "#FFCE4A",
    borderRadius: 10,
    padding: 10,
    bottom: 150,
  },

  ambiance: {},
  police: {
    marginBottom: 50,
  },

  buttonInc: {
    flexDirection: "row",
    justifyContent: "flex-end",
    bottom: 100,
    paddingRight: 10,
  },
  buttonDec: {
    flexDirection: "row",
    justifyContent: "flex-start",
    bottom: 128,
    paddingLeft: 10,
  },
  buttonTextInc: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonTextDec: {
    justifyContent: "flex-end",
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },

  switchBtn: {
    bottom: 185,
    marginRight: 30,
  },

  cgvBtn: {
    flex: 0.2,
    justifyContent: "center",
    margin: 1,
    width: "96%",
    borderWidth: 1,
    borderColor: "#FFCE4A",
    bottom: 60,
    borderRadius: 10,
  },
  fontCGU: {
    textAlign: "center",
    color: "white",
  },
});
