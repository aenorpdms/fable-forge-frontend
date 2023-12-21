import React, { useState, useEffect } from "react";
import Typewriter from "react-native-typewriter";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import StoryBar from "../components/StoryBar";
import { useSelector } from "react-redux";

let ws;
export default function StoryDisplayScreen({ navigation, route }) {
  const { type, length, endingType, selectedMusic } = route.params;
  const [chunks, setChunks] = useState([]);
  const [titleStory, setTitleStory] = useState("");
  const user = useSelector((state) => state.user.value);
  const [isGenerating, setIsGenerating] = useState(false);
  const [storyEnd, setStoryEnd] = useState(false);
  const [lastChunkIndex, setLastChunkIndex] = useState(-1);

  useEffect(() => {
    ws = new WebSocket("wss://fable-forge.onrender.com");

    ws.onopen = () => {
      console.log("Connected to backend");
      console.log(type, length, endingType);
      setIsGenerating(true);
      const requestData = {
        type: "generate-story",
        data: { type, endingType, length },
      };
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(requestData));
      } else {
        console.error("WebSocket not open for sending data.");
      }
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.data.title) {
        setTitleStory(data.data.title);
        console.log("title handle");
      }

      if (data.data.chunk) {
        setIsGenerating(false);
        setChunks((prevChunks) => [...prevChunks, data.data.chunk.trim()]);
      }

      if (data.type == "storyEnd") {
        console.log("story end", titleStory);
        setStoryEnd(true);
      } else if (data.type == "storyChunk") {
        console.log("generating");
      }
    };

    ws.onerror = (error) => {
      console.error("Socket error:", error);
    };

    ws.onclose = (e) => {
      console.log("Socket closed:", e.code, e.reason);
    };

    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    if (chunks.length > 0) {
      setLastChunkIndex(chunks.length - 1); // Update the last chunk index when chunks change
    }
  }, [chunks]);

  const sendToBDD = () => {
    fetch(`https://fable-forge.onrender.com/stories/new/${user.token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        length,
        title: titleStory,
        story: chunks,
        ending: endingType,
        type,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Story register to BDD");
      });
  };

  if (storyEnd) {
    sendToBDD();
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tabBar}>
        <StoryBar
          navigation={navigation}
          route={route}
          selectedMusic={selectedMusic}
        />
        <View style={styles.backgroundTab}></View>
      </View>
      <Text style={styles.titleStory}>{titleStory}</Text>
      <ScrollView
        style={[
          styles.containerStory,
          { backgroundColor: user.mode === "dark" ? "#180A34" : "white" },
        ]}
      >
        {isGenerating && (
          <ActivityIndicator
            style={styles.tournicoti}
            size="large"
            color="#2C1A51"
          />
        )}
        {chunks.map((chunk, index) => (
          <Text
            key={index}
            style={[
              styles.textStory,
              {
                fontSize: user.fontSizeSet,
                color: user.mode === "dark" ? "#F6F2FF" : "#2C1A51",
              },
            ]}
          >
            {index === lastChunkIndex ? (
              <Typewriter typing={1} maxDelay={50}>
                {chunk.trim()}
              </Typewriter>
            ) : (
              chunk.trim()
            )}
          </Text>
        ))}
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

  // Style tabBar
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

  // Style générateur/lecteur d'histoire
  titleStory: {
    fontFamily: "Lato_700Bold_Italic",
    fontSize: 26,
    color: "white",
    textAlign: "center",
    margin: "2%",
    marginTop: 30,
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
    fontFamily: "Lato_700Bold",
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
  btngenerateStory: {
    margin: "1%",
    borderRadius: 10,
    padding: 5,
    position: "absolute",
    backgroundColor: "#6B5F85",
    borderWidth: 1,
    borderColor: "#FFFFFF",
    bottom: "18%",
  },
  generateTextBtn: {
    fontFamily: "Lato_400Regular",
    color: "white",
    textAlign: "center",
    padding: 10,
  },

  // Style ActivityIndicator
  tournicoti: {
    position: "absolute",
    left: "45%",
    top: "50%",
  },

  //
  space: {
    height: 120,
    backgroundColor: "transparent",
  },
});
