import React, { useState, useEffect } from "react";
import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { API_KEY, API_URL } from "@env";
import TabBar from "../TabBar";
import { fontSize } from "./SettingsScreen";

const LENGTH_MAP = {
  'Courte': { min: 1000, max: 1500 },
  'Moyenne': { min: 100, max: 2500 },
  'Longue': { min: 2500, max: 4000 }
};

export default function StoryDisplayScreen({ route, navigation }) {
  const { genre, longueur, fin } = route.params;
  const [isGenerating, setIsGenerating] = useState(false);
  const [chunks, setChunks] = useState([]);
  const [currentChunk, setCurrentChunk] = useState("");

  useEffect(() => {
    if (isGenerating && chunks.length > 0) {
      console.log("Exécution de useEffect lorsque isGenerating est vrai.");
        const currentStory = chunks.join(' ');
        const totalTokens = currentStory.split(' ').length;
        const desiredTokenCount = Math.floor(Math.random() * (LENGTH_MAP[longueur].max - LENGTH_MAP[longueur].min + 1)) + LENGTH_MAP[longueur].min;
        
        if (totalTokens < desiredTokenCount) {
            generateNextChunk(currentStory);
        } else {
            setIsGenerating(false);
        }
    }
}, [chunks]);

  const generateNextChunk = async (currentStory) => {
    console.log("La génération du prochain chunk commence.");
    setIsGenerating(true); // <-- Commencez le chargement ici

    const userMessage = currentStory;

    const data = {
      model: "gpt-3.5-turbo-16k",
      messages: [
        { role: "system", content: "You are a great storyteller. Continue the story seamlessly." },
        { role: "user", content: userMessage },
      ],
      temperature: 0.7,
      max_tokens: 250,
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
        return null; // Return null to indicate failure
      }

      const generatedContent = responseData.choices[0].message.content.trim();
      console.log("Chunk généré :", generatedContent);
      setChunks(prevChunks => [...prevChunks, generatedContent]);
      return generatedContent; // Return the generated chunk
    } catch (error) {
      console.error("Erreur lors de la génération de l'histoire:", error);
      setIsGenerating(false);
      return null; // Return null to indicate failure
      setIsGenerating(false); 
    }
  };

const handleGenerateStory = () => {
  console.log("Le bouton 'Générer mon histoire' a été pressé.");
  setIsGenerating(true);
  setChunks([]);
  const initialPrompt = `Je souhaite créer une histoire de genre ${genre} d'environ ${longueur} pages, soit environ 300 tokens par page A4. Assurez-vous que l'histoire a une fin ${fin} en accord avec le genre. Créer aussi un titre avant le texte de l'histoire.`;
  setChunks([initialPrompt]);
};

  return (
    <SafeAreaView style={styles.container}>
      
      <View style={styles.tabBar}>
        <TabBar navigation={navigation} />
        <View style={styles.backgroundTab}></View>
      </View>
      <ScrollView style={styles.containerStory}>
      {isGenerating && (
  <ActivityIndicator
      style={styles.tournicoti}
      size="large"
      color="#2C1A51"
  />
)}

{chunks.map((chunk, index) => (
  <Text key={index} style={styles.textStory}>
      {chunk}
  </Text>
))}
<View style={styles.space}></View>
      </ScrollView>
      <TouchableOpacity
        style={styles.btngenerateStory}
        onPress={() => handleGenerateStory()}
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
    marginHorizontal: 20,
    marginVertical: 20,
    borderRadius: 10,
    backgroundColor: "white",
    padding: 20,
    width: "80%",
  },
  textStory: {
    fontSize: 16,
    color: "black",
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