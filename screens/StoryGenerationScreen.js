import React from "react";
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// eslint-disable-next-line
import Carousel from "react-native-snap-carousel";

const StoryGenerationScreen = () => {
  // Story display page:
  const handleStoryDisplay = () => {
    // navigate to Story display page
    navigation.navigate("StoryDisplay");
  };

  const data = [
    {
      title: "Horreur",
      description: "lorem ipsum dolor sit amet consecteur adipiscing elit, sed do eiusmod tempor incididunt ut labor",
      image: require("../assets/Horreur.png"),
    },
    {
      title: "Aventure",
      description: "lorem ipsum dolor sit amet consecteur adipiscing elit, sed do eiusmod tempor incididunt ut labor",
      image: require("../assets/Aventure.png"),
    },
    {
      title: "Fantasy / SF",
      description: "lorem ipsum dolor sit amet consecteur adipiscing elit, sed do eiusmod tempor incididunt ut labor",
      image: require("../assets/Fantasy_SF.png"),
    },
    {
      title: "Policier Thriller",
      description: "lorem ipsum dolor sit amet consecteur adipiscing elit, sed do eiusmod tempor incididunt ut labor",
      image: require("../assets/Policier_Thriller.png"),
    },
    {
      title: "Romance",
      description: "lorem ipsum dolor sit amet consecteur adipiscing elit, sed do eiusmod tempor incididunt ut labor",
      image: require("../assets/Romance.png"),
    },
    {
      title: "Enfant",
      description: "lorem ipsum dolor sit amet consecteur adipiscing elit, sed do eiusmod tempor incididunt ut labor",
      image: require("../assets/Enfant.png"),
    },
  ];

  const renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.genreCard}>
          <View>
            <ImageBackground source={item.image} style={styles.genreImage}></ImageBackground>
          </View>
          <Text style={styles.genreDescription}>{item.description}</Text>
          <TouchableOpacity style={styles.selectButton} onPress={() => handleStoryDisplay("StoryDisplay")}>
            <Text style={styles.selectButtonText}>Sélectionner</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require("../assets/ImageBibliotheque.png")} style={styles.imagBgd} />
      <Carousel data={data} renderItem={renderItem} sliderWidth={Dimensions.get("window").width} itemWidth={300} />
    </SafeAreaView>
  );
};

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
    height: "100%",
    marginTop: "-12%",
  },
  slide: {
    width: 300,
    height: 500,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 10,
    padding: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  genreCard: {
    borderWidth: 1,
    borderColor: "#ffffff",
    borderRadius: 8,
    marginBottom: 20,
    flex: 1,
    justifyContent: "space-between",
  },
  genreImage: {
    height: 250,
    width: "100%",
    marginBottom: 12,
  },
  genreTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  genreDescription: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
    padding: 12,
  },
  selectButton: {
    width: 150,
    borderWidth: 1,
    borderColor: "#FFCE4A",
    backgroundColor: "#2C1A51",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    alignSelf: "center",
  },
  selectButtonText: {
    color: "white",
    fontSize: 14,
  },
});

export default StoryGenerationScreen;
