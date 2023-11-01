import React from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome";
import { useState, useRef, useEffect } from "react";
import { API_URL, API_KEY } from "@env";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from '@react-navigation/native';
import { Audio } from 'expo-av';
import { addStories } from "../reducers/stories";
import { updateNew } from "../reducers/newStory";
import user from "../reducers/user";

import TabBar from "../TabBar";

export default function StoryGenerationStep3Screen({ route }) {
  const navigation = useNavigation();
  const [isAudioEnabled, setIsAudioEnabled] = useState(route.params?.isAudioEnabled ?? true);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  const [buttonColor, setButtonColor] = useState("#2C1A51");
  const newStory = useSelector((state) => state.newStory.value);

  const soundObject = useRef(new Audio.Sound());
  const isEnabled = useRef(false);

  let page;
  if (newStory.length === "Courte") {
    page = "1";
  } else if (newStory.length === "Moyenne") {
    page = "2";
  } else {
    page = "3";
  }
  const synopsis = `Préparez-vous à plonger dans une histoire de genre ${newStory.type}, qui se déroulera sur ${page} pages. Attendez-vous à être captivé dès les premiers mots jusqu'à la ${newStory.endingType} que nous avons élaborée pour vous.`;

  const genreMusic = {
    Horreur: require('../assets_music/Genre_Horreur.mp3'),
    Aventure: require('../assets_music/Genre_Aventure.mp3'),
    'Fantasy / SF': require('../assets_music/Genre_Fantasy-SF.mp3'),
    'Policier / Thriller': require('../assets_music/Genre_Policier-Thriller.mp3'),
    Romance: require('../assets_music/Genre_Romance.mp3'),
    Enfant: require('../assets_music/Genre_Enfant.mp3'),
  };


  useEffect(() => {
    const loadMusic = async () => {
      try {
        if (isAudioEnabled) {
          await soundObject.current.loadAsync(genreMusic[newStory.type]);
          await soundObject.current.setIsLoopingAsync(true);
          await soundObject.current.playAsync(); // Jouer la musique au chargement
        } else {
          await soundObject.current.pauseAsync();
        }
      } catch (error) {
        console.error('Erreur lors du chargement du son', error);
      }
    };

    loadMusic();

    return () => {
      soundObject.current.unloadAsync();
    };
  }, [newStory.type, isAudioEnabled]);

  const toggleMusic = async () => {
    try {
      if (isAudioEnabled) {
        await soundObject.current.pauseAsync();
      } else {
        await soundObject.current.playAsync();
      }
      setIsAudioEnabled(prevState => !prevState);
    } catch (error) {
      console.error('Erreur lors de la lecture du son', error);
    }
  };

  const handleStoryDisplay = () => {
    navigation.navigate("StoryDisplay", {
      genre: newStory.type,
      longueur: newStory.length,
      fin: newStory.endingType,
    });
  };

  const handleStoryGeneration2 = () => {
    // navigate to Story step 2 page
    navigation.navigate("StoryGeneration2");
  };



  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../assets/ImageBibliotheque.png")}
        style={styles.imagBgd}
      >
        <Text style={styles.title1}>Création d'une histoire</Text>
        <View style={styles.containerStep}>
          <Text style={styles.title2}>Récapitulatif</Text>
          <Text style={styles.title2bis}>Etape 3/3</Text>
        </View>
      </ImageBackground>
      <View style={styles.tabBar}>
        <TabBar navigation={navigation} />
      </View>

      <View style={styles.containerStory}>
        {/* <ScrollView contentContainerStyle={styles.containerInformation} indicatorStyle='white'> */}
        <Text style={styles.titleContainer}>Genre : {newStory.type}</Text>
        <ImageBackground
          style={styles.imagBgdRecap}
          source={newStory.selectedImage}
        ></ImageBackground>
        <Text style={styles.textRecap}>{synopsis}</Text>

        <View style={styles.recapSizeStory}>
          <Text style={styles.sizeTextRecap}>{newStory.length}</Text>
        </View>
        <View style={styles.recapSizeStory}>
          <Text style={styles.sizeTextRecap}>{newStory.endingType}</Text>
        </View>
        <View style={styles.arrowContainer}>
            <TouchableOpacity style={styles.arrowBtn}>
              <Icon
                name="chevron-left"
                size={30}
                color={"#2C1A51"}
                onPress={() => handleStoryGeneration2()}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.arrowBtn}>
              <Icon
                name="chevron-right"
                size={30}
                color={"#2C1A51"}
                onPress={() => handleStoryDisplay()}
              />
            </TouchableOpacity>
           
          </View>
        {/* </ScrollView> */}
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
    width: "100%",
    height: "77%",
    marginTop: "-12%",
  },
  title1: {
    fontFamily: "Lato_400Regular",
    fontSize: 32,
    color: "#FFCE4A",
    marginTop: "49%", //160
    marginLeft: "3%",
    position: "absolute",
  },
  containerStep: {
    flexDirection: "row",
    marginTop: "45%",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    marginLeft: "4%",
  },
  title2: {
    fontFamily: "Lato_400Regular",
    color: "#FFCE4A",
    fontSize: 16,
  },
  title2bis: {
    fontFamily: "Lato_400Regular",
    color: "#FFCE4A",
  },

  containerInformation: {
    height: "112%",
  },
  containerStory: {
    height: "65%",
    bottom: "7%",
    minHeight: "55%",
    width: "90%",
    borderRadius: 10,
    backgroundColor: "#6B5F85",
    padding: 10,
  },

  titleContainer: {
    fontFamily: "Lato_400Regular",
    color: "white",
    fontSize: 24,
    textAlign: "center",
    marginTop: "1%",
    marginBottom: "1%",
  },

  imagBgdRecap: {
    width: "100%",
    minHeight: "20%",
    overflow: "hidden",
    borderRadius: 15,
    borderColor: "white",
    borderWidth: 1,
    marginTop: "3%",
  },

  textRecap: {
    fontFamily: "Lato_400Regular",
    color: "white",
    textAlign: "justify",
    marginTop: 10,
    padding: 10,
    fontSize: 16,
  },
  recapSizeStory: {
    backgroundColor: "#FFCE4A",
    margin: 5,
    borderRadius: 10,
  },
  sizeTextRecap: {
    fontFamily: "Lato_400Regular",
    color: "#2C1A51",
    textAlign: "center",
    padding: 10,
  },
  btngenerateStory: {
    borderColor: "white",
    backgroundColor: "#2C1A51",
    margin: 10,
    borderWidth: 1,
    borderColor: "#FFCE4A",
    borderRadius: 10,
    padding: 5,
    marginTop: 10,
  },
  generateTextBtn: {
    fontFamily: "Lato_400Regular",
    color: "white",
    textAlign: "center",
    padding: 10,
  },
  tabBar: {
    marginTop: "200%",
    position: "absolute",
    zIndex: 1,
  },

  arrowContainer: {
    flexDirection:"row",
    justifyContent: "space-between",
    width: "100%",
    height: "20%",
    alignItems: "center",
    
  },
  arrowBtn: {
    marginLeft:"10%",
    marginRight:"10%"
  },
  musicButton: {
    marginTop: 5, 
    padding: 20, 
    borderWidth: 2,
    border: 'red',
  },
});
