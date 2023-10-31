import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Image, ImageBackground } from "react-native";
import * as Font from "expo-font";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
// import { Subscription } from "react-redux";
import { useSelector } from "react-redux";

export default function SubscriptionPaymentScreen({ navigation, route }) {
  const handleSubscription = () => {
    navigation.navigate("Subscription");
  };

  const [choix1, setChoix1] = useState(0);
  const [choix2, setChoix2] = useState(0);
  const [choix3, setChoix3] = useState(0);

  const [numberToFillInInput, setNumberToFillInInput] = useState("");
  const [numberToFillInInputError, setNumberToFillInInputError] = useState("");
  const [letterToFillInInput, setLetterToFillInInput] = useState("");
  const [letterToFillInInputError, setLetterToFillInInputError] = useState("");

  const [cvc, setCvc] = useState("");
  const [cvcError, setCvcError] = useState("");

  // Access the subscription value from the state
  // const subscription = useSelector(state => state.payment.value);

  const handleCvcChange = text => {
    setCvc(text);
    if (!/^[0-9]+$/.test(text)) {
      setCvcError("Veuillez entrer uniquement des chiffres");
    } else {
      setCvcError("");
    }
  };

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

  const handleLetterChange = text => {
    setLetterToFillInInput(text);
    if (!/^[a-zA-Z\s]+$/.test(text)) {
      setLetterToFillInInput("Veuillez entrer uniquement des lettres et des espaces");
    } else {
      setLetterToFillInInput("");
    }
  };

  const [isSaveInfosClicked, setIsSaveInfosClicked] = useState(false);

  const handleButtonClick = () => {
    setIsSaveInfosClicked(!isSaveInfosClicked);
  };

  const handleValidationAbo = () => {};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerTitles}>
        <View style={styles.recapAbo}></View>
        <Text style={styles.textRecapAbo}>
          Vous avez choisi l'abonnement:
          {/* {subscription.type} au prix de {subscription.price} */}
        </Text>

        <Text style={styles.title1}>Paiement</Text>
        <Text style={styles.title2}>Choisissez votre méthode de paiement</Text>
        <Text style={styles.title3}>Vous serez débité une fois l'abonnement validé</Text>
      </View>
      <View style={styles.typeOfPayment}>
        <Text style={styles.textTypeOfPayment}>Visa</Text>
        <TouchableOpacity onPress={() => handleClickChoix1()} style={[styles.choix, choix1 === 1 && styles.choixSelectionne]}></TouchableOpacity>
        <Text style={styles.textTypeOfPayment}>Paypal</Text>
        <TouchableOpacity onPress={() => handleClickChoix2()} style={[styles.choix, choix2 === 1 && styles.choixSelectionne]}></TouchableOpacity>
        <Text style={styles.textTypeOfPayment}>ApplePay</Text>
        <TouchableOpacity onPress={() => handleClickChoix3()} style={[styles.choix, choix3 === 1 && styles.choixSelectionne]}></TouchableOpacity>
      </View>
      <View style={styles.containerPayment}>
        <View style={styles.inputPayment}>
          <Image source={require("../assets/buttonscanCard.png")} style={styles.scanCard} size={30} />
          <Text style={styles.titleInput}>Nom du propriétaire</Text>
          <TextInput style={styles.input} value={letterToFillInInput} onChangeText={handleLetterChange} />
          {letterToFillInInputError ? <Text style={styles.errorText}>{letterToFillInInputError}</Text> : null}
          <Text style={styles.titleInput}>Numéro de carte</Text>
          <TextInput style={styles.input} value={numberToFillInInput} onChangeText={handleCvcChange}></TextInput>
        </View>
        <View style={styles.inputCard}>
          {/* <View style={styles.inputRow}> */}
          <Text style={styles.titleInput1}>CVC</Text>
          <TextInput style={styles.input1} placeholder='CVC' placeholderTextColor={"#FFCE4A"} value={cvc} onChangeText={handleCvcChange} />
          {cvcError ? <Text style={styles.errorText}>{cvcError}</Text> : null}
          {/* </View> */}
          {/* <View style={styles.inputRow}> */}
          <FontAwesomeIcon icon={faCircle} style={styles.circleIcon} />
          <Text style={styles.titleInput2}>Date d'expiration</Text>
          <TextInput style={styles.input1} placeholder='MM/AA' placeholderTextColor={"#FFCE4A"}></TextInput>
          {/* </View> */}
        </View>
      </View>
      {/* <View style={styles.btnSaved}> */}
      <View style={styles.alignBtnSaved}>
        <TouchableOpacity
          style={[styles.choixInfoSaved, isSaveInfosClicked === true && styles.choixSelectionneSaved]}
          onPress={() => handleButtonClick()}
        ></TouchableOpacity>
        <Text style={styles.title4}>Sauvegarder mes informations pour la prochaine fois</Text>
      </View>
      {/* </View> */}
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
    width: "95%",
    // padding: 40,
    bottom: 90,
    // borderWidth: 2,
    // borderColor: "green",
    left: 15,
  },
  recapAbo: {
    flex: 3,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    // width: "100%",
    // marginTop: "15%",
    width: "92%",
    padding: 45,
    borderWidth: 1,
    borderColor: "#FFCE4A",
    borderRadius: 10,
    alignItems: "center",
    marginVertical: "5%", //20
  },

  textRecapAbo: {
    textAlign: "center",
    color: "white",
    bottom: 90,
    right: 30,
  },

  title1: {
    color: "#FFCE4A",
    fontFamily: "Lato_400Regular",
    fontSize: 34,
    marginBottom: 10,
  },
  title2: {
    color: "white",
    width: "100%",
    fontFamily: "Lato_400Regular",
    fontSize: 16,
    marginBottom: 10,
  },
  title3: {
    color: "white",
    fontFamily: "Lato_400Regular",
    fontSize: 10,
  },
  typeOfPayment: {
    flexDirection: "row",
    justifyContent: "space-around",
    bottom: 50,
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
    margin: 20,
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
    bottom: 40,
  },
  titleInput: {
    color: "white",
    fontFamily: "Lato_400Regular",
    marginLeft: 10,
    bottom: 30,
  },
  input: {
    backgroundColor: "#6B5F85",
    textAlign: "center",
    borderRadius: 10,
    padding: 5,
    margin: 10,
    bottom: 30,
  },
  inputCard: {
    flexDirection: "row",
    justifyContent: "space-around",
    bottom: 30,
  },
  // inputRow: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   marginBottom: 10,
  // },
  titleInput1: {
    color: "white",
    fontFamily: "Lato_400Regular",
    left: 15,
  },
  titleInput2: {
    color: "white",
    fontFamily: "Lato_400Regular",
    left: 90,
  },
  input1: {
    backgroundColor: "#6B5F85",
    width: "30%",
    textAlign: "center",
    borderRadius: 10,
    padding: 5,
    // margin: 5,
    top: 30,
    right: 17,
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
    // bottom: 10,
  },
  arrowBtn: {
    bottom: 30,
    padding: 10,
  },
  arrowBtn1: {
    bottom: 30,
    padding: 10,
  },

  alignBtnSaved: {
    width: "80%",
    // borderWidth: 1,
    // borderColor: "green",
    top: 90,
  },

  choixInfoSaved: {
    width: 15,
    height: 15,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "gray",
    marginVertical: 2,
    // top: 20,
    right: 5,
    bottom: 60,

    // width: 15,
    // height: 15,
    // borderRadius: 25,
    // borderWidth: 2,
    // borderColor: "gray",
    // marginVertical: 2,
    // top: 0, // Update this value to align the button and the text
    // left: 190,
  },

  title4: {
    width: "100%",
    color: "white",
    textAlign: "center",
    left: 15,
    bottom: 80,
  },
});
