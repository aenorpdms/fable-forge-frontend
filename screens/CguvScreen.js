import { StyleSheet, Text, TouchableOpacity, View, ImageBackground, Modal, TextInput } from "react-native";
import * as Font from "expo-font";

import { useState } from "react";

export default function ProfilScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.imagBgd} source={require("../assets/ImageBibliotheque.png")}>
        <Text style={styles.title2}>Paramètres</Text>
      </ImageBackground>
      <View style={styles.textCguv}>
        <Text>Conditions Générales de Vente (CGV)</Text>
      </View>
    </View>
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
    marginTop: "-12%",
    width: "100%",
    height: "65%",
  },
});
