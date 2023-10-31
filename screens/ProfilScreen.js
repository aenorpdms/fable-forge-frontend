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
} from "react-native";
import * as Font from "expo-font";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { updateUser, logOutuser } from "../reducers/user";

import TabBar from "../TabBar";

export default function ProfilScreen({ navigation }) {
  // INPUT STATE
  const [username, setUsername] = useState("");
  const [firstname, setFirstName] = useState("");
  const [email, setEmail] = useState("");

  // PASSWORD UPDATE
  const [newPassword, setNewPassword] = useState("");
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  // EDITE
  const [isEditable, setIsEditable] = useState(false);
  const [isEditablePwd, setIsEditablePwd] = useState(false);
  const [buttonText, setButtonText] = useState("Modifier mes informations");
  const [buttonTextPwd, setButtonTextPwd] = useState("Modifier mon mot de passe");

  const dispatch = useDispatch();
  const user = useSelector(state => state.user.value);

  // MODIFY INFO
  const handleModifyInfo = () => {
    const updatedUserInfo = { token: user.token };

    // UPDATE USERNAME
    if (username !== user.username && username !== null && username!== "") {
      updatedUserInfo.username = username;
    } else {
      updatedUserInfo.username = user.username; // Use the old value
    }
    // UPDATE FIRSTNAME
    if (firstname !== user.firstname && firstname !== null && firstname!== "") {
      updatedUserInfo.firstname = firstname;
    } else {
      updatedUserInfo.firstname = user.firstname; // Use the old value
    }

    // UPDATE EMAIL
    if (email !== user.email && email !== null &&  email!== "") {
      updatedUserInfo.email = email;
    } else {
      updatedUserInfo.email = user.email; // Use the old value
    }

    dispatch(updateUser(updatedUserInfo));
   

    // send to back info PUT ROUTE USER
    fetch(`https://fable-forge-backend-84ce.vercel.app/users/information`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedUserInfo),
    })
      .then(response => response.json())
      .then(data => {
   
        if (data.result) {
          
          setIsEditable(false);
          setButtonText("Modifier mes informations");
        }
      });
  };

  // MODIFY PWD
  const handleModifyPwd = () => {
    // send to back info PUT ROUTE USER
    if (password === newPassword) {
      fetch(`https://fable-forge-backend-84ce.vercel.app/users/password`, {
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
 
          if (data.result) {
            console.log("updated");
            setIsEditablePwd(false);
            setButtonTextPwd("Modifier mon mot de passe");
          }
        });
    }
  };

  // SUBSCRIPTION PAGE
  const handleSubscription = () => {
    // navigate to subscription page
    navigation.navigate("Subscription");
  };

  const handleLogOut = () => {
    // LogOut and return to sign page
    navigation.navigate("Sign");
  };

// MODALE DELETE 
const [modalVisible, setModalVisible] = useState(false);
const [modalType, setModalType] = useState("");

 const handleModalToggle = type => {
    setModalType(type);
    setModalVisible(!modalVisible);
  };


  // DELETE ACCOUNT
  const handleDeleteAccount = () => {
    fetch(`https://fable-forge-backend-84ce.vercel.app/users`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: user.token }),
    })
      .then(response => response.json())
      .then(data => {
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
              {/* <Text style={styles.title1}>BIENVENUE PIERRE</Text> */}
              <Text style={styles.title2}>Profil</Text>
              <Image style={styles.image} source={require("../assets/profilPicture.png")} />
              <Text style={styles.subtitle}>Informations Personnelles</Text>
            </View>
          </ImageBackground>

          <View>
            <Text style={styles.titleInput}>Nom d'utilisateur</Text>
            <TextInput
              style={styles.input}
              placeholder={isEditable ? '' : user.username}
              placeholderTextColor='white'
              onChangeText={value => setUsername(value)}
              value={username}
              editable={isEditable}
            ></TextInput>
          </View>
          <View>
            <Text style={styles.titleInput}>Prénom</Text>
            <TextInput
              style={styles.input}
              placeholder={isEditable ? '' : user.firstname}
              placeholderTextColor='white'
              onChangeText={value => setFirstName(value)}
              value={firstname}
              editable={isEditable}
            ></TextInput>
          </View>
          <View>
            <Text style={styles.titleInput}>Adresse mail</Text>
            <TextInput
              style={styles.input}
              placeholder={isEditable ? '' : user.email}
              placeholderTextColor='white'
              onChangeText={value => setEmail(value)}
              value={email}
              editable={isEditable}
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
                  placeholderTextColor='white'
                  onChangeText={value => setOldPassword(value)}
                  value={oldPassword}
                ></TextInput>
              </View>
              <View>
                <Text style={styles.titleInputPWD}>Nouveau mot de passe</Text>
                <TextInput
                  style={styles.input}
                  placeholder='Tapez votre nouveau mot de passe'
                  placeholderTextColor='white'
                  onChangeText={value => setNewPassword(value)}
                  value={newPassword}
                ></TextInput>
              </View>
              <View>
                <Text style={styles.titleInputPWD}>Confirmez mot de Passe</Text>
                <TextInput
                  style={styles.input}
                  placeholder='Confirmez votre nouveau mot de passe'
                  placeholderTextColor='white'
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
          <Text style={styles.subscriptionText}>Votre abonnement est valide jusqu’au 31/10/2023</Text>
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
          <View style={styles.space}>
          </View>

          
          <Modal visible={modalVisible} animationType='slide' transparent={true}>
        <View style={styles.mdlctn}>
          <View style={styles.modalContainer}>
            <Text style={styles.titleModal}>Êtes-vous sûr de vouloir supprimer votre compte Fable Forge ?</Text>
           
            {modalType === "deleteAccount" && (
              < View style={styles.containerBtnModal}>
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
  },
  containerBis: {
    flex: 1,
    width: "100%",
    marginTop: "-12%",
  },
  imagBgd: {
    flex: 1,
    width: "100%",
    height: "77%",
    // marginBottom: "4%",
  },

  title2: {
    fontFamily: "Lato_400Regular",
    fontSize: 32,
    textAlign: "left",
    color: "#FFCE4A",
    marginTop: "46.5%",//160
    lineHeight: 60,
    marginLeft: "3%",
  },
  subtitle: {
    fontFamily: "Lato_400Regular",
    color: "white",
    fontSize: 22,
    textAlign: "center",
    marginTop: "10%",
    marginBottom:"5%"
  },
  image: {
    position: "absolute",
    top: "52%",
    left: "36%",
  },
  containerInformation: {
    flex: 2,
  },
  titleInputMDP: {
    fontFamily: "Lato_400Regular",
    color: "white",
    fontSize: 18,
    marginLeft: "4%",
    marginBottom: "1%",
  },

  titleInput: {
    fontFamily: "Lato_400Regular",
    color: "white",
    fontSize: 18,
    marginLeft: "4%",
  },
  titleInputPWD: {
    fontFamily: "Lato_400Regular",
    color: "white",
    fontSize: 16,
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
  btnModify: {
    fontFamily: "Lato_400Regular",
    color: "#FFCE4A",
    fontSize: 16,
    marginTop: 0,
    marginLeft: "4%",
    marginBottom: "4%",
  },
  mdp: {
    marginTop: "1%",
  },
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
  btnTextDelete:{
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
  tabBar: {
    marginTop: "200%",
    position: "absolute",
    zIndex: 1,
  },
  backgroundTab:{
    backgroundColor:"#2C1A51",
    top: "95%", 
    position: "absolute",
    zIndex: -1,
    height: 100,
    width: 650,
    marginLeft:-400,
    marginTop:-20,
  },
  space: {
    padding: 10,
    height: 80,
    backgroundColor:"transparent",
  },
  mdlctn: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0, 0.5)",
  },
  modalContainer: {
    width: 350, // Adjust the width as per your requirement
    height: 180, // Adjust the height as per your requirement
    marginTop: 350,
    marginLeft: 30,
    backgroundColor: "#6B5F85",
    borderRadius: 20, // Adjust the borderRadius as per your requirement
    alignItems: "center",
    justifyContent: "center",
    // backdropFilter: "blur(5px)",
  },
  titleModal: {
    fontFamily: "Lato_400Regular",
    color: "white",
    fontSize: 20,
    padding: 10,
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
  btnNoModal:{
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
  containerBtnModal:{
    marginTop:10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent:"center",
  }

});
