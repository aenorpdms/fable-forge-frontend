import { StyleSheet, Text, TouchableOpacity, View, ImageBackground, Modal, TextInput } from "react-native";
import * as Font from "expo-font";
// import { GoogleSignin } from "@react-native-google-signin/google-signin";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../reducers/user";

export default function SignScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState("");
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstName] = useState("");
  const [email, setEmail] = useState("");

  const [identifier, setIdentifier] = useState("");
  const [passwordUp, setPasswordUp] = useState("");
  const user = useSelector(state => state.user.value);

  const handleModalToggle = type => {
    setModalType(type);
    setModalVisible(!modalVisible);
  };

  const handleInscription = () => {
    fetch("https://fable-forge-backend.vercel.app/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, firstname, email, password }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data.token);
        if (data.result) {
          setUsername("");
          setPassword("");
          setFirstName("");
          setEmail("");
          dispatch(updateUser({ firstname, username, email, token: data.token }));
          setModalVisible(false);
          navigation.navigate("Home");
        }
      });
  };

  const handleConnection = () => {
    console.log(user);
    fetch("https://fable-forge-backend.vercel.app/users/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier, password: passwordUp }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.result) {
          setIdentifier("");
          setPasswordUp("");
          dispatch(updateUser({ firstname: data.firstname, username: data.username, email: data.email, token: data.token }));
          setModalVisible(false);
          navigation.navigate("Home");
        }
      });
  };

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.imagBgd} source={require("../assets/finalimageConnection.png")}>
        <Text style={styles.title1}>Fable</Text>
        <Text style={styles.title2}>Forge</Text>
      </ImageBackground>
      <TouchableOpacity style={styles.btnHome} onPress={() => handleModalToggle("register")}>
        <Text style={styles.textBtn}>S'inscrire gratuitement</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnGoogle}>
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
            <TouchableOpacity onPress={() => handleModalToggle()}>
              <Text style={styles.btnCloseModal}>x</Text>
              <Text style={styles.titleModal}> Fable Forge</Text>
            </TouchableOpacity>
            {modalType === "register" && (
              <>
                <TextInput
                  style={styles.input}
                  placeholder='Prénom'
                  placeholderTextColor='white'
                  onChangeText={value => setFirstName(value)}
                  value={firstname}
                ></TextInput>
                <TextInput
                  style={styles.input}
                  placeholder='Pseudonyme'
                  placeholderTextColor='white'
                  onChangeText={value => setUsername(value)}
                  value={username}
                ></TextInput>
                <TextInput
                  style={styles.input}
                  placeholder='Email'
                  placeholderTextColor='white'
                  onChangeText={value => setEmail(value)}
                  value={email}
                ></TextInput>
                <TextInput
                  style={styles.input}
                  placeholder='Mot de Passe'
                  secureTextEntry={true}
                  placeholderTextColor='white'
                  onChangeText={value => setPassword(value)}
                  value={password}
                ></TextInput>
                <TouchableOpacity style={styles.btnValidate} onPress={() => handleInscription()}>
                  <Text style={styles.textBtnValidate}>Valider</Text>
                </TouchableOpacity>
              </>
            )}
            {modalType === "connexion" && (
              <>
                <TextInput
                  style={styles.input}
                  placeholder='Pseudonyme ou Email'
                  placeholderTextColor='white'
                  onChangeText={value => setIdentifier(value)}
                  value={identifier}
                ></TextInput>
                <TextInput
                  style={styles.input}
                  placeholder='Mot de Passe'
                  placeholderTextColor='white'
                  secureTextEntry={true}
                  onChangeText={value => setPasswordUp(value)}
                  value={passwordUp}
                ></TextInput>
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
  imagBgd: {
    flex: 2,
    width: "100%",
    height: "100%",
    // backgroundColor:
  },
  title1: {
    fontFamily: "Lato_400Regular",
    fontSize: 28,
    // margin: 170,

    textAlign: "center",
    color: "#FFFFFF",
    marginTop: 350,
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
    margin: 10,
    padding: 10,
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
    width: 200,
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
