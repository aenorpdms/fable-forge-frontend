import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, ImageBackground, Modal, TextInput, SafeAreaView, Image, ScrollView } from "react-native";
import * as Font from "expo-font";

import TabBar from "../TabBar";

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
    button: "Reprendre",
  },
  {
    title: "Histoire 2",
    image: require("../assets/Aventure.png"),
    status: "En cours",
    button: "Reprendre",
  },
  {
    title: "Histoire 3",
    image: require("../assets/Fantasy_SF.png"),
    status: "Terminée",
    button: "Relire",
  },
  {
    title: "Histoire 4",
    image: require("../assets/Policier_Thriller.png"),
    status: "Terminée",
    button: "Relire",
  },
  {
    title: "Histoire 5",
    image: require("../assets/Romance.png"),
    status: "Terminée",
    button: "Relire",
  },
  {
    title: "Histoire 6",
    image: require("../assets/Enfant.png"),
    status: "Terminée",
    button: "Relire",
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
          <Text style={styles.title1}>Bibliothèque</Text>
        </ImageBackground>
      </View>
      <View style={styles.tabBar}>
        <TabBar navigation={navigation} />
        <View style={styles.backgroundTab}></View>
      </View>
      <View style={styles.scrollViewContainer}>
        <ScrollView  contentContainerStyle={styles.scrollView} indicatorStyle="white">
          {storiesList}
          <View style={styles.space}>
          </View>
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
    flex: 1,
    width: "100%",
    height: "104%",
    marginTop:"-12%"
   
  },

  title1: {
    fontFamily: "Lato_400Regular",
    fontSize: 32,
    color: "#FFCE4A",
    marginTop: "49.5%",
    marginLeft: "4%",
  },

  scrollView: {
    width: '100%',
  },

  scrollViewContainer: {
    flex: 1,
    width: "90%",
   
  },

  storiesContainer: {
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
    marginVertical: "6%",
},

  storyImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    overflow:"hidden",
    justifyContent: 'center',
    alignItems: 'center',
},

  storyTitle: {
    fontFamily: "Lato_400Regular",
    color: 'white',
    fontSize: 24,
},

  storyStatus: {
    fontFamily: "Lato_400Regular",
    color: 'white',
    fontSize: 18,
  },

  readButton: {
    width: "50%",
    backgroundColor: '#2C1A51',
    borderWidth: 1,
    borderColor: '#FFCE4A',
    padding: 10,
    borderRadius: 10,
    marginTop: "-6%", 
   },

  readButtonText: {
    fontFamily: "Lato_400Regular",
    color: 'white',
    fontSize: 16,
    textAlign:"center"
  },
  tabBar: {
    marginTop: "104%",
    position: "absolute",
    zIndex: 1,
  },
  backgroundTab:{
    backgroundColor:"#2C1A51",
    top: "95%", 
    position: "absolute",
    zIndex: -1,
    height: "120%",
    width: 650,
    marginLeft:-400,
    marginTop:-40,
   
  },
  space: {
    padding: 10,
    height: 80,
    backgroundColor:"transparent",
  }
});

