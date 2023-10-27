import React from "react";
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// eslint-disable-next-line
import Carousel from "react-native-snap-carousel";
import { useNavigation } from "@react-navigation/native";
import TabBar from "../TabBar";
import { useDispatch, useSelector } from "react-redux";
import { updateNewType } from "../reducers/newStory";

export default function StoryGenerationScreen() {
  // Story display page:
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const newStory = useSelector(state => state.newStory.value);
  const handleStoryGeneration2 = item => {
    // navigate to Story step 2 page
    const type = item;
    dispatch(updateNewType(type));
    navigation.navigate("StoryGeneration2");
  };
  console.log(newStory);

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
      title: "Policier / Thriller",
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
          <TouchableOpacity style={styles.selectButton} onPress={() => handleStoryGeneration2(item.title)}>
            <Text style={styles.selectButtonText}>Sélectionner</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require("../assets/ImageBibliotheque.png")} style={styles.imagBgd}>
        <Text style={styles.title1}>Création d'une histoire</Text>
        <Text style={styles.title2}>Choisissez un genre</Text>
        <Text style={styles.title2bis}>Etape 1/3</Text>
      </ImageBackground>
      <Carousel data={data} renderItem={renderItem} sliderWidth={Dimensions.get("window").width} itemWidth={300} />
      <TabBar navigation={navigation}/>
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
  imagBgd: {
    flex: 2,
    width: "100%",
    height: "100%",
    marginTop: "-12%",
  },
  title1: {
    fontFamily: "Lato_400Regular",
    color: "white",
    fontSize: 21,
    top: "50%",
    marginLeft: 10,
  },
  title2: {
    fontFamily: "Lato_400Regular",
    color: "#FFCE4A",
    fontSize: 16,
    top: "50%",
    marginLeft: 10,
  },
  title2bis: {
    fontFamily: "Lato_400Regular",
    color: "#FFCE4A",
    marginLeft: 300,
    top: "50%",
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
    fontFamily: "Lato_400Regular",
    fontSize: 20,
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
    fontFamily: "Lato_400Regular",
    color: "white",
    fontSize: 20,
    marginBottom: 10,
  },
  genreDescription: {
    fontFamily: "Lato_400Regular",
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
    fontFamily: "Lato_400Regular",
    color: "white",
    fontSize: 14,
  },
});

// export default StoryGenerationScreen;
