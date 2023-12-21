import React, { useState, useEffect, useRef } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  Text,
  Switch,
} from "react-native";
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import { updateFontSize, updateMode } from "./reducers/user";
import { Audio } from "expo-av";

export default function StoryBar({ navigation, selectedMusic }) {
  // console.log('Value of userMode:', userMode);
  const dispatch = useDispatch();
  // État pour gérer l'ouverture (ouvert/fermé)
  const [isOpen, setIsOpen] = useState(false);

  // État pour la modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // État pour la musique (activé/désactivé)
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);

  // Accès à l'état global Redux pour la configuration de l'utilisateur
  const user = useSelector((state) => state.user.value);
  const userMode = useSelector((state) => state.user.mode);
  // Console log pour vérifier la valeur de userMode extraite du Redux Store
  // console.log('Value of userMode extracted from Redux Store:', userMode);

  // AUDIO
  // Référence pour la gestion de l'audio
  const soundObject = useRef(new Audio.Sound());

  useEffect(() => {
    const loadAndPlayMusic = async () => {
      try {
        const genreMusic = {
            "29": require("./assets_music/Genre_Horreur.mp3"),
            Horreur: require("./assets_music/Genre_Horreur.mp3"),
            "30": require("./assets_music/Genre_Aventure.mp3"),
            Aventure: require("./assets_music/Genre_Aventure.mp3"),
            "31": require("./assets_music/Genre_Fantasy-SF.mp3"),
            "Fantasy / SF": require("./assets_music/Genre_Fantasy-SF.mp3"),
            "32": require("./assets_music/Genre_Policier-Thriller.mp3"),
            "Policier / Thriller": require("./assets_music/Genre_Policier-Thriller.mp3"),
            "33": require("./assets_music/Genre_Romance.mp3"),
            Romance: require("./assets_music/Genre_Romance.mp3"),
            "34": require("./assets_music/Genre_Enfant.mp3"),
            Enfant: require("./assets_music/Genre_Enfant.mp3"),
          };
          const musicSource = genreMusic[selectedMusic];
          if (musicSource) {
            await soundObject.current.unloadAsync();
            await soundObject.current.loadAsync(musicSource);
            if (isAudioEnabled) await soundObject.current.playAsync();
            await soundObject.current.setIsLoopingAsync(true);
          }
        } catch (error) {
          console.error('Erreur lors du chargement et de la lecture de la musique', error);
        }
      };
      loadAndPlayMusic();
      return () => soundObject.current.unloadAsync();
    }, [selectedMusic, isAudioEnabled]);

// Basculer l'audio
const toggleAudioSwitch = async () => {
  setIsAudioEnabled((previousState) => !previousState);
  try {
    if (isAudioEnabled && soundObject.current._loaded) {
      await soundObject.current.pauseAsync();
    } else if (soundObject.current._loaded) {
      await soundObject.current.playAsync();
    }
  } catch (error) {
    console.error('Error toggling audio:', error);
  }
};

const font = user.fontSizeSet;

   // Augmenter la taille de police
   const increaseFontSize = () => {
    //console.log('Increase Font Size called');
     if (user.fontSizeSet < 30) {
       dispatch(updateFontSize(user.fontSizeSet + 2));
     }
   };
 
   // Diminuer la taille de police
   const decreaseFontSize = () => {
    //console.log('Decrease Font Size called');
     if (user.fontSizeSet > 10) {
       dispatch(updateFontSize(user.fontSizeSet - 2));
     }
   };

    // DARK LIGTH MODE
    const isModeEnabledMode = user.mode === "dark";

    const toggleModeSwitchMode = () => {
     // console.log('Toggle Mode Switch called');
      const newMode = user.mode === "dark" ? "light" : "dark";
      //console.log('New Mode:', newMode);
      dispatch(updateMode(newMode));
    };

  //TAB-BAR
  // Animation pour la largeur de la tabBar
  const widthValue = useSharedValue(isOpen ? 140 : 0);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      width: withTiming(widthValue.value, {
        duration: 400,
        easing: Easing.linear,
      }),
    };
  });

  // Animation pour le fond de la tabBar (ouvert/fermé)
  const bgValue = useSharedValue(isOpen ? 1 : 0); // 0 pour fermé, 1 pour ouvert
  const animatedBackgroundStyle = useAnimatedStyle(() => {
  const bgColor =
    bgValue.value === 1 ? "rgba(255, 255, 255, 0.5)" : "transparent";
  return {
    backgroundColor: bgColor,
    };
  });

  useEffect(() => {
    // Ouvrir automatiquement la barre d'onglets lorsque le composant est rendu
    if (isOpen) {
      toggleTabBar();
    }
  }, []);

  const toggleTabBar = () => {
    setIsOpen((prevState) => {
      if (prevState) {
        widthValue.value = 0; // Réduire la largeur à 0
        bgValue.value = 0;
      } else {
        widthValue.value = 140; // Augmenter la largeur à la valeur souhaitée
        bgValue.value = 1;
      }
     // console.log("Toggle Tab Bar, Is Open: ", !prevState); // Ajoutez cette ligne
      return !prevState;
    });
  };
 
   // NAVIGATION
   const handleDisplayHome = () => {
    //console.log('navigate home ok')
     navigation.navigate("Home");
   };
 
   const handleDisplayStory = () => {
    //console.log('navigate stories ok')
     navigation.navigate("Stories");
   };
 
   const handleDisplayProfil = () => {
    //console.log('navigate profil ok')
     navigation.navigate("Profil");
   };
 
   // MODAL
   const handleDisplaySettings = () => {
     setIsModalOpen(true); // Ouvrir la modal
   };
 
   const closeModal = () => {
     setIsModalOpen(false); // Fermer la modal
   };

// Console log pour vérifier si le composant se met à jour avec la nouvelle valeur de userMode
//console.log('Component re-rendered with userMode:', userMode);

   useEffect(() => {
    //console.log('userMode:', userMode);
  }, [userMode]);

  return (
    <View style={styles.pageContainer}>
      <View style={styles.tabBar}>
        <Animated.View style={[styles.background, animatedBackgroundStyle]} />
        <Animated.View style={[styles.tabBarItem, animatedStyles]}>
          <TouchableOpacity
            style={styles.icone1}
            onPress={() => handleDisplayHome()}
          >
            <Image source={require("./assets/home.png")} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.icone2}
            onPress={() => handleDisplayStory()}
          >
            <Image source={require("./assets/book.png")} />
          </TouchableOpacity>
        </Animated.View>
        <TouchableOpacity style={styles.toggleButton} onPress={toggleTabBar}>
          <FontAwesomeIcon icon={faCircle} size={24} color="white" />
        </TouchableOpacity>
        <Animated.View style={[styles.tabBarItem, animatedStyles]}>
          <TouchableOpacity onPress={() => handleDisplayProfil()}>
            <Image source={require("./assets/user.png")} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDisplaySettings()}>
            <Image source={require("./assets/roue.png")} />
          </TouchableOpacity>
        </Animated.View>
      </View>
      <Modal
        visible={isModalOpen}
        animationType="slide"
        onRequestClose={closeModal}
        transparent={true}
      >
        <View style={styles.mdlctn}>
          <View style={styles.modalContainer}>
            <FontAwesome
              name="close"
              size={20}
              style={styles.mdlClosed}
              color="white"
              onPress={closeModal}
            />
            <Text style={styles.modalTitle}>Settings</Text>
            <View style={styles.settingsApp}>
              <View style={styles.setting}>
                <FontAwesome
                  name="minus"
                  size={20}
                  style={styles.iconDec}
                  color="white"
                  onPress={decreaseFontSize}
                />
                <Text
                  style={[styles.textPolice, { fontSize: user.fontSizeSet }]}
                >
                  Police : {font} px
                </Text>
                <FontAwesome
                  name="plus"
                  size={20}
                  style={styles.iconInc}
                  color="white"
                  onPress={increaseFontSize}
                />
              </View>

              <View style={styles.setting}>
                <Text style={styles.fontSettings}>Audio :</Text>
                <Switch
                  style={styles.switchBtn}
                  trackColor={{ false: "white", true: "#FFCE4A" }}
                  thumbColor={isAudioEnabled ? "#FFCE4A" : "white"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleAudioSwitch}
                  value={isAudioEnabled}
                />
              </View>

              <View style={styles.setting}>
                <Text style={styles.fontSettings}>
                  Mode : {isModeEnabledMode ? "Dark" : "Light"}
                </Text>
                <Switch
                  style={styles.switchBtn}
                  trackColor={{ false: "white", true: "#FFCE4A" }}
                  thumbColor={isModeEnabledMode ? "#FFCE4A" : "white"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleModeSwitchMode}
                  value={isModeEnabledMode}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: "#2C1A51",
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    backgroundColor: "transparent",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabBarItem: {
    flexDirection: "row",
    height: 40,
    justifyContent: "space-around",
    margin: 15,
    alignItems: "center",
    backgroundColor: "transparent",
    overflow: "hidden",
    width: 40, // Cacher initialement les icônes
  },
  toggleButton: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    width: 40,
    height: 40,
    backgroundColor: "white",
    borderRadius: 30,
    marginHorizontal: 5,
    elevation: 5, // pour l'ombre android
    shadowColor: "#4527A0", // pour l'ombre iOS
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    opacity: 0.4,
  },
  background: {
    position: "absolute",
    top: 0,
    left: 10,
    right: 10,
    bottom: 0,
    borderRadius: 25,
  },
  mdlctn: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0, 0.5)",
  },
  modalContainer: {
    width: "80%",
    height: 350,
    marginTop: "40%",
    marginLeft: 40,
    paddingLeft: "5%",
    backgroundColor: "#6B5F85",
    borderRadius: 20,
    justifyContent: "center",
  },
  modalTitle: {
    color: "white",
    textAlign: "center",
    padding: "5%",
    right: "5%",
    fontSize: 20,
  },
  closeBtn: {
    color: "white",
    fontSize: 20,
    textAlign: "right",
    right: "10%",
  },
  mdlClosed: {
    textAlign: "right",
    right: "10%",
  },
  containerPolice: {
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
  textPolice: {
    fontFamily: "Lato_400Regular",
    textAlign: "center",
    color: "white",
    marginLeft: 10,
    fontSize: 16,
  },
  iconDec: {
    padding: 5,
  },
  iconInc: {
    padding: 5,
  },
  setting: {
    width: "92%",
    flexDirection: "row",
    padding: 10,
    width: "92%",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "white",
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
});