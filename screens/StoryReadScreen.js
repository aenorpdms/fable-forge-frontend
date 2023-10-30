import React, { useState, useEffect } from "react";
import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { API_KEY, API_URL } from "@env";
import TabBar from "../TabBar";
import { fontSize } from "./SettingsScreen";
import { useSelector, useDispatch } from 'react-redux';
import newStory, { addTitle,saveStory, emptyNewStory } from "../reducers/newStory";


export default function StoryReadScreen({navigation }) {

  const story = useSelector((state) => state.newStory.value)
  const contentWithoutFin = story.story.replace(/(Fin\.|undefined)|null/g, '').trim();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tabBar}>
        <TabBar navigation={navigation} />
        <View style={styles.backgroundTab}></View>
      </View>
      <ScrollView style={styles.containerStory}>
       
        <Text style={styles.titleStory}>{story.title}</Text>

          <Text  style={styles.textStory}>
              {contentWithoutFin}
          </Text>
      
        <View style={styles.space}></View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2C1A51",
    padding: 20,
  },
  containerStory: {
    flex: 2,
    marginHorizontal: 30,
    marginVertical: 20,
    borderRadius: 10,
    backgroundColor: "white",
    padding: 20,
    width: "92%",
  },
  titleStory:{
    fontSize: 20,
    fontWeight:"bold",
    textAlign: "center",
    marginBottom: 30,
    marginTop: 10
  },
  textStory: {
    fontSize: 16,
    color: "black",
    textAlign:"justify"
  },
  btngenerateStory: {
    borderColor: "#FFCE4A",
    backgroundColor: "#2C1A51",
    margin: 10,
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    marginTop: 2,
    marginBottom: 65,
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
  backgroundTab: {
    backgroundColor: "#2C1A51",
    top: "95%",
    position: "absolute",
    zIndex: -1,
    height: 100,
    width: 650,
    marginLeft: -400,
    marginTop: -20,
  },
  tournicoti: {
    position: "absolute",
    left: 120,
    top: 250,
  },
  space: {
    height: 80,
    backgroundColor: 'transparent',
  },
});