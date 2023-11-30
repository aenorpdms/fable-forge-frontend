import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, ImageBackground, Switch, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import { updateFontSize } from "../reducers/user";

// Importation du composant personnalisé TabBar
import TabBar from "../TabBar";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function SettingsScreen({ navigation }) {
  // Accès au dispatch pour envoyer des actions.
  const dispatch = useDispatch();

  // Récuperer les informatons de Redux
  const user = useSelector(state => state.user.value);

  // État local pour gérer les switchs on/off
  const [isFontEnabled, setIsFontEnabled] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [isAmbianceEnabled, setIsAmbianceEnabled] = useState(false);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);
  const [isModeEnabled, setIsModeEnabled] = useState(false);

  const font = user.fontSizeSet;

  // Augmenter la taille de la police
  const increaseFontSize = () => {
    if (user.fontSizeSet < 30) {
      dispatch(updateFontSize(user.fontSizeSet + 2));
    }
  };

  // Diminuer la taille de la police
  const decreaseFontSize = () => {
    if (user.fontSizeSet > 10) {
      let newFontSize = user.fontSizeSet - 2;
      dispatch(updateFontSize(user.fontSizeSet - 2));
    }
  };

  // Fonctions pour basculer l'état des switches on/off
  const toggleFontSwitch = () => setIsFontEnabled(previousState => !previousState);
  const toggleAudioSwitch = value => {
    setIsAudioEnabled(value);
  };
  const toggleAmbianceSwitch = () => setIsAmbianceEnabled(previousState => !previousState);
  const toggleNotificationsSwitch = () => setIsNotificationsEnabled(previousState => !previousState);
  const toggleModeSwitch = () => setIsModeEnabled(previousState => !previousState);

  const handleCguv = () => {
    // Navigation vers la page "Cguv"
    navigation.navigate("Cguv");
  };

  const handleReturnToHome = () => {
    // Navigation vers la page "home"
    navigation.navigate("Home");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground style={styles.imagBgd} source={require("../assets/ImageBibliotheque.png")}>
        <Text style={styles.title2}>Paramètres</Text>
      </ImageBackground>

      <View style={styles.settingsApp}>
        <View style={styles.containerPolice}>
          <FontAwesome name='minus' size={20} style={styles.iconDec} color='white' onPress={decreaseFontSize} />
          <Text style={[styles.textPolice, { fontSize: user.fontSizeSet }]}>Taille de police : {font} px</Text>
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

        {/* <View style={styles.setting}>
          <Text style={styles.fontSettings}>Ambiance :</Text>
          <Switch
            style={styles.switchBtn}
            trackColor={{ false: "white", true: "#FFCE4A" }}
            thumbColor={isAmbianceEnabled ? "#FFCE4A" : "white"}
            ios_backgroundColor='#3e3e3e'
            onValueChange={toggleAmbianceSwitch}
            value={isAmbianceEnabled}
          />
        </View> */}

        {/* <View style={styles.setting}>
          <Text style={styles.fontSettings}>Notifications :</Text>
          <Switch
            style={styles.switchBtn}
            trackColor={{ false: "white", true: "#FFCE4A" }}
            thumbColor={isNotificationsEnabled ? "#FFCE4A" : "white"}
            ios_backgroundColor='#3e3e3e'
            onValueChange={toggleNotificationsSwitch}
            value={isNotificationsEnabled}
          />
        </View> */}

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

  // Style header
  imagBgd: {
    flex: 2,
    marginTop: "-12%",
    // width: "100%",
    // height: "68%",
    // width: windowWidth,
    // height: windowHeight * 0.38,
    width: windowWidth,
    height: windowHeight * 0.45,
    marginTop: -windowHeight * 0.17,
  },
  title2: {
    fontFamily: "Lato_400Regular",
    fontSize: 32,
    textAlign: "left",
    color: "#FFCE4A",
    lineHeight: 60,
    marginLeft: "3%",
    marginTop: "60%",
  },

  // Style bouton taille de police
  settingsApp: {
    flex: 2,
    width: "92%",
    marginTop: "-10%",
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
  iconDec: {
    padding: 5,
  },
  textPolice: {
    fontFamily: "Lato_400Regular",
    color: "white",
    fontSize: 16,
  },
  iconInc: {
    padding: 5,
  },

  // Style bouton audio, light mode, cguv
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
    marginTop: 130,
  },
  fontCGU: {
    fontFamily: "Lato_400Regular",
    color: "white",
    paddingLeft: "39%",
  },

  // Style flèche directionnelle
  arrowContainer: {
    position: "absolute",
    zIndex: 1,
    top: "100%",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    padding: 2,
    width: "100%",
  },
  arrowBtn: {
    bottom: 80,
    padding: 10,
  },
});
