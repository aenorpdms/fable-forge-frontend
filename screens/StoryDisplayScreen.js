import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import TabBar from "../TabBar";

export default function StoryDisplayScreen({ route, navigation }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedText, setGeneratedText] = useState("");
  const { genre, longueur, fin } = route.params;

  const [conversationHistory, setConversationHistory] = useState([
    { role: "system", content: "You are the best storyteller there is." },
    { role: "user", content: `Je souhaite créer une histoire de genre ${genre} ...` } // Votre message initial
  ]);

  const generateText = async customBody => {
    console.log("Click");
    console.log("Starting the generateText function..."); // Log initial

    console.log("Preparing to send request with body:", JSON.stringify(customBody)); // Log pour inspecter le contenu du body avant l'envoi

    try {
      const response = await fetch("https://fable-forge-backend-seven.vercel.app/api/generate-story", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customBody), // Objet utilisé pour personnaliser votre requête
      });

      console.log("Received response:", response.status, response.statusText); // Log pour inspecter la réponse

      if (!response.ok) {
        const errorContent = await response.text();
        console.error("Error fetching the story: Status", response.status, response.statusText, "Content:", errorContent);
        return;
      }

      const data = await response.json();
      console.log("Parsed data from response:", data); // Log pour inspecter les données reçues

      const receivedContent = data.storyWithoutTitle; // Mise à jour du nom de la propriété en fonction de la réponse du backend
      setGeneratedText(receivedContent); // Mise à jour de l'état avec le texte généré complet
    } catch (error) {
      console.error(error);
    }
    setIsGenerating(false);
  };

  const handleGenerateStory = () => {
    console.log("handleGenerateStory triggered!");

    setIsGenerating(true);

     // Utilisation des valeurs genre, longueur, fin et de l'historique de la conversation pour personnaliser la requête
     const body = {
      genre: genre,
      fin: fin,
      longueur: longueur,
      messages: conversationHistory
    };

    console.log("Prepared body for generateText:", body);
    generateText(body);
  };

  useEffect(() => {
    if (generatedText) {
      setConversationHistory(prevHistory => [...prevHistory, { role: "user", content: generatedText }]);
    }
  }, [generatedText]);

  // 2. CALL BACK TO SEND STORIES CREATED
  // const bodyToSend = {
  //     length: "1",
  //     title: title,
  //     story: story,
  //     type: "horreur",
  //     endingType: "triste",
  // };

  // const saveResponse = await fetch(`https://fable-forge-backend.vercel.app/stories/new/TnNDRl-8PoQH8jmZJfpx1JerbZ6fFRNy`, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(bodyToSend),
  // });

  // const saveData = await saveResponse.json();

  // if (saveData.result) {
  //     console.log("added to data");
  // } else {
  //     throw new Error("Error saving story to backend");
  // }

  return (
    <SafeAreaView style={styles.container}>
      {isGenerating ? (
        <ActivityIndicator size='large' color='#0000ff' />
      ) : (
        <>
          <TouchableOpacity style={styles.btngenerateStory} onPress={() => handleGenerateStory()}>
            <Text style={styles.generateTextBtn}>Générer mon histoire</Text>
          </TouchableOpacity>
          <ScrollView style={styles.containerStory}>
            <Text key={generatedText} style={styles.textStory}>
              {generatedText}
            </Text>
          </ScrollView>
          <View style={styles.tabBar}>
            <TabBar navigation={navigation} />
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2C1A51",
    padding: 20,
  },
  textTitle: {
    color: "white",
    fontSize: 25,
    top: 20,
    fontWeight: "bold",
  },
  containerStory: {
    flex: 2,
    marginHorizontal: 20,
    marginVertical: 20,
    borderRadius: 10,
    backgroundColor: "white",
    padding: 20,
  },
  textStory: {
    fontSize: 16,
    color: "black",
  },
  tabBar: {
    top: 72,
  },
  generateTextBtn: {
    color: "white",
    textAlign: "center",
    padding: 10,
  },
});
