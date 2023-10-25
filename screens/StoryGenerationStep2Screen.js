import React from "react";
import { View, Text, ImageBackground, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function StoryGenerationStep2Screen({ navigation }) {
  // Story display page:
  // const handleStoryDisplay = () => {
  //   // navigate to Story display page
  //   navigation.navigate("StoryDisplay");

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require("../assets/ImageBibliotheque.png")} style={styles.imagBgd}>
        <Text style={styles.title1}>Création d'une histoire</Text>
        <Text style={styles.title2}>Choisissez les paramètres</Text>
        <Text style={styles.title2bis}>Etape 2/5</Text>
        <Text style={styles.title3}>Interactif</Text>
      </ImageBackground>
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
  imagBgd: {
    flex: 2,
    width: "100%",
    height: "35%",
    marginTop: "-12%",
  },
  title1: {
    color: "white",
    fontSize: 21,
    top: "20%",
  },
  title2: {
    color: "#FFCE4A",
    fontSize: 16,
    top: "20%",
  },
  title2bis: {
    color: "#FFCE4A",
    top: "20%",
  },
  title3: {
    color: "white",
    top: "20%",
  },
});
