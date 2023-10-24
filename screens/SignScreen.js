import { StyleSheet, Text, TouchableOpacity, View, ImageBackground, Modal, TextInput } from "react-native";
import * as Font from "expo-font";
// import {
//   GoogleSignin,
//   GoogleSigninButton,
// } from "@react-native-google-signin/google-signin";

import { useState } from "react";

export default function SignScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState("");

  const handleModalToggle = type => {
    setModalType(type);
    setModalVisible(!modalVisible);
  };

  const handleSubmit = () => {
    navigation.navigate("TabNavigator");
  };

  // GOOGLE
  // GoogleSignin.configure({
  //   webClientId: '940491110305-hujjjcdlhjq1n84llmcnl9ajlj7cu195.apps.googleusercontent.com',
  //   offlineAccess: true,
  // });

  // const handleGoogleSignIn = async () => {
  //   try {
  //     await GoogleSignin.hasPlayServices();
  //     const userInfo = await GoogleSignin.signIn();
  //     // Handle the user information or authentication process here
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.imagBgd} source={require("../assets/finalimageConnection.png")}>
        <Text style={styles.title1}>Fable</Text>
        <Text style={styles.title2}>Forge</Text>
      </ImageBackground>
      <Text style={styles.subTitle}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temp.</Text>
      <TouchableOpacity style={styles.btnHome} onPress={() => handleModalToggle("register")}>
        <Text style={styles.textBtn}>S'inscrire gratuitement</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btnGoogle}
        // </View>onPress={() => handleGoogleSignIn()}
      >
        {/* <GoogleSigninButton
        style={styles.btnGoogle}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Light}
        onPress={() => handleGoogleSignIn()} 
      /> */}
        <Text style={styles.textBtn1}>Se connecter avec Google</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnFacebook}>
        <Text style={styles.textBtn1}>Se connecter avec Facebook</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnInput} onPress={() => handleModalToggle("connexion")}>
        <Text style={styles.textBtn1}>Se connecter</Text>
      </TouchableOpacity>
      <Modal visible={modalVisible} animationType='slide' transparent={true}>
        <View style={styles.mdlctn}>
          <View style={styles.modalContainer}>
            <TouchableOpacity onPress={() => handleModalToggle("")}>
              <Text style={styles.btnCloseModal}>x</Text>
              <Text style={styles.titleModal}> Fable Forge</Text>
            </TouchableOpacity>
            {modalType === "register" && (
              <>
                <TextInput style={styles.input} placeholder='Prénom' placeholderTextColor='white'></TextInput>
                <TextInput style={styles.input} placeholder='Pseudonyme' placeholderTextColor='white'></TextInput>
                <TextInput style={styles.input} placeholder='Email' placeholderTextColor='white'></TextInput>
                <TextInput style={styles.input} placeholder='Mot de Passe' placeholderTextColor='white'></TextInput>
                <TouchableOpacity style={styles.btnValidate} onPress={() => handleSubmit()}>
                  <Text style={styles.textBtnValidate}>Valider</Text>
                </TouchableOpacity>
              </>
            )}
            {modalType === "connexion" && (
              <>
                <TextInput style={styles.input} placeholder='Pseudonyme ou Email' placeholderTextColor='white'></TextInput>
                <TextInput style={styles.input} placeholder='Mot de Passe' placeholderTextColor='white'></TextInput>
                <TouchableOpacity style={styles.btnValidate} onPress={() => handleSubmit()}>
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
  imagBgd: {
    flex: 2,
    width: "100%",
    height: "100%",
    // backgroundColor:
  },
  title1: {
    fontFamily: "Lato",
    fontSize: 28,
    // margin: 170,
    fontWeight: "bold",
    textAlign: "center",
    color: "#FFFFFF",
    marginTop: 350,
  },
  title2: {
    // fontFamily: "Lato",
    fontSize: 56,
    fontWeight: "bold",
    textAlign: "center",
    color: "#FFFFFF",
    lineHeight: 60,
  },
  subTitle: {
    width: "80%",
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 14,
    marginBottom: 40,
  },
  btnConnect: {
    margin: 10,
    width: "90%",
  },
  btnHome: {
    backgroundColor: "#FFCE4A",
    borderRadius: 10,
    margin: 10,
    padding: 10,
    paddingLeft: 80,
    paddingRight: 80,
    width: "80%",
  },
  btnGoogle: {
    backgroundColor: "transparent",
    borderRadius: 10,
    margin: 10,
    padding: 10,
    width: "80%",
    borderWidth: 1,
    borderColor: "#FFFFFF",
  },
  btnFacebook: {
    backgroundColor: "transparent",
    borderRadius: 10,
    margin: 10,
    padding: 10,
    width: "80%",
    borderWidth: 1,
    borderColor: "#FFFFFF",
  },
  btnInput: {
    backgroundColor: "transparent",
    borderRadius: 10,
    margin: 10,
    padding: 10,
    width: "80%",
    borderWidth: 1,
    borderColor: "#FFFFFF",
    marginBottom: 80,
  },
  textBtn: {
    textAlign: "center",
  },
  textBtn1: {
    textAlign: "center",
    color: "#FFFFFF",
  },
  modalContainer: {
    width: 350, // Adjust the width as per your requirement
    height: 350, // Adjust the height as per your requirement
    marginTop: 150,
    marginLeft: 30,
    backgroundColor: "#6B5F85",
    borderRadius: 20, // Adjust the borderRadius as per your requirement
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    // backdropFilter: "blur(5px)",
  },

  //   modalRegister: {
  //     width: 350, // Adjust the width as per your requirement
  //     height: 350, // Adjust the height as per your requirement
  //     marginTop: 150,
  //     marginLeft: 30,
  //     backgroundColor: "#6B5F85",
  //     borderRadius: 20, // Adjust the borderRadius as per your requirement
  //     padding: 20,
  //     alignItems: "center",
  //     justifyContent: "center",
  //   },

  //   modalConnexion: {
  //     width: 350, // Adjust the width as per your requirement
  //     height: 350, // Adjust the height as per your requirement
  //     marginTop: 150,
  //     marginLeft: 30,
  //     backgroundColor: "#6B5F85",
  //     borderRadius: 20, // Adjust the borderRadius as per your requirement
  //     padding: 20,
  //     alignItems: "center",
  //     justifyContent: "center",
  //   },

  imagBgdModal: {
    height: "100%",
    width: "100%",
    opacity: 0.5,
  },

  titleModal: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    padding: 10,
    marginLeft: 50,
  },
  btnCloseModal: {
    fontSize: 20,
    padding: 10,
    marginTop: 10,
    marginLeft: 200,
    color: "white",
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "white",
    color: "white",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 10,
  },
  btnValidate: {
    backgroundColor: "#FFCE4A",
    borderRadius: 10,
    margin: 10,
    padding: 10,
    paddingLeft: 80,
    paddingRight: 80,
    width: "80%",
    marginBottom: 20,
  },
  textBtnValidate: {
    textAlign: "center",
    fontWeight: "bold",
  },
});
