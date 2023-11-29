import React, { useState } from "react";
import { 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View, 
  ImageBackground, 
  ScrollView, 
  Modal 
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Composant de l'écran d'abonnement.
export default function SubscriptionScreen({ navigation }) {
     
     const initialSubscriptions = [
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
    ];

     // État local pour l'abonnement actif
    const [activeSubscription, setActiveSubscription] = useState(null);
    const [subscriptions, setSubscriptions] = useState(initialSubscriptions);
       
    // État pour contrôler la visibilité de la modale
    const [modalVisible, setModalVisible] = useState(false);

  const handleButtonClick = (id) => {
    const selectedSubscription = subscriptions.find(sub => sub.id === id);
    if (selectedSubscription) {
      setActiveSubscription(id);
      navigation.navigate("SubscriptionPayment", { selectedSubscription });

      // Mise à jour des couleurs des boutons
      const updatedSubscriptions = subscriptions.map(subscription => ({
        ...subscription,
        buttonText: subscription.id === id ? "En cours" : "Choisir",
        buttonColor: subscription.id === id ? "#FFCE4A" : "#2C1A51",
        textColor: subscription.id === id ? "black" : "white",
      }));
      setSubscriptions(updatedSubscriptions);
    }
  };

  // Gère la navigation de retour vers le profil
  const handleNavigateProfil = () => {
    navigation.navigate("Profil");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground style={styles.imagBgd} source={require("../assets/ImageBibliotheque.png")}>
        <Text style={styles.title2}>Abonnement</Text>
        <Text style={styles.title3}>Votre abonnement sera renouvelé le 31/12/2023</Text>
      </ImageBackground>

      <ScrollView style={styles.abonnementContainer}>
        <View style={styles.subContainer}>
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
        </View>
      </ScrollView>

      {/* Bouton pour résilier l'abonnement */}
      <TouchableOpacity style={styles.btnResiliation} onPress={() => setModalVisible(true)}>
        <Text style={styles.btnResiliationText}> Résilier mon abonnement</Text>
      </TouchableOpacity>

      {/* Bouton de retour vers le profil */}
      <TouchableOpacity style={styles.btnRetour}>
        <Text style={styles.btnResiliationText} onPress={() => handleNavigateProfil()}>
          Retour vers Profil
        </Text>
      </TouchableOpacity>


      {/* Modale de confirmation de résiliation */}
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Êtes-vous sûr de vouloir résilier votre abonnement Fable Forge ?</Text>
            <View style={styles.modalBtn}>
              <View style={styles.btnInput}>
                <TouchableOpacity
                  style={{ ...styles.openButtonY }}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    handleNavigateProfil();
                  }}
                >
                  <Text style={styles.textStyleO}>Oui</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.btnInput}>
                <TouchableOpacity
                  style={{ ...styles.openButtonN }}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                >
                  <Text style={styles.textStyle}>Non</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
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
    height: "60.5%",
    marginTop:"-12%"
  },
  title2: {
    fontFamily: "Lato_400Regular",
    fontSize: 32,
    textAlign: "left",
    color: "#FFCE4A",
    marginTop: "50%",
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
    marginTop:'-38%'
  },
  subContainer:{
    flex: 1,
    width: "100%",
    padding: 10,
    alignItems:'center'
  },
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
    textAlign: "center",
    fontSize: 16,
    marginTop: "20%",
    marginBottom:"10%",
  },
  btnPrice: {
    backgroundColor: "#2C1A51",
    borderWidth: 1,
    borderColor: "#FFCE4A",
    width: "40%",
    height: "28%",
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
    marginVertical:"2%"
  },
  btnRetour: {
    width: "90%",
    marginTop: "2%",
    borderColor: "#FFCE4A",
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "transparent",
    marginBottom:"5%"
  
  },
  btnResiliationText: {
    fontFamily: "Lato_400Regular",
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 16,

  },

  // Style Modal
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0, 0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "#6B5F85",
    borderRadius: 10,
    padding: "8%",
    alignItems: "center",
    width: "92%",
    height: 180, 

  },
  modalText: {
    fontFamily: "Lato_400Regular",
    color: "white",
    textAlign:"center",
    fontSize: 18,
    padding: 10,

  },
  modalBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginLeft:"15%"
  },
  openButtonY: {
    backgroundColor: "#FFCE4A",
    borderRadius: 10,
    margin: 10,
    marginTop: 5,
    padding: 11,
    width: 100,
    marginBottom: "6%",
    marginLeft: "4%",
  },
  openButtonN: {
    backgroundColor: "#6B5F85",
    borderRadius: 10,
    margin: 10,
    marginTop: 5,
    padding: 10,
    width: 100,
    borderWidth: 1,
    borderColor: "#FFFFFF",
    marginBottom: "6%",
    marginLeft: "12%",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  textStyleO: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  btnInput: {
    margin: "5%",
  },
});
