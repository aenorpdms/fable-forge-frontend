import React, { useState, useEffect} from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import StoryBar from "../StoryBar";
import { useSelector, useDispatch } from "react-redux";


let ws = new WebSocket('ws://192.168.1.4:8001')

export default function StoryDisplayScreen({ navigation, route}) {
  const { length, endType, selectedType} = route.params;
  const [chunks, setChunks] = useState([]);
  const [titleHandle, setTitleHandle] = useState(false)
  const [titleStory, setTitleStory] = useState("");
  const user = useSelector((state) => state.user.value);
  const [isGenerating, setIsGenerating] = useState(false);


  useEffect(() => {
    ws = new WebSocket('ws://192.168.1.4:8001')

    setIsGenerating(true);

    ws.onopen = () => {
      console.log('Connected to backend');
      const requestData = {
        type: "generate-story",
        data: {type: selectedType,endingType: endType,length,}};

      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(requestData));
        console.log('send')
      } else {
        console.error("WebSocket not open for sending data.");
      }
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Received message", data.data.title)
     if (data.data.title && !titleHandle) {
          setTitleStory(data.data.title);
          setTitleHandle(true)
        }
     if (data.data.chunk) {
        setChunks((prevChunks) => [...prevChunks, data.data.chunk.trim()]);
      }
     if (data.data.type === "error") {
        console.error("Error from server:", data.data.error);
      } else if (data.data.type === "result") {
        console.log("Received result:", data.data.result);
    }}
    
    ws.onerror = (error) => {
      console.error("Socket error:", error);
    };

    ws.onclose = (e) => {
      console.log("Socket closed:", e.code, e.reason)
    }

    return () => {
      ws.close();
    };

  }, []);

  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tabBar}>
        <StoryBar navigation={navigation} />
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
            {chunk.trim()}
          </Text>
        ))}
        <View style={styles.space}></View>
      </ScrollView>
      {/* {showGenerateButton && (
        <TouchableOpacity style={styles.btngenerateStory} onPress={handleGenerateStory}>
          <Text style={styles.generateTextBtn}>Générer mon histoire</Text>
        </TouchableOpacity>
      )} */}
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
