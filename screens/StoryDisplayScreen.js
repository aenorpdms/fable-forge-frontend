import { StyleSheet, Text, View, ScrollView } from "react-native";
import * as Font from "expo-font";
import { SafeAreaView } from "react-native-safe-area-context";

export default function StoryDisplayScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.containerInformation} indicatorStyle='white'>
        <View style={styles.containerStory}>
          <Text></Text>
        </View>
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
  },
});
