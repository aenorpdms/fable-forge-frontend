import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  Modal,
  TextInput,
  Image,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Dimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { updateUser } from "../reducers/user";

// Importation du composant personnalisé TabBar
import TabBar from "../TabBar";

// Get the screen dimensions
// const { width, height } = Dimensions.get("window");
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function ProfilScreen({ navigation }) {
  // Information du profil
  const [username, setUsername] = useState("");
  const [firstname, setFirstName] = useState("");
  const [email, setEmail] = useState("");

  // Modification du mot de passe
  const [newPassword, setNewPassword] = useState("");
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  // Modification des informations du profil
  const [isEditable, setIsEditable] = useState(false);
  const [isEditablePwd, setIsEditablePwd] = useState(false);
  const [buttonText, setButtonText] = useState("Modifier mes informations");
  const [buttonTextPwd, setButtonTextPwd] = useState("Modifier mon mot de passe");

  // Accès au dispatch pour envoyer des actions.
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.value);

  // Modifier les informations de l'utilisateur
  const handleModifyInfo = () => {
    // Création d'un objet avec les informations mises à jour de l'utilisateur
    const updatedUserInfo = { token: user.token };

    // Vérification et mise à jour de chaque champ si nécessaire
    updatedUserInfo.username = username || user.username;
    updatedUserInfo.firstname = firstname || user.firstname;
    updatedUserInfo.email = email || user.email;

    // Mise à jour de l'utilisateur dans le Redux store
    dispatch(updateUser(updatedUserInfo));

    // Appel API pour mettre à jour les informations sur le serveur
    fetch(`https://fable-forge.onrender.com/users/information`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedUserInfo),
    })
      .then(response => response.json())
      .then(data => {
        // Si la mise à jour est réussie, désactiver le mode édition
        if (data.result) {
          setIsEditable(false);
          setButtonText("Modifier mes informations");
        }
      });
  };

  // Modifier le mot de passe
  const handleModifyPwd = () => {
    // Vérification que le nouveau mot de passe et sa confirmation sont identiques
    if (password === newPassword) {
      // Appel API pour changer le mot de passe sur le serveur
      fetch(`https://fable-forge.onrender.com/users/password`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: user.token,
          oldPassword,
          newPassword,
        }),
      })
        .then(response => response.json())
        .then(data => {
          // Si la mise à jour est réussie, désactiver le mode édition du mot de passe
          if (data.result) {
            console.log("updated");
            setIsEditablePwd(false);
            setButtonTextPwd("Modifier mon mot de passe");
          }
        });
    }
  };

  const handleSubscription = () => {
    // Navigation vers la page "Subscription"
    navigation.navigate("Subscription");
  };

  const handleLogOut = () => {
    // Déconnexion, navigation vers la page "Sign"
    navigation.navigate("Sign");
  };

  // État local pour la visibilité du modal.
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState("");

  const handleModalToggle = type => {
    setModalType(type);
    setModalVisible(!modalVisible);
  };

  // Appel API pour supprimer le compte sur le serveur
  const handleDeleteAccount = () => {
    fetch(`https://fable-forge.onrender.com/users`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: user.token }),
    })
      .then(response => response.json())
      .then(data => {
        // Si la suppression est réussie, naviguer vers l'écran de "Sign"
        if (data.result) {
          navigation.navigate("Sign");
        }
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tabBar}>
        <TabBar navigation={navigation} />
        <View style={styles.backgroundTab}></View>
      </View>
      <KeyboardAvoidingView style={styles.containerBis} behavior={Platform.OS === "ios" ? "padding" : null} enabled keyboardVerticalOffset={10}>
        <ScrollView style={styles.containerInformation} indicatorStyle='white'>
          <ImageBackground style={styles.imagBgd} source={require("../assets/ImageBibliotheque.png")}>
            <View>
              <Text style={styles.title2}>Profil</Text>

              <View style={styles.initialContainer}>
                <Image style={styles.image} source={require("../assets/profilPic.png")} />
                <Text style={styles.initial}>{user.firstname.charAt(0)}</Text>
              </View>
              <Text style={styles.subtitle}>Informations Personnelles</Text>
            </View>
          </ImageBackground>

          <View>
            <Text style={styles.titleInput}>Nom d'utilisateur</Text>
            <TextInput
              style={styles.input}
              placeholderTextColor={isEditable ? "rgba(255, 255, 255, 0.5)" : "white"}
              onChangeText={value => setUsername(value)}
              value={username}
              editable={isEditable}
              placeholder={isEditable ? "Nom d'utilisateur" : user.username}
            ></TextInput>
          </View>
          <View>
            <Text style={styles.titleInput}>Prénom</Text>
            <TextInput
              style={styles.input}
              placeholderTextColor={isEditable ? "rgba(255, 255, 255, 0.5)" : "white"}
              onChangeText={value => setFirstName(value)}
              value={firstname}
              editable={isEditable}
              placeholder={isEditable ? "Prénom" : user.firstname}
            ></TextInput>
          </View>
          <View>
            <Text style={styles.titleInput}>Adresse email</Text>
            <TextInput
              style={styles.input}
              placeholderTextColor={isEditable ? "rgba(255, 255, 255, 0.5)" : "white"}
              onChangeText={value => setEmail(value)}
              value={email}
              editable={isEditable}
              placeholder={isEditable ? "Adresse email" : user.email}
            ></TextInput>
          </View>
          <TouchableOpacity
            onPress={() => {
              if (isEditable) {
                handleModifyInfo();
              } else {
                setIsEditable(true);
                setButtonText("Valider mes modifications");
              }
            }}
          >
            <Text style={styles.btnModify}>{buttonText}</Text>
          </TouchableOpacity>
          <Text style={styles.titleInputMDP}>Mot de Passe</Text>
          {isEditablePwd && (
            <>
              <View>
                <Text style={styles.titleInputPWD}>Ancien mot de passe</Text>
                <TextInput
                  style={styles.input}
                  placeholder='Tapez votre ancien mot de passe'
                  placeholderTextColor={isEditablePwd ? "rgba(255, 255, 255, 0.5)" : "white"}
                  onChangeText={value => setOldPassword(value)}
                  value={oldPassword}
                ></TextInput>
              </View>
              <View>
                <Text style={styles.titleInputPWD}>Nouveau mot de passe</Text>
                <TextInput
                  style={styles.input}
                  placeholder='Tapez votre nouveau mot de passe'
                  placeholderTextColor={isEditablePwd ? "rgba(255, 255, 255, 0.5)" : "white"}
                  onChangeText={value => setNewPassword(value)}
                  value={newPassword}
                ></TextInput>
              </View>
              <View>
                <Text style={styles.titleInputPWD}>Confirmez mot de Passe</Text>
                <TextInput
                  style={styles.input}
                  placeholder='Confirmez votre nouveau mot de passe'
                  placeholderTextColor={isEditablePwd ? "rgba(255, 255, 255, 0.5)" : "white"}
                  onChangeText={value => setPassword(value)}
                  value={password}
                ></TextInput>
              </View>
            </>
          )}
          <TouchableOpacity
            style={styles.mdp}
            onPress={() => {
              if (isEditablePwd) {
                handleModifyPwd();
              } else {
                setIsEditablePwd(true);
                setButtonTextPwd("Valider mon mot de passe");
              }
            }}
          >
            <Text style={styles.btnModify}>{buttonTextPwd}</Text>
          </TouchableOpacity>
          <Text style={styles.subscriptionText}>Votre abonnement est valide jusqu’au 31/12/2023</Text>
          <TouchableOpacity style={styles.btnAbonnement}>
            <Text style={styles.btnText} onPress={() => handleSubscription()}>
              Gérer l'abonnement
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnAbonnement}>
            <Text style={styles.btnText} onPress={() => handleLogOut()}>
              Se déconnecter
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnDelete}>
            <Text style={styles.btnText} onPress={() => handleModalToggle("deleteAccount")}>
              Supprimer mon compte
            </Text>
          </TouchableOpacity>
          <View style={styles.space}></View>

          <Modal visible={modalVisible} animationType='slide' transparent={true}>
            <View style={styles.mdlctn}>
              <View style={styles.modalContainer}>
                <Text style={styles.titleModal}>Êtes-vous sûr de vouloir supprimer votre compte Fable Forge ?</Text>

                {modalType === "deleteAccount" && (
                  <View style={styles.containerBtnModal}>
                    <TouchableOpacity style={styles.btnDeleteModal} onPress={() => handleDeleteAccount()}>
                      <Text style={styles.btnTextDelete}>Oui</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnNoModal} onPress={() => handleModalToggle()}>
                      <Text style={styles.btnText}>Non</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          </Modal>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2C1A51",
    width: windowWidth,
    height: windowHeight,
    // width: width, // Set the width of the container to the screen width
    // height: height, // Set the height of the container to the screen height
  },

  // Style tabBar
  tabBar: {
    marginTop: "200%",
    position: "absolute",
    zIndex: 1,
  },
  backgroundTab: {
    backgroundColor: "#2C1A51",
    top: "95%",
    position: "absolute",
    zIndex: -1,
    height: 100,
    width: 650,
    marginLeft: -400,
    marginTop: -20,
  },
  space: {
    padding: 10,
    height: 80,
    backgroundColor: "transparent",
  },

  //
  containerBis: {
    flex: 1,
    width: "100%",
    // marginTop: "-12%",
  },
  containerInformation: {
    flex: 2,
  },

  // Style header
  imagBgd: {
    flex: 1,
    // width: "100%",
    // height: "71%",
    width: windowWidth,
    height: windowHeight * 0.5,
    marginTop: -windowHeight * 0.17,
  },
  title2: {
    fontFamily: "Lato_400Regular",
    fontSize: 32,
    textAlign: "left",
    color: "#FFCE4A",
    marginTop: "46.5%",
    lineHeight: 60,
    marginLeft: "3%",
  },
  initialContainer: {
    left: "26.5%",
    borderRadius: 50,
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    // top: "-15%",
  },
  image: {
    position: "absolute",
    // top: "52%",
    left: "36%",
  },
  initial: {
    fontFamily: "Lato_400Regular",
    fontSize: 46,
    color: "white",
    fontWeight: "bold",
    left: "42%",
    // top: "52%",
  },
  subtitle: {
    fontFamily: "Lato_400Regular",
    color: "white",
    fontSize: 22,
    textAlign: "center",
    // marginTop: "-10%",
    // marginTop: "5%",
  },

  // Informations utilisateur
  titleInput: {
    fontFamily: "Lato_400Regular",
    color: "white",
    fontSize: 18,
    marginLeft: "4%",
  },
  input: {
    fontFamily: "Lato_400Regular",
    backgroundColor: "transparent",
    borderRadius: 10,
    margin: 5,
    padding: 10,
    width: "92%",
    borderWidth: 1,
    borderColor: "#FFCE4A",
    marginBottom: "4%",
    marginLeft: "4%",
    color: "white",
  },
  titleInputMDP: {
    fontFamily: "Lato_400Regular",
    color: "white",
    fontSize: 18,
    marginLeft: "4%",
    marginBottom: "1%",
  },
  btnModify: {
    fontFamily: "Lato_400Regular",
    color: "#FFCE4A",
    fontSize: 16,
    marginTop: 0,
    marginLeft: "4%",
    marginBottom: "6%",
  },

  // Mot de passe
  titleInputPWD: {
    fontFamily: "Lato_400Regular",
    color: "white",
    fontSize: 16,
    marginLeft: "4%",
  },
  mdp: {
    marginTop: "1%",
  },

  // Abonnement, Déconnexion, Suppression de compte
  subscriptionText: {
    fontFamily: "Lato_400Regular",
    color: "white",
    fontSize: 14,
    marginLeft: "4%",
  },
  btnAbonnement: {
    backgroundColor: "transparent",
    borderRadius: 10,
    marginTop: 5,
    padding: 10,
    width: "92%",
    borderWidth: 1,
    borderColor: "#FFCE4A",
    marginBottom: "4%",
    marginLeft: "4%",
  },
  btnText: {
    fontFamily: "Lato_400Regular",
    color: "white",
    textAlign: "center",
    fontSize: 18,
  },
  btnTextDelete: {
    fontFamily: "Lato_400Regular",
    color: "black",
    textAlign: "center",
    fontSize: 18,
  },
  btnDelete: {
    backgroundColor: "#6B5F85",
    borderRadius: 10,
    margin: 10,
    marginTop: 5,
    padding: 10,
    width: "92%",
    borderWidth: 1,
    borderColor: "#FFFFFF",
    marginBottom: "4%",
    marginLeft: "4%",
  },

  // Modal
  mdlctn: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0, 0.5)",
  },
  modalContainer: {
    width: "92%",
    height: 180,
    marginTop: 350,
    marginLeft: "4%",
    backgroundColor: "#6B5F85",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  titleModal: {
    fontFamily: "Lato_400Regular",
    color: "white",
    textAlign: "center",
    fontSize: 18,
    padding: 10,
    width: "90%",
  },
  btnDeleteModal: {
    backgroundColor: "#FFCE4A",
    borderRadius: 10,
    margin: 10,
    marginTop: 5,
    padding: 11,
    width: 100,
    marginBottom: "6%",
    marginLeft: "4%",
  },
  btnNoModal: {
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
  containerBtnModal: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
