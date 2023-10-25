import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, ImageBackground, Modal, TextInput, SafeAreaView, Image, ScrollView } from "react-native";
import * as Font from "expo-font";

import { useState } from "react";

export default function StoriesScreen({ navigation }) {

  const handleDisplayStory = () => {
    navigation.navigate("StoryDisplay");
  };

// mockdata (faux tableau de data)
const storiesData = [
  {
    title: "Histoire 1",
    image: require("../assets/Horreur.png"),
    status: "En cours",
    button: "reprendre",
  },
  {
    title: "Histoire 2",
    image: require("../assets/Aventure.png"),
    status: "en cours",
    button: "reprendre",
  },
  {
    title: "Histoire 3",
    image: require("../assets/Fantasy_SF.png"),
    status: "terminée",
    button: "relire",
  },
  {
    title: "Histoire 4",
    image: require("../assets/Policier_Thriller.png"),
    status: "terminée",
    button: "relire",
  },
  {
    title: "Histoire 5",
    image: require("../assets/Romance.png"),
    status: "terminée",
    button: "relire",
  },
  {
    title: "Histoire 6",
    image: require("../assets/Enfant.png"),
    status: "terminée",
    button: "relire",
  },
];

// map sur le tableau et return 
const storiesList = storiesData.map((story, index) => (
  <View style={styles.storyButton} key={index}>
    <ImageBackground
      style={styles.storyImage}
      source={story.image} //{{ uri: 'URL_DE_L'HISTOIRE' }}
    >
      <Text style={styles.storyTitle}>{story.title}</Text>
      <Text style={styles.storyStatus}>{story.status}</Text>
    </ImageBackground>
    <TouchableOpacity style={styles.readButton} onPress={()=> handleDisplayStory()}>
      <Text style={styles.readButtonText}>{story.button}</Text>
    </TouchableOpacity>
  </View>
))

//dans le scrollview le tableau résultant du map

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.header}>

        <ImageBackground
          style={styles.imagBgd}
          source={require('../assets/ImageBibliotheque.png')}
        >
          <Text style={styles.title1}>Retrouvez toutes vos histoires</Text>
        </ImageBackground>
      </View>

      <View style={styles.scrollViewContainer}>
        <ScrollView  contentContainerStyle={styles.scrollView} indicatorStyle="white">
          {storiesList}
        </ScrollView>
      </View>
    </SafeAreaView> 
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: "#2C1A51",
  },

  header: {
    height: '25%', 
    width: '100%', 
  },

  imagBgd: {
    width: "100%",
  },

  title1: {
    //fontFamily: "Lato",
    fontSize: 20,
    fontWeight: '200',
    textAlign: "left",
    color: "#FFCE4A",
    marginTop: 160,
    marginLeft: 16,
},

  scrollView: {
    width: '100%',
  },

  scrollViewContainer: {
    flex: 2,
    width: "90%",
  },

  storiesContainer: {
    flex:3,
    height:'100%',
    alignItems: 'center',
  },

  storyButton: {
    width: '100%',
    height: 200,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginVertical: 20,
},

  storyImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
},

  storyTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
},

  storyStatus: {
    color: 'white',
    fontSize: 14,
  },

  readButton: {
    width: 100,
    backgroundColor: '#2C1A51',
    borderWidth: 1,
    borderColor: '#FFCE4A',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: -20,
  },

  readButtonText: {
    color: 'white',
    fontSize: 14,
  },
  
});

