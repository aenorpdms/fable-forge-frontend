import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Carousel from "react-native-snap-carousel";
import { useNavigation } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
// import {
//   updateNewType,
//   updateSelectedMusic,
//   updateSelectedImage,
// } from "../reducers/newStory";

// Importation du composant personnalisé TabBar
import TabBar from "../TabBar";

// Composant pour l'écran génération d'histoire "Étape 1"
export default function StoryGenerationScreen() {
  const navigation = useNavigation();

// État local pour la visibilité du modal.
const [isModalOpen, setIsModalOpen] = useState(false); // Add this line

// Fonction pour afficher ou cacher le modal.
const toggleModal = () => {
  setIsModalOpen(!isModalOpen);
};

// Fonction pour fermer le modal.
const closeModal = () => {
  setIsModalOpen(false); // Close the modal
};

  const data = [
    {
      title: "Horreur",
      description:"Explorez l'obscurité et laissez votre imagination vous guider à travers des récits terrifiants où le suspense règne en maître.",
      image: require("../assets/Horreur.png"),
      music: require("../assets_music/Genre_Horreur.mp3"),
    },
    {
      title: "Aventure",
      description:"Embarquez pour des aventures épiques, résolvez des énigmes, à travers des mondes extraordinaires.",
      image: require("../assets/Aventure.png"),
      music: require("../assets_music/Genre_Aventure.mp3"),
    },
    {
      title: "Fantasy / SF",
      description:"Explorez des mondes futuristes, rencontrez des créatures magiques et partez à la découverte de l'inconnu.",
      image: require("../assets/Fantasy_SF.png"),
      music: require("../assets_music/Genre_Fantasy-SF.mp3"),
    },
    {
      title: "Policier / Thriller",
      description:"Plongez dans des intrigues mystérieuses, traquez des criminels et résolvez des énigmes palpitantes.",
      image: require("../assets/Policier_Thriller.png"),
      music: require("../assets_music/Genre_Policier-Thriller.mp3"),
    },
    {
      title: "Romance",
      description:"Découvrez des récits passionnés, explorez des relations intenses et suivez les histoires d'amour captivantes.",
      image: require("../assets/Romance.png"),
      music: require("../assets_music/Genre_Romance.mp3"),
    },
    {
      title: "Enfant",
      description:"Plongez dans des aventures adaptées aux plus jeunes, remplies de leçons précieuses et d'histoires amusantes.",
      image: require("../assets/Enfant.png"),
      music: require("../assets_music/Genre_Enfant.mp3"),
    },
  ];

  // Navigation vers l'étape 2
  const handleStoryGeneration2 = (item) => {
    console.log("Selected Type:", item.title);
    console.log("Selected Image:", item.image);
    console.log("Selected Music:", item.music);
    
    navigation.navigate("StoryGeneration2", {
      selectedType: item.title,
      selectedImage: item.image,
      selectedMusic: item.music,
    });
  };

  // Rendu d'un élément du carrousel
  const renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.genreCard}>
          <View>
            <ImageBackground
              source={item.image}
              style={styles.genreImage}
            ></ImageBackground>
          </View>
          <Text style={styles.genreDescription}>{item.description}</Text>
          <TouchableOpacity
            style={styles.selectButton}
            onPress={() => handleStoryGeneration2(item)}
          >
            <Text style={styles.selectButtonText}>Sélectionner</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../assets/ImageBibliotheque.png")}
        style={styles.imagBgd}
      >
        <Text style={styles.title1}>Création d'une histoire</Text>
        <View style={styles.containerStep}>
          <Text style={styles.title2}>Étape 1/3 : Choisissez un genre</Text>
        </View>
      </ImageBackground>
      <TouchableOpacity onPress={toggleModal} style={styles.iconHelp}>
        <FontAwesomeIcon icon={faQuestionCircle} color={"#6B5F85"} size={20} />
      </TouchableOpacity>
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
              Vous voici dans la première étape de génération d'une histoire.
              Vous avez la possibilité de choisir parmi différents styles de
              récits. Dès que votre choix est fait, appuyer sur "Sélectionner"
              pour passer à la seconde étape de génération d'histoires.
            </Text>
          </View>
        </View>
      </Modal>

      <Carousel
        data={data}
        renderItem={renderItem}
        sliderWidth={Dimensions.get("window").width}
        itemWidth={300}
        style={styles.carousel}
      />
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
    height: "202%",
    marginTop: "-12%",
  },
  title1: {
    fontFamily: "Lato_400Regular",
    fontSize: 32,
    color: "#FFCE4A",
    marginLeft: "3%",
    position: "absolute",
    marginTop: "49%",
  },
  containerStep: {
    flexDirection: "row",
    marginTop: "47%",
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
  iconHelp: {
    color: "rgba(255, 255, 255, 0.5)",
    top: "12%",
    left: "40%",
    zIndex: 10,
    padding: 8
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
    alignItems:"center",
    justifyContent:"space-between",
   
  },

  mdlClosed: {
    alignSelf:"right",
    textAlign: "right",
    padding: 8,
    marginRight: 15
  },
  titleModal: {
    color: "#FFCE4A",
    textAlign: "center",
    fontSize: 24,
    fontWeight: "500",
    marginLeft: 80
  },
  textModal: {
    color: "white",
    textAlign: "justify",
    padding: "4%",
    right: "4%",
    lineHeight: 22,
 
  },
  carousel: {
    alignItems: "center",
    justifyContent: "center",
  },

  slide: {
    width: "100%",
    height: "74.5%",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 10,
    padding: 15,
    top: "22%",
  },
  title: {
    fontFamily: "Lato_400Regular",
    fontSize: 20,
    color: "white",
    marginBottom: 20,
  },
  genreCard: {
    borderWidth: 1,
    borderColor: "#ffffff",
    borderRadius: 8,
    marginBottom: 20,
    flex: 1,
    justifyContent: "top",
  },
  genreImage: {
    height:250,//250
    width: "100%",
    borderRadius: 10,
    overflow: "hidden",
  },
  genreTitle: {
    fontFamily: "Lato_400Regular",
    color: "white",
    fontSize: 20,
    marginBottom: 10,
  },
  genreDescription: {
    fontFamily: "Lato_400Regular",
    color: "white",
    fontSize: 15,
    textAlign: "justify",
    marginBottom: "1%",
    padding: 12,
  
  },
  selectButton: {
    width: 150,
    borderWidth: 1,
    borderColor: "#FFCE4A",
    backgroundColor: "#2C1A51",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    alignSelf: "center",
    position:"absolute",
    bottom:-25
  },
  selectButtonText: {
    fontFamily: "Lato_400Regular",
    color: "white",
    fontSize: 14,
    textAlign: "center",
    marginLeft: "4%",
  },
});
