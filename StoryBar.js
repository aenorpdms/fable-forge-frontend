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

export default function StoryBar({ navigation }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Add this line

  const [isFontEnabled, setIsFontEnabled] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);

  const dispatch = useDispatch();
  const toggleFontSwitch = () =>
  setIsFontEnabled((previousState) => !previousState);


 // Define the sound object
 const soundObject = useRef(new Audio.Sound());

const toggleAudioSwitch = async () => {
  setIsAudioEnabled((previousState) => !previousState);
  if (isAudioEnabled) {
    try {
      await soundObject.current.pauseAsync();
    } catch (error) {
      console.error("Error pausing audio", error);
    }
  } else {
    try {
      await soundObject.current.playAsync();
    } catch (error) {
      console.error("Error playing audio", error);
    }
  }
};


  // FONT
  const user = useSelector((state) => state.user.value);
  const font = user.fontSizeSet;
  const widthValue = useSharedValue(isOpen ? 140 : 0);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      width: withTiming(widthValue.value, {
        duration: 400,
        easing: Easing.linear,
      }),
    };
  });
  const bgValue = useSharedValue(isOpen ? 1 : 0); // 0 pour fermé, 1 pour ouvert
  const animatedBackgroundStyle = useAnimatedStyle(() => {
    const bgColor =
      bgValue.value === 1 ? "rgba(255, 255, 255, 0.5)" : "transparent";
    return {
      backgroundColor: bgColor,
    };
  });

  useEffect(() => {
    // Automatically open the tab bar when the component is rendered
    if (!isOpen) {
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
      return !prevState;
    });
  };

  const increaseFontSize = () => {
    if (user.fontSizeSet < 30) {
      dispatch(updateFontSize(user.fontSizeSet + 2));
    }
  };
  const decreaseFontSize = () => {
    if (user.fontSizeSet > 10) {
      dispatch(updateFontSize(user.fontSizeSet - 2));
    }
  };

  // AUDIO
  const newStory = useSelector((state) => state.newStory.value);
  const storySelected = useSelector((state) => state.stories.value);

  const genreMusic = {
    Horreur: require("./assets_music/Genre_Horreur.mp3"),
    Aventure: require("./assets_music/Genre_Aventure.mp3"),
    "Fantasy / SF": require("./assets_music/Genre_Fantasy-SF.mp3"),
    "Policier / Thriller": require("./assets_music/Genre_Policier-Thriller.mp3"),
    Romance: require("./assets_music/Genre_Romance.mp3"),
    Enfant: require("./assets_music/Genre_Enfant.mp3"),
  };

  let genreStoryMusic;

  if (newStory.type !== "") {
    genreStoryMusic = newStory.type;
  } else {
    genreStoryMusic = storySelected.type;
  }

  useEffect(() => {
    const loadMusic = async () => {
      try {
        if (isAudioEnabled) {
          await soundObject.current.loadAsync(genreMusic[genreStoryMusic]);
          await soundObject.current.setIsLoopingAsync(true);
          await soundObject.current.playAsync(); // Jouer la musique au chargement
        } else {
          await soundObject.current.pauseAsync();
        }
      } catch (error) {
        console.error("Erreur lors du chargement du son", error);
      }
    };

    loadMusic();

    return () => {
      soundObject.current.unloadAsync();
    };
  }, [isAudioEnabled]);

  // DARK LIGTH MODE
  const isModeEnabledMode = user.mode === "dark";
  const toggleModeSwitchMode = () => {
    const newMode = isModeEnabledMode ? "light" : "dark";
    dispatch(updateMode(newMode)); // Dispatch the mode to your reducer
  };

  // NAVIGATE
  const handleDisplayHome = () => {
    navigation.navigate("Home");
  };

  const handleDisplayStory = () => {
    navigation.navigate("Stories");
  };

  const handleDisplayProfil = () => {
    navigation.navigate("Profil");
  };

  // OPEN MODE SETTING
  const handleDisplaySettings = () => {
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

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
      {/* Modal */}
      <Modal
        visible={isModalOpen}
        animationType="slide"
        onRequestClose={closeModal}
        transparent={true}
      >
        <View style={styles.mdlctn}>
          <View style={styles.modalContainer}>
            {/* <TouchableOpacity > */}
            <FontAwesome
              name="close"
              size={20}
              style={styles.mdlClosed}
              color="white"
              onPress={closeModal}
            />
            {/* </TouchableOpacity> */}
            <Text style={styles.modalTitle}>Settings</Text>
            <View style={styles.settingsApp}>
              <View style={styles.setting}>
                {/* <View style={styles.setting}> */}
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
                {/* </View> */}
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
            {/* Add your modal content here */}
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
    width: 40, // Exemple
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
    height: "55%",
    // justifyContent: "center",
    // backgroundColor: "rgba(0,0,0, 0.5)",
    // width: 350, // Adjust the width as per your requirement
    // height: 180, // Adjust the height as per your requirement
    marginTop: "40%",
    marginLeft: 40,
    paddingLeft: "5%",
    backgroundColor: "#6B5F85",
    borderRadius: 20, // Adjust the borderRadius as per your requirement
    // alignItems: "center",
    justifyContent: "center",
    // backdropFilter: "blur(5px)",
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
    // flexDirection: "row",
    // padding: 10,
    // paddingLeft: 20,
    // paddingRight: 20,
    // width: "92%",
    // justifyContent: "space-between",
    // alignItems: "center",
    // borderWidth: 1,
    // borderColor: "#FFCE4A",
    // borderRadius: 10,
    // height: 55,
    // marginBottom: 15,
    // marginTop: 20,
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
