import React, { useState, useEffect } from "react";
import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Modal } from "react-native";
import { API_KEY, API_URL } from "@env";
// import TabBar from "../TabBar";
import StoryBar from "../StoryBar";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { fontSize } from "./SettingsScreen";
import { useSelector, useDispatch } from "react-redux";
import { addTitle, saveStory, emptyNewStory } from "../reducers/newStory"
const LENGTH_MAP = {
  Courte: { min: 500, max: 1500 },
  Moyenne: { min: 1500, max: 2500 },
  Longue: { min: 2500, max: 4000 },
};

export default function StoryDisplayScreen({ route, navigation }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [chunks, setChunks] = useState([]);
  const [totalTokens, setTotalTokens] = useState(0);
  const [initialPrompt, setInitialPrompt] = useState("");
  const [desiredTokenCount, setDesiredTokenCount] = useState(0);
  const [count, setCount] = useState(0);
  const [showGenerateButton, setShowGenerateButton] = useState(true);
  const dispatch = useDispatch();
  const newStory = useSelector(state => state.newStory.value);
  const user = useSelector(state => state.user.value);
  const [titleStory, setTitleStory] = useState("");

  useEffect(() => {
    if (isGenerating) {
      // Utilisez la valeur désirée sans la recalculer

      if (totalTokens < desiredTokenCount) {
        generateNextChunk();
      } else {
        setIsGenerating(false);
        setTitleStory(newStory.title);
        sendStoryToBackend(newStory.story, newStory.title);
      }
    }
  }, [chunks]);

  console.log("isGenerated", isGenerating);
  const generateNextChunk = async () => {
    // Combinez la phrase initiale et les chunks pour former le message complet
    const userMessage = initialPrompt + " " + chunks.join(" ");

    const data = {
      model: "gpt-3.5-turbo-16k",
      messages: [
        {
          role: "system",
          content: `Tu es un conteur d'histoires français, avec les consignes suivantes :\n\n- Tu vas créer une histoire du genre ${newStory.type}.\n- L'histoire que tu vas créer doit absolument respecter la longueur ${newStory.length} correspondant au nombre de token défini.\n- Tu dois t'assurez que l'histoire a une ${newStory.endingType} en accord avec le genre, qui soit très marquée et émotionnellement intense.\n- Organise ton histoire en paragraphes cohérents pour en faciliter la lecture.\n- Veille à ce que l'histoire ne dépasse pas la longueur défini.\n- Assure-toi que l'histoire soit du genre ${newStory.type}, d'une longueur ${newStory.length}, et avec une ${newStory.endingType} appropriée.\n- Tu ne commenceras pas les histoires par \"il était une fois\".\n- Créer aussi un titre avant le texte de l'histoire que tu mettras entre des balises \"!\".\n-`
        },
        { 
          role: "user", 
          content: userMessage 
        },
      ],
      temperature: 1.2,
      max_tokens: 250,
      top_p: 1,
      frequency_penalty: 1,
      presence_penalty: 1,
    };

    try {
      const response = await fetch(`${API_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (!response.ok || !responseData.choices || !responseData.choices[0]) {
        console.error("Erreur lors de la génération de l'histoire");
        setIsGenerating(false);
        return;
      }
      const generatedContent = responseData.choices[0].message.content.trim();

      // Extract title using the regular expression
      const titleRegex = /!(.*?)!/;
      const titleMatch = titleRegex.exec(generatedContent);
      const title = titleMatch ? titleMatch[1] : "";

      if (newStory.title == "" && count == 0) {
        dispatch(addTitle(title));
        setTitleStory(title);
        console.log(title);
        setCount(1);
      }

      console.log("Nombre total de tokens à générer:", desiredTokenCount);
      console.log("total token", totalTokens);

      // Concatenate all chunks to create the complete story
      //const completeStory = chunks.join(" ");

      // Remove the title from the chunk
      const contentWithoutTitle = generatedContent.replace(titleRegex, "");
      setChunks(prevChunks => [...prevChunks, contentWithoutTitle]);
      dispatch(saveStory(contentWithoutTitle));
      setTotalTokens(prevTokens => prevTokens + responseData.choices[0].message.content.split(" ").length);
      return generatedContent;
    } catch (error) {
      console.error("Erreur lors de la génération de l'histoire:", error);
      setIsGenerating(false);
    }
  };

  const sendStoryToBackend = (completeStory, title) => {
    console.log("sendStoryToBackend ", title);
    fetch(`https://fable-forge-backend-84ce.vercel.app/stories/new/${user.token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        length: newStory.length,
        title: title,
        type: newStory.type,
        ending: newStory.endingType,
        story: completeStory, // Send the complete story
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.result) {
          dispatch(emptyNewStory());
          console.log("Done");
        } else {
          console.log("error");
        }
      });
  };

  const handleGenerateStory = () => {
    setShowGenerateButton(false);
    setIsGenerating(true);
    setChunks([]);
    setTotalTokens(0);
    //dispatch(emptyNewStory());
    const tokenCount =
      Math.floor(Math.random() * (LENGTH_MAP[newStory.length].max - LENGTH_MAP[newStory.length].min + 1)) + LENGTH_MAP[newStory.length].min;
    setDesiredTokenCount(tokenCount); // Mettre à jour ici
    const prompt = `Je souhaite créer une histoire de genre ${newStory.type} de longueur ${newStory.length}. Je veux une ${newStory.endingType}.`;
    setInitialPrompt(prompt);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tabBar}>
        <StoryBar navigation={navigation} />
        <View style={styles.backgroundTab}></View>
      </View>
      <Text style={styles.titleStory}>{titleStory}</Text>
      <ScrollView style={[styles.containerStory,{ backgroundColor: user.mode === "dark" ? "#180A34" : "white" } ]}>
        {isGenerating && <ActivityIndicator style={styles.tournicoti} size='large' color='#2C1A51' />}

        {chunks.map((chunk, index) => (
          <Text key={index} style={[styles.textStory, { fontSize: user.fontSizeSet, color: user.mode === "dark" ? "#F6F2FF" : "#2C1A51" }]}>
            {chunk.trim()}
          </Text>
        ))}
        <View style={styles.space}></View>
      </ScrollView>
      {showGenerateButton && (
        <TouchableOpacity style={styles.btngenerateStory} onPress={handleGenerateStory}>
          <Text style={styles.generateTextBtn}>Générer mon histoire</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2C1A51",
    padding: 20,
  },
  containerStory: {
    flex: 2,
    marginHorizontal: 30,
    marginVertical: 20,
    borderRadius: 10,
    backgroundColor: "white",
    padding: 20,
    width: "92%",
  },
  titleStory: {
    fontFamily: "Lato_700Regular",
    fontSize: 26,
    color: "white",
    textAlign: "center",
    margin: "2%",
    marginTop: 30,
  },
  textStory: {
    fontSize: 16,
    color: "#2C1A51",
    textAlign: "justify",
  },
  btngenerateStory: {
    margin: "1%",
    borderRadius: 10,
    padding: 5,
    position: "absolute",
    backgroundColor: "#6B5F85",
    borderWidth: 1,
    borderColor: "#FFFFFF",
    bottom: "18%",
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
  backgroundTab: {
    backgroundColor: "#2C1A51",
    top: "95%",
    position: "absolute",
    zIndex: -1,
    height: 100,
    width: 650,
    marginLeft: -400,
    marginTop: -20,
  },
  tournicoti: {
    position: "absolute",
    left: "45%", //120
    top: "50%", //250
  },
  space: {
    height: 120,
    backgroundColor: "transparent",
  },
});