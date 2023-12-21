import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, ImageBackground, SafeAreaView, Image, Dimensions } from "react-native";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";

import TabBar from "../TabBar";

// responsive page
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function HomeScreen({ navigation }) {
  // État Redux pour récupérer les informations de l'utilisateur.
  const user = useSelector(state => state.user.value);
  const nameUser = user.firstname;
  const readyName = nameUser.toUpperCase();

  // État local pour l'affichage de la dernière histoire
  const [lastStory, setLastStory] = useState([]);
  const [noStory, setNoStory] = useState(false);

  // const navigation = useNavigation();

  // Navigation vers l'étape 1
  const handleSubmit = () => {
    navigation.navigate("StoryGenerationScreen");
  };

  // Récupérer la dernière histoire de l'utilisateur depuis le backend
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('Screen is focused');
      fetchLastStory();
    });

    return unsubscribe;
  }, [navigation]);

  const fetchLastStory = () => {
    fetch(`https://fable-forge.onrender.com/users/lastStory/${user.token}`)
      .then(response => response.json())
      .then(data => {
        if (data.result) {
          if (data.stories == null) {
            setNoStory(false);
          } else {
            setNoStory(true);
            setLastStory({...data.stories});
          }
        }
      });
  };

  // Sélection de l'image en fonction du type de l'histoire.
  let typeImage;
  if (lastStory.type === "Horreur") {
    typeImage = require("../assets/Horreur.png");
  } else if (lastStory.type === "Aventure") {
    typeImage = require("../assets/Aventure.png");
  } else if (lastStory.type === "Fantasy / SF") {
    typeImage = require("../assets/Fantasy_SF.png");
  } else if (lastStory.type === "Policier / Thriller") {
    typeImage = require("../assets/Policier_Thriller.png");
  } else if (lastStory.type === "Romance") {
    typeImage = require("../assets/Romance.png");
  } else if (lastStory.type === "Enfant") {
    typeImage = require("../assets/Enfant.png");
  } else {
    typeImage = require("../assets/ImageBibliotheque.png");
  }

  // Afficher la dernière histoire lors du clique sur le bouton
  const handleDisplayStory = () => {
    if (noStory) {
      const selectedMusic = lastStory.type; // Définissez selectedMusic en fonction du genre de la dernière histoire
      navigation.navigate("StoryRead", {
        title: lastStory.title,
        story: lastStory.choicePrompt,
        type: lastStory.type,
        selectedMusic: selectedMusic, // Transmettez selectedMusic ici
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground style={styles.imagBgd} source={require("../assets/ImageBibliotheque.png")}>
        <Text style={styles.title1}>BIENVENUE {readyName}</Text>
        <Text style={styles.title2}>Où les histoires</Text>
        <Text style={styles.title2bis}>prennent vie...</Text>
      </ImageBackground>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.newStoryButton} onPress={() => handleSubmit()}>
          <Image style={styles.addButton} source={require("../assets/add-circle-outline.png")} />
          <Text style={styles.buttonText}>Créer une</Text>
          <Text style={styles.buttonText}>nouvelle histoire</Text>
        </TouchableOpacity>

        <Text style={styles.title3}>Votre dernière histoire</Text>

        <View style={styles.lastStoryButton}>
          <ImageBackground style={styles.storyImage} source={typeImage} /*{{ uri: 'URL_DE_L'HISTOIRE' }}*/>
            <Text style={styles.storyTitle}>{lastStory.title}</Text>
          </ImageBackground>
          <TouchableOpacity
            style={[
              styles.readButton,
              {
                backgroundColor: noStory ? "#2C1A51" : "#6B5F85",
                borderColor: noStory ? "#FFCE4A" : "white",
              },
            ]}
            onPress={noStory ? () => handleDisplayStory() : null}
            disabled={!noStory}
          >
            <Text style={styles.readButtonText}>{noStory ? "Lire mon histoire" : "Aucune histoire"}</Text>
          </TouchableOpacity>
        </View>
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
    // width: "100%",
    // height: "98%",
    // marginTop: "-12%",
    width: windowWidth,
    height: windowHeight * 0.5,
    marginTop: -windowHeight * 0.18,
  },

  title1: {
    fontFamily: "Lato_400Regular",
    fontSize: 20,
    textAlign: "left",
    color: "#FFFFFF",
    // marginTop: "52%",
    // marginLeft: "3.5%",
    marginTop: windowHeight * 0.32,
    marginLeft: windowWidth * 0.035,
  },

  title2: {
    fontFamily: "Lato_400Regular",
    fontSize: 34,
    textAlign: "left",
    color: "#FFFFFF",
    lineHeight: 40,
    // marginLeft: "3%",
    marginLeft: windowWidth * 0.03,
  },

  title2bis: {
    fontFamily: "Lato_400Regular",
    fontSize: 34,
    textAlign: "left",
    color: "#FFFFFF",
    // marginLeft: "3%",
    marginLeft: windowWidth * 0.03,
  },

  // Style création d'image et lecture de lastStory
  btnContainer: {
    flex: 3,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    marginTop: "15%",
  },

  // Nouvelle histoire
  newStoryButton: {
    // width: "92%",
    // height: "30%",
    // padding: 15,
    // borderWidth: 1,
    // borderColor: "#FFCE4A",
    // borderRadius: 10,
    // alignItems: "center",
    // marginVertical: "5%",
    width: windowWidth * 0.92,
    height: windowHeight * 0.2,
    padding: windowWidth * 0.06,
    borderWidth: 1,
    borderColor: "#FFCE4A",
    borderRadius: 10,
    alignItems: "center",
    marginVertical: windowHeight * 0.05,
  },
  addButton: {
    // width: "9%",
    // height: "30%",
    // marginTop: "2%",
    // marginBottom: "3%",
    width: windowWidth * 0.1,
    height: windowHeight * 0.05,
    marginTop: windowHeight * 0.01,
    marginBottom: windowHeight * 0.01,
  },
  buttonText: {
    fontFamily: "Lato_400Regular",
    color: "white",
    fontSize: 16,
  },

  //
  title3: {
    fontFamily: "Lato_400Regular",
    fontSize: 16,
    color: "#FFCE4A",
    alignSelf: "flex-start",
    marginLeft: "4%",
    marginTop: "4%",
  },

  // Lire lastStory
  lastStoryButton: {
    width: "92%",
    height: "40%",
    borderWidth: 1,
    borderColor: "#FFFFFF",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "flex-start",
    marginVertical: "3%",
  },
  storyImage: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  storyTitle: {
    fontFamily: "Lato_400Regular",
    color: "white",
    fontSize: 20,
    textAlign: "center",
    backgroundColor: "rgba(44,26,80, 0.5)",
    padding: 10,
    width: "100%",
  },
  readButton: {
    width: "50%",
    borderWidth: 1,
    borderColor: "#FFCE4A",
    backgroundColor: "#2C1A51",
    padding: 15,
    marginTop: "-6%",
    borderRadius: 10,
    alignSelf: "center",
  },
  readButtonText: {
    fontFamily: "Lato_400Regular",
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});