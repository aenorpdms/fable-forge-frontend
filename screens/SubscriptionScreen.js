import React, { useState, useNavigation } from "react";
import { StyleSheet, Text, TouchableOpacity, View, ImageBackground, ScrollView } from "react-native";
import * as Font from "expo-font";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SubscriptionScreen({ navigation }) {
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
    const selectedSubscription = subscriptions.find(subscription => subscription.id === id);
    navigation.navigate("SubscriptionPayment", { subscription: selectedSubscription });

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
    navigation.navigate("SubscriptionPayment");
  }

  const handleNavigateProfil = () => {
    navigation.navigate("Profil");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.containerInformation} indicatorStyle='white'>
        <ImageBackground style={styles.imagBgd} source={require("../assets/ImageBibliotheque.png")}>
          <Text style={styles.title2}>Abonnement</Text>
          <Text style={styles.title3}>Votre abonnement sera renouvelé le 31/11/2023</Text>
        </ImageBackground>
        {/* <View style={styles.containerInformation} indicatorStyle='white'> */}
        <View style={styles.abonnementContainer}>
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
          <TouchableOpacity style={styles.btnResiliation}>
            <Text style={styles.btnResiliationText}> Résilier mon abonnement</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnRetour}>
            <Text style={styles.btnResiliationText} onPress={() => handleNavigateProfil()}>
              Retour vers Profil
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  containerInformation: {
    flex: 1,
    width: "100%",
    marginTop: "-12%",
  },

  imagBgd: {
    felx: 1,
    width: "100%",
    height: "69%",
  },
  title2: {
    fontFamily: "Lato_400Regular",
    fontSize: 32,
    textAlign: "left",
    color: "#FFCE4A",
    marginTop: "49%", //160
    marginLeft: "3%",
  },
  title3: {
    fontFamily: "Lato_400Regular",
    color: "white",
    fontSize: 16,
    textAlign: "justify",
    marginTop: "2%",
    marginBottom: "5%",
    width: "90%",
    marginLeft: "3%",
  },

  abonnementContainer: {
    flex: 1,
    marginTop: "-25%",
    width: "90%",
    marginLeft: "5%",
    flexDirection: "column", // Alignement vertical
    alignItems: "center", // Centre les éléments horizontalement
    justifyContent: "space-between",
  },
  imagBgdAbo: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
    borderRadius: 15,
  },

  aboPrice: {
    borderColor: "white",
    height: "30%",
    width: "100%",
    borderWidth: 1,
    borderRadius: 15,
    marginBottom: "11%",
  },

  textAboPrice: {
    fontFamily: "Lato_700Bold",
    color: "white",
    top: "40%",
    width: "90%",
    textAlign: "center",
    marginLeft: "5%",
    fontSize: 18,
  },

  btnPrice: {
    backgroundColor: "#2C1A51",
    borderWidth: 1,
    borderColor: "#FFCE4A",
    width: "40%",
    bottom: "20%",
    height: "40%",
    borderRadius: 10,
    marginLeft: "30%",
    justifyContent: "center",
  },

  textBtnPrice: {
    fontFamily: "Lato_400Regular",
    color: "white",
    textAlign: "center",
  },

  btnResiliation: {
    width: "100%",
    marginTop: "0%",
    borderColor: "#FFFFFF",
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#6B5F85",
  },
  btnRetour: {
    width: "100%",
    marginTop: "4%",
    borderColor: "#FFCE4A",
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "transparent",
  },

  btnResiliationText: {
    fontFamily: "Lato_400Regular",
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 16,
  },
});
