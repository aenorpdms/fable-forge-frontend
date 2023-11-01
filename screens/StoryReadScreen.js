import React, { useState, useEffect } from "react";
import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { API_KEY, API_URL } from "@env";
// import TabBar from "../TabBar";
import StoryBar from "../StoryBar";
import { fontSize } from "./SettingsScreen";
import { useSelector, useDispatch } from "react-redux";
import newStory, { addTitle, saveStory, emptyNewStory } from "../reducers/newStory";

export default function StoryReadScreen({ navigation }) {
  const selectedStory = useSelector(state => state.stories.value);
  const contentWithoutFin = selectedStory.story.replace(/(Fin\.|undefined)|null/g, "").trim();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.storyBar}>
        <StoryBar navigation={navigation} />
        <View style={styles.backgroundTab}></View>
      </View>
      <Text style={styles.titleStory}>{selectedStory.title}</Text>
      <ScrollView style={styles.containerStory}>
        <Text style={styles.textStory}>{contentWithoutFin}</Text>

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
  titleStory: {
    fontFamily: "Lato_700Regular",
    fontSize: 26,
    color: "white",
    textAlign: "center",
    margin: "2%",
    marginTop: 30,
  },
  textStory: {
    fontSize: 16,
    color: "#2C1A51",
    textAlign: "justify",
  },
  storyBar: {
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
  space: {
    height: 80,
    backgroundColor: "transparent",
  },
});
