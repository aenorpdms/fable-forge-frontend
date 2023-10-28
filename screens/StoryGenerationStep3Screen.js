import React from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome";
import { useState, useRef } from "react";
import { API_URL, API_KEY } from "@env";
import { useDispatch, useSelector } from "react-redux";
import { addStories } from "../reducers/stories";
import { updateNew } from "../reducers/newStory";
import user from "../reducers/user";

import TabBar from "../TabBar";

export default function StoryGenerationStep3Screen({ navigation }) {
  const [buttonColor, setButtonColor] = useState("#2C1A51");

  const newStory = useSelector((state) => state.newStory.value);
  let page;
  if (newStory.length === "Courte") {
    page = "1";
  } else if (newStory.length === "Moyenne") {
    page = "2";
  } else {
    page = "3";
  }
  const synopsis = `Préparez-vous à plonger dans une histoire ${newStory.type}, qui s'étirera sur ${page} pages. Attendez-vous à être captivé dès les premiers mots jusqu'à la ${newStory.endingType} que nous avons tissée pour vous.`;

  const handleStoryDisplay = () => {
    navigation.navigate("StoryDisplay", {
      genre: newStory.type,
      longueur: newStory.length,
      fin: newStory.endingType,
    });
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
        {/* <ScrollView contentContainerStyle={styles.containerInformation} indicatorStyle='white'> */}
        <Text style={styles.titleContainer}>Genre: {newStory.type}</Text>
        <ImageBackground
          style={styles.imagBgdRecap}
          source={require("../assets/ImageBibliotheque.png")}
        ></ImageBackground>
        <Text style={styles.textRecap}>{synopsis}</Text>

        <View style={styles.recapSizeStory}>
          <Text style={styles.sizeTextRecap}>{newStory.length}</Text>
        </View>
        <View style={styles.recapSizeStory}>
          <Text style={styles.sizeTextRecap}>{newStory.endingType}</Text>
        </View>
        <TouchableOpacity
          style={styles.btngenerateStory}
          onPress={() => handleStoryDisplay()}
        >
          <Text style={styles.generateTextBtn}>Valider mes choix</Text>
        </TouchableOpacity>
        {/* </ScrollView> */}
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
  imagBgd: {
    flex: 2,
    width: "100%",
    height: "79%",
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
  containerStep: {
    flexDirection: "row",
    marginTop: "46%",
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

  containerInformation: {
    height: "112%",
  },
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
    minHeight: "20%",
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
  btngenerateStory: {
    borderColor: "white",
    backgroundColor: "#2C1A51",
    margin: 10,
    borderWidth: 1,
    borderColor: "#FFCE4A",
    borderRadius: 10,
    padding: 5,
    marginTop: 10,
  },
  generateTextBtn: {
    fontFamily: "Lato_400Regular",
    color: "white",
    textAlign: "center",
    padding: 10,
  },
  tabBar: {
    marginTop: "200%",
    position: "absolute",
    zIndex: 1,
  },
});
