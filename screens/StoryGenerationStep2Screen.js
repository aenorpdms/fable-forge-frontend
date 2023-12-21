import React, { useState } from "react";
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
import TabBar from "../TabBar";

// Couleurs constantes
const colors = {
  primary: "#2C1A51",
  secondary: "#6B5F85",
  tertiary: "#FFCE4A",
  white: "#FFFFFF",
};

// Composant pour l'écran génération d'histoire "Étape 2"
export default function StoryGenerationStep2Screen({ navigation, route }) {
  const { type, selectedType, selectedImage, selectedMusic } = route.params;
  // État local pour la couleurs des boutons.
  const [buttonColors, setButtonColors] = useState([
    "#FFCE4A",
    "#2C1A51",
    "#2C1A51",
  ]);
  const [buttonTypeEnd, setButtonTypeEnd] = useState([
    "#FFCE4A",
    "#6B5F85",
    "#6B5F85",
    "#6B5F85",
  ]);
  const [selectedLength, setSelectedLength] = useState("Courte");
  const [selectedEndType, setSelectedEndType] = useState("Fin heureuse");
  const [sizeTextBtnColors, setSizeTextBtnColors] = useState([
    "#2C1A51",
    "white",
    "white",
  ]);

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

  // Gestion des clics sur les boutons de sélection de la longueur de l'histoire.
  const handleButtonClick = (buttonNumber) => {
    let lengthStory = "Courte";
    const newButtonColors = buttonColors.map((color, index) =>
      buttonNumber - 1 === index ? colors.tertiary : colors.primary
    );
    setButtonColors(newButtonColors);

    if (buttonNumber === 1) {
      lengthStory = "Courte";
    } else if (buttonNumber === 2) {
      lengthStory = "Moyenne";
    } else if (buttonNumber === 3) {
      lengthStory = "Longue";
    }
    setSelectedLength(lengthStory);
  };

  // Gestion des clics sur les boutons de sélection du type de fin de l'histoire.
  const handleButtonEndTypeClick = (buttonEndNumber) => {
    let typeEnd = "Fin heureuse";
    const newButtonTypeEnd = buttonTypeEnd.map((type, index) =>
      buttonEndNumber - 1 === index ? colors.tertiary : colors.secondary
    );
    setButtonTypeEnd(newButtonTypeEnd);

    if (buttonEndNumber === 1) {
      typeEnd = "Fin heureuse";
    } else if (buttonEndNumber === 2) {
      typeEnd = "Fin triste";
    } else if (buttonEndNumber === 3) {
      typeEnd = "Fin ouverte";
    } else if (buttonEndNumber === 4) {
      typeEnd = "Fin morale";
    }
    setSelectedEndType(typeEnd);
  };

  const handleStoryGeneration3 = () => {
    navigation.navigate("StoryGeneration3", {
      length: selectedLength,
      endingType: selectedEndType,
      selectedType: selectedType !== undefined ? selectedType : type,
      selectedImage,
      selectedMusic,
    });
  };

  const handleStoryGeneration = () => {
    // Navigation vers l'étape 1
    navigation.navigate("StoryGenerationScreen");
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
            Étape 2/3 : Choisissez les paramètres
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
              Dans cette seconde étape, vous pouvez personnaliser votre histoire
              à créer. Vous avez la possibilité de choisir parmi 3 longueurs de
              récit et 4 types de fin possibles.
            </Text>
          </View>
        </View>
      </Modal>
      <View style={styles.containerStory}>
        <ScrollView
          contentContainerStyle={styles.containerInformation}
          indicatorStyle="white"
        >
          <Text style={styles.titleContainer}>Longueur</Text>
          <TouchableOpacity
            style={[styles.btnSizeStory, { backgroundColor: buttonColors[0] }]}
            onPress={() => handleButtonClick(1)}
          >
            <Text style={[styles.sizeTextBtn, { color: sizeTextBtnColors[0] }]}>
              Courte
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btnSizeStory, { backgroundColor: buttonColors[1] }]}
            onPress={() => handleButtonClick(2)}
          >
            <Text style={[styles.sizeTextBtn, { color: sizeTextBtnColors[1] }]}>
              Moyenne
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btnSizeStory, { backgroundColor: buttonColors[2] }]}
            onPress={() => handleButtonClick(3)}
          >
            <Text style={[styles.sizeTextBtn, { color: sizeTextBtnColors[2] }]}>
              Longue
            </Text>
          </TouchableOpacity>
          <Text style={styles.titleContainer}>Type de fin</Text>
          <View style={styles.leftContainer}>
            <View style={styles.typeEndLeft}>
              <TouchableOpacity
                style={[styles.typeEndBtn, { borderColor: buttonTypeEnd[0] }]}
                onPress={() => handleButtonEndTypeClick(1)}
              >
                <ImageBackground
                  style={styles.imagBgdAbo}
                  source={require("../assets/Fin_heureuse.png")}
                ></ImageBackground>
                <Text style={styles.textTypeEnd}>Fin heureuse</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.typeEndLeft}>
              <TouchableOpacity
                style={[styles.typeEndBtn, { borderColor: buttonTypeEnd[1] }]}
                onPress={() => handleButtonEndTypeClick(2)}
              >
                <ImageBackground
                  style={styles.imagBgdAbo}
                  source={require("../assets/Fin_triste.png")}
                ></ImageBackground>
                <Text style={styles.textTypeEnd}>Fin triste</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.rightContainer}>
            <View style={styles.typeEndRight}>
              <TouchableOpacity
                style={[styles.typeEndBtn, { borderColor: buttonTypeEnd[2] }]}
                onPress={() => handleButtonEndTypeClick(3)}
              >
                <ImageBackground
                  style={styles.imagBgdAbo}
                  source={require("../assets/Fin_ouverte.png")}
                ></ImageBackground>
                <Text style={styles.textTypeEnd}>Fin ouverte</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.typeEndRight}>
              <TouchableOpacity
                style={[styles.typeEndBtn, { borderColor: buttonTypeEnd[3] }]}
                onPress={() => handleButtonEndTypeClick(4)}
              >
                <ImageBackground
                  style={styles.imagBgdAbo}
                  source={require("../assets/Fin_morale.png")}
                ></ImageBackground>
                <Text style={styles.textTypeEnd}>Fin morale</Text>
              </TouchableOpacity>
            </View>
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
                  onPress={() => handleStoryGeneration3()}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.space}></View>
          </View>
        </ScrollView>
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

  leftContainer: {
    flexDirection: "row",
    width: "50%",
    marginLeft: "4%",
    top: "5%", //30
  },
  rightContainer: {
    flexDirection: "row",
    width: "50%",
    bottom: "20%",
    marginLeft: "4%",
  },

  titleContainer: {
    fontFamily: "Lato_400Regular",
    color: "white",
    fontSize: 18,
    textAlign: "center",
    marginTop: "2%",
    marginBottom: "2%",
  },
  btnSizeStory: {
    borderColor: "white",
    backgroundColor: "#2C1A51",
    marginBottom: "5%",
    width: "90%",
    marginLeft: "5%",
    borderWidth: 1,
    borderColor: "#FFCE4A",
    borderRadius: 10,
    padding: 5,
  },
  btnSizeStoryOn: {
    margin: 10,
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
  },
  sizeTextBtn: {
    fontFamily: "Lato_400Regular",
    color: "white",
    textAlign: "center",
    padding: 10,
  },
  sizeTextBtnOn: {
    color: "black",
    textAlign: "center",
    padding: 10,
  },
  typeEndLeft: {
    flexDirection: "column",
    width: "80%",
    height: "30%",
    bottom: 20,
    borderRadius: 15,
    margin: "6%",
  },
  typeEndRight: {
    flexDirection: "column",
    width: "80%",
    height: "30%",
    bottom: 20,
    borderRadius: 15,
    margin: "6%",
  },
  imagBgdAbo: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
    borderRadius: 5,
  },
  textTypeEnd: {
    fontFamily: "Lato_400Regular",
    textAlign: "center",
    color: "white",
    marginTop: 10,
  },
  typeEndBtn: {
    fontFamily: "Lato_400Regular",
    borderWidth: 3,
    borderColor: "#6B5F85",
    borderRadius: 10,
  },

  arrowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "190%",
    height: "20%",
    alignItems: "center",
    right: "195%",
    top: "55%",
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
});