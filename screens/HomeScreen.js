import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, ImageBackground, Modal, TextInput, SafeAreaView, Image } from "react-native";
import * as Font from "expo-font";

import { useState } from "react";

export default function HomeScreen({ navigation }) {

  const handleSubmit = () => {
    navigation.navigate("StoryGenerationScreen");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={styles.imagBgd}
        source={require('../assets/ImageBibliotheque.png')}
      >
        <Text style={styles.title1}>BIENVENUE PIERRE</Text>
        <Text style={styles.title2}>Où les histoires</Text>
        <Text style={styles.title2bis}>prennent vie...</Text>
      </ImageBackground>

      <TouchableOpacity style={styles.newStoryButton} onPress={() => handleSubmit()}>
          <Image
            style={styles.addButton}
            source={require('../assets/add-circle-outline.png')}
          />
          <Text style={styles.buttonText}>Créer une</Text>
          <Text style={styles.buttonText}>nouvelle histoire</Text>
      </TouchableOpacity>

      <Text style={styles.title3}>Votre dernière histoire</Text>

      <View style={styles.lastStoryButton}>
        <ImageBackground
          style={styles.storyImage}
          source={require('../assets/ImageBibliotheque.png')} //{{ uri: 'URL_DE_L'HISTOIRE' }}
        >
          <Text style={styles.storyTitle}>TITRE DE L'HISTOIRE</Text>
        </ImageBackground>
        <TouchableOpacity style={styles.readButton}>
          <Text style={styles.readButtonText}>Lire mon histoire</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView> 
  )
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
    height: 250,
  },

  title1: {
    fontFamily: "Lato",
    fontSize: 20,
    fontWeight: '200',
    textAlign: "left",
    color: "#FFFFFF",
    marginTop: 160,
    marginLeft: 16,
},

  title2: {
    fontFamily: "Lato",
    fontSize: 34,
    fontWeight: "500",
    textAlign: "left",
    color: "#FFFFFF",
    lineHeight: 60,
    marginLeft: 15,
  },

  title2bis: {
    fontFamily: "Lato",
    fontSize: 34,
    fontWeight: "500",
    textAlign: "left",
    color: "#FFFFFF",
    marginLeft: 15,
  },

  newStoryButton: {
    position: 'absolute',
    top: 300,
    width: '92%',
    height: '17%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#FFCE4A',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginVertical: 20,
  },

  addButton: {
    width: 30,
    height: 30,
    marginBottom: 20,
  },

  buttonText: {
    fontFamily: "Lato",
    color: 'white',
    fontSize: 16,
  },

  title3: {
    position: 'absolute',
    top: 470,
    fontFamily: "Lato",
    fontSize: 16,
    color: '#FFCE4A',
    alignSelf: 'flex-start',
    marginLeft: 16,
    marginTop: 20,
  },

  lastStoryButton: {
    position: 'absolute',
    top: 510,
    width: '92%',
    height: '21%',
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

readButton: {
    backgroundColor: '#2C1A51',
    borderWidth: 1,
    borderColor: '#FFCE4A',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
},

readButtonText: {
    color: 'white',
    fontSize: 14,
  },
  
});

