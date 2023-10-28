import React, { useState } from "react";
import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { API_KEY } from "@env";
import TabBar from "../TabBar";

export default function StoryDisplayScreen({ route, navigation }) {
  const { genre, fin, longueur } = route.params;

  const [newContent, setNewContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateStory = async () => {
    setIsGenerating(true);

    try {
      const url = "https://api.openai.com/v1/chat/completions";
      const { genre, longueur, fin } = route.params;

      // Définir le nombre maximal de tokens en fonction de la longueur souhaitée
      // let maxTokens;
      // if (longueur === "1") {
      //   maxTokens = Math.floor(Math.random() * (800 - 600 + 1)) + 600;
      // } else if (longueur === "2") {
      //   maxTokens = Math.floor(Math.random() * (1500 - 800 + 1)) + 800;
      // } else if (longueur === "3") {
      //   maxTokens = Math.floor(Math.random() * (3000 - 1500 + 1)) + 1500;
      // } else {

      //   maxTokens = 800; // Par défaut
      // }

      const userMessage = `Je souhaite créer une histoire de genre ${genre} d'environ ${longueur} pages, soit environ 300 tokens par page A4. Assurez-vous que l'histoire a une fin ${fin} en accord avec le genre. M'inspirer pour le personnage principal, le lieu de départ et l'époque. Créer aussi un titre avant le texte de l'histoire.`;

      const data = {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are the best storyteller there is." },
          { role: "user", content: userMessage },
        ],
        temperature: 0.7,
        max_tokens: 150,
      };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la génération de l'histoire");
      }
      const responseData = await response.json();

      // Extraire le contenu généré de la réponse de l'API
      const generatedContent = responseData.choices[0].message.content;

      // Afficher la réponse de l'API dans la console
      console.log("Réponse de l'API :", responseData);

      setNewContent(generatedContent);
    } catch (error) {
      console.error("Erreur lors de la génération de l'histoire :", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.btngenerateStory} onPress={() => handleGenerateStory()}>
        <Text style={styles.generateTextBtn}>Générer mon histoire</Text>
      </TouchableOpacity>
      <View style={styles.tabBar}>
        <TabBar navigation={navigation} />
        <View style={styles.backgroundTab}></View>
      </View>
      <ScrollView style={styles.containerStory}>
        {isGenerating ? (
          <ActivityIndicator style={styles.tournicoti} size='large' color='#2C1A51' />
        ) : (
          <Text key={newContent} style={styles.textStory}>
            {newContent}
          </Text>
        )}
      </ScrollView>
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
});
