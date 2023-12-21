import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

// Importation du composant TabBar personnalisé
import TabBar from "../components/TabBar";
import { convertToRGBA } from "react-native-reanimated";

// Mapping des types d'histoire à leurs images correspondantes pour éviter les répétitions
const storyTypeImages = {
  Horreur: require("../assets/Horreur.png"),
  Aventure: require("../assets/Aventure.png"),
  "Fantasy / SF": require("../assets/Fantasy_SF.png"),
  "Policier / Thriller": require("../assets/Policier_Thriller.png"),
  Romance: require("../assets/Romance.png"),
  Enfant: require("../assets/Enfant.png"),
};

export default function StoriesScreen({ navigation }) {
  // État la mise à jour des histoires
  const [stories, setStories] = useState([]);
  const [update, setUpdate] = useState(false);

  // Utilisation de Redux pour accéder et modifier l'état global
  const user = useSelector((state) => state.user.value);

  // Afficher les histoires de l'utilisateur
  useEffect(() => {
    fetch(`https://fable-forge.onrender.com/users/stories/${user.token}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setStories([...data.stories]);
        } else {
          console.log("Erreur lors du chargement des histoires");
        }
      });
  }, [update]);

  //Afficher l'histoire sélectionnée
  const handleDisplayStory = (story) => {
    const typeImage = storyTypeImages[story.type] || null;
    const selectedMusic = story.type;
    // Passez les détails de l'histoire via la navigation
    navigation.navigate("StoryRead", {
      title: story.title,
      type: story.type,
      story: story.choicePrompt,
      selectedImage: typeImage,
      selectedMusic: selectedMusic,
    });
  };

  // Supprimer une histoire.
  const handleDeleteStory = (storyID) => {
    fetch(`https://fable-forge.onrender.com/stories/${storyID}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: user.token }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          // Inversion de l'état de mise à jour pour déclencher un nouveau chargement des histoires.
          setUpdate((prevUpdate) => !prevUpdate);
          console.log("Histoire supprimée");
        }
      });
  };

  const storiesOrder = stories.reverse();
  // Afficher le container des histoires
  const renderStoryList = () =>
    storiesOrder.map((story, index) => (
      <View style={styles.storyButton} key={index}>
        <ImageBackground
          style={styles.storyImage}
          source={storyTypeImages[story.type] || null}
        >
          <Text style={styles.storyTitle}>{story.title}</Text>
        </ImageBackground>
        <TouchableOpacity
          style={styles.readButton}
          onPress={() => handleDisplayStory(story)}
        >
          <Text style={styles.readButtonText}>Relire</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() => handleDeleteStory(story._id)}
        >
          <FontAwesomeIcon
            icon={faTimesCircle}
            style={{ color: "#ffffff" }}
            size={25}
          />
        </TouchableOpacity>
      </View>
    ));

  // Structure principale du composant d'affichage
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <ImageBackground
          style={styles.imagBgd}
          source={require("../assets/ImageBibliotheque.png")}
        >
          <Text style={styles.title1}>Bibliothèque</Text>
        </ImageBackground>
      </View>
      <View style={styles.tabBar}>
        <TabBar navigation={navigation} />
        <View style={styles.backgroundTab}></View>
      </View>
      <View style={styles.scrollViewContainer}>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          indicatorStyle="white"
        >
          {renderStoryList()}
          <View style={styles.space}></View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#2C1A51",
  },

  // Style header
  header: {
    height: "25%",
    width: "100%",
  },
  imagBgd: {
    flex: 1,
    width: "100%",
    height: "104%",
    marginTop: "-12%",
  },
  title1: {
    fontFamily: "Lato_400Regular",
    fontSize: 32,
    color: "#FFCE4A",
    marginTop: "49.5%",
    marginLeft: "4%",
  },

  // Style tabBar
  tabBar: {
    marginTop: "104%",
    position: "absolute",
    zIndex: 1,
  },
  backgroundTab: {
    backgroundColor: "#2C1A51",
    top: "95%",
    position: "absolute",
    zIndex: -1,
    height: "120%",
    width: 650,
    marginLeft: -400,
    marginTop: -40,
  },

  // Style scrollView
  scrollViewContainer: {
    flex: 1,
    width: "90%",
  },
  scrollView: {
    width: "100%",
  },

  // Style container histoire
  storyButton: {
    width: "100%",
    height: 200,
    borderWidth: 1,
    borderColor: "#FFFFFF",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "flex-start",
    marginVertical: "6%",
  },
  storyImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  storyTitle: {
    fontFamily: "Lato_400Regular",
    color: "white",
    fontSize: 20,
    textAlign: "center",
    backgroundColor: "rgba(44,26,80, 0.5)",
    padding: 10,
    width: "100%",
  },

  readButton: {
    width: "50%",
    backgroundColor: "#2C1A51",
    borderWidth: 1,
    borderColor: "#FFCE4A",
    padding: 10,
    borderRadius: 10,
    marginTop: "-6%",
  },
  readButtonText: {
    fontFamily: "Lato_400Regular",
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  deleteBtn: {
    bottom: "107%",
    left: "44%",
    backgroundColor: "#2C1A51",
    borderRadius: 200,
  },
  space: {
    padding: 10,
    height: 80,
    backgroundColor: "transparent",
  },
});
