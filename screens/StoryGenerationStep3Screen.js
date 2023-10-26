import React from "react";
import { View, Text, ImageBackground, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome";
import { useState, useRef } from "react";
import { API_URL, API_KEY } from "@env";
import { useDispatch, useSelector } from "react-redux";
import { addStories } from "../reducers/stories";
import { updateNew } from "../reducers/newStory";
import user from "../reducers/user";

import TabBar from "../TabBar";

export default function StoryGenerationStep3Screen({ navigation }) {
  const [buttonColor, setButtonColor] = useState("#2C1A51");

  const handleStoryGenerated = () => {
    const [story, setStory] = useState("");
    const [title, setTitle] = useState("");

    (async () => {
      const body = {
        genre: "Horreur",
        fin: "Triste",
        longueur: "1",
      };

      console.log("click");

      try {
        // Generate the beginning of the story
        const beginningUserMessage = `Je souhaite créer une histoire de genre ${body.genre} d'environ ${body.longueur} page A4, soit environ 50 mots par page A4. Assurez-vous que l'histoire a une fin ${body.fin} en accord avec le genre. M'inspirer pour le personnage principal, le lieu de départ et l'époque. Créer aussi un titre avant le texte de l'histoire.`;
        const beginningRequestBody = {
          model: "gpt-3.5-turbo-16k",
          messages: [
            { role: "system", content: "You are the best storyteller there is." },
            { role: "user", content: beginningUserMessage },
          ],
          max_tokens: 200,
          temperature: 1,
        };

        const beginningResponse = await fetch(`${API_URL}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
          body: JSON.stringify(beginningRequestBody),
        });

        if (!beginningResponse.ok) {
          throw new Error("Error generating the beginning of the story");
        }

        const beginningData = await beginningResponse.json();
        const beginningMessage = beginningData.choices[0].message.content;

        // Find the index of the first occurrence of a newline character
        const newLineIndex = beginningMessage.indexOf("\n");

        if (newLineIndex !== -1) {
          const title = beginningMessage.slice(0, newLineIndex).trim();
          const storyWithoutTitle = beginningMessage.slice(newLineIndex).trim();
          // const fullStory = `${storyWithoutTitle}\n\n${endingMessage}`;
          setTitle(title);
          setStory(storyWithoutTitle);

          // CALL BACK TO SEND STORIES CREATED
          const bodyToSend = {
            length: "1",
            title: "title",
            story: "story",
            type: "horreur",
            endingType: "triste",
          };

          fetch(`https://fable-forge-backend.vercel.app/stories/new/TnNDRl-8PoQH8jmZJfpx1JerbZ6fFRNy`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bodyToSend),
          })
            .then(response => response.json())
            .then(data => {
              if (data.result) {
                console.log("added to data");
              }
            });
        } else {
          // Handle the case where no newline character is found
          console.log("Title not found", beginningMessage);
        }
      } catch (error) {
        console.error(error);
      }
    })();

    // navigate to Story step 2 page
    navigation.navigate("StoryDisplay");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require("../assets/ImageBibliotheque.png")} style={styles.imagBgd}>
        <Text style={styles.title1}>Création d'une histoire</Text>
        <Text style={styles.title2}>Récapitulatif</Text>
        <Text style={styles.title2bis}>Etape 3/3</Text>
      </ImageBackground>
      <View style={styles.containerStory}>
        {/* <ScrollView contentContainerStyle={styles.containerInformation} indicatorStyle='white'> */}
        <Text style={styles.titleContainer}>Titre de l'histoire</Text>
        <ImageBackground style={styles.imagBgdRecap} source={require("../assets/ImageBibliotheque.png")}></ImageBackground>
        <Text style={styles.textRecap}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco
        </Text>

        <View style={styles.recapSizeStory}>
          <Text style={styles.sizeTextRecap}>Moyenne</Text>
        </View>
        <View style={styles.recapSizeStory}>
          <Text style={styles.sizeTextRecap}>Fin heureuse</Text>
        </View>
        <TouchableOpacity style={styles.btngenerateStory} onPress={() => handleStoryGenerated()}>
          <Text style={styles.generateTextBtn}>Générer mon histoire</Text>
        </TouchableOpacity>
        {/* </ScrollView> */}
        <View style={styles.tabBar}>
          <TabBar navigation={navigation} />
        </View>
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
    height: "75%",
    marginTop: "-12%",
  },
  title1: {
    color: "white",
    fontSize: 21,
    top: "50%",
    marginLeft: 10,
  },
  title2: {
    color: "#FFCE4A",
    fontSize: 16,
    top: "50%",
    marginLeft: 10,
  },
  title2bis: {
    color: "#FFCE4A",
    marginLeft: 300,
    top: "50%",
  },
  title3: {
    color: "white",
    top: "50%",
    marginLeft: 10,
  },
  containerInformation: {
    height: 700,
    // borderWidth: 2,
  },
  containerStory: {
    height: 600,
    // borderWidth: 2,
    bottom: 70,
    minHeight: "60%",
    width: "90%",
    borderRadius: 10,
    backgroundColor: "#6B5F85",
    padding: 10,
  },

  titleContainer: {
    color: "white",
    fontSize: 28,
    textAlign: "center",
    marginTop: 5,
  },

  imagBgdRecap: {
    width: "100%",
    minHeight: "25%",
    overflow: "hidden",
    borderRadius: 15,
    borderColor: "white",
    borderWidth: 1,
    marginTop: 15,
  },

  textRecap: {
    color: "white",
    textAlign: "justify",
    marginTop: 10,
    padding: 10,
  },

  recapSizeStory: {
    backgroundColor: "#FFCE4A",
    margin: 10,
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
  },
  sizeTextRecap: {
    color: "black",
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
    color: "white",
    textAlign: "center",
    padding: 10,
  },
  tabBar: {
    top: 72,
  },
});
