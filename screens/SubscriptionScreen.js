import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, ImageBackground } from "react-native";
import * as Font from "expo-font";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SubscriptionScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground style={styles.imagBgd} source={require("../assets/ImageBibliotheque.png")}>
        <View style={styles.header}>
          <Text style={styles.title2}>Abonnement</Text>
          <Text style={styles.title3}>Votre abonnement sera renouvelé le 31/11/2023</Text>
        </View>
      </ImageBackground>
      {/* <View style={styles.containerInformation} indicatorStyle='white'> */}
      <View style={styles.abonnementContainer}>
        <View style={styles.aboPrice}>
          <ImageBackground style={styles.imagBgdAbo} source={require("../assets/ImageBibliotheque.png")}>
            <Text style={styles.textAboPrice}>Abonnement hebdomadaire 4.99€/ semaine (essayer gratuitement pendant 7jours) </Text>
            {/* <Text style={styles.textAboPrice}></Text> */}
          </ImageBackground>
        </View>
        <TouchableOpacity style={styles.btnPrice}>
          <Text style={styles.textBtnPrice}>Choisir</Text>
        </TouchableOpacity>
        <View style={styles.aboPrice}>
          <ImageBackground style={styles.imagBgdAbo} source={require("../assets/ImageBibliotheque.png")}>
            <Text style={styles.textAboPrice}>Abonnement mensuel 9.99€/ mois</Text>
          </ImageBackground>
        </View>
        <TouchableOpacity style={styles.btnPriceOn}>
          <Text style={styles.textBtnPriceOn}>En cours</Text>
        </TouchableOpacity>
        <View style={styles.aboPrice}>
          <ImageBackground style={styles.imagBgdAbo} source={require("../assets/ImageBibliotheque.png")}>
            <Text style={styles.textAboPrice}>Abonnement annuel 99.99€/ an</Text>
          </ImageBackground>
        </View>
        <TouchableOpacity style={styles.btnPrice}>
          <Text style={styles.textBtnPrice}>Choisir</Text>
        </TouchableOpacity>
        {/* <View style={styles.resiliation}> */}
        <TouchableOpacity>
          <Text style={styles.btnResiliation}> Résilier mon abonnement</Text>
        </TouchableOpacity>
      </View>
      {/* </View> */}
      {/* </View> */}
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
  header: {
    height: 300,
    top: 120,
    width: "100%",
  },

  imagBgd: {
    width: "100%",
    height: "70%",
  },
  title2: {
    // fontFamily: "Lato",
    fontSize: 34,
    fontWeight: "500",
    textAlign: "left",
    color: "#FFCE4A",
    top: 180,
    lineHeight: 60,
    marginLeft: 16,
  },
  title3: {
    color: "white",
    top: 180,
    marginLeft: 20,
  },

  abonnementContainer: {
    // top: 80,
    bottom: 180,
    width: "90%",
    // height: "80%",
    // borderColor: "red",
    // borderWidth: 1,
  },

  imagBgdAbo: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
    borderRadius: 15,
  },

  aboPrice: {
    borderColor: "white",
    height: "20%",
    width: "100%",
    borderWidth: 1,
    borderRadius: 15,
    marginBottom: -10,
  },

  textAboPrice: {
    color: "white",
    height: 70,
    top: "40%",
    width: "90%",
    textAlign: "center",
  },

  btnPrice: {
    backgroundColor: "#2C1A51",
    borderWidth: 1,
    borderColor: "#FFCE4A",
    width: 120,
    bottom: 15,
    height: 45,
    borderRadius: 10,
    marginLeft: 120,
    marginBottom: 20,
  },

  btnPriceOn: {
    backgroundColor: "#FFCE4A",
    width: 120,
    bottom: 15,
    height: 45,
    borderRadius: 10,
    marginLeft: 120,
    marginBottom: 20,
  },

  textBtnPriceOn: {
    color: "black",
    textAlign: "center",
    top: 10,
  },

  textBtnPrice: {
    color: "white",
    textAlign: "center",
    top: 10,
  },

  resiliation: {
    flex: 1,
  },

  btnResiliation: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "500",
    borderColor: "#FFFFFF",
    borderWidth: 1,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 10,
    backgroundColor: "#6B5F85",
    bottom: 10,
  },
});
