import React, { useState, useEffect } from "react";
import { 
  ActivityIndicator, 
  SafeAreaView, ScrollView, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View
} from "react-native";
import { API_KEY, API_URL } from "@env";
import StoryBar from "../StoryBar";
import { useSelector, useDispatch } from "react-redux";
import { addTitle, saveStory, emptyNewStory } from "../reducers/newStory"

// Longueur d'histoire possible (en token)
const LENGTH_MAP = {
  Courte: { min: 400, max: 800 },
  Moyenne: { min: 800, max: 1200 },
  Longue: { min: 1200, max: 1600 },
};

export default function StoryDisplayScreen({ navigation }) {
  // État pour le suivi du processus de génération d'histoire

  const [isGenerating, setIsGenerating] = useState(false); // Voir si une histoire est en cours de génération
  const [chunks, setChunks] = useState([]); // Mise à jour des tranches d'histoire générés
  const [totalTokens, setTotalTokens] = useState(0); // Nombre total de tokens générés
  const [initialPrompt, setInitialPrompt] = useState(""); // Prompt initial pour l'API
  const [desiredTokenCount, setDesiredTokenCount] = useState(0); // Nombre de tokens désiré pour l'histoire
  const [count, setCount] = useState(0); // Compteur utilisé pour la logique de titre
  const [showGenerateButton, setShowGenerateButton] = useState(true); // Contrôle l'affichage du bouton de génération
  const [titleStory, setTitleStory] = useState(""); // Titre de l'histoire générée
  
  // Récupération de l'état depuis Redux
  const newStory = useSelector(state => state.newStory.value);
  const user = useSelector(state => state.user.value);
  const dispatch = useDispatch();

  // Déclanchement de la génération de l'histoire
  useEffect(() => {
    // Lorsque le composant est mis à jour avec de nouveaux 'chunks'
    if (isGenerating) {
      // Si le nombre total de tokens est inférieur au nombre désiré, générer la prochaine tranche
      if (totalTokens < desiredTokenCount) {
        generateNextChunk();
      } else {
        // Sinon, arrêter la génération et envoyer l'histoire au backend
        setIsGenerating(false);
        setTitleStory(newStory.title);
        sendStoryToBackend(newStory.story, newStory.title);
      }
    }
  }, [chunks]); // Ce useEffect se déclenche uniquement lorsque 'chunks' change

  // Fonction asynchrone pour générer la prochaine tranche de l'histoire
  const generateNextChunk = async () => {
    // Construction du message pour l'API à partir du prompt initial et des morceaux d'histoire existants
    const userMessage = initialPrompt + " " + chunks.join(" ");

    // Préparation de la requête à envoyer à l'API
    const data = {
      model: "gpt-3.5-turbo-16k",
      messages: [
        {
          role: "system",
          content: `
          Tu es un conteur d'histoires français, avec les consignes suivantes :\n\n-
          Tu vas créer une seule et unique histoire.\n-
          Tu ne commenceras pas les histoires par \"il était une fois\".\n- 
          Créer aussi un titre avant le texte de l'histoire que tu mettras entre des balises \"!\".\n-`
        },
        { 
          role: "user",
          content: userMessage 
        }, // Message de l'utilisateur actuel
      ],

      // Contrôle du style et de la diversité de la génération de texte
      temperature: 1,
      max_tokens: 250,
      top_p: 1,
      frequency_penalty: 1,
      presence_penalty: 1,
    };

    try {
      // Envoi de la requête à l'API et attente de la réponse
      const response = await fetch(`${API_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify(data),
      });

      // Traitement de la réponse de l'API
      const responseData = await response.json();

      // Gestion des erreurs de réponse
      if (!response.ok || !responseData.choices || !responseData.choices[0]) {
        console.error("Erreur lors de la génération de l'histoire");
        setIsGenerating(false);
        return;
      }

      // Extraction du contenu généré
      const generatedContent = responseData.choices[0].message.content.trim();

      // Extraction du titre à l'aide d'une expression régulière
      const titleRegex = /!(.*?)!/;
      const titleMatch = titleRegex.exec(generatedContent);
      const title = titleMatch ? titleMatch[1] : "";

      // Logique pour définir le titre de l'histoire si ce n'est pas déjà fait
      if (newStory.title == "" && count == 0) {
        dispatch(addTitle(title));
        setTitleStory(title);
        console.log(title);
        setCount(1);
      }

      // Logique pour mettre à jour l'état avec le contenu généré
      const contentWithoutTitle = generatedContent.replace(titleRegex, "");
      setChunks(prevChunks => [...prevChunks, contentWithoutTitle]);
      dispatch(saveStory(contentWithoutTitle));
      setTotalTokens(prevTokens => prevTokens + responseData.choices[0].message.content.split(" ").length);
      return generatedContent;
    } catch (error) {
      // Gestion des erreurs lors de la requête
      console.error("Erreur lors de la génération de l'histoire:", error);
      setIsGenerating(false);
    }
  };

  // Envoyer l'histoire complète au backend
  const sendStoryToBackend = (completeStory, title) => {
    fetch(`https://fable-forge.onrender.com/stories/new/${user.token}`, {
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

  // Déclancher la génération de l'histoire
  const handleGenerateStory = () => {

    // Cacher le bouton de génération d'histoire
    setShowGenerateButton(false);

    // Mise à 'true' pour indiquer que le processus de génération d'histoire a commencé
    setIsGenerating(true);
    
    // Réinitialise le tableau 'chunks' à un tableau vide
    setChunks([]);

    // Réinitialise le compteur 'totalTokens' à 0
    setTotalTokens(0);

    // Génération du nombre de token aléatoire en fonction de la longueur sélectionné
    const tokenCount =
      Math.floor(Math.random() * (LENGTH_MAP[newStory.length].max - LENGTH_MAP[newStory.length].min + 1)) + LENGTH_MAP[newStory.length].min;
    setDesiredTokenCount(tokenCount);
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

// Style tabBar
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

// Style générateur/lecteur d'histoire
  titleStory: {
    fontFamily: "Lato_700Bold_Italic",
    fontSize: 26,
    color: "white",
    textAlign: "center",
    margin: "2%",
    marginTop: 30,
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
    fontFamily: "Lato_700Bold",
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

// Style ActivityIndicator
  tournicoti: {
    position: "absolute",
    left: "45%",
    top: "50%",
  },

//
  space: {
    height: 120,
    backgroundColor: "transparent",
  },
});