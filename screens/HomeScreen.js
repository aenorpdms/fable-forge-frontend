import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  SafeAreaView,
  Image,
} from "react-native";
import * as Font from "expo-font";
import { useDispatch, useSelector } from "react-redux";
import { updateStory } from "../reducers/stories";
import { useState, useEffect } from "react";
import { useIsFocused } from '@react-navigation/native';


import TabBar from "../TabBar";

export default function HomeScreen({ navigation }) {
  const user = useSelector((state) => state.user.value);
  const nameUser = user.firstname;
  const readyName = nameUser.toUpperCase();
  const [lastStory, setLastStory] = useState({});
  const dispatch = useDispatch();
  const [noStory, setNoStory] = useState(false);
  const focus = useIsFocused()

  const handleSubmit = () => {
    navigation.navigate("StoryGenerationScreen");
  };

  const fetchLastStory = () => {
    fetch(
      `https://fable-forge-backend-84ce.vercel.app/users/lastStory/${user.token}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          if (data.story == null) {
            setNoStory(false);
          } else {
            setNoStory(true);
            setLastStory({ ...data.story });
          }
        }
      });
  };

  useEffect(() => {
    console.log("useeffect homescreen");
    fetchLastStory();
  }, [focus]);

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

  const handleDisplayStory = () => {
    dispatch(
      updateStory({
        title: lastStory.title,
        story: lastStory.choicePrompt[0],
        type: lastStory.type,
      })
    );
    navigation.navigate("StoryRead");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={styles.imagBgd}
        source={require("../assets/ImageBibliotheque.png")}
      >
        <Text style={styles.title1}>BIENVENUE {readyName}</Text>
        <Text style={styles.title2}>Où les histoires</Text>
        <Text style={styles.title2bis}>prennent vie...</Text>
      </ImageBackground>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.newStoryButton}
          onPress={() => handleSubmit()}
        >
          <Image
            style={styles.addButton}
            source={require("../assets/add-circle-outline.png")}
          />
          <Text style={styles.buttonText}>Créer une</Text>
          <Text style={styles.buttonText}>nouvelle histoire</Text>
        </TouchableOpacity>

        <Text style={styles.title3}>Votre dernière histoire</Text>

        <View style={[styles.lastStoryButton, { opacity: noStory ? 1 : 0.6 }]}>
          <ImageBackground
            style={styles.storyImage}
            source={typeImage} /*{{ uri: 'URL_DE_L'HISTOIRE' }}*/
          >
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
            <Text style={styles.readButtonText}>
              {noStory ? "Lire mon histoire" : "Aucune histoire"}
            </Text>
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

  imagBgd: {
    flex: 2,
    width: "100%",
    height: "98%",
    marginTop: "-12%", // -30%
  },

  title1: {
    fontFamily: "Lato_400Regular",
    fontSize: 20,
    textAlign: "left",
    color: "#FFFFFF",
    marginTop: "52%", //205
    marginLeft: "3.5%", //16
  },

  title2: {
    fontFamily: "Lato_400Regular",
    fontSize: 34,
    textAlign: "left",
    color: "#FFFFFF",
    lineHeight: 40,
    marginLeft: "3%",
  },

  title2bis: {
    fontFamily: "Lato_400Regular",
    fontSize: 34,
    textAlign: "left",
    color: "#FFFFFF",
    marginLeft: "3%",
  },

  btnContainer: {
    flex: 3,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    marginTop: "15%",
  },
  newStoryButton: {
    width: "92%",
    height: "30%",
    padding: 15,
    borderWidth: 1,
    borderColor: "#FFCE4A",
    borderRadius: 10,
    alignItems: "center",
    marginVertical: "5%", //20
  },
  addButton: {
    width: "9%", //30
    height: "28%", //30
    marginTop: "3%", //10
    marginBottom: "4%", //10
  },

  buttonText: {
    fontFamily: "Lato_400Regular",
    color: "white",
    fontSize: 16,
  },

  title3: {
    fontFamily: "Lato_400Regular",
    fontSize: 16,
    color: "#FFCE4A",
    alignSelf: "flex-start",
    marginLeft: "4%", //16
    marginTop: "4%", //20
  },

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
    fontSize: 16,
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
