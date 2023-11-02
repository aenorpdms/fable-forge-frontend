import React, { useState } from "react";
import { 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View, 
  TextInput, 
  ImageBackground, 
  Modal, 
  KeyboardAvoidingView 
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { useRoute, useNavigation } from "@react-navigation/native";

// Composant d'écran pour le paiement de l'abonnement.
export default function SubscriptionPaymentScreen() {

  // Récupération de l'état global (les abonnements et l'abonnement actif) via useSelector.
  const { subscriptions, activeSubscription } = useSelector(state => state.subscription);

  // Utilisation du hook useRoute pour accéder aux paramètres de la route actuelle.
  const route = useRoute();
  // Utilisation du hook useNavigation pour la navigation entre les écrans.
  const navigation = useNavigation();
  // Accès aux paramètres passés à la route actuelle.
  const { subscription } = route.params;

  // États locaux pour gérer les choix des méthodes de paiement.
  const [choix1, setChoix1] = useState(0); // État pour le choix 1 (Visa)
  const [choix2, setChoix2] = useState(0); // État pour le choix 2 (Paypal)
  const [choix3, setChoix3] = useState(0); // État pour le choix 3 (ApplePay)

  // Fonctions pour gérer les clics sur les méthodes de paiement et définir l'état sélectionné.
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

  // État pour gérer l'activation de l'option "Sauvegarder mes informations".
  const [isSaveInfosClicked, setIsSaveInfosClicked] = useState(false);

  // Fonction pour gérer le clic sur l'option "Sauvegarder mes informations".
  const handleButtonClick = () => {
    setIsSaveInfosClicked(!isSaveInfosClicked);
  };

  // Récupération de l'image de l'abonnement actif.
  const activeImage = activeSubscription ? subscriptions.find(subscription => subscription.id === activeSubscription).imageSource : null;

  // État pour la visibilité du modal de confirmation.
  const [modalVisible, setModalVisible] = useState(false);
  
  // Fonction pour naviguer vers le profil après confirmation de l'achat.
  const handleNavigateProfil = () => {
    navigation.navigate("Profil");
  };

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
          <Text style={styles.title3}>Vous serez débité une fois l'abonnement validé</Text>
        </View>
      </View>
      <View style={styles.typeOfPayment}>
        <View style={styles.choiceOfCard}>
          <Text style={styles.textTypeOfPayment}>Visa</Text>
          <TouchableOpacity onPress={() => handleClickChoix1()} style={[styles.choix, choix1 === 1 && styles.choixSelectionne]}></TouchableOpacity>
        </View>
        <View style={styles.choiceOfCard}>
          <Text style={styles.textTypeOfPayment}>Paypal</Text>
          <TouchableOpacity onPress={() => handleClickChoix2()} style={[styles.choix, choix2 === 1 && styles.choixSelectionne]}></TouchableOpacity>
        </View>
        <View style={styles.choiceOfCard}>
          <Text style={styles.textTypeOfPayment}>ApplePay</Text>
          <TouchableOpacity onPress={() => handleClickChoix3()} style={[styles.choix, choix3 === 1 && styles.choixSelectionne]}></TouchableOpacity>
        </View>
      </View>
      <KeyboardAvoidingView style={styles.containerBis} behavior={Platform.OS === "ios" ? "padding" : null} enabled keyboardVerticalOffset={10}>
        <View style={styles.containerPayment}>
          <View style={styles.inputPayment}>
            <Text style={styles.titleInput}>Nom du propriétaire</Text>
            <TextInput style={styles.input} />
            <Text style={styles.titleInput}>Numéro de carte</Text>
            <TextInput style={styles.input}></TextInput>
          </View>
          <View style={styles.inputCard}>
            <Text style={styles.titleInput1}>CVC</Text>
            <TextInput style={styles.input1} placeholder='CVC' placeholderTextColor='#FFCE4A' />
            <Text style={styles.titleInput2}>Date d'expiration</Text>
            <TextInput style={styles.input1} placeholder='MM/AA' placeholderTextColor='#FFCE4A'></TextInput>
          </View>
        </View>
      </KeyboardAvoidingView>
      <View style={styles.alignBtnSaved}>
        <TouchableOpacity
          style={[styles.choixInfoSaved, isSaveInfosClicked === true && styles.choixSelectionneSaved]}
          onPress={() => handleButtonClick()}
        ></TouchableOpacity>
        <Text style={styles.title4}>Sauvegarder mes informations pour la prochaine fois</Text>
      </View>
      <View style={styles.arrowContainer}>
        <TouchableOpacity style={styles.btnResiliation} onPress={() => setModalVisible(true)}>
          <Text style={styles.btnResiliationText}>Valider mon paiement</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnRetour} onPress={() => navigation.goBack()}>
          <Text style={styles.btnResiliationText}>Retour</Text>
        </TouchableOpacity>
      </View>

      {/* Modal qui apparaît après la validation du paiement */}
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
            <Text style={styles.modalText}>Bravo ! Votre achat est très apprécié, merci !</Text>
            <TouchableOpacity
              style={{ ...styles.openButton }}
              onPress={() => {
                setModalVisible(!modalVisible);
                handleNavigateProfil();
              }}
            >
              <Text style={styles.textStyle}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    width: "100%",
    height: "100%",
  },
  recapAbo: {
    height: "50%",
    width: "100%",
    overflow: "hidden",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    bottom: "15%",
  },
  textBtnPrice: {
    color: "#2C1A51",
    fontSize: 14,
    textAlign: "center",
    top: "30%",
    fontWeight:'500'
  },
  textRecapAbo: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
    top: "55%",
  },
  title: {
    bottom: "15%",
    right: "4%",
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
  },
  typeOfPayment: {
    flexDirection: "row",
    bottom: "20%",
  },
  textTypeOfPayment: {
    color: "#FFCE4A",
    fontSize: 14,
    marginBottom:5
  },
  choiceOfCard: {
    alignItems: "center",
    padding: "10%",
  },
  inputPayment: {
    bottom: "10%",
  },
  choisi: {
    backgroundColor: "#FFCE4A",
    borderRadius: 10,
    borderWidth: 1,
    textAlign: "center",
    height: "13%",
    width: "40%",
    borderColor: "#FFCE4A",
    bottom: "22%",
  },
  choix: {
    height: 24,
    width: 24,
    borderRadius: 25,
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
  titleInput: {
    color: "white",
    fontFamily: "Lato_400Regular",
    marginLeft: 10,
    bottom: "35%",
  },
  input: {
    backgroundColor: "#ffffff",
    opacity: 0.1,
    textAlign: "center",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    bottom: "35%",
  },
  inputCard: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  titleInput1: {
    color: "white",
    fontFamily: "Lato_400Regular",
    left: 14,
    bottom: "17%",
  },
  titleInput2: {
    color: "white",
    fontFamily: "Lato_400Regular",
    left: 90,
    bottom: "17%",
  },
  input1: {
    backgroundColor: "#6B5F85",
    width: "30%",
    textAlign: "center",
    borderRadius: 10,
    padding: 10,
    right: 17,
    color: "#FFCE4A",
    bottom: "10%",
  },
  alignBtnSaved:{
  marginTop:"4%"
  },
  choixInfoSaved: {
    width: 15,
    height: 15,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "gray",
   marginVertical:"-2%",
    marginLeft:"5%",
    bottom: "30%",
  },
  title4: {
    width: 260,
    color: "white",
    textAlign: "justify",
    marginLeft: "15%",
    bottom: "75%",
  },
  btnResiliation: {
    width: "100%",
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
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: "white",
    fontSize: 16
  },
  openButton: {
    backgroundColor: "#FFCE4A",
    borderRadius: 10,
    margin: 10,
    marginTop: 5,
    padding: 11,
    width: 100,
    marginBottom: "6%",
    marginLeft: "4%",
  },
  textStyle: {
    fontFamily: "Lato_400Regular",
    color: "black",
    textAlign: "center",
    fontSize: 18,
  },
});
