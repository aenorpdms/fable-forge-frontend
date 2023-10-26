import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useRef } from "react";
import { UseSelector } from "react-redux";
import TabBar from "../TabBar";

export default function StoryDisplayScreen({ navigation }) {
  const [story, setStory] = useState("");
  const [title, setTitle] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.textTitle}>{title}</Text>
      <View style={styles.containerStory}>
        <ScrollView style={styles.containerInformation} indicatorStyle='white'>
          <Text style={styles.textStory}>{story}</Text>
        </ScrollView>
        <View style={styles.tabBar}>
          <TabBar navigation={navigation} />
        </View>
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
  textTitle: {
    color: "white",
    fontSize: 32,
    top: 20,
    fontWeight: "bold",
  },
  containerStory: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 70,
    borderRadius: 10,
    backgroundColor: "white",
    padding: 20,
  },
  containerInformation: {
    flexGrow: 1,
  },
  textStory: {
    fontSize: 16,
    color: "black",
  },
  tabBar: {
    top: 72,
  },
});
