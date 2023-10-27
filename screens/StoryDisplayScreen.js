import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import { API_URL, API_KEY } from "@env";
import TabBar from "../TabBar";

export default function StoryDisplayScreen({ navigation }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedText, setGeneratedText] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const body = {
    genre: "Horreur",
    fin: "Triste",
    longueur: "1",
  };

  const generateText = async () => {
    console.log('Click');
    try {
        const response = await fetch('/generate-story', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body) // Remplacez 'body' par l'objet contenant genre, fin, longueur, etc.
        });

        if (!response.ok) {
            console.error("Error fetching the story:", response.statusText);
            return;
        }

        const data = await response.json();
        const receivedContent = data.storyWithoutTitle; // Mettez à jour le nom de la propriété en fonction de la réponse du backend.
        setGeneratedText(receivedContent); // Mettez à jour l'état avec le texte généré complet
    } catch (error) {
        console.error(error);
    }
};

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

            const handleGenerateStory = () => {
              setIsGenerating(true); // Démarrez la génération lorsque l'utilisateur appuie sur le bouton
              generateText(); // Commencez la génération du texte ici
            };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.btngenerateStory} onPress={() => handleGenerateStory()}>
            <Text style={styles.generateTextBtn}>Générer mon histoire</Text>
      </TouchableOpacity>
      <ScrollView style={styles.containerStory}>
      <Text>{/* Élément vide pour forcer la réorganisation */}</Text>
      <Text key={generatedText} style={styles.textStory}>
        {generatedText}
      </Text>
      </ScrollView>
      <View style={styles.tabBar}>
        <TabBar navigation={navigation} />
      </View>
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