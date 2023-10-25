import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, ImageBackground, Modal, TextInput, SafeAreaView, Image } from "react-native";
import * as Font from "expo-font";
import { useDispatch, useSelector } from "react-redux";

import { useState } from "react";

export default function HomeScreen({ navigation }) {

  const user = useSelector((state) => state.user.value)
  const nameUser = user.user.firstname
  const readyName = nameUser.toUpperCase()

  const handleSubmit = () => {
    navigation.navigate("StoryGenerationScreen");
  };

  const handleDisplayStory = () => {
    navigation.navigate("StoryDisplay");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={styles.imagBgd}
        source={require('../assets/ImageBibliotheque.png')}
      >
        <Text style={styles.title1}>BIENVENUE {readyName}</Text>
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
        <View> 

        </View>
        <ImageBackground style={styles.storyImage} source={require('../assets/ImageBibliotheque.png')} /*{{ uri: 'URL_DE_L'HISTOIRE' }}*/ >
          <Text style={styles.storyTitle}>TITRE DE L'HISTOIRE</Text>
        </ImageBackground>

        <TouchableOpacity style={styles.readButton} onPress={()=> handleDisplayStory()}>
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
    height: "29.5%",
    marginTop:"-12%"
  },

  title1: {
    //fontFamily: "Lato",
    fontSize: 20,
    fontWeight: '200',
    textAlign: "left",
    color: "#FFFFFF",
    marginTop: 205,
    marginLeft: 16,
},

  title2: {
    fontFamily: "Lato",
    fontSize: 34,
    fontWeight: "500",
    textAlign: "left",
    color: "#FFFFFF",
    lineHeight: 40,
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
    top: '38%',
    width: '92%',
    height: '17%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#FFCE4A',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginVertical: 20,
  },

  addButton: {
    width: 30,
    height: 30,
    marginTop: 10,
    marginBottom: 10,
  },

  buttonText: {
    fontFamily: "Lato",
    color: 'white',
    fontSize: 16,
  },

  title3: {
    position: 'absolute',
    top: '62%',
    fontFamily: "Lato",
    fontSize: 16,
    color: '#FFCE4A',
    alignSelf: 'flex-start',
    marginLeft: 16,
    marginTop: 20,
  },

  lastStoryButton: {
    position: 'absolute',
    top: '67%',
    width: '92%',
    height: '21%',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 10,
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
    width: 150,
    borderWidth: 1,
    borderColor: "#FFCE4A",
    backgroundColor: "#2C1A51",
    padding: 15,
    marginTop: -25,
    borderRadius: 8,
    alignItems: "center",
    alignSelf: "center",
},

readButtonText: {
    color: 'white',
    fontSize: 14,
  },
  
});

