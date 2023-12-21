import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome";

// Importation du composant personnalisé TabBar
import TabBar from "../components/TabBar";

// Composant pour l'écran génération d'histoire "Étape 3"
export default function StoryGenerationStep3Screen({ navigation, route }) {
  const { length, endingType, selectedType, selectedImage, selectedMusic } =
    route.params;
  const [type, setType] = useState(selectedType);
  // Création du synopsis pour le récap des détails de l'histoire
  const synopsis = `Préparez-vous à plonger dans une histoire de genre ${selectedType}. Attendez-vous à être captivé dès les premiers mots jusqu'à la fin de l'histoire que nous avons élaborée pour vous.`;

  // Fonction pour naviguer vers l'affichage de l'histoire
  const handleStoryDisplay = () => {
    console.log(type);
    navigation.navigate("StoryDisplay", {
      type,
      length,
      endingType,
      selectedMusic: selectedMusic,
    });
  };

  // Fonction pour revenir à l'étape 2
  const handleStoryGeneration2 = () => {
    navigation.navigate("StoryGeneration2", { type });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../assets/ImageBibliotheque.png")}
        style={styles.imagBgd}
      >
        <Text style={styles.title1}>Création d'une histoire</Text>
        <View style={styles.containerStep}>
          <Text style={styles.title2}>Étape 3/3 : Récapitulatif</Text>
        </View>
      </ImageBackground>

      <View style={styles.containerStory}>
        <Text style={styles.titleContainer}>Genre : {selectedType}</Text>
        <Image style={styles.imagBgdRecap} source={selectedImage}></Image>
        <Text style={styles.textRecap}>{synopsis}</Text>
        <View style={styles.recapSizeStory}>
          <Text style={styles.sizeTextRecap}>{length}</Text>
        </View>
        <View style={styles.recapSizeStory}>
          <Text style={styles.sizeTextRecap}>{endingType}</Text>
        </View>
        <View style={styles.arrowContainer}>
          <TouchableOpacity style={styles.arrowBtn}>
            <Icon
              name="chevron-left"
              size={30}
              color={"#2C1A51"}
              onPress={() => handleStoryGeneration2()}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.arrowBtn}>
            <Icon
              name="chevron-right"
              size={30}
              color={"#2C1A51"}
              onPress={() => handleStoryDisplay()}
            />
          </TouchableOpacity>
        </View>
      </View>
      <TabBar navigation={navigation} />
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

  // Style header
  imagBgd: {
    flex: 2,
    width: "100%",
    height: "96%",
    marginTop: "-12%",
  },
  title1: {
    fontFamily: "Lato_400Regular",
    fontSize: 32,
    color: "#FFCE4A",
    marginTop: "49%",
    marginLeft: "3%",
    position: "absolute",
  },
  containerStep: {
    flexDirection: "row",
    marginTop: "45%",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    marginLeft: "4%",
  },
  title2: {
    fontFamily: "Lato_400Regular",
    color: "white",
    fontSize: 16,
    marginTop: "3%",
  },

  // Style tabBar
  tabBar: {
    marginTop: "200%",
    position: "absolute",
    zIndex: 1,
  },

  // Style récap histoire
  containerStory: {
    minHeight: "55%",
    bottom: "-5.5%",
    height: "64%",
    width: "90%",
    borderRadius: 10,
    backgroundColor: "#6B5F85",
    padding: 10,
  },

  titleContainer: {
    fontFamily: "Lato_400Regular",
    color: "white",
    fontSize: 24,
    textAlign: "center",
    marginTop: "1%",
    marginBottom: "1%",
  },

  imagBgdRecap: {
    width: "100%",
    height: "30%",
    overflow: "hidden",
    borderRadius: 15,
    borderColor: "white",
    borderWidth: 1,
    marginTop: "3%",
  },

  textRecap: {
    fontFamily: "Lato_400Regular",
    color: "white",
    textAlign: "justify",
    marginTop: 10,
    padding: 10,
    fontSize: 16,
  },
  recapSizeStory: {
    backgroundColor: "#FFCE4A",
    margin: 5,
    borderRadius: 10,
  },
  sizeTextRecap: {
    fontFamily: "Lato_400Regular",
    color: "#2C1A51",
    textAlign: "center",
    padding: 10,
  },

  // Style flèche directionnelle
  arrowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    height: "20%",
    alignItems: "center",
    marginTop: "-3%",
  },
  arrowBtn: {
    marginLeft: "10%",
    marginRight: "10%",
  },
});
