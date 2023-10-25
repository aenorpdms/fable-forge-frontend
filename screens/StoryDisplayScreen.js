import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import * as Font from "expo-font";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

export default function StoryDisplayScreen({ navigation }) {
  //   const [generatedText, setGeneratedText] = useState("");

  //   const generateText = () => {
  //     // Generate your text here
  //     const newText = "This is the generated text.";
  //   setGeneratedText(newText);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.textTitle}>Titre de l'Histoire</Text>
      <View style={styles.containerStory}>
        <ScrollView style={styles.containerInformation} indicatorStyle='white'>
          {/* <Text style={styles.textStory}>{generatedText}</Text>
            <TouchableOpacity title='Generate Text' onPress={generateText} /> */}
          <Text style={styles.textStory}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever
            since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only
            five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
            release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker
            including versions of Lorem Ipsum.
          </Text>
          <Text style={styles.textStory}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever
            since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only
            five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
            release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker
            including versions of Lorem Ipsum.
          </Text>
          <Text style={styles.textStory}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever
            since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only
            five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
            release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker
            including versions of Lorem Ipsum.
          </Text>
          <Text style={styles.textStory}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever
            since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only
            five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
            release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker
            including versions of Lorem Ipsum.
          </Text>
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
});
