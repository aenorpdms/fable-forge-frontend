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
import { useDispatch,useSelector } from 'react-redux';
import { useState } from "react";
import { updateUser } from "../reducers/user";

export default function ProfilScreen({ navigation }) {

// INPUT STATE
const [username, setUsername] = useState('')
const [name, setName] = useState('')
const [email, setEmail] = useState('')
const [newPassword, setNewPassword] = useState('')
const [password, setPassword] = useState('')
const [oldPassword, setOldPassword] = useState('')
const [isEditable, setIsEditable] = useState(false);

const dispatch = useDispatch()
const user = useSelector((state)  => state.user.value)
console.log(user)


// MODIFY INFO
const handleModifyInfo = () => {
  // send to back info PUT ROUTE USER 
  dispatch(updateUser({username, name, email}))
  setIsEditable(false)
}


// MODIFY PWD
const handleModifyPwd = () => {
  // send to back info PUT ROUTE USER 
}


// SUBSCRIPTION PAGE
const handleSubscription = () => {
  // navigate to subscription page
  navigation.navigate('Subscription')
}


// DELETE ACCOUNT
const handleDeleteAccount = () => {
  // call back delete account
  // go back to sign in 
  navigation.navigate('Sign');
}


  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.containerBis}
        behavior={Platform.OS === "ios" ? "padding" : null}
        enabled
        keyboardVerticalOffset={10}
      >
        <ScrollView style={styles.containerInformation} indicatorStyle="white">
        <ImageBackground
          style={styles.imagBgd}
          source={require("../assets/ImageBibliotheque.png")}
        >
          <View>
          {/* <Text style={styles.title1}>BIENVENUE PIERRE</Text> */}
          <Text style={styles.title2}>Profil</Text>
          <Image
            style={styles.image}
            source={require("../assets/profilPicture.png")}
          />
          <Text style={styles.subtitle}>Informations Personnelles</Text>
          </View>
        </ImageBackground>

        
          <View>
            <Text style={styles.titleInput}>Nom d'utilisateur</Text>
            <TextInput
              style={styles.input}
              placeholder={user.username}
              placeholderTextColor="white"
              onChangeText={(value) => setUsername(value)} value={username}
            ></TextInput>
          </View>
          <View>
            <Text style={styles.titleInput}>Prénom</Text>
            <TextInput
              style={styles.input}
              placeholder={user.name}
              placeholderTextColor="white"
              onChangeText={(value) => setName(value)} value={name}
            ></TextInput>
          </View>
          <View>
            <Text style={styles.titleInput}>Adresse mail</Text>
            <TextInput
              style={styles.input}
              placeholder={user.email}
              placeholderTextColor="white"
              onChangeText={(value) => setEmail(value)} value={email}
            ></TextInput>
          </View>
          <TouchableOpacity>
            <Text style={styles.btnModify} onPress={() => handleModifyInfo()} >Modifier mes informations</Text>
          </TouchableOpacity>
          <Text style={styles.titleInput}>Mot de Passe</Text>
          <TouchableOpacity style={styles.mdp}>
            <Text style={styles.btnModify} onPress={() => handleModifyPwd()}>Modifier mon mot de passe</Text>
          </TouchableOpacity>
          <Text style={styles.subscriptionText}>
            Votre abonnement est valide jusqu’au 31/10/2023
          </Text>
          <TouchableOpacity style={styles.btnAbonnement}>
            <Text style={styles.btnText} onPress= {() => handleSubscription()}>Gérer l'abonnement</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnDelete}>
            <Text style={styles.btnText} onPress= {() => handleDeleteAccount()}>Supprimer mon compte</Text>
          </TouchableOpacity>
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
    width:"100%",
    marginTop:"-12%"
    
  },
  imagBgd: {
    flex: 1,
    width: "100%",
    height: "66%",
    marginBottom: "4%"
  },

  title1: {
    fontFamily: "Lato",
    fontSize: 20,
    fontWeight: "200",
    textAlign: "left",
    color: "#FFFFFF",
    marginTop: 160,
    marginLeft: 16,
  },
  title2: {
    fontFamily: "Lato",
    fontSize: 32,
    fontWeight: "500",
    textAlign: "left",
    color: "#FFCE4A",
    marginTop: 160,
    lineHeight: 60,
    marginLeft: 16,
  },
  subtitle: {
    color: "white",
    fontSize: 22,
    fontWeight: "500",
    textAlign: "center",
    marginTop: "17%",
  },
  image: {
    position: "absolute",
    top: "55%",
    left: "36%",
  },
  containerInformation: {
    flex: 2,
  },

  titleInput: {
    color: "white",
    fontSize: 18,
    fontWeight: "500",
    marginLeft: "4%",
  },
  input: {
    backgroundColor: "transparent",
    borderRadius: 10,
    margin: 10,
    padding: 10,
    width: "92%",
    borderWidth: 1,
    borderColor: "#FFCE4A",
    marginBottom: "5%",
    marginLeft:"4%",
    color:"white"
  },
  btnModify: {
    color: "#FFCE4A",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: "4%",
    marginBottom: "5%",
  },
  mdp: {
    marginTop: "1%",
  },
  subscriptionText: {
    color: "white",
    fontSize: 14,
    fontWeight: "400",
    marginLeft: "4%",
  },
  btnAbonnement: {
    backgroundColor: "transparent",
    borderRadius: 10,
    margin: 10,
    padding: 10,
    width: "92%",
    borderWidth: 1,
    borderColor: "#FFCE4A",
    marginBottom: "5%",
    marginLeft:"4%"
  },
  btnText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "500",
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
    marginBottom: "5%",
    marginLeft:"4%"
  },
});
