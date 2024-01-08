import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

// Importation du composant personnalisé TabBar
import TabBar from "../components/TabBar";

// Couleurs constantes
const colors = {
  primary: "#2C1A51",
  secondary: "#6B5F85",
  tertiary: "#FFCE4A",
  white: "#FFFFFF",
};

// Composant pour l'écran génération d'histoire "Étape 2"
export default function StoryGenerationStep3Screen({ navigation, route }) {
  const { length, endingType, selectedType, selectedImage, selectedMusic } = route.params;

  // État local pour le personnage sélectionné
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [type, setType] = useState(selectedType !== undefined ? selectedType : null);

  // État local pour stocker les données des personnages
  const [characters, setCharacters] = useState([]);

// Gestion du clic sur une carte de personnage
const handleSelectCharacter = (character) => {
  console.log("Selected character:", character);
  setSelectedCharacter(character);
};

  // Fonction pour déterminer la couleur de fond de la carte
  const getCardBackgroundColor = (character) => {
    return character.firstName === selectedCharacter?.firstName ? "#FFCE4A" : colors.secondary;
  };

  // État local pour la visibilité du modal.
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fonction pour afficher ou cacher le modal.
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Fonction pour fermer le modal.
  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  const sendDataToBackend = async () => {
    try {
      console.log('Sending data to backend...');
      const backendResponse = await fetch('https://fable-forge.onrender.com/stories/persoCharacter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          selectedType: selectedType,
          endingType: endingType,
        }),
      });

      const data = await backendResponse.json();
      console.log('Réponse du backend :', data); // Afficher la réponse
      // Mettre à jour l'état local avec les données des personnages
      setCharacters(data.characters);
    } catch (error) {
      console.error('Erreur lors de la requête au backend :', error);
    }
  };

  useEffect(() => {
    // Déclenche sendDataToBackend lorsque selectedType et endingType changent
    sendDataToBackend();
  }, [selectedType, endingType]);
 

  const handleStoryGeneration4 = () => {
    navigation.navigate("StoryGeneration4", {
      length: length,
      endingType: endingType,
      selectedType: selectedType !== undefined ? selectedType : type,
      selectedImage,
      selectedMusic,
      selectedCharacter: selectedCharacter,
    });
  };

  const handleStoryGeneration = () => {
    // Navigation vers l'étape 2
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../assets/ImageBibliotheque.png")}
        style={styles.imagBgd}
      >
        <Text style={styles.title1}>Création d'une histoire</Text>
        <View style={styles.containerStep}>
          <Text style={styles.title2}>
            Étape 3/4 : Choisissez un personnage
          </Text>
          <TouchableOpacity onPress={toggleModal} style={styles.iconHelp}>
            <FontAwesomeIcon
              icon={faQuestionCircle}
              color={"#6B5F85"}
              size={20}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
  
      <Modal
        visible={isModalOpen}
        animationType="slide"
        onRequestClose={closeModal}
        transparent={true}
      >
        <View style={styles.mdlctn}>
          <View style={styles.modalContainer}>
            <View style={styles.settingsApp}>
              <Text style={styles.titleModal}>Assistance</Text>
              <FontAwesome
                name="close"
                size={20}
                style={styles.mdlClosed}
                color="white"
                onPress={closeModal}
              />
            </View>
            <Text style={styles.textModal}>
              Dans cette troisième étape, vous pouvez personnaliser votre histoire
              à créer. Vous avez la possibilité de choisir parmi 3 longueurs de
              récit et 4 types de fin possibles.
            </Text>
          </View>
        </View>
      </Modal>
  
      <View style={styles.containerStory}>
        <ScrollView>
        <View style={styles.cardContainer}>
          {characters.map((character, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.card,
                { backgroundColor: getCardBackgroundColor(character) },
              ]}
              onPress={() => handleSelectCharacter(character)}
            >
              <View>
                <View style={styles.cardContent}>
                  <ImageBackground
                    source={require('../assets/Enfant.png')}
                    style={styles.cardImage}
                  />
                  <View style={styles.textContent}>
                    <Text style={styles.cardTitle}>{character.firstName}</Text>
                    {/* Pour les traits de caractère */}
                    {character.traits.map((trait, traitIndex) => (
                      <View key={traitIndex} style={styles.label}>
                        <Text style={styles.labelText}>{trait}</Text>
                      </View>
                    ))}
                  </View>
                </View>
                {/* Description du personnage */}
                <Text style={styles.cardDescription}>
                  {character.description}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        </ScrollView>
  
        <View style={styles.arrowContainer}>
          <TouchableOpacity style={styles.arrowBtn}>
            <Icon
              name="chevron-left"
              size={30}
              color={"#2C1A51"}
              onPress={() => handleStoryGeneration()}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.arrowBtn}>
            <Icon
              name="chevron-right"
              size={30}
              color={"#2C1A51"}
              onPress={() => handleStoryGeneration4()}
            />
          </TouchableOpacity>
        </View>
        {/* <View style={styles.space}></View> */}
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
    marginTop: "49%", //160
    marginLeft: "3%",
    position: "absolute",
  },
  iconHelp: {
    color: "rgba(255, 255, 255, 0.5)",
    top: "-5%",
    left: "80%",
    zIndex: 10,
    padding: 8,
  },
  mdlctn: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0, 0.5)",
  },
  modalContainer: {
    width: "80%",
    height: "25%",
    marginTop: "40%",
    marginLeft: 40,
    paddingLeft: "5%",
    backgroundColor: "#6B5F85",
    borderRadius: 20,
  },
  settingsApp: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  mdlClosed: {
    alignSelf: "right",
    textAlign: "right",
    padding: 8,
    marginRight: 15,
  },
  titleModal: {
    color: "#FFCE4A",
    textAlign: "center",
    fontSize: 24,
    fontWeight: "500",
    marginLeft: 80,
  },
  textModal: {
    color: "white",
    textAlign: "justify",
    padding: "4%",
    right: "4%",
    lineHeight: 22,
  },
  containerStep: {
    flexDirection: "row",
    marginTop: "49%",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    marginLeft: "4%",
  },
  title2: {
    fontFamily: "Lato_400Regular",
    color: "white",
    fontSize: 16,
    marginTop: "5%",
  },
  containerInformation: {
    height: "122%", //650
  },
  containerStory: {
    minHeight: "55%",
    bottom: "-5.5%",
    height: "64%",
    width: "90%",
    borderRadius: 10,
    backgroundColor: "#6B5F85",
    padding: 10,
  },
  arrowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "92%",
    alignItems: "center",
  },
  arrowBtn: {
    marginLeft: "12%",
    marginRight: "60%",
  },
  tabBar: {
    marginTop: "200%",
    position: "absolute",
    zIndex: 1,
  },
  space: {
    padding: 20,
    height: 90,
    backgroundColor: "transparent",
  },

  // NEW STYLE
  cardContainer: {
    margin: "3%",
  },
  card: {
    borderColor: "#2C1A51",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    margin: 18,
    width: '100%',
    alignSelf: 'center',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  cardImage: {
    width: '60%', 
    height: '100%',
  },
  textContent: {
    flex: 1,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: "#2C1A51",
    marginBottom: 5,
  },
  label: {
    backgroundColor: "#2C1A51",
    borderRadius: 8,
    borderColor: "#FFCE4A",
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginVertical: 2,
  },
  labelText: {
    color: "#FFFFFF",
    fontSize: 14,
    textAlign: 'center',
    margin: 3,
  },
  cardDescription: {
    marginTop: 10,
    fontSize: 16,
    color: "#FFFFFF",
  },
});
