import React, { useState, useEffect } from "react";
import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { API_KEY, API_URL } from "@env";
import TabBar from "../TabBar";
import { fontSize } from "./SettingsScreen";
import { useSelector, useDispatch } from 'react-redux';
import { addTitle } from "../reducers/newStory";

const LENGTH_MAP = {
  'Courte': { min: 1000, max: 1500 },
  'Moyenne': { min: 100, max: 2500 },
  'Longue': { min: 2500, max: 4000 }
};

export default function StoryDisplayScreen({ route, navigation }) {

    // Utilisez useSelector pour extraire les informations de votre reducer
    const storySettings = useSelector(state => state.newStory.value);

    // Log ce que vous recevez du useSelector
    console.log("Récupéré du useSelector:", storySettings);

  const [isGenerating, setIsGenerating] = useState(false);
  const [chunks, setChunks] = useState([]);
  const [totalTokens, setTotalTokens] = useState(0);
  const [initialPrompt, setInitialPrompt] = useState('');
  const [desiredTokenCount, setDesiredTokenCount] = useState(0);

  const dispatch = useDispatch()
  const newStory = useSelector((state) => state.newStory.value);

  useEffect(() => {
    if (isGenerating) {
      // Utilisez la valeur désirée sans la recalculer
      console.log("Nombre total de tokens à générer:", desiredTokenCount);
      
      if (totalTokens < desiredTokenCount) {
        generateNextChunk();
      } else {
        setIsGenerating(false);
      }
    }
  }, [chunks]);
  
  const generateNextChunk = async () => {
    // Combinez la phrase initiale et les chunks pour former le message complet
    const userMessage = initialPrompt + ' ' + chunks.join(' ');
  
    const data = {
      model: "gpt-3.5-turbo-16k",
      messages: [
        { role: "user", content: userMessage },
      ],
      temperature: 0.5,
      max_tokens: 250,
    };
  
    // Log ce que vous envoyez à l'API
    console.log("Envoi à l'API:", data);
  
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
  
      // Log ce que vous recevez de l'API
      console.log("Réponse de l'API:", responseData);
  
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
    dispatch(addTitle(title))
  
    // Remove the title from the chunk
    const contentWithoutTitle = generatedContent.replace(titleRegex, "");
    setChunks((prevChunks) => [...prevChunks, contentWithoutTitle]);
    // dispatch(saveStory(contentWithoutTitle))
    setTotalTokens(prevTokens => prevTokens + responseData.choices[0].message.content.split(' ').length);
    return generatedContent; 
    
  
    } catch (error) {
      console.error("Erreur lors de la génération de l'histoire:", error);
      setIsGenerating(false);
    }
  };

  const handleGenerateStory = () => {
    setIsGenerating(true);
    setChunks([]);
    setTotalTokens(0);
    const tokenCount = Math.floor(Math.random() * (LENGTH_MAP[newStory.length].max - LENGTH_MAP[newStory.length].min + 1)) + LENGTH_MAP[newStory.length].min;
    setDesiredTokenCount(tokenCount);  // Mettre à jour ici
    const prompt = `Je souhaite créer une histoire de genre ${newStory.type} d'une longueur ${newStory.length}. Assurez-vous que l'histoire ait une ${newStory.endingType} en accord avec le genre. Créer aussi un titre avant le texte de l'histoire que tu mettras entre des balises "!".`;
    setInitialPrompt(prompt);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tabBar}>
        <TabBar navigation={navigation} />
        <View style={styles.backgroundTab}></View>
      </View>
      <ScrollView style={styles.containerStory}>
        {isGenerating && <ActivityIndicator style={styles.tournicoti} size="large" color="#2C1A51" />}
        <Text style={styles.titleStory}>{newStory.title}</Text>
        {chunks.map((chunk, index) => (
          <Text key={index} style={styles.textStory}>
              {chunk}
          </Text>
        ))}
        <View style={styles.space}></View>
      </ScrollView>
      <TouchableOpacity
        style={styles.btngenerateStory}
        onPress={handleGenerateStory}
      >
        <Text style={styles.generateTextBtn}>Générer mon histoire</Text>
      </TouchableOpacity>
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
  titleStory:{
    fontSize: 20,
    fontWeight:"bold",
    textAlign: "center",
    marginBottom: 40
  },
  textStory: {
    fontSize: 16,
    color: "black",
    textAlign:"justify"
  },
  btngenerateStory: {
    borderColor: "#FFCE4A",
    backgroundColor: "#2C1A51",
    margin: 10,
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    marginTop: 2,
    marginBottom: 65,
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
    left: 120,
    top: 250,
  },
  space: {
    height: 80,
    backgroundColor: 'transparent',
  },
});