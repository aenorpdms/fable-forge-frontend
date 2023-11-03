import { 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View, 
  ImageBackground, 
  Modal, 
  TextInput} from "react-native";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../reducers/user";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function SignScreen({ navigation }) {

  // État pour la modal
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState("");

  // États pour l'inscription
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [isValidSignUp, setIsValidSignUp] = useState(true);
  
  // État pour la connexion
  const [identifier, setIdentifier] = useState("");
  const [passwordUp, setPasswordUp] = useState("");
  const [isValidSignIn, setIsValidSignIn] = useState(true);

  // Accès au dispatch pour envoyer des actions.
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.value);

  // Visibilité de la modal + type de connexion (inscription/connexion)
  const handleModalToggle = type => {
    setModalType(type);
    setModalVisible(!modalVisible);
  };

  // Inscription utilisateur
  const handleInscription = () => {
    // Appel API pour créer l'utilisateur sur le serveur
    fetch("https://fable-forge-backend-84ce.vercel.app/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, firstname, email, password }),
    })
    .then(response => response.json())
    .then(data => {
      // En cas de succès, mise à jour de l'état et navigation
      if (data.result) {
        setIsValidSignUp(true);
        resetSignUpForm();
        dispatch(updateUser({ firstname, username, email, token: data.token }));
        setModalVisible(false);
        navigation.navigate("Home");
      } else {
        setIsValidSignUp(false);
      }
    });
};

// Réinitialiser le formulaire d'inscription après le succès
const resetSignUpForm = () => {
  setUsername("");
  setPassword("");
  setFirstName("");
  setEmail("");
};

  // Connexion utilisateur
  const handleConnection = () => {
    fetch("https://fable-forge-backend-84ce.vercel.app/users/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier, password: passwordUp }),
    })
    .then(response => response.json())
    .then(data => {
      // En cas de succès, mise à jour de l'état et navigation
      if (data.result) {
        setIsValidSignIn(true);
        resetSignInForm();
        dispatch(
          updateUser({
            firstname: data.firstname,
            username: data.username,
            email: data.email,
            token: data.token,
          })
        );
        setModalVisible(false);
        navigation.navigate("Home");
      } else {
        setIsValidSignIn(false);
      }
    });
};

// Réinitialiser le formulaire de connexion après le succès
const resetSignInForm = () => {
  setIdentifier("");
  setPasswordUp("");
};

  // Styles conditionnels en fonction du type de modale
  const modalStyle = modalType === "register" ? styles.modalContainerInscription : styles.modalContainerConnection;
  const titleStyle = modalType === "register" ? styles.titleModalUp : styles.titleModalIn;
  const closeStyle = modalType === "register" ? styles.closeModalUp : styles.closeModalIn;

  // Texte d'erreur conditionnel pour l'inscription et la connexion
  const errorTextInStyle = isValidSignIn
    ? styles.errorUpText // Style quand isValidSignIn est vrai
    : { ...styles.errorUpText, color: "#FFCE4A" }; // Style quand isValidSignIn est vrai

  const errorTextUpStyle = isValidSignUp
    ? styles.errorInText // Style quand isValidSignIn est vrai
    : { ...styles.errorInText, color: "#FFCE4A" }; // Style quand isValidSignIn est vrai

  // Vérifier si l'utilisateur est déjà connecté
  useEffect(() => {
    if (user.email != null || user.username != null) {
      navigation.navigate("Home");
    }
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.imagBgd} source={require("../assets/finalimageConnection.png")}>
        <Text style={styles.title1}>Fable</Text>
        <Text style={styles.title2}>Forge</Text>
      </ImageBackground>
      <TouchableOpacity style={styles.btnHome} onPress={() => handleModalToggle("register")}>
        <Text style={styles.textBtn}>S'inscrire gratuitement</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnInput} onPress={() => handleModalToggle("connexion")}>
        <Text style={styles.textBtn1}>Se connecter</Text>
      </TouchableOpacity>
      <Modal visible={modalVisible} animationType='slide' transparent={true}>
        <View style={styles.mdlctn}>
          <View style={modalStyle}>
            <View style={styles.titleClose}>
              <Text style={titleStyle}>Fable Forge</Text>
              <FontAwesome name='close' size={20} style={closeStyle} color='white' onPress={() => handleModalToggle()} />
            </View>

            {modalType === "register" && (
              <>
              
                <TextInput
                  style={styles.inputUp}
                  placeholder='Prénom'
                  placeholderTextColor='white'
                  onChangeText={value => setFirstName(value)}
                  value={firstname}
                ></TextInput>
                <TextInput
                  style={styles.inputUp}
                  placeholder='Pseudonyme'
                  placeholderTextColor='white'
                  onChangeText={value => setUsername(value)}
                  value={username}
                ></TextInput>
                <TextInput
                  style={styles.inputUp}
                  placeholder='Adresse email'
                  placeholderTextColor='white'
                  onChangeText={value => setEmail(value)}
                  value={email}
                ></TextInput>

                <TextInput
                  style={styles.inputUp}
                  placeholder='Mot de Passe'
                  secureTextEntry={true}
                  placeholderTextColor='white'
                  onChangeText={value => setPassword(value)}
                  value={password}
                ></TextInput>
                <Text style={errorTextUpStyle}>Des champs obligatoires n'ont pas été complétés</Text>
                <TouchableOpacity style={styles.btnValidate} onPress={() => handleInscription()}>
                  <Text style={styles.textBtnValidate}>Valider</Text>
                </TouchableOpacity>
              </>
            )}
            {modalType === "connexion" && (
              <>
                <TextInput
                  style={styles.inputIn}
                  placeholder='Pseudonyme ou Adresse email'
                  placeholderTextColor='white'
                  onChangeText={value => setIdentifier(value)}
                  value={identifier}
                ></TextInput>
                <TextInput
                  style={styles.inputIn}
                  placeholder='Mot de Passe'
                  placeholderTextColor='white'
                  secureTextEntry={true}
                  onChangeText={value => setPasswordUp(value)}
                  value={passwordUp}
                ></TextInput>
                <Text style={errorTextInStyle}>Mot de passe ou Adresse email/ Nom d'utilisateur incorrect</Text>
                <TouchableOpacity style={styles.btnValidate} onPress={() => handleConnection()}>
                  <Text style={styles.textBtnValidate}>Valider</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2C1A51",
  },

// Style header
  imagBgd: {
    flex: 2,
    width: "100%",
    height: "90%",
  },
  title1: {
    fontFamily: "Lato_400Regular",
    fontSize: 28,
    textAlign: "center",
    color: "#FFFFFF",
    marginTop: "135%",
  },
  title2: {
    fontFamily: "Lato_400Regular",
    fontSize: 56,
    textAlign: "center",
    color: "#FFFFFF",
    lineHeight: 60,
  },

// Style bouton connexion/inscription
  btnHome: {
    alignItems: "center",
    backgroundColor: "#FFCE4A",
    borderRadius: 10,
    margin: "2%",
    padding:"2%",
    width: "80%",
    height: "5%",
    justifyContent: "center",
    marginBottom: "4%",
  },
  btnInput: {
    backgroundColor: "transparent",
    borderRadius: 10,
    margin: "2%",
    padding: "2%",
    width: "80%",
    height: "5%",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#FFFFFF",
    marginBottom: "20%",
  },
  textBtn: {
    fontFamily: "Lato_400Regular",
    textAlign: "center",
    width: "90%",
  },
  textBtn1: {
    fontFamily: "Lato_400Regular",
    textAlign: "center",
    color: "#FFFFFF",
  },

// Style modal
  mdlctn: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0, 0.5)",
  },
  modalContainerInscription: {
    width: "86%",
    height: 400,
    marginTop: 130,
    marginLeft: "7%",
    backgroundColor: "#6B5F85",
    borderRadius: 20,
    padding: '4%',
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainerConnection: {
    width: "86%",
    height: 290,
    marginTop: "63%",
    marginLeft: "7%",
    backgroundColor: "#6B5F85",
    borderRadius: 20,
    padding: '4%',
    alignItems: "center",
    justifyContent: "center",
  },
  imagBgdModal: {
    height: "100%",
    width: "100%",
    opacity: 0.5,
  },
  titleClose: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  titleModalIn: {
    fontFamily: "Lato_400Regular",
    color: "white",
    fontSize: 18,
    padding: "2%",
    marginTop: "-8%",
  },
  titleModalUp: {
    fontFamily: "Lato_400Regular",
    color: "white",
    fontSize: 18,
    padding: "2%",
    marginTop: "-8%",
    
  },
  closeModalIn: {
    position: "absolute",
    top: "1%",
    left: "62%",
  },
  closeModalUp: {
    position: "absolute",
    top: "-2%",
    left: "62%",
  },

// Style input et bouton modal
  inputIn: {
    width: "90%",
    height: "15%",
    borderColor: "white",
    color: "white",
    fontFamily: "Lato_400Regular",
    borderWidth: 1,
    marginBottom: "5%",
    paddingLeft: 10,
    borderRadius: 10,
  },
  inputUp: {
    width: "90%",
    height: "11%",
    borderColor: "white",
    color: "white",
    fontFamily: "Lato_400Regular",
    borderWidth: 1,
    marginBottom: "5%",
    paddingLeft: 10,
    borderRadius: 10,
  },
  btnValidate: {
    backgroundColor: "#FFCE4A",
    borderRadius: 10,
    margin: 10,
    padding: 10,
    textAlign: "center",
    width: "90%",
    marginBottom: 10,
  },
  textBtnValidate: {
    fontFamily: "Lato_400Regular",
    textAlign: "center",
  },

  // Style pour les messages d'erreur
  errorInText: {
    color: "#6B5F85",
    marginTop: 5,
    marginBottom: 5,
    width: "88%",
    textAlign: "justify",
  },
  errorUpText: {
    color: "#6B5F85",
    marginTop: 5,
    marginBottom: 5,
    width: "88%",
    textAlign: "justify",
  },
});
