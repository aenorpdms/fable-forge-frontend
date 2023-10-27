import React from "react";
import { View, Text, ImageBackground, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { updateNewLength, updateNewEnding } from "../reducers/newStory";

import TabBar from "../TabBar";

export default function StoryGenerationStep2Screen({ navigation }) {
  // Etats pour choisir la longueur de l'histoire à générer
  // const [buttonColor1, setButtonColor1] = useState("#2C1A51");
  // const [buttonColor2, setButtonColor2] = useState("#2C1A51");
  // const [buttonColor3, setButtonColor3] = useState("#2C1A51");

  // // Etats pour choisir le type de fin de l'histoire à générer
  // const [buttonTypeEnd1, setButtonType1] = useState("");
  // const [buttonTypeEnd2, setButtonType2] = useState("");
  // const [buttonTypeEnd3, setButtonType3] = useState("");
  // const [buttonTypeEnd4, setButtonType4] = useState("");

  const newStory = useSelector(state => state.newStory.value);
  const dispatch = useDispatch();

  const [buttonColors, setButtonColors] = useState(["#2C1A51", "#2C1A51", "#2C1A51"]);
  const [buttonTypeEnd, setButtonTypeEnd] = useState([null, null, null, null]);

  const handleButtonClick = buttonNumber => {
    const newButtonColors = buttonColors.map((color, index) => (buttonNumber - 1 === index ? "#FFCE4A" : "#2C1A51"));
    setButtonColors(newButtonColors);
    const lengthStory = buttonNumber === 1 ? "Courte" : buttonNumber === 2 ? "Moyenne" : "Longue";
    dispatch(updateNewLength(lengthStory));
  };

  const handleButtonEndTypeClick = buttonEndNumber => {
    const newButtonTypeEnd = buttonTypeEnd.map((type, index) => (buttonEndNumber - 1 === index ? "#FFCE4A" : null));
    setButtonTypeEnd(newButtonTypeEnd);
    const typeEnd =
      buttonEndNumber === 1 ? "Fin heureuse" : buttonEndNumber === 2 ? "Fin triste" : buttonEndNumber === 3 ? "Fin ouverte" : "Fin morale";
    dispatch(updateNewEnding(typeEnd));
  };

  const handleStoryGeneration3 = () => {
    // navigate to Story step 2 page
    navigation.navigate("StoryGeneration3");
  };

  const handleStoryGeneration = () => {
    // navigate to Story step 2 page
    navigation.navigate("StoryGenerationScreen");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require("../assets/ImageBibliotheque.png")} style={styles.imagBgd}>
        <Text style={styles.title1}>Création d'une histoire</Text>
        <Text style={styles.title2}>Choisissez les paramètres</Text>
        <Text style={styles.title2bis}>Etape 2/3</Text>
        <Text style={styles.title3}>Interactif</Text>
      </ImageBackground>
      <View style={styles.tabBar}>
          <TabBar navigation={navigation} />
        </View>
      <View style={styles.containerStory}>
       
        <ScrollView contentContainerStyle={styles.containerInformation} indicatorStyle='white'>
          <Text style={styles.titleContainer}>Longueur</Text>
          <TouchableOpacity style={[styles.btnSizeStory, { backgroundColor: buttonColors[0] }]} onPress={() => handleButtonClick(1)}>
            <Text style={styles.sizeTextBtn}>Courte</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btnSizeStory, { backgroundColor: buttonColors[1] }]} onPress={() => handleButtonClick(2)}>
            <Text style={styles.sizeTextBtn}>Moyenne</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btnSizeStory, { backgroundColor: buttonColors[2] }]} onPress={() => handleButtonClick(3)}>
            <Text style={styles.sizeTextBtn}>Longue</Text>
          </TouchableOpacity>
          <Text style={styles.titleContainer}>Type de fin</Text>
          <View style={styles.leftContainer}>
            <View style={styles.typeEndLeft}>
              <TouchableOpacity style={[styles.typeEndBtn, { borderColor: buttonTypeEnd[0] }]} onPress={() => handleButtonEndTypeClick(1)}>
                <ImageBackground style={styles.imagBgdAbo} source={require("../assets/ImageBibliotheque.png")}></ImageBackground>
                <Text style={styles.textTypeEnd}>Fin heureuse</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.typeEndLeft}>
              <TouchableOpacity style={[styles.typeEndBtn, { borderColor: buttonTypeEnd[1] }]} onPress={() => handleButtonEndTypeClick(2)}>
                <ImageBackground style={styles.imagBgdAbo} source={require("../assets/ImageBibliotheque.png")}></ImageBackground>
                <Text style={styles.textTypeEnd}>Fin triste</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.rightContainer}>
            <View style={styles.typeEndRight}>
              <TouchableOpacity style={[styles.typeEndBtn, { borderColor: buttonTypeEnd[2] }]} onPress={() => handleButtonEndTypeClick(3)}>
                <ImageBackground style={styles.imagBgdAbo} source={require("../assets/ImageBibliotheque.png")}></ImageBackground>
                <Text style={styles.textTypeEnd}>Fin ouverte</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.typeEndRight}>
              <TouchableOpacity style={[styles.typeEndBtn, { borderColor: buttonTypeEnd[3] }]} onPress={() => handleButtonEndTypeClick(4)}>
                <ImageBackground style={styles.imagBgdAbo} source={require("../assets/ImageBibliotheque.png")}></ImageBackground>
                <Text style={styles.textTypeEnd}>Fin morale</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.arrowContainer}>
              <TouchableOpacity style={styles.arrowBtn}>
                <Icon name='chevron-left' size={30} color={"#2C1A51"} onPress={() => handleStoryGeneration()} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.arrowBtn}>
                <Icon name='chevron-right' size={30} color={"#2C1A51"} onPress={() => handleStoryGeneration3()} />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        
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
    height: "75%",
    marginTop: "-12%",
  },
  title1: {
    fontFamily: "Lato_400Regular",
    color: "white",
    fontSize: 21,
    top: "50%",
    marginLeft: 10,
  },
  title2: {
    fontFamily: "Lato_400Regular",
    color: "#FFCE4A",
    fontSize: 16,
    top: "50%",
    marginLeft: 10,
  },
  title2bis: {
    fontFamily: "Lato_400Regular",
    color: "#FFCE4A",
    marginLeft: 300,
    top: "50%",
  },
  title3: {
    fontFamily: "Lato_400Regular",
    color: "white",
    top: "50%",
    marginLeft: 10,
  },
  containerInformation: {
    height: 650,
    // borderWidth: 2,
  },
  containerStory: {
    // height: 600,
    // // borderWidth: 2,
    // bottom: 30,
    // minHeight: "60%",
    // width: "90%",
    // borderRadius: 10,
    // backgroundColor: "#6B5F85",
    // padding: 20,
    height: 550,
    // borderWidth: 2,
    bottom: 60,
    minHeight: "60%",
    width: "90%",
    borderRadius: 10,
    backgroundColor: "#6B5F85",
    padding: 10,
  },
  leftContainer: {
    flexDirection: "row",
    width: "50%",
    // borderColor: "red",
    // borderWidth: 1,
    marginLeft: 10,
    top: 30,
    // margin: 10,
    // borderWidth: 1,
    // borderColor: "green",
  },
  rightContainer: {
    flexDirection: "row",
    width: "50%",
    bottom: 60,
    // borderColor: "red",
    // borderWidth: 1,
    marginLeft: 10,
    margin: 10,
  },

  titleContainer: {
    fontFamily: "Lato_400Regular",
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
  btnSizeStory: {
    borderColor: "white",
    backgroundColor: "#2C1A51",
    margin: 10,
    borderWidth: 1,
    borderColor: "#FFCE4A",
    borderRadius: 10,
    padding: 5,
  },
  btnSizeStoryOn: {
    backgroundColor: "#FFCE4A",
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
    // borderColor: "red",
    // borderWidth: 1,
    borderRadius: 15,
    margin: 10,
  },
  typeEndRight: {
    flexDirection: "column",
    width: "80%",
    height: "30%",
    bottom: 20,
    // borderColor: "red",
    // borderWidth: 1,
    borderRadius: 15,
    margin: 10,
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
    borderColor: "#FFCE4A",
    borderRadius: 10,
  },
  arrowBtn: {
    flexDirection: "row",
    // width: "90%",
    // borderWidth: 1,
    // borderColor: "red",
    right: 300,
    marginRight: 250,
    top: 80,
  },
  arrowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 70, // ajustez la marge supérieure selon vos besoins
  },
  tabBar: {
    marginTop: "200%",
    position: "absolute",
    zIndex: 1,
  },
});
