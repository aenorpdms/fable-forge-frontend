import React, { useState, useNavigation } from "react";
import { StyleSheet, Text, TouchableOpacity, View, ImageBackground } from "react-native";
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
      imageSource: require("../assets/ImageBibliotheque.png"),
    },
    {
      id: 2,
      type: "Abonnement mensuel :",
      price: "9.99€/mois",
      buttonText: "Choisir",
      buttonColor: "#2C1A51",
      imageSource: require("../assets/ImageBibliotheque.png"),
    },
    {
      id: 3,
      type: "Abonnement annuel :",
      price: "99.99€/an",
      buttonText: "Choisir",
      buttonColor: "#2C1A51",
      imageSource: require("../assets/ImageBibliotheque.png"),
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
        };
      } else {
        return {
          ...subscription,
          buttonText: "Choisir",
          buttonColor: "#2C1A51",
        };
      }
    });

    setSubscriptions(updatedSubscriptions);
    setActiveSubscription(id);
    navigation.navigate("SubscriptionPayment");
  }

  /*
    (buttonColor === 1) {
      if (buttonColor1 === "#2C1A51") {
        setButtonColor1("#FFCE4A");
        setButtonColor2("#2C1A51");
        setButtonColor3("#2C1A51");
      } else {
        setButtonColor1("#2C1A51");
      }
    }
  }
*/

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
              <Text style={styles.textBtnPrice}>{subscription.buttonText}</Text>
            </TouchableOpacity>
          </View>
        ))}
        <TouchableOpacity style={styles.btnResiliation}>
          <Text style={styles.btnResiliationText}> Résilier mon abonnement</Text>
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
    top: 120,
    width: "100%",
  },

  imagBgd: {
    width: "100%",
    height: "70%",
  },
  title2: {
    fontFamily: "Lato_400Regular",
    fontSize: 34,
    fontWeight: "500",
    textAlign: "left",
    color: "#FFCE4A",
    top: 180,
    lineHeight: 60,
    marginLeft: 16,
  },
  title3: {
    fontFamily: "Lato_400Regular",
    color: "white",
    top: 180,
    marginLeft: 20,
  },

  abonnementContainer: {
    marginBottom: 20,
    bottom: 130,
    width: "90%",
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
    height: "20%",
    width: "100%",
    borderWidth: 1,
    borderRadius: 15,
    marginBottom: -10,
  },

  textAboPrice: {
    fontFamily: "Lato_400Regular",
    color: "white",
    height: 70,
    top: "40%",
    width: "90%",
    textAlign: "center",
    marginLeft: 15,
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
    justifyContent: "center",
  },

  btnPriceOn: {
    backgroundColor: "#FFCE4A",
    width: 120,
    bottom: 15,
    height: 45,
    borderRadius: 10,
    marginLeft: 120,
    marginBottom: 20,
    justifyContent: "center",
  },

  textBtnPriceOn: {
    fontFamily: "Lato_400Regular",
    color: "black",
    textAlign: "center",
  },

  textBtnPrice: {
    fontFamily: "Lato_400Regular",
    color: "white",
    textAlign: "center",
  },

  btnResiliation: {
    width: "100%",
  },

  btnResiliationText: {
    fontFamily: "Lato_400Regular",
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 16,
    borderColor: "#FFFFFF",
    borderWidth: 1,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 10,
    backgroundColor: "#6B5F85",
    bottom: 10,
  },
});
