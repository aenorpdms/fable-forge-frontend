import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Image } from "react-native";
import * as Font from "expo-font";
import { SafeAreaView } from "react-native-safe-area-context";
//import { TextInput } from "react-native-gesture-handler";

export default function SubscriptionPaymentScreen({ navigation }) {
  const handleReturnToPayment = () => {
    // return to subscription page
    navigation.navigate("Subscription");
  };

  //   console.log("payment screen");
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerTitles}>
        <Text style={styles.title1}>Paiement</Text>
        <Text style={styles.title2}>Choisissez votre méthode de paiement</Text>
        <Text style={styles.title3}>Vous serez débité une fois l'abonnement validé</Text>
      </View>
      <View style={styles.arrowContainer}>
        <TouchableOpacity style={styles.arrowBtn}>
          <Image source={require("../assets/arrow-circle-back.png")} size={30} color={"#FFCE4A"} onPress={() => handleReturnToPayment()} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.arrowBtn1}>
          <Image source={require("../assets/validationbtn.png")} size={30} color={"#FFCE4A"} />
        </TouchableOpacity>
      </View>
      {/* <View style={styles.header}></View> */}
      <View style={styles.containerPayment}>
        <View style={styles.inputPayment}>
          <Image source={require("../assets/buttonscanCard.png")} style={styles.scanCard} size={30} />
          <Text style={styles.titleInput}>Nom du propriétaire</Text>
          <TextInput style={styles.input}></TextInput>
          <Text style={styles.titleInput}>Numéro de carte</Text>
          <TextInput style={styles.input}></TextInput>
          <View style={styles.inputCard}>
            <Text style={styles.titleInput1}>CVC</Text>
            <TextInput style={styles.input1}>CVC</TextInput>
            <Text style={styles.titleInput1}>Date d'expiration</Text>
            <TextInput style={styles.input1}>MM/AA</TextInput>
          </View>
          <Text style={styles.title4}>sauvegarder mes informations pour la prochaine fois</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2C1A51",
  },
  containerTitles: {
    width: "90%",
    padding: 40,
    borderColor: "green",
    borderWidth: 1,
  },
  title1: {
    color: "#FFCE4A",
    fontFamily: "Lato_400Regular",
    fontSize: 34,
  },
  title2: {
    color: "white",
    width: "100%",
    fontFamily: "Lato_400Regular",
    borderColor: "red",
    borderWidth: 1,
    fontSize: 16,
  },
  title3: {
    color: "white",
    fontFamily: "Lato_400Regular",
    fontSize: 10,
  },
  scanCard: {
    left: 130,
    margin: 20,
  },
  titleInput: {
    color: "white",
    fontFamily: "Lato_400Regular",
  },
  input: {
    backgroundColor: "#6B5F85",
    textAlign: "center",
    borderRadius: 5,
    padding: 5,
    margin: 5,
  },
  inputCard: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titleInput1: {
    color: "white",
    fontFamily: "Lato_400Regular",
    left: 70,
  },
  input1: {
    backgroundColor: "#6B5F85",
    width: "30%",
    textAlign: "center",
    borderRadius: 5,
    padding: 5,
    margin: 5,
    top: 30,
    right: 20,
    color: "#FFCE4A",
  },
  arrowContainer: {
    position: "absolute",
    zIndex: 1,
    top: "100%",
    // backgroundColor: "purple",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    padding: 2,
    width: "100%",
  },
  arrowBtn: {
    bottom: 30,
    padding: 10,
  },
  arrowBtn1: {
    bottom: 30,
    padding: 10,
  },
  title4: {
    top: 70,
    color: "white",
    textAlign: "right",
    marginRight: 20,
  },
});
