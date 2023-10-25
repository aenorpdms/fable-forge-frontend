import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import * as Font from "expo-font";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect} from "react";

const API_KEY = process.env.API_KEY;
const API_URL = process.env.API_URL;

export default function StoryDisplayScreen({ navigation }) {
  //   const [generatedText, setGeneratedText] = useState("");

  //   const generateText = () => {
  //     // Generate your text here
  //     const newText = "This is the generated text.";
  //   setGeneratedText(newText);

  const [story, setStory] = useState("")
  const [title, setTitle] = useState('')

 
const generate = ()  =>{
  (async () => {
    const body = {
      genre: "Horreur",
      fin: "Triste",
      longueur: "1",
    };
    console.log("click");

    let maxTokens;
    if (body.longueur === "1") {
      maxTokens = Math.floor(Math.random() * (800 - 600 + 1) + 600);
    } else if (body.longueur === "2") {
      maxTokens = Math.floor(Math.random() * (1500 - 800 + 1) + 800);
    } else if (body.longueur === "3") {
      maxTokens = Math.floor(Math.random() * (4000 - 1500 + 1) + 1500);
    } else {
      // Default value if the selection is not valid
      maxTokens = 1000;
    }
  try {
      // Generate the beginning of the story
      const beginningUserMessage = `Je souhaite créer une histoire de genre ${body.genre} d'environ ${body.longueur} pages, soit environ 300 tokens par page A4. Assurez-vous que l'histoire a une fin ${body.fin} en accord avec le genre. M'inspirer pour le personnage principal, le lieu de départ et l'époque. Créer aussi un titre avant le texte de l'histoire.`;

      const beginningRequestBody = {
        model: "gpt-3.5-turbo-16k",
        messages: [
          { role: "system", content: "You are the best storyteller there is." },
          { role: "user", content: beginningUserMessage },
        ],
        max_tokens: maxTokens,
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

    const endingUserMessage = `Suite de l'histoire de ${beginningMessage}`;

      const endingRequestBody = {
        model: "gpt-3.5-turbo-16k",
        messages: [
          { role: "system", content: "You are the best storyteller there is." },
          { role: "user", content: endingUserMessage },
        ],
        max_tokens: maxTokens, // You can adjust maxTokens for the ending
        temperature: 1,
      };

      const endingResponse = await fetch(`${API_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify(endingRequestBody),
      });

      if (!endingResponse.ok) {
        throw new Error("Error generating the ending of the story");
      }
     
      const endingData = await endingResponse.json();
      const endingMessage = endingData.choices[0].message.content;

    // Find the index of the first occurrence of a newline character
    const newLineIndex = beginningMessage.indexOf("\n");

    if (newLineIndex !== -1) {
      const title = beginningMessage.slice(0, newLineIndex).trim();
      const storyWithoutTitle = beginningMessage.slice(newLineIndex).trim();
      const fullStory = `${storyWithoutTitle}\n\n${endingMessage}`
      setTitle(title)
      setStory(fullStory)
    } else {
      // Handle the case where no newline character is found
     console.log( "Title not found", fullStory );
    }
  } catch (error) {
    console.error(error);
    
  }


 })()
 
 }


  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => generate() }>
        <Text>Generate</Text>
      </TouchableOpacity>
      <Text style={styles.textTitle}>{title}</Text>
      <View style={styles.containerStory}>
        <ScrollView style={styles.containerInformation} indicatorStyle='white'>
          {/* <Text style={styles.textStory}>{generatedText}</Text>
            <TouchableOpacity title='Generate Text' onPress={generateText} /> */}
          <Text style={styles.textStory}>
            {story}
          </Text>
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
