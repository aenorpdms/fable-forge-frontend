import { StyleSheet, Text, TouchableOpacity, View, ImageBackground, Modal, TextInput, SafeAreaView, KeyboardAvoidingView } from "react-native";
import * as Font from "expo-font";
// import { GoogleSignin } from "@react-native-google-signin/google-signin";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../reducers/user";
import { text } from "@fortawesome/fontawesome-svg-core";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function SignScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState("");
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [isValidSignIn, setIsValidSignIn] = useState(true);
  const [isValidSignUp, setIsValidSignUp] = useState(true);

  const [identifier, setIdentifier] = useState("");
  const [passwordUp, setPasswordUp] = useState("");

  const user = useSelector(state => state.user.value);

  const handleModalToggle = type => {
    setModalType(type);
    setModalVisible(!modalVisible);
  };

  const handleInscription = () => {
    fetch("https://fable-forge-backend-84ce.vercel.app/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, firstname, email, password }),
    })
      .then(response => response.json())
      .then(data => {
      
        if (data.result) {
          setIsValidSignUp(true);
          setUsername("");
          setPassword("");
          setFirstName("");
          setEmail("");
          dispatch(updateUser({ firstname, username, email, token: data.token }));
          setModalVisible(false);
          navigation.navigate("Home");
        } else {
          setIsValidSignUp(false);
        }
      });
  };

  const handleConnection = () => {
    fetch("https://fable-forge-backend-84ce.vercel.app/users/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier, password: passwordUp }),
    })
      .then(response => response.json())
      .then(data => {
   
        if (data.result) {
          setIsValidSignIn(true);
          setIdentifier("");
          setPasswordUp("");
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

  const modalStyle = modalType === "register" ? styles.modalContainerInscription : styles.modalContainerConnection;
  const titleStyle = modalType === "register" ? styles.titleModalUp : styles.titleModalIn;
  const closeStyle = modalType === "register" ? styles.closeModalUp : styles.closeModalIn;

  const errorTextInStyle = isValidSignIn
    ? styles.errorUpText // Style when isValidSignIn is true
    : { ...styles.errorUpText, color: "#FFCE4A" }; // Style when isValidSignIn is false (you can change the color)

  const errorTextUpStyle = isValidSignUp
    ? styles.errorInText // Style when isValidSignIn is true
    : { ...styles.errorInText, color: "#FFCE4A" }; // Style when isValidSignIn is false (you can change the color)

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
      {/* <TouchableOpacity style={styles.btnGoogle}>
        <Text style={styles.textBtn1}>Se connecter avec Google</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnFacebook}>
        <Text style={styles.textBtn1}>Se connecter avec Facebook</Text>
      </TouchableOpacity> */}

      <Modal visible={modalVisible} animationType='slide' transparent={true}>
        <View style={styles.mdlctn}>
          <View style={modalStyle}>
            <View style={styles.titleClose}>
              <Text style={titleStyle}> Fable Forge</Text>
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
                  placeholder='Email'
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
                  placeholder='Pseudonyme ou Email'
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
                <Text style={errorTextInStyle}>Mot de passe ou Email/ Nom d'utilisateur incorrect</Text>
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
  mdlctn: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0, 0.5)",
  },
  containerBis: {
    flex: 1,
    width: "100%",
  },
  imagBgd: {
    flex: 2,
    width: "100%",
    height: "90%",
    // backgroundColor:
  },
  title1: {
    fontFamily: "Lato_400Regular",
    fontSize: 28,
    // margin: 170,

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
  btnConnect: {
    margin: 10,
    width: "90%",
  },
  btnHome: {
    alignItems: "center",
    backgroundColor: "#FFCE4A",
    borderRadius: 10,
    margin: "2%",
    padding: 10,
    width: "80%",
    height: "5%",
    justifyContent: "center",
    marginBottom: "5%"
  },
  btnGoogle: {
    backgroundColor: "#E6DAFF",
    borderRadius: 10,
    margin: "2%",
    padding: 10,
    width: "80%",
    height: "5%",
    justifyContent: "center",
    opacity: 0.2,
  },
  btnFacebook: {
    backgroundColor: "#E6DAFF",
    borderRadius: 10,
    margin: "2%",
    padding: 10,
    width: "80%",
    height: "5%",
    justifyContent: "center",
    opacity: 0.2,
    marginBottom: "18%",
  },
  btnInput: {
    backgroundColor: "transparent",
    borderRadius: 10,
    margin: "2%",
    padding: 10,
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
  modalContainerInscription: {
    width: "86%", // Adjust the width as per your requirement 350
    height: "45%", // Adjust the height as per your requirement 400
    marginTop: "40%", // 200
    marginLeft: "7%", //30
    backgroundColor: "#6B5F85",
    borderRadius: 20, // Adjust the borderRadius as per your requirement
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    // backdropFilter: "blur(5px)",
  },
  modalContainerConnection: {
    width: "86%", // Adjust the width as per your requirement
    height: "34%", // Adjust the height as per your requirement 300
    marginTop: "63%",
    marginLeft: "7%",
    backgroundColor: "#6B5F85",
    borderRadius: 20, // Adjust the borderRadius as per your requirement
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    // backdropFilter: "blur(5px)",
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
    padding: 10,
    marginTop: "-11%", // -40
  },
  titleModalUp: {
    fontFamily: "Lato_400Regular",
    color: "white",
    fontSize: 18,
    padding: 10,
    marginTop: "-8%",
  },
  closeModalIn: {
    position: "absolute",
    top: "3%",
    left: "62%",
  },
  closeModalUp: {
    position: "absolute",
    top: "-2%",
    left: "62%",
  },
  inputIn: {
    width: "90%",
    height: "15%", //40
    borderColor: "white",
    color: "white",
    fontFamily: "Lato_400Regular",
    borderWidth: 1,
    marginBottom: "5%", // 15
    paddingLeft: 10,
    borderRadius: 10,
  },
  inputUp: {
    width: "90%",
    height: "11%", //40
    borderColor: "white",
    color: "white",
    fontFamily: "Lato_400Regular",
    borderWidth: 1,
    marginBottom: "5%", // 15
    paddingLeft: 10,
    borderRadius: 10,
  },
  btnValidate: {
    backgroundColor: "#FFCE4A",
    borderRadius: 10,
    margin: 10, // 10
    padding: 10, // 10
    textAlign: "center",
    width: "90%",
    marginBottom: 10, // 10
  },
  textBtnValidate: {
    fontFamily: "Lato_400Regular",
    textAlign: "center",
  },
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
