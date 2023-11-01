import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Image,
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { useRoute, useNavigation } from "@react-navigation/native";

export default function SubscriptionPaymentScreen() {
  const { subscriptions, activeSubscription } = useSelector(
    (state) => state.subscription
  );

  const route = useRoute();
  const navigation = useNavigation();
  const { subscription } = route.params;

  // Vérifiez si subscription est défini
  if (!subscription) {
return (
      <View>
        <Text>Subscription is not defined</Text>
      </View>
    );
  }

  
  const [choix1, setChoix1] = useState(0);
  const [choix2, setChoix2] = useState(0);
  const [choix3, setChoix3] = useState(0);

  const [numberToFillInInput, setNumberToFillInInput] = useState("");
  const [numberToFillInInputError, setNumberToFillInInputError] = useState("");
  const [letterToFillInInput, setLetterToFillInInput] = useState("");
  const [letterToFillInInputError, setLetterToFillInInputError] = useState("");

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

  const handleLetterChange = (text) => {
    setLetterToFillInInput(text);
    if (!/^[a-zA-Z\s]+$/.test(text)) {
      setLetterToFillInInput(
        "Veuillez entrer uniquement des lettres et des espaces"
      );
    } else {
      setLetterToFillInInput("");
    }
  };

  const handleNumberChange = (text) => {
    setNumberToFillInInput(text);
    if (!/^[0-9]+$/.test(text)) {
      setNumberToFillInInputError("Veuillez entrer uniquement des chiffres");
    } else {
      setNumberToFillInInputError("");
    }
  };

  const [isSaveInfosClicked, setIsSaveInfosClicked] = useState(false);

  const handleButtonClick = () => {
    setIsSaveInfosClicked(!isSaveInfosClicked);
  };

  const activeImage = activeSubscription
    ? subscriptions.find(
        (subscription) => subscription.id === activeSubscription
      ).imageSource
    : null;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerTitles}>
       <View style={styles.recapAbo}>
          <ImageBackground source={activeImage} style={styles.backgroundImage}>
            <Text style={styles.textRecapAbo}>{subscription.type}</Text>
            <Text style={styles.textRecapAbo}>{subscription.price}</Text>
          </ImageBackground>
       </View>
        <TouchableOpacity style={styles.choisi}>
          <Text style={styles.textBtnPrice}>Choisi</Text>
        </TouchableOpacity>

        <View style={styles.title}>
        <Text style={styles.title1}>Paiement</Text>
        <Text style={styles.title2}>Choisissez votre méthode de paiement</Text>
        <Text style={styles.title3}>
          Vous serez débité une fois l'abonnement validé
        </Text>
      </View>
      </View>
      <View style={styles.typeOfPayment}>
      <View>
        <Text style={styles.textTypeOfPayment}>Visa</Text>
          <TouchableOpacity
            onPress={() => handleClickChoix1()}
            style={[styles.choix, choix1 === 1 && styles.choixSelectionne]}
          ></TouchableOpacity>
      </View>
      <View>
        <Text style={styles.textTypeOfPayment}>Paypal</Text>
        <TouchableOpacity
          onPress={() => handleClickChoix2()}
          style={[styles.choix, choix2 === 1 && styles.choixSelectionne]}
        ></TouchableOpacity>
      </View>
      <View>
        <Text style={styles.textTypeOfPayment}>ApplePay</Text>
        <TouchableOpacity
          onPress={() => handleClickChoix3()}
          style={[styles.choix, choix3 === 1 && styles.choixSelectionne]}
        ></TouchableOpacity>
      </View>
      </View>
      <View style={styles.containerPayment}>
        <View style={styles.inputPayment}>
          <Image
            source={require("../assets/buttonscanCard.png")}
            style={styles.scanCard}
            size={30}
          />
          <Text style={styles.titleInput}>Nom du propriétaire</Text>
          <TextInput
            style={styles.input}
            value={letterToFillInInput}
            onChangeText={handleLetterChange}
          />
          {letterToFillInInputError ? (
            <Text style={styles.errorText}>{letterToFillInInputError}</Text>
          ) : null}
          <Text style={styles.titleInput}>Numéro de carte</Text>
          <TextInput
            style={styles.input}
            value={numberToFillInInput}
            onChangeText={handleNumberChange}
          ></TextInput>
          {numberToFillInInputError ? (
            <Text style={styles.errorText}>{numberToFillInInputError}</Text>
          ) : null}
        </View>
        <View style={styles.inputCard}>
          <Text style={styles.titleInput1}>CVC</Text>
          <TextInput
            style={styles.input1}
            placeholder="CVC"
            placeholderTextColor="#FFCE4A"
            value={numberToFillInInput}
            onChangeText={handleNumberChange}
          />
          {numberToFillInInputError ? (
            <Text style={styles.errorText}>{numberToFillInInputError}</Text>
          ) : null}
          <Text style={styles.titleInput2}>Date d'expiration</Text>
          <TextInput
            style={styles.input1}
            placeholder="MM/AA"
            placeholderTextColor="#FFCE4A"
            value={numberToFillInInput}
            onChangeText={handleNumberChange}
          ></TextInput>
          {numberToFillInInputError ? (
            <Text style={styles.errorText}>{numberToFillInInputError}</Text>
          ) : null}
        </View>
      </View>
      <View style={styles.alignBtnSaved}>
        <TouchableOpacity
          style={[
            styles.choixInfoSaved,
            isSaveInfosClicked === true && styles.choixSelectionneSaved,
          ]}
          onPress={() => handleButtonClick()}
        ></TouchableOpacity>
        <Text style={styles.title4}>
          Sauvegarder mes informations pour la prochaine fois
        </Text>
      </View>
      <View style={styles.arrowContainer}>
        <TouchableOpacity
          style={styles.arrowBtn}
          onPress={() => navigation.goBack()}
        >
          <Image
            source={require("../assets/arrow-circle-back.png")}
            size={30}
            color="#FFCE4A"
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.arrowBtn1}>
          <Image
            source={require("../assets/validationbtn.png")}
            size={30}
            color="#FFCE4A"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#2C1A51",
  },
  containerTitles: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    width: '100%',
    height: '100%'
  },
  recapAbo: {
    height: "35%",
    width: "100%",
    overflow: "hidden",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    bottom: '20%'
  },
  textBtnPrice: {
    color: "#2C1A51",
    fontSize: 14,
  },
  textRecapAbo: {
    color: "white",
    fontSize: 16,
  },
  title: {
    
  },
  title1: {
    color: "#FFCE4A",
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 5,
  },
  title2: {
    color: "white",
    fontSize: 18,
    marginBottom: 5,
  },
  title3: {
    color: "white",
    fontSize: 10,
    // marginBottom: 20,
  },
  typeOfPayment: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // marginBottom: 10,
  },
  textTypeOfPayment: {
    color: "#FFCE4A",
    fontSize: 18,
  },
  choisi: {
    backgroundColor: "#FFCE4A",
    borderRadius: 12,
    borderWidth: 1,
    textAlign: 'center',
    height: "12%",
    width: "40%",
    borderColor: "#FFCE4A",
  },
  choix: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderColor: "white",
    borderWidth: 2,
    backgroundColor: "#2E2E63",
  },
  choixSelectionne: {
    backgroundColor: "white",
  },

  choixSelectionne: {
    backgroundColor: "#FFCE4A",
  },
  choixSelectionneSaved: {
    backgroundColor: "#FFCE4A",
  },
  scanCard: {
    left: 130,
    // margin: 20,
    // bottom: 40,
  },
  titleInput: {
    color: "white",
    fontFamily: "Lato_400Regular",
    marginLeft: 10,
    bottom: 30,
  },
  input: {
    backgroundColor: "#ffffff",
    opacity: 0.1,
    textAlign: "center",
    borderRadius: 10,
    padding: 5,
    margin: 10,
    bottom: 30,
  },
  inputCard: {
    flexDirection: "row",
    justifyContent: "space-around",
    // bottom: 30,
  },
  // inputRow: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   marginBottom: 10,
  // },
  titleInput1: {
    color: "white",
    fontFamily: "Lato_400Regular",
    left: 14,
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
    padding: 10,
  },
  arrowBtn1: {
    padding: 10,
  },

  alignBtnSaved: {

  },

  choixInfoSaved: {
    width: 15,
    height: 15,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "gray",
    marginVertical: 2,
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
