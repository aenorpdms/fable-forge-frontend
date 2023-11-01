import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View, ImageBackground, ScrollView, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { selectSubscription } from "../reducers/subscription";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function SubscriptionScreen({ navigation }) {
  const dispatch = useDispatch();
  // Création d'un tableau d'objets subscriptions (avec id, type, price, buttonText et buttonColor) qui représente chaque d'abonnement.
  const [subscriptions, setSubscriptions] = useState([
    {
      id: 1,
      type: "Abonnement hebdomadaire :",
      price: "4.99€/semaine",
      buttonText: "Choisir",
      buttonColor: "#2C1A51",
      textColor: "white",
      imageSource: require("../assets/Abonnement_semaine.png"),
    },
    {
      id: 2,
      type: "Abonnement mensuel :",
      price: "9.99€/mois",
      buttonText: "Choisir",
      buttonColor: "#2C1A51",
      textColor: "white",
      imageSource: require("../assets/Abonnement_mois.png"),
    },
    {
      id: 3,
      type: "Abonnement annuel :",
      price: "99.99€/an",
      buttonText: "Choisir",
      buttonColor: "#2C1A51",
      textColor: "white",
      imageSource: require("../assets/Abonnement_annee.png"),
    },
  ]);

  //création d'un état pour suivre l'abonnement sélectionné
  const [activeSubscription, setActiveSubscription] = useState(null);

  //Fonction qui permet de changer la couleur du bouton et le texte au click (uniquement 1 bouton actif à la fois)
  function handleButtonClick(id) {
    dispatch(selectSubscription({ id }));
    const selectedSubscription = subscriptions.find(subscription => subscription.id === id);

if (selectedSubscription) {
  console.log("Selected Subscription:", selectedSubscription);

  const updatedSubscriptions = subscriptions.map(subscription => {
    if (subscription.id === id) {
      return {
        ...subscription,
        buttonText: "En cours",
        buttonColor: "#FFCE4A",
        textColor: "black",
      };
    } else {
      return {
        ...subscription,
        buttonText: "Choisir",
        buttonColor: "#2C1A51",
        textColor: "white",
      };
    }
  });

  setSubscriptions(updatedSubscriptions);
  setActiveSubscription(id);
  navigation.navigate("SubscriptionPayment", { subscription: selectedSubscription });
}
  }

  const handleSubscriptionSelection = subscription => {
    dispatch(selectSubscription(subscription));
  };

  useEffect(() => {
    console.log("Rendering SubscriptionScreen");
    // Initialisation de la sélection d'abonnement lors du montage du composant
    const selectedSubscription = subscriptions.find(subscription => subscription.id === 1);
    handleSubscriptionSelection(selectedSubscription);
  }, []); // Exécuté seulement au montage grâce au tableau de dépendances vide

  const handleNavigateProfil = () => {
    navigation.navigate("Profil");
  };


  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground style={styles.imagBgd} source={require("../assets/ImageBibliotheque.png")}>
        <Text style={styles.title2}>Abonnement</Text>
        <Text style={styles.title3}>Votre abonnement sera renouvelé le 31/11/2023</Text>
      </ImageBackground>
      <ScrollView style={styles.abonnementContainer}>
        {subscriptions.map(subscription => (
          <View key={subscription.id} style={styles.aboPrice}>
            <ImageBackground style={styles.imagBgdAbo} source={subscription.imageSource}>
              <Text style={styles.textAboPrice}>
                {subscription.type} {subscription.price}
              </Text>
            </ImageBackground>
            <TouchableOpacity
              style={{ ...styles.btnPrice, backgroundColor: subscription.buttonColor }}
              onPress={() => handleButtonClick(subscription.id)}
            >
              <Text style={{ ...styles.textBtnPrice, color: subscription.textColor }}>{subscription.buttonText}</Text>
            </TouchableOpacity>
          </View>
        ))}
        <View style={styles.space}></View>
      </ScrollView>
      <TouchableOpacity style={styles.btnResiliation}>
        <Text style={styles.btnResiliationText}> Résilier mon abonnement</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnRetour}>
        <Text style={styles.btnResiliationText} onPress={() => handleNavigateProfil()}>
          Retour vers Profil
        </Text>
      </TouchableOpacity>
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
    flex: 1,
    width: "100%",
    height: "50%",
    bottom: "10%",
  },
  title2: {
    fontFamily: "Lato_400Regular",
    fontSize: 32,
    textAlign: "left",
    color: "#FFCE4A",
    marginTop: "40%",
    marginLeft: "3%",
  },
  title3: {
    fontFamily: "Lato_400Regular",
    color: "white",
    fontSize: 16,
    textAlign: "justify",
    marginVertical: 10,
    width: "90%",
    marginLeft: "3%",
  },
  abonnementContainer: {
    flex: 1,
    width: "100%",
    // maxHeight: "100%",
    bottom: "20%",
    left: "5%",
    padding: 10,
    margin: "-25%",
    // borderWidth: 1,
    // borderColor: "green",
  },
  // space: {
  //   height: 60,
  //   backgroundColor: "transparent",
  // },
  imagBgdAbo: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
    borderRadius: 15,
  },
  aboPrice: {
    borderColor: "white",
    height: "25%",
    width: "90%",
    borderWidth: 1,
    borderRadius: 15,
    marginBottom: "10%",
  },
  textAboPrice: {
    fontFamily: "Lato_700Bold",
    color: "white",
    bottom: "10%",
    textAlign: "center",
    fontSize: 18,
    marginTop: "30%",
  },
  btnPrice: {
    backgroundColor: "#2C1A51",
    borderWidth: 1,
    borderColor: "#FFCE4A",
    width: "40%",
    height: "25%",
    borderRadius: 10,
    alignSelf: "center",
    justifyContent: "center",
    bottom: 20,
  },
  textBtnPrice: {
    fontFamily: "Lato_400Regular",
    color: "white",
    textAlign: "center",
  },
  btnResiliation: {
    width: "90%",
    borderColor: "#FFFFFF",
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#6B5F85",
    bottom: 40,
  },
  btnRetour: {
    width: "90%",
    marginTop: "4%",
    borderColor: "#FFCE4A",
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "transparent",
    bottom: 40,
  },
  btnResiliationText: {
    fontFamily: "Lato_400Regular",
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 16,
  },
});