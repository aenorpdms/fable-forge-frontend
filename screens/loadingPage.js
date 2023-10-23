import React from "react";
import { StyleSheet, View, ImageBackground, ActivityIndicator } from "react-native";

const LoadingPage = () => {
  return (
    <ImageBackground style={styles.image} source={require("../assets/photoLoadingPage.png")}>
      <View style={styles.container}>{/* <ActivityIndicator size='large' color='#FFFFFF' /> */}</View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    backgroundColor: "#2C1A51", // Couleur souhaitée
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LoadingPage;
