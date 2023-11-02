import React, { useState, useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";

// Importation des sélecteurs Redux.
import { selectSubscription } from "../reducers/subscription";


// Composant de l'écran d'abonnement.
export default function SubscriptionScreen({ navigation }) {
  // Hooks Redux pour dispatcher des actions et sélectionner une partie de l'état. 
  const dispatch = useDispatch();
  const subscriptions = useSelector(state => state.subscription.subscriptions);

  // État local pour gérer l'abonnement actif.
  const [activeSubscription, setActiveSubscription] = useState(null);
  
  // État pour contrôler la visibilité de la modale.
  const [modalVisible, setModalVisible] = useState(false);

  // Gère la sélection de l'abonnement et met à jour le bouton et le texte correspondants.
  function handleButtonClick(id) {
    // Dispatch l'action de sélection d'abonnement.
    dispatch(selectSubscription({ id }));
    // Trouve l'abonnement sélectionné dans la liste des abonnements.
    const selectedSubscription = subscriptions.find(subscription => subscription.id === id);

    // S'il y a un abonnement sélectionné, met à jour l'état et navigue vers le paiement.
    if (selectedSubscription) {
      console.log("Selected Subscription:", selectedSubscription);
      // Mise à jour visuelle des boutons d'abonnement.
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

      // Met à jour l'abonnement actif.
      setActiveSubscription(id);

      // Navigue vers l'écran de paiement en passant l'abonnement sélectionné en paramètre.
      navigation.navigate("SubscriptionPayment", { subscription: selectedSubscription });
    }
  }

  // Initialise la sélection d'abonnement lors du montage du composant.
  useEffect(() => {
    console.log("Rendering SubscriptionScreen");
    // Initialisation de la sélection d'abonnement lors du montage du composant
    const selectedSubscription = subscriptions.find(subscription => subscription.id === 1);
    handleSubscriptionSelection(selectedSubscription);
  }, []); // Exécuté seulement au montage grâce au tableau de dépendances vide

  // Gère la navigation de retour vers le profil.
  const handleNavigateProfil = () => {
    navigation.navigate("Profil");
  };

  // Gère la sélection d'un abonnement.
  const handleSubscriptionSelection = subscription => {
    dispatch(selectSubscription(subscription));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground style={styles.imagBgd} source={require("../assets/ImageBibliotheque.png")}>
        <Text style={styles.title2}>Abonnement</Text>
        <Text style={styles.title3}>Votre abonnement sera renouvelé le 31/11/2023</Text>
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
