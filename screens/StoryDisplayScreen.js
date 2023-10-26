import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useRef } from "react";
import { API_URL, API_KEY } from "@env";
import { useDispatch, useSelector } from "react-redux";
import { addStories } from "../reducers/stories";
import { updateNew } from "../reducers/newStories";
import user from "../reducers/user";

export default function StoryDisplayScreen({ navigation }) {

  const [story, setStory] = useState("");
  const [title, setTitle] = useState("");

  const generate = () => {
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
        const beginningRequestBody = {model: "gpt-3.5-turbo-16k",
          messages: [
            {role: "system", content: "You are the best storyteller there is.",},
            { role: "user", content: beginningUserMessage },],
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

          fetch(
            `https://fable-forge-backend.vercel.app/stories/new/TnNDRl-8PoQH8jmZJfpx1JerbZ6fFRNy`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(bodyToSend),
            }
          )
            .then((response) => response.json())
            .then((data) => {
              if (data.result) {
               console.log("added to data")
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
  };



  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => generate()}>
        <Text>Generate</Text>
      </TouchableOpacity>
      <Text style={styles.textTitle}>{title}</Text>
      <View style={styles.containerStory}>
        <ScrollView style={styles.containerInformation} indicatorStyle="white">
          <Text style={styles.textStory}>{story}</Text>
        </ScrollView>
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
  textTitle: {
    color: "white",
    fontSize: 32,
    top: 20,
    fontWeight: "bold",
  },
  containerStory: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 70,
    borderRadius: 10,
    backgroundColor: "white",
    padding: 20,
  },
  containerInformation: {
    flexGrow: 1,
  },
  textStory: {
    fontSize: 16,
    color: "black",
  },
});
