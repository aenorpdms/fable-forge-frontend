import React from "react";
import Typewriter from "react-native-typewriter";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

// Importation de la tabBar personnalisés
import StoryBar from "../components/StoryBar";

// Écran de lecture de l'histoire dans l'application
export default function StoryReadScreen({ navigation, route }) {
  // Récupérer les détails de l'histoire passés via la navigation
  const { title, type, story, selectedMusic } = route.params;

  // Suppression des mots 'Fin.', 'undefined' ou 'null' du texte de l'histoire
  const fullStory = story.join(" ");
  const contentWithoutFin = fullStory
    .replace(/(Fin\.|undefined)|null/g, "")
    .trim();

  // Sélection des paramètres utilisateur à partir de l'état global Redux
  // Utilisation de l'opérateur de chaînage optionnel `?.` et fournir des valeurs par défaut
  const user = useSelector((state) => state.user.value) || {
    mode: "light",
    fontSizeSet: 16,
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* tabBar personnalisée pour l'histoire */}
      <View style={styles.storyBar}>
        <StoryBar
          navigation={navigation}
          route={route}
          selectedMusic={selectedMusic}
          storyType={type}
        />
        <View style={styles.backgroundTab}></View>
      </View>
      <Text style={styles.titleStory}>{title}</Text>
      <ScrollView
        style={[
          styles.containerStory,
          // Thème clair ou sombre en fonction des paramètres utilisateur
          { backgroundColor: user.mode === "dark" ? "#180A34" : "white" },
        ]}
      >
        <Text
          style={[
            styles.textStory,
            // Texte de l'histoire avec police et couleur personnalisées
            {
              color: user.mode === "dark" ? "#F6F2FF" : "#2C1A51",
              fontSize: user.fontSizeSet,
            },
          ]}
        >
          <Typewriter typing={1} maxDelay={25}>
            {contentWithoutFin}
          </Typewriter>
        </Text>

        <View style={styles.space}></View>
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

  // Style pour l'histoire
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

  // Style tabBar
  storyBar: {
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

  // Espace supplémentaire en bas du ScrollView
  space: {
    height: 80,
    backgroundColor: "transparent",
  },
});
