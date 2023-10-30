import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Image, ImageBackground } from "react-native";
import * as Font from "expo-font";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { Subscription } from "react-redux";

export default function SubscriptionPaymentScreen({ navigation, route }) {
  const handleSubscription = () => {
    navigation.navigate("Subscription");
  };

  const [choix1, setChoix1] = useState(0);
  const [choix2, setChoix2] = useState(0);
  const [choix3, setChoix3] = useState(0);

  const handleClickChoix1 = () => {
    setChoix1(1);
    setChoix2(0);
    setChoix3(0);
  };

  const handleClickChoix2 = () => {
    setChoix1(0);
    setChoix2(1);
    setChoix3(0);
  };

  const handleClickChoix3 = () => {
    setChoix1(0);
    setChoix2(0);
    setChoix3(1);
  };

  const [isSaveInfosClicked, setIsSaveInfosClicked] = useState(false);

  const handleButtonClick = () => {
    setIsSaveInfosClicked(!isSaveInfosClicked);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground style={styles.imagBgd} source={require("../assets/ImageBibliotheque.png")}>
        {/* <Text style={styles.title1}>Bienvenue Pierre</Text> */}
      </ImageBackground>
      <View style={styles.containerTitles}>
        {/* <Text>
          Vous avez choisi l'abonnement {subscription.type} au prix de {subscription.price}
        </Text> */}
        <Text style={styles.title1}>Paiement</Text>
        <Text style={styles.title2}>Choisissez votre méthode de paiement</Text>
        <Text style={styles.title3}>Vous serez débité une fois l'abonnement validé</Text>
        <View style={styles.typeOfPayment}>
          <Text style={styles.textTypeOfPayment}>Visa</Text>
          <TouchableOpacity onPress={() => handleClickChoix1()} style={[styles.choix, choix1 === 1 && styles.choixSelectionne]}></TouchableOpacity>
          <Text style={styles.textTypeOfPayment}>Paypal</Text>
          <TouchableOpacity onPress={() => handleClickChoix2()} style={[styles.choix, choix2 === 1 && styles.choixSelectionne]}></TouchableOpacity>
          <Text style={styles.textTypeOfPayment}>ApplePay</Text>
          <TouchableOpacity onPress={() => handleClickChoix3()} style={[styles.choix, choix3 === 1 && styles.choixSelectionne]}></TouchableOpacity>
        </View>
      </View>
      <View style={styles.containerPayment}>
        <View style={styles.inputPayment}>
          <Image source={require("../assets/buttonscanCard.png")} style={styles.scanCard} size={30} />
          <Text style={styles.titleInput}>Nom du propriétaire</Text>
          <TextInput style={styles.input}></TextInput>
          <Text style={styles.titleInput}>Numéro de carte</Text>
          <TextInput style={styles.input}></TextInput>
          <View style={styles.inputCard}>
            <View style={styles.inputRow}>
              <Text style={styles.titleInput1}>CVC</Text>
              <TextInput style={styles.input1} placeholder='CVC' placeholderTextColor={"#FFCE4A"}></TextInput>
            </View>
            <View style={styles.inputRow}>
              <FontAwesomeIcon icon={faCircle} style={styles.circleIcon} />
              <Text style={styles.titleInput2}>Date d'expiration</Text>
              <TextInput style={styles.input1} placeholder='MM/AA' placeholderTextColor={"#FFCE4A"}></TextInput>
            </View>
          </View>
          <TouchableOpacity
            style={[styles.choixInfoSaved, isSaveInfosClicked === true && styles.choixSelectionneSaved]}
            onPress={() => handleButtonClick()}
          ></TouchableOpacity>
          <Text style={styles.title4}>Sauvegarder mes informations pour la prochaine fois</Text>
        </View>
      </View>
      <View style={styles.arrowContainer}>
        <TouchableOpacity style={styles.arrowBtn} onPress={() => handleSubscription()}>
          <Image source={require("../assets/arrow-circle-back.png")} size={30} color={"#FFCE4A"} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.arrowBtn1}>
          <Image source={require("../assets/validationbtn.png")} size={30} color={"#FFCE4A"} />
        </TouchableOpacity>
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
    bottom: 50,
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
    fontSize: 16,
  },
  title3: {
    color: "white",
    fontFamily: "Lato_400Regular",
    fontSize: 10,
  },
  typeOfPayment: {
    flexDirection: "row",
    justifyContent: "space-around",
    top: 80,
  },
  textTypeOfPayment: {
    color: "#FFCE4A",
  },
  choix: {
    width: 15,
    height: 15,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "gray",
    marginVertical: 2,
  },
  choixInfoSaved: {
    width: 15,
    height: 15,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "gray",
    marginVertical: 2,
    top: 120,
    left: 190,
  },
  choixSelectionne: {
    backgroundColor: "#FFCE4A",
  },
  choixSelectionneSaved: {
    backgroundColor: "#FFCE4A",
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
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  titleInput1: {
    color: "white",
    fontFamily: "Lato_400Regular",
    left: 25,
  },
  titleInput2: {
    color: "white",
    fontFamily: "Lato_400Regular",
    left: 75,
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
    width: "100%",
    color: "white",
    textAlign: "center",
  },
});
