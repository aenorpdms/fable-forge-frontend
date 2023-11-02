import React from "react";
import { View, Text, ImageBackground, Image, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome";
import { useSelector } from "react-redux";
import { useNavigation } from '@react-navigation/native';

// Importation du composant personnalisé TabBar
import TabBar from "../TabBar";

// Composant pour l'écran génération d'histoire "Étape 3"
export default function StoryGenerationStep3Screen() {

  // Hook pour naviguer entre les écrans
  const navigation = useNavigation();
 
  // Récupération de l'état newStory depuis le store Redux
  const newStory = useSelector((state) => state.newStory.value);

  // Création du synopsis pour le récap des détails de l'histoire
  const synopsis = `Préparez-vous à plonger dans une histoire de genre ${newStory.type}. Attendez-vous à être captivé dès les premiers mots jusqu'à la fin de l'histoire que nous avons élaborée pour vous.`
  
  // Fonction pour naviguer vers l'affichage de l'histoire
  const handleStoryDisplay = () => {
    navigation.navigate("StoryDisplay", {
      genre: newStory.type,
      longueur: newStory.length,
      fin: newStory.endingType,
    });
  };

  // Fonction pour revenir à l'étape 2
  const handleStoryGeneration2 = () => {
    navigation.navigate("StoryGeneration2");
  };



  return (
    <SafeAreaView style={styles.container}>
        <ImageBackground
            source={require("../assets/ImageBibliotheque.png")}
            style={styles.imagBgd}
        >
            <Text style={styles.title1}>Création d'une histoire</Text>
          <View style={styles.containerStep}>
            <Text style={styles.title2}>Récapitulatif</Text>
            <Text style={styles.title2bis}>Etape 3/3</Text>
          </View>
        </ImageBackground>
        
        <View style={styles.tabBar}>
          <TabBar navigation={navigation} />
        </View>

      <View style={styles.containerStory}>
          <Text style={styles.titleContainer}>Genre : {newStory.type}</Text>
        <Image style={styles.imagBgdRecap} source={newStory.selectedImage}></Image>
          <Text style={styles.textRecap}>{synopsis}</Text>
      <View style={styles.recapSizeStory}>
          <Text style={styles.sizeTextRecap}>{newStory.length}</Text>
      </View>
      <View style={styles.recapSizeStory}>
          <Text style={styles.sizeTextRecap}>{newStory.endingType}</Text>
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
    height: "77%",
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
    color: "#FFCE4A",
    fontSize: 16,
  },
  title2bis: {
    fontFamily: "Lato_400Regular",
    color: "#FFCE4A",
  },

  // Style tabBar
  tabBar: {
    marginTop: "200%",
    position: "absolute",
    zIndex: 1,
  },

  // Style récap histoire
  containerStory: {
    height: "65%",
    bottom: "7%",
    minHeight: "55%",
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
    flexDirection:"row",
    justifyContent: "space-between",
    width: "100%",
    height: "20%",
    alignItems: "center",  
  },
  arrowBtn: {
    marginLeft:"10%",
    marginRight:"10%"
  },
});
