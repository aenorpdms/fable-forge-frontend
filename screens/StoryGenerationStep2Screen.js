import React from "react";
import { View, Text, ImageBackground, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome";
import { useState } from "react";

export default function StoryGenerationStep2Screen({ navigation }) {
  const [buttonColor, setButtonColor] = useState("#2C1A51");

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
      <View style={styles.containerStory}>
        <ScrollView contentContainerStyle={styles.containerInformation} indicatorStyle='white'>
          <Text style={styles.titleContainer}>Longueur</Text>
          <TouchableOpacity style={styles.btnSizeStory} onPress={() => setButtonColor("#2C1A51")}>
            <Text style={styles.sizeTextBtn}>Courte</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnSizeStoryOn}>
            <Text style={styles.sizeTextBtnOn}>Moyenne</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnSizeStory}>
            <Text style={styles.sizeTextBtn}>Longue</Text>
          </TouchableOpacity>
          <Text style={styles.titleContainer}>Type de fin</Text>
          <View style={styles.leftContainer}>
            <View style={styles.typeEndLeft}>
              <ImageBackground style={styles.imagBgdAbo} source={require("../assets/ImageBibliotheque.png")}></ImageBackground>
              <Text style={styles.textTypeEnd}> fin heureuse</Text>
            </View>
            <View style={styles.typeEndLeft}>
              <ImageBackground style={styles.imagBgdAbo} source={require("../assets/ImageBibliotheque.png")}></ImageBackground>
              <Text style={styles.textTypeEnd}>fin triste</Text>
            </View>
          </View>
          <View style={styles.rightContainer}>
            <View style={styles.typeEndRight}>
              <ImageBackground style={styles.imagBgdAbo} source={require("../assets/ImageBibliotheque.png")}></ImageBackground>
              <Text style={styles.textTypeEnd}>fin ouverte</Text>
            </View>
            <View style={styles.typeEndRight}>
              <ImageBackground style={styles.imagBgdAbo} source={require("../assets/ImageBibliotheque.png")}></ImageBackground>
              <Text style={styles.textTypeEnd}>fin morale</Text>
            </View>
            <View style={styles.arrowContainer}>
              <TouchableOpacity style={styles.arrowBtn}>
                <Icon name='chevron-left' size={30} color={"#2C1A51"} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.arrowBtn}>
                <Icon name='chevron-right' size={30} color={"#FFCE4A"} />
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
    color: "white",
    fontSize: 21,
    top: "50%",
    marginLeft: 10,
  },
  title2: {
    color: "#FFCE4A",
    fontSize: 16,
    top: "50%",
    marginLeft: 10,
  },
  title2bis: {
    color: "#FFCE4A",
    marginLeft: 300,
    top: "50%",
  },
  title3: {
    color: "white",
    top: "50%",
    marginLeft: 10,
  },
  containerInformation: {
    height: 700,
    // borderWidth: 2,
  },
  containerStory: {
    height: 600,
    // borderWidth: 2,
    bottom: 30,
    minHeight: "60%",
    width: "90%",
    borderRadius: 10,
    backgroundColor: "#6B5F85",
    padding: 20,
  },
  leftContainer: {
    flexDirection: "row",
    width: "50%",
    // borderColor: "red",
    // borderWidth: 1,
    marginLeft: 10,
    top: 30,
    // margin: 10,
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
    height: "40%",
    bottom: 10,
    // borderColor: "red",
    // borderWidth: 1,
    borderRadius: 15,
    margin: 10,
  },
  typeEndRight: {
    flexDirection: "column",
    width: "80%",
    height: "40%",
    bottom: 60,
    // borderColor: "red",
    // borderWidth: 1,
    borderRadius: 15,
    margin: 10,
  },
  imagBgdAbo: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
    borderRadius: 15,
  },
  textTypeEnd: {
    textAlign: "center",
    color: "white",
    marginTop: 10,
  },
  arrowBtn: {
    flexDirection: "row",
    // width: "90%",
    // borderWidth: 1,
    // borderColor: "red",
    right: 300,
    marginRight: 250,
    top: 100,
  },
  arrowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20, // ajustez la marge supérieure selon vos besoins
  },
});
